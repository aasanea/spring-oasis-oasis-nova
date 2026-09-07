import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyBook } from "./assets";
import type {
  AgentAnalysis,
  AgentType,
  Asset,
  CircuitBreaker,
  EquityPoint,
  FeedState,
  Headline,
  Order,
  Position,
  Side,
  SystemError,
  TapePayload,
} from "./types";

const FEE_BPS = 0.00155;
const STARTING_CASH = 1_000_000;

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function seedBreakers(): CircuitBreaker[] {
  return [
    { id: "market", name: "Market tape", state: "closed", failures: 0 },
    { id: "agents", name: "Agent bus", state: "closed", failures: 0 },
    { id: "broker", name: "Paper broker", state: "closed", failures: 0 },
    { id: "news", name: "News ingest", state: "closed", failures: 0 },
  ];
}

function markBook(book: Record<string, Asset>, positions: Position[], cash: number) {
  let mv = 0;
  for (const p of positions) {
    const px = book[p.symbol]?.last || p.avgPrice;
    mv += p.qty * px;
  }
  return cash + mv;
}

const idleFeed = (): FeedState => ({
  status: "idle",
  lastSync: null,
  source: "Yahoo Finance · Tadawul",
  session: "unknown",
  tasiLast: 0,
  tasiChangePct: 0,
  brentLast: 0,
  brentChangePct: 0,
  rates10y: null,
  failed: [],
});

export type DeskState = {
  book: Record<string, Asset>;
  cash: number;
  positions: Position[];
  orders: Order[];
  analyses: AgentAnalysis[];
  equity: EquityPoint[];
  headlines: Headline[];
  breakers: CircuitBreaker[];
  errors: SystemError[];
  selected: string;
  hydrated: boolean;
  feed: FeedState;
  select: (symbol: string) => void;
  place: (input: { symbol: string; side: Side; qty: number; note?: string; sl?: number; tp?: number }) => Order;
  cancelLikeClose: (positionId: string) => Order | null;
  addAnalysis: (a: Omit<AgentAnalysis, "id" | "createdAt">) => AgentAnalysis;
  tripBreaker: (id: string, message: string) => void;
  resetBreaker: (id: string) => void;
  healScan: () => void;
  resetBook: () => void;
  applyTape: (tape: TapePayload) => void;
  applyHeadlines: (headlines: Headline[]) => void;
  setFeedStatus: (patch: Partial<FeedState>) => void;
};

function initialSlice() {
  return {
    book: emptyBook(),
    cash: STARTING_CASH,
    positions: [] as Position[],
    orders: [] as Order[],
    analyses: [] as AgentAnalysis[],
    equity: [] as EquityPoint[],
    headlines: [] as Headline[],
    breakers: seedBreakers(),
    errors: [] as SystemError[],
    selected: "2222",
    hydrated: false,
    feed: idleFeed(),
  };
}

function pushEquity(equity: EquityPoint[], value: number) {
  const last = equity.at(-1);
  if (!last) return [{ t: Date.now(), equity: value }];
  if (Date.now() - last.t < 8_000) {
    return equity.slice(0, -1).concat({ t: Date.now(), equity: value });
  }
  return [...equity.slice(-180), { t: Date.now(), equity: value }];
}

export const useDeskStore = create<DeskState>()(
  persist(
    (set, get) => ({
      ...initialSlice(),

      select: (symbol) => set({ selected: symbol }),

      applyTape: (tape) => {
        const { positions, cash, equity, book } = get();
        const nextBook: Record<string, Asset> = { ...book };
        for (const [sym, asset] of Object.entries(tape.assets)) {
          nextBook[sym] = asset;
        }

        const still: Position[] = [];
        const extraOrders: Order[] = [];
        let nextCash = cash;

        for (const p of positions) {
          const px = nextBook[p.symbol]?.last || p.avgPrice;
          const hitSl = p.stopLoss != null && px <= p.stopLoss;
          const hitTp = p.takeProfit != null && px >= p.takeProfit;
          if (hitSl || hitTp) {
            const notional = p.qty * px;
            const fee = notional * FEE_BPS;
            nextCash += notional - fee;
            extraOrders.push({
              id: uid("o"),
              symbol: p.symbol,
              side: "sell",
              qty: p.qty,
              price: px,
              fee,
              status: "filled",
              note: hitSl ? "Stop loss · live last" : "Take profit · live last",
              createdAt: Date.now(),
            });
          } else {
            still.push(p);
          }
        }

        const eq = markBook(nextBook, still, nextCash);
        set((s) => ({
          book: nextBook,
          positions: still,
          cash: nextCash,
          orders: extraOrders.length ? extraOrders.concat(s.orders).slice(0, 80) : s.orders,
          equity: pushEquity(equity, eq),
          feed: {
            status: "live",
            lastSync: Date.now(),
            source: tape.source,
            session: tape.session,
            tasiLast: tape.macro.tasiLast,
            tasiChangePct: tape.macro.tasiChangePct,
            brentLast: tape.macro.brentLast,
            brentChangePct: tape.macro.brentChangePct,
            rates10y: tape.macro.rates10y,
            failed: tape.failed,
          },
        }));
      },

      applyHeadlines: (headlines) => set({ headlines }),

      setFeedStatus: (patch) =>
        set((s) => ({
          feed: { ...s.feed, ...patch },
        })),

      place: ({ symbol, side, qty, note, sl, tp }) => {
        const { book, cash, positions } = get();
        const asset = book[symbol];
        const qtyInt = Math.floor(qty);
        if (!asset?.quoted || qtyInt <= 0) {
          const rejected: Order = {
            id: uid("o"),
            symbol,
            side,
            qty: qtyInt,
            price: asset?.last ?? 0,
            fee: 0,
            status: "rejected",
            note: asset?.quoted ? "Invalid quantity" : "Waiting for a live quote",
            createdAt: Date.now(),
          };
          set((s) => ({ orders: [rejected, ...s.orders] }));
          return rejected;
        }

        const px = asset.last;
        const notional = qtyInt * px;
        const fee = notional * FEE_BPS;

        if (side === "buy") {
          if (cash < notional + fee) {
            const rejected: Order = {
              id: uid("o"),
              symbol,
              side,
              qty: qtyInt,
              price: px,
              fee,
              status: "rejected",
              note: "Insufficient cash",
              createdAt: Date.now(),
            };
            set((s) => ({ orders: [rejected, ...s.orders] }));
            return rejected;
          }
          const existing = positions.find((p) => p.symbol === symbol);
          let nextPositions: Position[];
          if (existing) {
            const newQty = existing.qty + qtyInt;
            const avg = (existing.avgPrice * existing.qty + px * qtyInt) / newQty;
            nextPositions = positions.map((p) =>
              p.id === existing.id
                ? {
                    ...p,
                    qty: newQty,
                    avgPrice: avg,
                    stopLoss: sl ?? p.stopLoss,
                    takeProfit: tp ?? p.takeProfit,
                  }
                : p,
            );
          } else {
            nextPositions = [
              ...positions,
              {
                id: uid("p"),
                symbol,
                qty: qtyInt,
                avgPrice: px,
                stopLoss: sl,
                takeProfit: tp,
                openedAt: Date.now(),
              },
            ];
          }
          const order: Order = {
            id: uid("o"),
            symbol,
            side,
            qty: qtyInt,
            price: px,
            fee,
            status: "filled",
            note: note ?? "Market buy · live last",
            createdAt: Date.now(),
          };
          const nextCash = cash - notional - fee;
          set((s) => ({
            cash: nextCash,
            positions: nextPositions,
            orders: [order, ...s.orders].slice(0, 80),
            equity: pushEquity(s.equity, markBook(book, nextPositions, nextCash)),
          }));
          return order;
        }

        const existing = positions.find((p) => p.symbol === symbol);
        if (!existing || existing.qty < qtyInt) {
          const rejected: Order = {
            id: uid("o"),
            symbol,
            side,
            qty: qtyInt,
            price: px,
            fee,
            status: "rejected",
            note: "No long inventory",
            createdAt: Date.now(),
          };
          set((s) => ({ orders: [rejected, ...s.orders] }));
          return rejected;
        }
        const remain = existing.qty - qtyInt;
        const nextPositions =
          remain === 0
            ? positions.filter((p) => p.id !== existing.id)
            : positions.map((p) => (p.id === existing.id ? { ...p, qty: remain } : p));
        const order: Order = {
          id: uid("o"),
          symbol,
          side,
          qty: qtyInt,
          price: px,
          fee,
          status: "filled",
          note: note ?? "Market sell · live last",
          createdAt: Date.now(),
        };
        const nextCash = cash + notional - fee;
        set((s) => ({
          cash: nextCash,
          positions: nextPositions,
          orders: [order, ...s.orders].slice(0, 80),
          equity: pushEquity(s.equity, markBook(book, nextPositions, nextCash)),
        }));
        return order;
      },

      cancelLikeClose: (positionId) => {
        const p = get().positions.find((x) => x.id === positionId);
        if (!p) return null;
        return get().place({ symbol: p.symbol, side: "sell", qty: p.qty, note: "Close position · live last" });
      },

      addAnalysis: (a) => {
        const full: AgentAnalysis = {
          ...a,
          id: uid("a"),
          createdAt: Date.now(),
        };
        set((s) => ({ analyses: [full, ...s.analyses].slice(0, 60) }));
        return full;
      },

      tripBreaker: (id, message) => {
        set((s) => ({
          breakers: s.breakers.map((b) =>
            b.id === id
              ? {
                  ...b,
                  failures: b.failures + 1,
                  state: b.failures + 1 >= 3 ? "open" : b.state,
                  lastError: message,
                }
              : b,
          ),
          errors: [
            {
              id: uid("e"),
              component: id,
              message,
              at: Date.now(),
              resolved: false,
            },
            ...s.errors,
          ].slice(0, 40),
        }));
      },

      resetBreaker: (id) => {
        set((s) => ({
          breakers: s.breakers.map((b) =>
            b.id === id ? { ...b, state: "closed", failures: 0, lastError: undefined } : b,
          ),
        }));
      },

      healScan: () => {
        set((s) => ({
          breakers: s.breakers.map((b) => ({
            ...b,
            state: "closed",
            failures: 0,
          })),
          errors: s.errors.map((e) => ({ ...e, resolved: true })),
        }));
      },

      resetBook: () => {
        const { book, feed } = get();
        set({
          ...initialSlice(),
          book,
          feed,
          hydrated: true,
        });
      },
    }),
    {
      name: "abdullah-bank-desk-v2",
      partialize: (s) => ({
        cash: s.cash,
        positions: s.positions,
        orders: s.orders,
        analyses: s.analyses,
        equity: s.equity,
        selected: s.selected,
      }),
      skipHydration: true,
    },
  ),
);

export function deskMetrics(state: Pick<DeskState, "book" | "positions" | "cash" | "orders" | "equity">) {
  const { book, positions, cash, orders, equity } = state;
  let market = 0;
  let cost = 0;
  for (const p of positions) {
    const px = book[p.symbol]?.last || p.avgPrice;
    market += p.qty * px;
    cost += p.qty * p.avgPrice;
  }
  const equityNow = cash + market;
  const uPnL = market - cost;
  const dayStart = equity.length > 1 ? equity[0]!.equity : STARTING_CASH;
  const dayPnL = equityNow - dayStart;
  const filled = orders.filter((o) => o.status === "filled");
  const sells = filled.filter((o) => o.side === "sell");
  const wins = sells.filter((o) => {
    const buy = filled.find((b) => b.side === "buy" && b.symbol === o.symbol);
    return buy ? o.price > buy.price : false;
  }).length;
  const winRate = sells.length ? (wins / sells.length) * 100 : 0;
  return {
    equity: equityNow,
    cash,
    market,
    uPnL,
    uPnLPct: cost ? (uPnL / cost) * 100 : 0,
    dayPnL,
    dayPct: dayStart ? (dayPnL / dayStart) * 100 : 0,
    winRate,
    openCount: positions.length,
  };
}

export function positionPnl(p: Position, last: number) {
  const mkt = p.qty * last;
  const cost = p.qty * p.avgPrice;
  const pnl = mkt - cost;
  return { mkt, cost, pnl, pnlPct: cost ? (pnl / cost) * 100 : 0 };
}

export type AgentTypeExport = AgentType;
export { STARTING_CASH, FEE_BPS };

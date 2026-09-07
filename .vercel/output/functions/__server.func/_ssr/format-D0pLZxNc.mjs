import { r as emptyBook } from "./assets-CiXb2yRx.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-D0pLZxNc.js
var FEE_BPS = .00155;
var STARTING_CASH = 1e6;
function uid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
function seedBreakers() {
	return [
		{
			id: "market",
			name: "Market tape",
			state: "closed",
			failures: 0
		},
		{
			id: "agents",
			name: "Agent bus",
			state: "closed",
			failures: 0
		},
		{
			id: "broker",
			name: "Paper broker",
			state: "closed",
			failures: 0
		},
		{
			id: "news",
			name: "News ingest",
			state: "closed",
			failures: 0
		}
	];
}
function markBook(book, positions, cash) {
	let mv = 0;
	for (const p of positions) {
		const px = book[p.symbol]?.last || p.avgPrice;
		mv += p.qty * px;
	}
	return cash + mv;
}
var idleFeed = () => ({
	status: "idle",
	lastSync: null,
	source: "Yahoo Finance · Tadawul",
	session: "unknown",
	tasiLast: 0,
	tasiChangePct: 0,
	brentLast: 0,
	brentChangePct: 0,
	rates10y: null,
	failed: []
});
function initialSlice() {
	return {
		book: emptyBook(),
		cash: STARTING_CASH,
		positions: [],
		orders: [],
		analyses: [],
		equity: [],
		headlines: [],
		breakers: seedBreakers(),
		errors: [],
		selected: "2222",
		hydrated: false,
		feed: idleFeed()
	};
}
function pushEquity(equity, value) {
	const last = equity.at(-1);
	if (!last) return [{
		t: Date.now(),
		equity: value
	}];
	if (Date.now() - last.t < 8e3) return equity.slice(0, -1).concat({
		t: Date.now(),
		equity: value
	});
	return [...equity.slice(-180), {
		t: Date.now(),
		equity: value
	}];
}
var useDeskStore = create()(persist((set, get) => ({
	...initialSlice(),
	select: (symbol) => set({ selected: symbol }),
	applyTape: (tape) => {
		const { positions, cash, equity, book } = get();
		const nextBook = { ...book };
		for (const [sym, asset] of Object.entries(tape.assets)) nextBook[sym] = asset;
		const still = [];
		const extraOrders = [];
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
					createdAt: Date.now()
				});
			} else still.push(p);
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
				failed: tape.failed
			}
		}));
	},
	applyHeadlines: (headlines) => set({ headlines }),
	setFeedStatus: (patch) => set((s) => ({ feed: {
		...s.feed,
		...patch
	} })),
	place: ({ symbol, side, qty, note, sl, tp }) => {
		const { book, cash, positions } = get();
		const asset = book[symbol];
		const qtyInt = Math.floor(qty);
		if (!asset?.quoted || qtyInt <= 0) {
			const rejected = {
				id: uid("o"),
				symbol,
				side,
				qty: qtyInt,
				price: asset?.last ?? 0,
				fee: 0,
				status: "rejected",
				note: asset?.quoted ? "Invalid quantity" : "Waiting for a live quote",
				createdAt: Date.now()
			};
			set((s) => ({ orders: [rejected, ...s.orders] }));
			return rejected;
		}
		const px = asset.last;
		const notional = qtyInt * px;
		const fee = notional * FEE_BPS;
		if (side === "buy") {
			if (cash < notional + fee) {
				const rejected = {
					id: uid("o"),
					symbol,
					side,
					qty: qtyInt,
					price: px,
					fee,
					status: "rejected",
					note: "Insufficient cash",
					createdAt: Date.now()
				};
				set((s) => ({ orders: [rejected, ...s.orders] }));
				return rejected;
			}
			const existing = positions.find((p) => p.symbol === symbol);
			let nextPositions;
			if (existing) {
				const newQty = existing.qty + qtyInt;
				const avg = (existing.avgPrice * existing.qty + px * qtyInt) / newQty;
				nextPositions = positions.map((p) => p.id === existing.id ? {
					...p,
					qty: newQty,
					avgPrice: avg,
					stopLoss: sl ?? p.stopLoss,
					takeProfit: tp ?? p.takeProfit
				} : p);
			} else nextPositions = [...positions, {
				id: uid("p"),
				symbol,
				qty: qtyInt,
				avgPrice: px,
				stopLoss: sl,
				takeProfit: tp,
				openedAt: Date.now()
			}];
			const order = {
				id: uid("o"),
				symbol,
				side,
				qty: qtyInt,
				price: px,
				fee,
				status: "filled",
				note: note ?? "Market buy · live last",
				createdAt: Date.now()
			};
			const nextCash = cash - notional - fee;
			set((s) => ({
				cash: nextCash,
				positions: nextPositions,
				orders: [order, ...s.orders].slice(0, 80),
				equity: pushEquity(s.equity, markBook(book, nextPositions, nextCash))
			}));
			return order;
		}
		const existing = positions.find((p) => p.symbol === symbol);
		if (!existing || existing.qty < qtyInt) {
			const rejected = {
				id: uid("o"),
				symbol,
				side,
				qty: qtyInt,
				price: px,
				fee,
				status: "rejected",
				note: "No long inventory",
				createdAt: Date.now()
			};
			set((s) => ({ orders: [rejected, ...s.orders] }));
			return rejected;
		}
		const remain = existing.qty - qtyInt;
		const nextPositions = remain === 0 ? positions.filter((p) => p.id !== existing.id) : positions.map((p) => p.id === existing.id ? {
			...p,
			qty: remain
		} : p);
		const order = {
			id: uid("o"),
			symbol,
			side,
			qty: qtyInt,
			price: px,
			fee,
			status: "filled",
			note: note ?? "Market sell · live last",
			createdAt: Date.now()
		};
		const nextCash = cash + notional - fee;
		set((s) => ({
			cash: nextCash,
			positions: nextPositions,
			orders: [order, ...s.orders].slice(0, 80),
			equity: pushEquity(s.equity, markBook(book, nextPositions, nextCash))
		}));
		return order;
	},
	cancelLikeClose: (positionId) => {
		const p = get().positions.find((x) => x.id === positionId);
		if (!p) return null;
		return get().place({
			symbol: p.symbol,
			side: "sell",
			qty: p.qty,
			note: "Close position · live last"
		});
	},
	addAnalysis: (a) => {
		const full = {
			...a,
			id: uid("a"),
			createdAt: Date.now()
		};
		set((s) => ({ analyses: [full, ...s.analyses].slice(0, 60) }));
		return full;
	},
	tripBreaker: (id, message) => {
		set((s) => ({
			breakers: s.breakers.map((b) => b.id === id ? {
				...b,
				failures: b.failures + 1,
				state: b.failures + 1 >= 3 ? "open" : b.state,
				lastError: message
			} : b),
			errors: [{
				id: uid("e"),
				component: id,
				message,
				at: Date.now(),
				resolved: false
			}, ...s.errors].slice(0, 40)
		}));
	},
	resetBreaker: (id) => {
		set((s) => ({ breakers: s.breakers.map((b) => b.id === id ? {
			...b,
			state: "closed",
			failures: 0,
			lastError: void 0
		} : b) }));
	},
	healScan: () => {
		set((s) => ({
			breakers: s.breakers.map((b) => ({
				...b,
				state: "closed",
				failures: 0
			})),
			errors: s.errors.map((e) => ({
				...e,
				resolved: true
			}))
		}));
	},
	resetBook: () => {
		const { book, feed } = get();
		set({
			...initialSlice(),
			book,
			feed,
			hydrated: true
		});
	}
}), {
	name: "abdullah-bank-desk-v2",
	partialize: (s) => ({
		cash: s.cash,
		positions: s.positions,
		orders: s.orders,
		analyses: s.analyses,
		equity: s.equity,
		selected: s.selected
	}),
	skipHydration: true
}));
function deskMetrics(state) {
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
	const dayStart = equity.length > 1 ? equity[0].equity : STARTING_CASH;
	const dayPnL = equityNow - dayStart;
	const filled = orders.filter((o) => o.status === "filled");
	const sells = filled.filter((o) => o.side === "sell");
	const wins = sells.filter((o) => {
		const buy = filled.find((b) => b.side === "buy" && b.symbol === o.symbol);
		return buy ? o.price > buy.price : false;
	}).length;
	const winRate = sells.length ? wins / sells.length * 100 : 0;
	return {
		equity: equityNow,
		cash,
		market,
		uPnL,
		uPnLPct: cost ? uPnL / cost * 100 : 0,
		dayPnL,
		dayPct: dayStart ? dayPnL / dayStart * 100 : 0,
		winRate,
		openCount: positions.length
	};
}
function positionPnl(p, last) {
	const mkt = p.qty * last;
	const cost = p.qty * p.avgPrice;
	const pnl = mkt - cost;
	return {
		mkt,
		cost,
		pnl,
		pnlPct: cost ? pnl / cost * 100 : 0
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
function formatSar(value, compact = false) {
	const sign = value < 0 ? "-" : "";
	const abs = Math.abs(value);
	if (compact) {
		if (abs >= 1e6) return `${sign}SAR ${(abs / 1e6).toFixed(1)}M`;
		if (abs >= 1e3) return `${sign}SAR ${(abs / 1e3).toFixed(1)}K`;
	}
	return `${sign}SAR ${abs.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
function formatNum(value, digits = 2) {
	return value.toLocaleString("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function formatPct(value, digits = 2) {
	return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}
function formatTime(ts) {
	return new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: "Asia/Riyadh"
	}).format(new Date(ts));
}
function formatDate(ts) {
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		timeZone: "Asia/Riyadh"
	}).format(new Date(ts));
}
function signedClass(value) {
	if (value > 1e-4) return "text-up";
	if (value < -1e-4) return "text-down";
	return "text-muted";
}
function formatUsd(value) {
	return `$${value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
//#endregion
export { formatDate as a, formatSar as c, positionPnl as d, signedClass as f, deskMetrics as i, formatTime as l, STARTING_CASH as n, formatNum as o, useDeskStore as p, cn as r, formatPct as s, FEE_BPS as t, formatUsd as u };

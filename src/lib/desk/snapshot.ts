import { AGENTS } from "./agents";
import { momentum, realizedVol, rsi, sma, structureBias } from "./indicators";
import type { Asset, FeedState, Position } from "./types";

export type AgentSnapshot = {
  symbol: string;
  ticker: string;
  nameEn: string;
  nameAr: string;
  sector: string;
  last: number;
  prevClose: number;
  changePct: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  rsi: number;
  sma10: number;
  sma20: number;
  mom5: number;
  mom20: number;
  realizedVol: number;
  structure: ReturnType<typeof structureBias>;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  tasiLast: number;
  tasiChangePct: number;
  brentLast: number;
  brentChangePct: number;
  rates10y: number | null;
  session: FeedState["session"];
  peers: { symbol: string; nameEn: string; changePct: number; sector: string }[];
  position?: { qty: number; avg: number; pnlPct: number };
  headlines: string[];
};

export function buildSnapshot(
  asset: Asset,
  book: Record<string, Asset>,
  position: Position | undefined,
  headlines: string[],
  feed?: FeedState,
): AgentSnapshot {
  const history = asset.history;
  const changePct = asset.prevClose ? ((asset.last - asset.prevClose) / asset.prevClose) * 100 : 0;
  const peers = Object.values(book)
    .filter((a) => a.symbol !== asset.symbol && a.quoted)
    .sort((a, b) => Number(b.sector === asset.sector) - Number(a.sector === asset.sector))
    .slice(0, 6)
    .map((a) => ({
      symbol: a.symbol,
      nameEn: a.nameEn,
      sector: a.sector,
      changePct: a.prevClose ? ((a.last - a.prevClose) / a.prevClose) * 100 : 0,
    }));
  return {
    symbol: asset.symbol,
    ticker: asset.ticker,
    nameEn: asset.nameEn,
    nameAr: asset.nameAr,
    sector: asset.sector,
    last: asset.last,
    prevClose: asset.prevClose,
    changePct,
    open: asset.open,
    high: asset.high,
    low: asset.low,
    volume: asset.volume,
    rsi: rsi(history),
    sma10: sma(history, 10),
    sma20: sma(history, 20),
    mom5: momentum(history, 5),
    mom20: momentum(history, 20),
    realizedVol: realizedVol(history),
    structure: structureBias(history),
    beta: asset.beta,
    fiftyTwoWeekHigh: asset.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: asset.fiftyTwoWeekLow,
    tasiLast: feed?.tasiLast ?? 0,
    tasiChangePct: feed?.tasiChangePct ?? 0,
    brentLast: feed?.brentLast ?? 0,
    brentChangePct: feed?.brentChangePct ?? 0,
    rates10y: feed?.rates10y ?? null,
    session: feed?.session ?? "unknown",
    peers,
    position: position
      ? {
          qty: position.qty,
          avg: position.avgPrice,
          pnlPct: ((asset.last - position.avgPrice) / position.avgPrice) * 100,
        }
      : undefined,
    headlines,
  };
}

export { AGENTS };

export type Side = "buy" | "sell";
export type Reco = "BUY" | "SELL" | "HOLD";
export type Horizon = "intraday" | "swing" | "position";
export type AgentSource = "grok" | "quant";

export type AgentType =
  | "technical"
  | "fundamental"
  | "news"
  | "sentiment"
  | "macro"
  | "correlation"
  | "market_structure"
  | "regime"
  | "risk"
  | "strategy"
  | "volatility"
  | "self_healing";

export type Listing = {
  symbol: string;
  ticker: string;
  nameAr: string;
  nameEn: string;
  sector: string;
};

export type Asset = Listing & {
  currency: "SAR";
  last: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  history: number[];
  volatility: number;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  quoted: boolean;
  sessionAt: number;
};

export type Position = {
  id: string;
  symbol: string;
  qty: number;
  avgPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  openedAt: number;
};

export type OrderStatus = "filled" | "cancelled" | "rejected";

export type Order = {
  id: string;
  symbol: string;
  side: Side;
  qty: number;
  price: number;
  fee: number;
  status: OrderStatus;
  note: string;
  createdAt: number;
};

export type AgentAnalysis = {
  id: string;
  agentType: AgentType;
  symbol: string;
  recommendation: Reco;
  confidence: number;
  thesis: string;
  risks: string;
  horizon: Horizon;
  source: AgentSource;
  createdAt: number;
};

export type EquityPoint = {
  t: number;
  equity: number;
};

export type BreakerState = "closed" | "open" | "half_open";

export type CircuitBreaker = {
  id: string;
  name: string;
  state: BreakerState;
  failures: number;
  lastError?: string;
};

export type SystemError = {
  id: string;
  component: string;
  message: string;
  at: number;
  resolved: boolean;
};

export type Headline = {
  id: string;
  title: string;
  source: string;
  url: string;
  symbol?: string;
  tone: "bull" | "bear" | "neutral";
  at: number;
};

export type MacroTape = {
  tasiLast: number;
  tasiPrev: number;
  tasiChangePct: number;
  tasiHistory: number[];
  brentLast: number;
  brentChangePct: number;
  rates10y: number | null;
};

export type TapePayload = {
  assets: Record<string, Asset>;
  macro: MacroTape;
  session: "open" | "closed";
  asOf: number;
  source: string;
  failed: string[];
};

export type FeedState = {
  status: "idle" | "loading" | "live" | "error";
  lastSync: number | null;
  source: string;
  error?: string;
  session: "open" | "closed" | "unknown";
  tasiLast: number;
  tasiChangePct: number;
  brentLast: number;
  brentChangePct: number;
  rates10y: number | null;
  failed: string[];
};

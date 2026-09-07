import type { AgentType, Reco } from "./types";

export type AgentMeta = {
  type: AgentType;
  name: string;
  nameAr: string;
  blurb: string;
  focus: string;
};

export const AGENTS: AgentMeta[] = [
  {
    type: "technical",
    name: "Technical",
    nameAr: "فني",
    blurb: "RSI, moving averages, and momentum on the tape.",
    focus: "Price action",
  },
  {
    type: "fundamental",
    name: "Fundamental",
    nameAr: "أساسي",
    blurb: "Sector quality, balance-sheet bias, and valuation posture.",
    focus: "Quality",
  },
  {
    type: "news",
    name: "News",
    nameAr: "أخبار",
    blurb: "Headlines mapped to the name and its sector.",
    focus: "Flow",
  },
  {
    type: "sentiment",
    name: "Sentiment",
    nameAr: "مشاعر",
    blurb: "Short-horizon crowd bias from returns and tape.",
    focus: "Tone",
  },
  {
    type: "macro",
    name: "Macro",
    nameAr: "كلي",
    blurb: "Rates, oil, and SAMA-sensitive regime for TASI.",
    focus: "Regime",
  },
  {
    type: "correlation",
    name: "Correlation",
    nameAr: "ارتباط",
    blurb: "How the name moves with the TASI book.",
    focus: "Beta",
  },
  {
    type: "market_structure",
    name: "Structure",
    nameAr: "هيكل",
    blurb: "Trend, range, and swing architecture.",
    focus: "Path",
  },
  {
    type: "regime",
    name: "Regime",
    nameAr: "نظام",
    blurb: "Volatility regime and risk-on / risk-off.",
    focus: "Climate",
  },
  {
    type: "risk",
    name: "Risk",
    nameAr: "مخاطر",
    blurb: "Position size, stops, and book concentration.",
    focus: "Limits",
  },
  {
    type: "strategy",
    name: "Strategy",
    nameAr: "استراتيجية",
    blurb: "Synthesizes the desk into a single paper action.",
    focus: "Decision",
  },
  {
    type: "volatility",
    name: "Volatility",
    nameAr: "تقلب",
    blurb: "Realized vol, range expansion, and sizing.",
    focus: "Range",
  },
  {
    type: "self_healing",
    name: "Self-heal",
    nameAr: "إصلاح",
    blurb: "Watches breakers, errors, and recovery actions.",
    focus: "Health",
  },
];

export const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.type, a])) as Record<
  AgentType,
  AgentMeta
>;

export const RECO_RANK: Record<Reco, number> = { BUY: 1, HOLD: 0, SELL: -1 };

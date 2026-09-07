import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as deskMetrics, p as useDeskStore } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as sma, i as rsi, n as momentum, o as structureBias, r as realizedVol } from "./indicators-CyRIAzXu.mjs";
import { c as LoaderCircle, o as Play } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button, r as createSsrRpc } from "./router-Dcy2Oume.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/run-agent-button-Dn9_JCww.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AGENTS = [
	{
		type: "technical",
		name: "Technical",
		nameAr: "فني",
		blurb: "RSI, moving averages, and momentum on the tape.",
		focus: "Price action"
	},
	{
		type: "fundamental",
		name: "Fundamental",
		nameAr: "أساسي",
		blurb: "Sector quality, balance-sheet bias, and valuation posture.",
		focus: "Quality"
	},
	{
		type: "news",
		name: "News",
		nameAr: "أخبار",
		blurb: "Headlines mapped to the name and its sector.",
		focus: "Flow"
	},
	{
		type: "sentiment",
		name: "Sentiment",
		nameAr: "مشاعر",
		blurb: "Short-horizon crowd bias from returns and tape.",
		focus: "Tone"
	},
	{
		type: "macro",
		name: "Macro",
		nameAr: "كلي",
		blurb: "Rates, oil, and SAMA-sensitive regime for TASI.",
		focus: "Regime"
	},
	{
		type: "correlation",
		name: "Correlation",
		nameAr: "ارتباط",
		blurb: "How the name moves with the TASI book.",
		focus: "Beta"
	},
	{
		type: "market_structure",
		name: "Structure",
		nameAr: "هيكل",
		blurb: "Trend, range, and swing architecture.",
		focus: "Path"
	},
	{
		type: "regime",
		name: "Regime",
		nameAr: "نظام",
		blurb: "Volatility regime and risk-on / risk-off.",
		focus: "Climate"
	},
	{
		type: "risk",
		name: "Risk",
		nameAr: "مخاطر",
		blurb: "Position size, stops, and book concentration.",
		focus: "Limits"
	},
	{
		type: "strategy",
		name: "Strategy",
		nameAr: "استراتيجية",
		blurb: "Synthesizes the desk into a single paper action.",
		focus: "Decision"
	},
	{
		type: "volatility",
		name: "Volatility",
		nameAr: "تقلب",
		blurb: "Realized vol, range expansion, and sizing.",
		focus: "Range"
	},
	{
		type: "self_healing",
		name: "Self-heal",
		nameAr: "إصلاح",
		blurb: "Watches breakers, errors, and recovery actions.",
		focus: "Health"
	}
];
var AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.type, a]));
var runDeskAgent = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("239dabb3fe58ad0735940ae5181847300627b110c4f7f6cf324bf4f462457a02"));
function buildSnapshot(asset, book, position, headlines, feed) {
	const history = asset.history;
	const changePct = asset.prevClose ? (asset.last - asset.prevClose) / asset.prevClose * 100 : 0;
	const peers = Object.values(book).filter((a) => a.symbol !== asset.symbol && a.quoted).sort((a, b) => Number(b.sector === asset.sector) - Number(a.sector === asset.sector)).slice(0, 6).map((a) => ({
		symbol: a.symbol,
		nameEn: a.nameEn,
		sector: a.sector,
		changePct: a.prevClose ? (a.last - a.prevClose) / a.prevClose * 100 : 0
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
		position: position ? {
			qty: position.qty,
			avg: position.avgPrice,
			pnlPct: (asset.last - position.avgPrice) / position.avgPrice * 100
		} : void 0,
		headlines
	};
}
function RunAgentButton({ agentType, symbol, size = "sm" }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const meta = AGENT_MAP[agentType];
	async function run() {
		const state = useDeskStore.getState();
		const asset = state.book[symbol];
		if (!asset && agentType !== "self_healing") {
			toast.error("Unknown symbol");
			return;
		}
		const target = asset ?? state.book[state.selected];
		if (!target) {
			toast.error("No working name");
			return;
		}
		if (!target.quoted && agentType !== "self_healing") {
			toast.error("Waiting for a live quote");
			return;
		}
		const headlines = state.headlines.filter((h) => !h.symbol || h.symbol === target.symbol).map((h) => h.title);
		const snap = buildSnapshot(target, state.book, state.positions.find((p) => p.symbol === target.symbol), headlines, state.feed);
		const m = deskMetrics(state);
		setBusy(true);
		try {
			const result = await runDeskAgent({ data: {
				agentType,
				snapshot: snap,
				bookHealth: {
					breakersOpen: state.breakers.filter((b) => b.state === "open").length,
					unresolvedErrors: state.errors.filter((e) => !e.resolved).length,
					equity: m.equity,
					cash: m.cash
				}
			} });
			useDeskStore.getState().addAnalysis({
				agentType,
				symbol: agentType === "self_healing" ? "SYSTEM" : target.symbol,
				recommendation: result.recommendation,
				confidence: result.confidence,
				thesis: result.thesis,
				risks: result.risks,
				horizon: result.horizon,
				source: result.source
			});
			toast.success(`${meta.name} · ${result.recommendation} (${result.confidence}%)`);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Agent failed";
			useDeskStore.getState().tripBreaker("agents", message);
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "secondary",
		size,
		onClick: run,
		disabled: busy,
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), "Run"]
	});
}
//#endregion
export { RunAgentButton as n, AGENTS as t };

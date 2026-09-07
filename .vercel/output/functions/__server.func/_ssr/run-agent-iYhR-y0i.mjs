import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/run-agent-iYhR-y0i.js
function clampConf(n) {
	if (!Number.isFinite(n)) return 50;
	return Math.max(5, Math.min(96, Math.round(n)));
}
function weekPosition(s) {
	const span = s.fiftyTwoWeekHigh - s.fiftyTwoWeekLow;
	if (span <= 0) return .5;
	return (s.last - s.fiftyTwoWeekLow) / span;
}
function localQuant(input) {
	const s = input.snapshot;
	const { agentType } = input;
	let reco = "HOLD";
	let confidence = 52;
	let thesis = "";
	let risks = "Paper fills at the live last. Not a live broker — no venue routing.";
	let horizon = "swing";
	const pos52 = weekPosition(s);
	switch (agentType) {
		case "technical":
			if (s.rsi < 32 && s.last > s.sma20) {
				reco = "BUY";
				confidence = 68;
				thesis = `RSI ${s.rsi.toFixed(0)} is washed out while price holds the 20-session mean ${s.sma20.toFixed(2)}. Mean-reversion long is the clean technical read on the live tape.`;
			} else if (s.rsi > 72 && s.last < s.sma10) {
				reco = "SELL";
				confidence = 66;
				thesis = `RSI ${s.rsi.toFixed(0)} is stretched and price slipped the 10-session mean ${s.sma10.toFixed(2)}. Fade strength, do not chase.`;
			} else thesis = `RSI ${s.rsi.toFixed(0)}, SMA10 ${s.sma10.toFixed(2)} vs last ${s.last.toFixed(2)}. No edge beyond noise — stand aside.`;
			break;
		case "fundamental": {
			const quality = [
				"Banks",
				"Energy",
				"Utilities",
				"Telecom",
				"Staples"
			].includes(s.sector);
			if (quality && pos52 < .35 && s.mom20 >= -6) {
				reco = "BUY";
				confidence = 63;
			} else if (pos52 > .92 && s.rsi > 70) {
				reco = "SELL";
				confidence = 58;
			} else {
				reco = "HOLD";
				confidence = quality ? 61 : 48;
			}
			thesis = quality ? `${s.nameEn} is a core TASI quality sleeve (${s.sector}). Last ${s.last.toFixed(2)} sits ${(pos52 * 100).toFixed(0)}% through the 52-week range (${s.fiftyTwoWeekLow.toFixed(2)}–${s.fiftyTwoWeekHigh.toFixed(2)}).` : `${s.sector} needs a tighter catalyst. 52-week range position ${(pos52 * 100).toFixed(0)}% does not justify adding size.`;
			horizon = "position";
			break;
		}
		case "news": {
			const joined = s.headlines.join(" ").toLowerCase();
			const bull = /نمو|يدعم|firm|upgrade|award|dividend|ease|gain|rally|ارتفاع/.test(joined);
			const bear = /ضغط|slip|profit-taking|mixed|يضغط|تراجع|هبوط|cut/.test(joined);
			reco = bull && !bear ? "BUY" : bear && !bull ? "SELL" : "HOLD";
			confidence = bull || bear ? 58 : 45;
			thesis = s.headlines[0] ? `Lead wire: “${s.headlines[0]}”. Desk maps this as ${reco.toLowerCase()} flow, not a thesis change.` : "No fresh name-specific wire. News agent stays flat.";
			horizon = "intraday";
			break;
		}
		case "sentiment":
			reco = s.mom5 > 1.2 ? "BUY" : s.mom5 < -1.2 ? "SELL" : "HOLD";
			confidence = Math.min(74, 48 + Math.abs(s.mom5) * 8);
			thesis = `Five-session momentum ${s.mom5.toFixed(2)}%. TASI ${s.tasiChangePct.toFixed(2)}%. Crowd is ${reco === "HOLD" ? "undecided" : reco === "BUY" ? "leaning bid" : "leaning offered"}.`;
			horizon = "intraday";
			break;
		case "macro": {
			const oilBid = s.brentChangePct > .6 && s.sector === "Energy";
			const bankCarry = (s.rates10y ?? 4) < 5.5 && s.sector === "Banks";
			reco = oilBid || bankCarry ? "HOLD" : "HOLD";
			if (s.tasiChangePct < -1.2 && s.beta > 1.1) reco = "SELL";
			confidence = 57;
			thesis = `TASI ${s.tasiLast.toFixed(0)} (${s.tasiChangePct >= 0 ? "+" : ""}${s.tasiChangePct.toFixed(2)}%), Brent ${s.brentLast.toFixed(2)} (${s.brentChangePct >= 0 ? "+" : ""}${s.brentChangePct.toFixed(2)}%)${s.rates10y != null ? `, UST 10Y ${s.rates10y.toFixed(2)}%` : ""}. Session ${s.session}. Macro overlay stays constructive unless oil gaps.`;
			horizon = "position";
			risks = "A sudden oil gap or a surprise hike would invalidate the carry bid in banks.";
			break;
		}
		case "correlation": {
			const peerAvg = s.peers.reduce((a, p) => a + p.changePct, 0) / Math.max(1, s.peers.length);
			const gap = s.changePct - peerAvg;
			reco = gap < -.8 && s.beta < 1.2 ? "BUY" : gap > 1.2 ? "SELL" : "HOLD";
			confidence = 55;
			thesis = `${s.symbol} vs TASI ${s.tasiChangePct.toFixed(2)}% / name ${s.changePct.toFixed(2)}% / sleeve ${peerAvg.toFixed(2)}% (β ${s.beta.toFixed(2)} vs TASI). ${reco === "BUY" ? "Lagging a firm book — relative-value bid." : reco === "SELL" ? "Rich to the sleeve." : "In line with the tape."}`;
			break;
		}
		case "market_structure":
			reco = s.structure === "uptrend" ? "BUY" : s.structure === "downtrend" ? "SELL" : "HOLD";
			confidence = s.structure === "range" || s.structure === "balanced" ? 44 : 64;
			thesis = `Swing architecture is ${s.structure}. High ${s.high.toFixed(2)} / low ${s.low.toFixed(2)} on the live session. Trade with structure, not against it.`;
			break;
		case "regime":
			reco = s.realizedVol > 28 ? "SELL" : s.realizedVol < 14 ? "BUY" : "HOLD";
			confidence = 60;
			thesis = `Annualized realized vol ~${s.realizedVol.toFixed(1)}% on the Yahoo daily tape. ${s.realizedVol > 28 ? "Stress regime — cut gross." : s.realizedVol < 14 ? "Compression — trend-following longs work." : "Mid-vol, mixed."}`;
			horizon = "swing";
			break;
		case "risk":
			if (s.position && s.position.pnlPct < -8) {
				reco = "SELL";
				confidence = 72;
				thesis = `Open mark ${s.position.pnlPct.toFixed(1)}% against the book at live last ${s.last.toFixed(2)}. Risk agent wants the position reduced before a deeper drawdown.`;
			} else if (s.position && s.position.pnlPct > 12) {
				reco = "HOLD";
				confidence = 63;
				thesis = `Winner is +${s.position.pnlPct.toFixed(1)}%. Trail the stop; do not add. Harvest is optional, not required.`;
			} else {
				reco = "HOLD";
				confidence = 50;
				thesis = s.position ? `Size ${s.position.qty.toLocaleString()} @ ${s.position.avg.toFixed(2)} is within desk limits (live mark ${s.last.toFixed(2)}).` : "No inventory. Risk is optional — only enter with a defined stop on the live last.";
			}
			risks = "Single-name cap is 25% of equity. Stops fill at the next live last.";
			break;
		case "volatility": {
			const rangePct = s.last ? (s.high - s.low) / s.last * 100 : 0;
			reco = rangePct > 4 && s.rsi > 65 ? "SELL" : "HOLD";
			confidence = 54;
			thesis = `Session range ${rangePct.toFixed(2)}% with realized ${s.realizedVol.toFixed(1)}%. Volume ${Math.round(s.volume).toLocaleString()}. Size down if range expands further.`;
			break;
		}
		case "strategy": {
			const votes = [];
			if (s.rsi < 35) votes.push("BUY");
			else if (s.rsi > 70) votes.push("SELL");
			else votes.push("HOLD");
			votes.push(s.structure === "uptrend" ? "BUY" : s.structure === "downtrend" ? "SELL" : "HOLD");
			votes.push(s.mom5 > 1 ? "BUY" : s.mom5 < -1 ? "SELL" : "HOLD");
			const score = votes.reduce((a, v) => a + (v === "BUY" ? 1 : v === "SELL" ? -1 : 0), 0);
			reco = score >= 2 ? "BUY" : score <= -2 ? "SELL" : "HOLD";
			confidence = 50 + Math.abs(score) * 10;
			thesis = `Desk synthesis on ${s.ticker}: last ${s.last.toFixed(2)} (TASI ${s.tasiChangePct.toFixed(2)}%), RSI ${s.rsi.toFixed(0)}, structure ${s.structure}, 5-session ${s.mom5.toFixed(2)}%. Net vote ${reco}. Paper fill at live last.`;
			horizon = "swing";
			break;
		}
		case "self_healing": {
			const open = input.bookHealth?.breakersOpen ?? 0;
			const errs = input.bookHealth?.unresolvedErrors ?? 0;
			reco = open > 0 || errs > 3 ? "SELL" : "HOLD";
			confidence = 70;
			thesis = open > 0 ? `${open} circuit breaker(s) open, ${errs} unresolved. Reset, then wait for a clean tape poll before rerunning agents.` : `Breakers closed. ${errs} unresolved log lines. Live feed is healthy — no recovery action required.`;
			risks = "Self-heal never touches a broker; it only resets local guards.";
			horizon = "intraday";
			break;
		}
	}
	return {
		ok: true,
		recommendation: reco,
		confidence: clampConf(confidence),
		thesis,
		risks,
		horizon,
		source: "quant"
	};
}
function parseModel(text) {
	const trimmed = text.trim();
	const fenced = trimmed.match(/\{[\s\S]*\}/);
	const raw = fenced ? fenced[0] : trimmed;
	try {
		const j = JSON.parse(raw);
		const reco = String(j.recommendation ?? j.reco ?? "").toUpperCase();
		if (reco !== "BUY" && reco !== "SELL" && reco !== "HOLD") return null;
		const horizonRaw = String(j.horizon ?? "swing");
		const horizon = horizonRaw === "intraday" || horizonRaw === "position" ? horizonRaw : "swing";
		return {
			recommendation: reco,
			confidence: clampConf(Number(j.confidence)),
			thesis: String(j.thesis ?? j.rationale ?? "").slice(0, 700),
			risks: String(j.risks ?? "").slice(0, 400),
			horizon
		};
	} catch {
		return null;
	}
}
var runDeskAgent_createServerFn_handler = createServerRpc({
	id: "239dabb3fe58ad0735940ae5181847300627b110c4f7f6cf324bf4f462457a02",
	name: "runDeskAgent",
	filename: "src/lib/desk/run-agent.ts"
}, (opts) => runDeskAgent.__executeServer(opts));
var runDeskAgent = createServerFn({ method: "POST" }).validator((data) => data).handler(runDeskAgent_createServerFn_handler, async ({ data }) => {
	const fallback = localQuant(data);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return fallback;
	const s = data.snapshot;
	const system = `You are a senior desk analyst on Abdullah BANK's TASI book.
Prices are LIVE Tadawul last prints (via Yahoo Finance). Fills are paper — do not claim a live broker.
Return ONLY compact JSON: {"recommendation":"BUY"|"SELL"|"HOLD","confidence":0-100,"thesis":"...","risks":"...","horizon":"intraday"|"swing"|"position"}
Rules: not financial advice; use the supplied numbers; be concise, institutional, no emoji.`;
	const user = `Agent: ${data.agentType}
Name: ${s.nameEn} (${s.nameAr}) ${s.ticker}  Sector: ${s.sector}
Session: ${s.session}
Last ${s.last}  Prev ${s.prevClose}  Chg ${s.changePct.toFixed(2)}%
Open ${s.open} High ${s.high} Low ${s.low}  Volume ${s.volume}
52w ${s.fiftyTwoWeekLow}–${s.fiftyTwoWeekHigh}
RSI ${s.rsi.toFixed(1)}  SMA10 ${s.sma10.toFixed(2)}  SMA20 ${s.sma20.toFixed(2)}
Mom5 ${s.mom5.toFixed(2)}%  Mom20 ${s.mom20.toFixed(2)}%  RVol ${s.realizedVol.toFixed(1)}%
Structure ${s.structure}  Beta vs TASI ${s.beta.toFixed(2)}
TASI ${s.tasiLast} (${s.tasiChangePct.toFixed(2)}%)  Brent ${s.brentLast} (${s.brentChangePct.toFixed(2)}%)${s.rates10y != null ? `  UST10Y ${s.rates10y.toFixed(2)}%` : ""}
Position: ${s.position ? `${s.position.qty} @ ${s.position.avg} (${s.position.pnlPct.toFixed(2)}%)` : "flat"}
Peers: ${s.peers.map((p) => `${p.symbol} ${p.changePct.toFixed(2)}%`).join(", ")}
Headlines: ${s.headlines.slice(0, 4).join(" | ") || "none"}
Book: ${JSON.stringify(data.bookHealth ?? {})}`;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .3,
				max_tokens: 420,
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: user
				}]
			})
		});
		if (!res.ok) return fallback;
		const parsed = parseModel((await res.json()).choices?.[0]?.message?.content ?? "");
		if (!parsed?.recommendation || !parsed.thesis) return fallback;
		return {
			ok: true,
			recommendation: parsed.recommendation,
			confidence: parsed.confidence ?? 55,
			thesis: parsed.thesis,
			risks: parsed.risks || fallback.risks,
			horizon: parsed.horizon ?? "swing",
			source: "grok"
		};
	} catch {
		return fallback;
	}
});
//#endregion
export { runDeskAgent_createServerFn_handler };

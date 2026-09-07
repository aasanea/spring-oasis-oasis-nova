from __future__ import annotations

import json
import re
from typing import Any, Literal

import httpx

from .config import get_settings
from .indicators import momentum, realized_vol, rsi, sma, structure_bias
from .universe import AGENT_TYPES

Reco = Literal["BUY", "SELL", "HOLD"]
Horizon = Literal["intraday", "swing", "position"]


def build_snapshot(
    asset: dict[str, Any],
    book: dict[str, Any],
    position: dict[str, Any] | None,
    headlines: list[str],
    feed: dict[str, Any],
) -> dict[str, Any]:
    history = list(asset.get("history") or [])
    prev = asset.get("prev_close") or 0
    last = asset.get("last") or 0
    change_pct = ((last - prev) / prev * 100) if prev else 0.0
    peers = []
    for other in book.values():
        if other["symbol"] == asset["symbol"] or not other.get("quoted"):
            continue
        o_prev = other.get("prev_close") or 0
        o_last = other.get("last") or 0
        peers.append(
            {
                "symbol": other["symbol"],
                "name_en": other.get("name_en"),
                "sector": other.get("sector"),
                "change_pct": ((o_last - o_prev) / o_prev * 100) if o_prev else 0.0,
                "same_sector": other.get("sector") == asset.get("sector"),
            }
        )
    peers.sort(key=lambda p: (not p["same_sector"], p["symbol"]))
    peers = peers[:6]
    pos = None
    if position:
        avg = position["avg_price"]
        pos = {
            "qty": position["qty"],
            "avg": avg,
            "pnl_pct": ((last - avg) / avg * 100) if avg else 0.0,
        }
    return {
        "symbol": asset["symbol"],
        "ticker": asset["ticker"],
        "name_en": asset["name_en"],
        "name_ar": asset["name_ar"],
        "sector": asset["sector"],
        "last": last,
        "prev_close": prev,
        "change_pct": change_pct,
        "open": asset.get("open") or 0,
        "high": asset.get("high") or 0,
        "low": asset.get("low") or 0,
        "volume": asset.get("volume") or 0,
        "rsi": rsi(history),
        "sma10": sma(history, 10),
        "sma20": sma(history, 20),
        "mom5": momentum(history, 5),
        "mom20": momentum(history, 20),
        "realized_vol": realized_vol(history),
        "structure": structure_bias(history),
        "beta": asset.get("beta") or 1,
        "fifty_two_week_high": asset.get("fifty_two_week_high") or 0,
        "fifty_two_week_low": asset.get("fifty_two_week_low") or 0,
        "tasi_last": feed.get("tasi_last") or 0,
        "tasi_change_pct": feed.get("tasi_change_pct") or 0,
        "brent_last": feed.get("brent_last") or 0,
        "brent_change_pct": feed.get("brent_change_pct") or 0,
        "rates_10y": feed.get("rates_10y"),
        "session": feed.get("session") or "unknown",
        "peers": peers,
        "position": pos,
        "headlines": headlines,
    }


def _clamp(n: float) -> int:
    if n != n:  # NaN
        return 50
    return max(5, min(96, round(n)))


def _week_pos(s: dict[str, Any]) -> float:
    span = s["fifty_two_week_high"] - s["fifty_two_week_low"]
    if span <= 0:
        return 0.5
    return (s["last"] - s["fifty_two_week_low"]) / span


def local_quant(agent_type: str, s: dict[str, Any], book_health: dict[str, Any] | None) -> dict[str, Any]:
    reco: Reco = "HOLD"
    confidence = 52.0
    thesis = ""
    risks = "Paper fills at the live last. Not a live broker — no venue routing."
    horizon: Horizon = "swing"
    pos52 = _week_pos(s)

    if agent_type == "technical":
        if s["rsi"] < 32 and s["last"] > s["sma20"]:
            reco, confidence = "BUY", 68
            thesis = (
                f"RSI {s['rsi']:.0f} is washed out while price holds the 20-session mean {s['sma20']:.2f}. "
                "Mean-reversion long is the clean technical read on the live tape."
            )
        elif s["rsi"] > 72 and s["last"] < s["sma10"]:
            reco, confidence = "SELL", 66
            thesis = (
                f"RSI {s['rsi']:.0f} is stretched and price slipped the 10-session mean {s['sma10']:.2f}. "
                "Fade strength, do not chase."
            )
        else:
            thesis = f"RSI {s['rsi']:.0f}, SMA10 {s['sma10']:.2f} vs last {s['last']:.2f}. No edge beyond noise — stand aside."
    elif agent_type == "fundamental":
        quality = s["sector"] in {"Banks", "Energy", "Utilities", "Telecom", "Staples"}
        if quality and pos52 < 0.35 and s["mom20"] >= -6:
            reco, confidence = "BUY", 63
        elif pos52 > 0.92 and s["rsi"] > 70:
            reco, confidence = "SELL", 58
        else:
            reco, confidence = "HOLD", 61 if quality else 48
        thesis = (
            f"{s['name_en']} is a core TASI quality sleeve ({s['sector']}). Last {s['last']:.2f} sits "
            f"{pos52 * 100:.0f}% through the 52-week range ({s['fifty_two_week_low']:.2f}–{s['fifty_two_week_high']:.2f})."
            if quality
            else f"{s['sector']} needs a tighter catalyst. 52-week range position {pos52 * 100:.0f}% does not justify adding size."
        )
        horizon = "position"
    elif agent_type == "news":
        joined = " ".join(s["headlines"]).lower()
        bull = bool(re.search(r"نمو|يدعم|firm|upgrade|award|dividend|ease|gain|rally|ارتفاع", joined))
        bear = bool(re.search(r"ضغط|slip|profit-taking|mixed|يضغط|تراجع|هبوط|cut", joined))
        reco = "BUY" if bull and not bear else "SELL" if bear and not bull else "HOLD"
        confidence = 58 if bull or bear else 45
        thesis = (
            f"Lead wire: “{s['headlines'][0]}”. Desk maps this as {reco.lower()} flow, not a thesis change."
            if s["headlines"]
            else "No fresh name-specific wire. News agent stays flat."
        )
        horizon = "intraday"
    elif agent_type == "sentiment":
        reco = "BUY" if s["mom5"] > 1.2 else "SELL" if s["mom5"] < -1.2 else "HOLD"
        confidence = min(74, 48 + abs(s["mom5"]) * 8)
        lean = "undecided" if reco == "HOLD" else "leaning bid" if reco == "BUY" else "leaning offered"
        thesis = f"Five-session momentum {s['mom5']:.2f}%. TASI {s['tasi_change_pct']:.2f}%. Crowd is {lean}."
        horizon = "intraday"
    elif agent_type == "macro":
        reco = "HOLD"
        if s["tasi_change_pct"] < -1.2 and s["beta"] > 1.1:
            reco = "SELL"
        confidence = 57
        rates = f", UST 10Y {s['rates_10y']:.2f}%" if s.get("rates_10y") is not None else ""
        sign_t = "+" if s["tasi_change_pct"] >= 0 else ""
        sign_b = "+" if s["brent_change_pct"] >= 0 else ""
        thesis = (
            f"TASI {s['tasi_last']:.0f} ({sign_t}{s['tasi_change_pct']:.2f}%), "
            f"Brent {s['brent_last']:.2f} ({sign_b}{s['brent_change_pct']:.2f}%){rates}. "
            f"Session {s['session']}. Macro overlay stays constructive unless oil gaps."
        )
        horizon = "position"
        risks = "A sudden oil gap or a surprise hike would invalidate the carry bid in banks."
    elif agent_type == "correlation":
        peer_avg = sum(p["change_pct"] for p in s["peers"]) / max(1, len(s["peers"]))
        gap = s["change_pct"] - peer_avg
        reco = "BUY" if gap < -0.8 and s["beta"] < 1.2 else "SELL" if gap > 1.2 else "HOLD"
        confidence = 55
        rel = "Lagging a firm book — relative-value bid." if reco == "BUY" else "Rich to the sleeve." if reco == "SELL" else "In line with the tape."
        thesis = (
            f"{s['symbol']} vs TASI {s['tasi_change_pct']:.2f}% / name {s['change_pct']:.2f}% / "
            f"sleeve {peer_avg:.2f}% (β {s['beta']:.2f} vs TASI). {rel}"
        )
    elif agent_type == "market_structure":
        reco = "BUY" if s["structure"] == "uptrend" else "SELL" if s["structure"] == "downtrend" else "HOLD"
        confidence = 44 if s["structure"] in {"range", "balanced"} else 64
        thesis = (
            f"Swing architecture is {s['structure']}. High {s['high']:.2f} / low {s['low']:.2f} on the live session. "
            "Trade with structure, not against it."
        )
    elif agent_type == "regime":
        reco = "SELL" if s["realized_vol"] > 28 else "BUY" if s["realized_vol"] < 14 else "HOLD"
        confidence = 60
        extra = (
            "Stress regime — cut gross."
            if s["realized_vol"] > 28
            else "Compression — trend-following longs work."
            if s["realized_vol"] < 14
            else "Mid-vol, mixed."
        )
        thesis = f"Annualized realized vol ~{s['realized_vol']:.1f}% on the Yahoo daily tape. {extra}"
        horizon = "swing"
    elif agent_type == "risk":
        pos = s.get("position")
        if pos and pos["pnl_pct"] < -8:
            reco, confidence = "SELL", 72
            thesis = (
                f"Open mark {pos['pnl_pct']:.1f}% against the book at live last {s['last']:.2f}. "
                "Risk agent wants the position reduced before a deeper drawdown."
            )
        elif pos and pos["pnl_pct"] > 12:
            reco, confidence = "HOLD", 63
            thesis = f"Winner is +{pos['pnl_pct']:.1f}%. Trail the stop; do not add. Harvest is optional, not required."
        else:
            reco, confidence = "HOLD", 50
            thesis = (
                f"Size {pos['qty']:,} @ {pos['avg']:.2f} is within desk limits (live mark {s['last']:.2f})."
                if pos
                else "No inventory. Risk is optional — only enter with a defined stop on the live last."
            )
        risks = "Single-name cap is 25% of equity. Stops fill at the next live last."
    elif agent_type == "volatility":
        range_pct = ((s["high"] - s["low"]) / s["last"] * 100) if s["last"] else 0
        reco = "SELL" if range_pct > 4 and s["rsi"] > 65 else "HOLD"
        confidence = 54
        thesis = (
            f"Session range {range_pct:.2f}% with realized {s['realized_vol']:.1f}%. "
            f"Volume {round(s['volume']):,}. Size down if range expands further."
        )
    elif agent_type == "strategy":
        votes: list[Reco] = []
        votes.append("BUY" if s["rsi"] < 35 else "SELL" if s["rsi"] > 70 else "HOLD")
        votes.append("BUY" if s["structure"] == "uptrend" else "SELL" if s["structure"] == "downtrend" else "HOLD")
        votes.append("BUY" if s["mom5"] > 1 else "SELL" if s["mom5"] < -1 else "HOLD")
        score = sum(1 if v == "BUY" else -1 if v == "SELL" else 0 for v in votes)
        reco = "BUY" if score >= 2 else "SELL" if score <= -2 else "HOLD"
        confidence = 50 + abs(score) * 10
        thesis = (
            f"Desk synthesis on {s['ticker']}: last {s['last']:.2f} (TASI {s['tasi_change_pct']:.2f}%), "
            f"RSI {s['rsi']:.0f}, structure {s['structure']}, 5-session {s['mom5']:.2f}%. Net vote {reco}. Paper fill at live last."
        )
        horizon = "swing"
    elif agent_type == "self_healing":
        open_n = (book_health or {}).get("breakers_open") or 0
        errs = (book_health or {}).get("unresolved_errors") or 0
        reco = "SELL" if open_n > 0 or errs > 3 else "HOLD"
        confidence = 70
        thesis = (
            f"{open_n} circuit breaker(s) open, {errs} unresolved. Reset, then wait for a clean tape poll before rerunning agents."
            if open_n > 0
            else f"Breakers closed. {errs} unresolved log lines. Live feed is healthy — no recovery action required."
        )
        risks = "Self-heal never touches a broker; it only resets local guards."
        horizon = "intraday"
    else:
        thesis = "Unknown agent — standing aside."

    return {
        "ok": True,
        "recommendation": reco,
        "confidence": _clamp(confidence),
        "thesis": thesis,
        "risks": risks,
        "horizon": horizon,
        "source": "quant",
    }


def _parse_model(text: str) -> dict[str, Any] | None:
    trimmed = text.strip()
    m = re.search(r"\{[\s\S]*\}", trimmed)
    raw = m.group(0) if m else trimmed
    try:
        j = json.loads(raw)
    except json.JSONDecodeError:
        return None
    reco = str(j.get("recommendation") or j.get("reco") or "").upper()
    if reco not in {"BUY", "SELL", "HOLD"}:
        return None
    horizon_raw = str(j.get("horizon") or "swing")
    horizon: Horizon = horizon_raw if horizon_raw in {"intraday", "position"} else "swing"
    return {
        "recommendation": reco,
        "confidence": _clamp(float(j.get("confidence") or 50)),
        "thesis": str(j.get("thesis") or j.get("rationale") or "")[:700],
        "risks": str(j.get("risks") or "")[:400],
        "horizon": horizon,
    }


async def run_agent(agent_type: str, snapshot: dict[str, Any], book_health: dict[str, Any] | None) -> dict[str, Any]:
    if agent_type not in AGENT_TYPES:
        raise ValueError(f"Unknown agent {agent_type}")
    fallback = local_quant(agent_type, snapshot, book_health)
    settings = get_settings()
    if not settings.xai_api_key:
        return fallback

    system = (
        "You are a senior desk analyst on Abdullah BANK's TASI book. "
        "Prices are LIVE Tadawul last prints (via Yahoo Finance). Fills are paper — do not claim a live broker. "
        'Return ONLY compact JSON: {"recommendation":"BUY"|"SELL"|"HOLD","confidence":0-100,"thesis":"...","risks":"...","horizon":"intraday"|"swing"|"position"} '
        "Rules: not financial advice; use the supplied numbers; be concise, institutional, no emoji."
    )
    s = snapshot
    pos = s.get("position")
    pos_txt = f"{pos['qty']} @ {pos['avg']} ({pos['pnl_pct']:.2f}%)" if pos else "flat"
    peers = ", ".join(f"{p['symbol']} {p['change_pct']:.2f}%" for p in s.get("peers") or [])
    rates = f"  UST10Y {s['rates_10y']:.2f}%" if s.get("rates_10y") is not None else ""
    user = f"""Agent: {agent_type}
Name: {s['name_en']} ({s['name_ar']}) {s['ticker']}  Sector: {s['sector']}
Session: {s['session']}
Last {s['last']}  Prev {s['prev_close']}  Chg {s['change_pct']:.2f}%
Open {s['open']} High {s['high']} Low {s['low']}  Volume {s['volume']}
52w {s['fifty_two_week_low']}–{s['fifty_two_week_high']}
RSI {s['rsi']:.1f}  SMA10 {s['sma10']:.2f}  SMA20 {s['sma20']:.2f}
Mom5 {s['mom5']:.2f}%  Mom20 {s['mom20']:.2f}%  RVol {s['realized_vol']:.1f}%
Structure {s['structure']}  Beta vs TASI {s['beta']:.2f}
TASI {s['tasi_last']} ({s['tasi_change_pct']:.2f}%)  Brent {s['brent_last']} ({s['brent_change_pct']:.2f}%){rates}
Position: {pos_txt}
Peers: {peers}
Headlines: {' | '.join((s.get('headlines') or [])[:4]) or 'none'}
Book: {json.dumps(book_health or {})}"""

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            res = await client.post(
                f"{settings.xai_base_url}/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {settings.xai_api_key}",
                },
                json={
                    "model": settings.xai_model,
                    "temperature": 0.3,
                    "max_tokens": 420,
                    "messages": [
                        {"role": "system", "content": system},
                        {"role": "user", "content": user},
                    ],
                },
            )
        if res.status_code != 200:
            return fallback
        text = (((res.json().get("choices") or [{}])[0].get("message") or {}).get("content")) or ""
        parsed = _parse_model(text)
        if not parsed or not parsed.get("thesis"):
            return fallback
        return {
            "ok": True,
            "recommendation": parsed["recommendation"],
            "confidence": parsed["confidence"],
            "thesis": parsed["thesis"],
            "risks": parsed["risks"] or fallback["risks"],
            "horizon": parsed["horizon"],
            "source": "grok",
        }
    except Exception:  # noqa: BLE001
        return fallback

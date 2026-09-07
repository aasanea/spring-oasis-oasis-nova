from __future__ import annotations

from typing import Any, Literal

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .agents import build_snapshot, run_agent
from .config import get_settings
from .market import pull_market_wire, pull_yahoo_tape
from .paper import desk
from .universe import AGENTS, AGENT_TYPES, UNIVERSE

settings = get_settings()

app = FastAPI(
    title="Abdullah BANK API",
    version="1.0.0",
    description="Live TASI tape · paper fills · 12 desk agents. Not a live broker.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class OrderIn(BaseModel):
    symbol: str
    side: Literal["buy", "sell"]
    qty: float = Field(gt=0)
    note: str | None = None
    sl: float | None = None
    tp: float | None = None


class AgentIn(BaseModel):
    symbol: str = "2222"
    snapshot: dict[str, Any] | None = None
    book_health: dict[str, Any] | None = None


@app.get("/api/v1/health")
async def health() -> dict[str, Any]:
    return {
        "ok": True,
        "product": "Abdullah BANK",
        "tape": "Yahoo Finance · Tadawul",
        "fills": "paper",
        "grok": bool(settings.xai_api_key),
        "universe": len(UNIVERSE),
        "agents": len(AGENTS),
    }


@app.get("/api/v1/universe")
async def universe() -> dict[str, Any]:
    return {"listings": UNIVERSE, "agents": AGENTS}


@app.get("/api/v1/market/tape")
async def market_tape(force: bool = Query(False)) -> dict[str, Any]:
    try:
        tape = await pull_yahoo_tape(force=force)
    except Exception as exc:  # noqa: BLE001
        desk.trip_breaker("market", str(exc))
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    return desk.apply_tape(tape)


@app.get("/api/v1/market/news")
async def market_news(force: bool = Query(False)) -> dict[str, Any]:
    try:
        headlines = await pull_market_wire(force=force)
    except Exception as exc:  # noqa: BLE001
        desk.trip_breaker("news", str(exc))
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    desk.apply_headlines(headlines)
    return {"headlines": headlines}


@app.get("/api/v1/desk")
async def get_desk() -> dict[str, Any]:
    return desk.snapshot()


@app.get("/api/v1/portfolio")
async def portfolio() -> dict[str, Any]:
    snap = desk.snapshot()
    return {
        "cash": snap["cash"],
        "positions": snap["positions"],
        "metrics": snap["metrics"],
        "book": snap["book"],
    }


@app.get("/api/v1/orders")
async def orders() -> dict[str, Any]:
    return {"orders": desk.state["orders"]}


@app.post("/api/v1/orders")
async def place_order(body: OrderIn) -> dict[str, Any]:
    try:
        tape = await pull_yahoo_tape()
    except Exception as exc:  # noqa: BLE001
        desk.trip_breaker("market", str(exc))
        raise HTTPException(status_code=502, detail=f"No live quote: {exc}") from exc
    desk.apply_tape(tape)
    order = desk.place(body.symbol, body.side, body.qty, note=body.note, sl=body.sl, tp=body.tp)
    return {"order": order, "metrics": desk.metrics(), "positions": desk.state["positions"], "cash": desk.state["cash"]}


@app.post("/api/v1/orders/{position_id}/close")
async def close_position(position_id: str) -> dict[str, Any]:
    desk.apply_tape(await pull_yahoo_tape())
    order = desk.close_position(position_id)
    if not order:
        raise HTTPException(status_code=404, detail="Position not found")
    return {"order": order, "metrics": desk.metrics(), "positions": desk.state["positions"], "cash": desk.state["cash"]}


@app.get("/api/v1/performance")
async def performance() -> dict[str, Any]:
    snap = desk.snapshot()
    return {"equity": snap["equity"], "metrics": snap["metrics"], "orders": snap["orders"]}


@app.get("/api/v1/agents")
async def list_agents() -> dict[str, Any]:
    return {"agents": AGENTS, "analyses": desk.state["analyses"]}


@app.post("/api/v1/agents/{agent_type}/run")
async def run_desk_agent(agent_type: str, body: AgentIn) -> dict[str, Any]:
    if agent_type not in AGENT_TYPES:
        raise HTTPException(status_code=404, detail="Unknown agent")
    try:
        tape = await pull_yahoo_tape()
        desk.apply_tape(tape)
    except Exception as exc:  # noqa: BLE001
        desk.trip_breaker("market", str(exc))
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    asset = desk.state["book"].get(body.symbol)
    if not asset or not asset.get("quoted"):
        raise HTTPException(status_code=400, detail="Waiting for a live quote")
    headlines = [h["title"] for h in desk.state["headlines"] if h.get("symbol") in {None, body.symbol}][:6]
    pos = next((p for p in desk.state["positions"] if p["symbol"] == body.symbol), None)
    snapshot = body.snapshot or build_snapshot(asset, desk.state["book"], pos, headlines, desk.state["feed"])
    health = body.book_health or {
        "breakers_open": sum(1 for b in desk.state["breakers"] if b["state"] == "open"),
        "unresolved_errors": sum(1 for e in desk.state["errors"] if not e["resolved"]),
        "equity": desk.metrics()["equity"],
        "cash": desk.state["cash"],
    }
    try:
        result = await run_agent(agent_type, snapshot, health)
    except Exception as exc:  # noqa: BLE001
        desk.trip_breaker("agents", str(exc))
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    saved = desk.add_analysis(
        {
            "agent_type": agent_type,
            "symbol": body.symbol,
            **result,
        }
    )
    return {"analysis": saved, "result": result}


@app.get("/api/v1/system")
async def system() -> dict[str, Any]:
    return {
        "breakers": desk.state["breakers"],
        "errors": desk.state["errors"],
        "feed": desk.state["feed"],
        "metrics": desk.metrics(),
    }


@app.post("/api/v1/system/heal")
async def heal() -> dict[str, Any]:
    desk.heal()
    return {"breakers": desk.state["breakers"], "errors": desk.state["errors"]}


@app.post("/api/v1/system/reset")
async def reset() -> dict[str, Any]:
    return desk.reset_book()

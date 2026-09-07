from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any
from uuid import uuid4

from .config import get_settings
from .universe import UNIVERSE

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "book.json"


def _uid(prefix: str) -> str:
    return f"{prefix}_{uuid4().hex[:10]}"


def _empty_book() -> dict[str, Any]:
    return {
        row["symbol"]: {
            **row,
            "currency": "SAR",
            "last": 0.0,
            "prev_close": 0.0,
            "open": 0.0,
            "high": 0.0,
            "low": 0.0,
            "volume": 0.0,
            "history": [],
            "volatility": 0.0,
            "beta": 1.0,
            "fifty_two_week_high": 0.0,
            "fifty_two_week_low": 0.0,
            "quoted": False,
            "session_at": 0,
        }
        for row in UNIVERSE
    }


def _seed_breakers() -> list[dict[str, Any]]:
    return [
        {"id": "market", "name": "Market tape", "state": "closed", "failures": 0, "last_error": None},
        {"id": "agents", "name": "Agent bus", "state": "closed", "failures": 0, "last_error": None},
        {"id": "broker", "name": "Paper broker", "state": "closed", "failures": 0, "last_error": None},
        {"id": "news", "name": "News ingest", "state": "closed", "failures": 0, "last_error": None},
    ]


def initial_state() -> dict[str, Any]:
    settings = get_settings()
    return {
        "book": _empty_book(),
        "cash": settings.starting_cash,
        "positions": [],
        "orders": [],
        "analyses": [],
        "equity": [],
        "headlines": [],
        "breakers": _seed_breakers(),
        "errors": [],
        "selected": "2222",
        "feed": {
            "status": "idle",
            "last_sync": None,
            "source": "Yahoo Finance · Tadawul",
            "session": "unknown",
            "tasi_last": 0.0,
            "tasi_change_pct": 0.0,
            "brent_last": 0.0,
            "brent_change_pct": 0.0,
            "rates_10y": None,
            "failed": [],
        },
    }


class PaperDesk:
    def __init__(self) -> None:
        self.state = self._load()

    def _load(self) -> dict[str, Any]:
        if DATA_PATH.exists():
            try:
                saved = json.loads(DATA_PATH.read_text(encoding="utf-8"))
                base = initial_state()
                for key in ("cash", "positions", "orders", "analyses", "equity", "selected"):
                    if key in saved:
                        base[key] = saved[key]
                return base
            except Exception:  # noqa: BLE001
                pass
        return initial_state()

    def persist(self) -> None:
        DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
        payload = {
            "cash": self.state["cash"],
            "positions": self.state["positions"],
            "orders": self.state["orders"],
            "analyses": self.state["analyses"],
            "equity": self.state["equity"],
            "selected": self.state["selected"],
        }
        DATA_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    def mark(self, positions: list[dict[str, Any]] | None = None, cash: float | None = None) -> float:
        book = self.state["book"]
        cash_v = self.state["cash"] if cash is None else cash
        pos = self.state["positions"] if positions is None else positions
        mv = 0.0
        for p in pos:
            px = (book.get(p["symbol"]) or {}).get("last") or p["avg_price"]
            mv += p["qty"] * px
        return cash_v + mv

    def _push_equity(self, value: float) -> None:
        eq = self.state["equity"]
        now = int(time.time() * 1000)
        if not eq:
            self.state["equity"] = [{"t": now, "equity": value}]
            return
        if now - eq[-1]["t"] < 8_000:
            eq[-1] = {"t": now, "equity": value}
            return
        self.state["equity"] = [*eq[-180:], {"t": now, "equity": value}]

    def apply_tape(self, tape: dict[str, Any]) -> dict[str, Any]:
        settings = get_settings()
        book = {**self.state["book"]}
        for sym, asset in tape["assets"].items():
            book[sym] = asset
        still: list[dict[str, Any]] = []
        extra: list[dict[str, Any]] = []
        cash = self.state["cash"]
        for p in self.state["positions"]:
            px = (book.get(p["symbol"]) or {}).get("last") or p["avg_price"]
            hit_sl = p.get("stop_loss") is not None and px <= p["stop_loss"]
            hit_tp = p.get("take_profit") is not None and px >= p["take_profit"]
            if hit_sl or hit_tp:
                notional = p["qty"] * px
                fee = notional * settings.fee_bps
                cash += notional - fee
                extra.append(
                    {
                        "id": _uid("o"),
                        "symbol": p["symbol"],
                        "side": "sell",
                        "qty": p["qty"],
                        "price": px,
                        "fee": fee,
                        "status": "filled",
                        "note": "Stop loss · live last" if hit_sl else "Take profit · live last",
                        "created_at": int(time.time() * 1000),
                    }
                )
            else:
                still.append(p)
        self.state["book"] = book
        self.state["positions"] = still
        self.state["cash"] = cash
        if extra:
            self.state["orders"] = [*extra, *self.state["orders"]][:80]
        macro = tape["macro"]
        self.state["feed"] = {
            "status": "live",
            "last_sync": int(time.time() * 1000),
            "source": tape["source"],
            "session": tape["session"],
            "tasi_last": macro["tasi_last"],
            "tasi_change_pct": macro["tasi_change_pct"],
            "brent_last": macro["brent_last"],
            "brent_change_pct": macro["brent_change_pct"],
            "rates_10y": macro["rates_10y"],
            "failed": tape["failed"],
        }
        self._push_equity(self.mark())
        self.persist()
        return self.snapshot()

    def apply_headlines(self, headlines: list[dict[str, Any]]) -> None:
        self.state["headlines"] = headlines

    def place(
        self,
        symbol: str,
        side: str,
        qty: float,
        note: str | None = None,
        sl: float | None = None,
        tp: float | None = None,
    ) -> dict[str, Any]:
        settings = get_settings()
        book = self.state["book"]
        asset = book.get(symbol)
        qty_int = int(qty)
        now = int(time.time() * 1000)

        def reject(msg: str, price: float = 0.0, fee: float = 0.0) -> dict[str, Any]:
            order = {
                "id": _uid("o"),
                "symbol": symbol,
                "side": side,
                "qty": qty_int,
                "price": price,
                "fee": fee,
                "status": "rejected",
                "note": msg,
                "created_at": now,
            }
            self.state["orders"] = [order, *self.state["orders"]][:80]
            self.persist()
            return order

        if not asset or not asset.get("quoted") or qty_int <= 0:
            return reject("Waiting for a live quote" if not (asset and asset.get("quoted")) else "Invalid quantity", (asset or {}).get("last") or 0)

        px = float(asset["last"])
        notional = qty_int * px
        fee = notional * settings.fee_bps
        cash = self.state["cash"]
        positions = list(self.state["positions"])

        if side == "buy":
            if cash < notional + fee:
                return reject("Insufficient cash", px, fee)
            existing = next((p for p in positions if p["symbol"] == symbol), None)
            if existing:
                new_qty = existing["qty"] + qty_int
                avg = (existing["avg_price"] * existing["qty"] + px * qty_int) / new_qty
                existing["qty"] = new_qty
                existing["avg_price"] = avg
                if sl is not None:
                    existing["stop_loss"] = sl
                if tp is not None:
                    existing["take_profit"] = tp
            else:
                positions.append(
                    {
                        "id": _uid("p"),
                        "symbol": symbol,
                        "qty": qty_int,
                        "avg_price": px,
                        "stop_loss": sl,
                        "take_profit": tp,
                        "opened_at": now,
                    }
                )
            order = {
                "id": _uid("o"),
                "symbol": symbol,
                "side": "buy",
                "qty": qty_int,
                "price": px,
                "fee": fee,
                "status": "filled",
                "note": note or "Market buy · live last",
                "created_at": now,
            }
            cash = cash - notional - fee
            self.state["cash"] = cash
            self.state["positions"] = positions
            self.state["orders"] = [order, *self.state["orders"]][:80]
            self._push_equity(self.mark())
            self.persist()
            return order

        existing = next((p for p in positions if p["symbol"] == symbol), None)
        if not existing or existing["qty"] < qty_int:
            return reject("No long inventory", px, fee)
        remain = existing["qty"] - qty_int
        if remain == 0:
            positions = [p for p in positions if p["id"] != existing["id"]]
        else:
            existing["qty"] = remain
        order = {
            "id": _uid("o"),
            "symbol": symbol,
            "side": "sell",
            "qty": qty_int,
            "price": px,
            "fee": fee,
            "status": "filled",
            "note": note or "Market sell · live last",
            "created_at": now,
        }
        cash = cash + notional - fee
        self.state["cash"] = cash
        self.state["positions"] = positions
        self.state["orders"] = [order, *self.state["orders"]][:80]
        self._push_equity(self.mark())
        self.persist()
        return order

    def close_position(self, position_id: str) -> dict[str, Any] | None:
        p = next((x for x in self.state["positions"] if x["id"] == position_id), None)
        if not p:
            return None
        return self.place(p["symbol"], "sell", p["qty"], note="Close position · live last")

    def add_analysis(self, payload: dict[str, Any]) -> dict[str, Any]:
        full = {**payload, "id": _uid("a"), "created_at": int(time.time() * 1000)}
        self.state["analyses"] = [full, *self.state["analyses"]][:60]
        self.persist()
        return full

    def trip_breaker(self, breaker_id: str, message: str) -> None:
        for b in self.state["breakers"]:
            if b["id"] == breaker_id:
                b["failures"] += 1
                b["last_error"] = message
                if b["failures"] >= 3:
                    b["state"] = "open"
        self.state["errors"] = [
            {
                "id": _uid("e"),
                "component": breaker_id,
                "message": message,
                "at": int(time.time() * 1000),
                "resolved": False,
            },
            *self.state["errors"],
        ][:40]

    def heal(self) -> None:
        for b in self.state["breakers"]:
            b["state"] = "closed"
            b["failures"] = 0
            b["last_error"] = None
        for e in self.state["errors"]:
            e["resolved"] = True

    def reset_book(self) -> dict[str, Any]:
        book = self.state["book"]
        feed = self.state["feed"]
        self.state = initial_state()
        self.state["book"] = book
        self.state["feed"] = feed
        self.persist()
        return self.snapshot()

    def metrics(self) -> dict[str, Any]:
        settings = get_settings()
        book = self.state["book"]
        positions = self.state["positions"]
        cash = self.state["cash"]
        market = 0.0
        cost = 0.0
        for p in positions:
            px = (book.get(p["symbol"]) or {}).get("last") or p["avg_price"]
            market += p["qty"] * px
            cost += p["qty"] * p["avg_price"]
        equity_now = cash + market
        u_pnl = market - cost
        equity = self.state["equity"]
        day_start = equity[0]["equity"] if equity else settings.starting_cash
        day_pnl = equity_now - day_start
        filled = [o for o in self.state["orders"] if o["status"] == "filled"]
        sells = [o for o in filled if o["side"] == "sell"]
        wins = 0
        for o in sells:
            buy = next((b for b in filled if b["side"] == "buy" and b["symbol"] == o["symbol"]), None)
            if buy and o["price"] > buy["price"]:
                wins += 1
        win_rate = (wins / len(sells) * 100) if sells else 0.0
        return {
            "equity": equity_now,
            "cash": cash,
            "market": market,
            "u_pnl": u_pnl,
            "u_pnl_pct": (u_pnl / cost * 100) if cost else 0.0,
            "day_pnl": day_pnl,
            "day_pct": (day_pnl / day_start * 100) if day_start else 0.0,
            "win_rate": win_rate,
            "open_count": len(positions),
        }

    def snapshot(self) -> dict[str, Any]:
        return {**self.state, "metrics": self.metrics()}


desk = PaperDesk()

from __future__ import annotations

import math
from typing import Literal

Structure = Literal["uptrend", "downtrend", "range", "balanced"]


def sma(values: list[float], period: int) -> float:
    if len(values) < period:
        return values[-1] if values else 0.0
    slice_ = values[-period:]
    return sum(slice_) / period


def rsi(values: list[float], period: int = 14) -> float:
    if len(values) < period + 1:
        return 50.0
    gain = 0.0
    loss = 0.0
    start = len(values) - period - 1
    for i in range(start + 1, len(values)):
        ch = values[i] - values[i - 1]
        if ch >= 0:
            gain += ch
        else:
            loss -= ch
    if loss == 0:
        return 100.0
    rs = gain / loss
    return 100 - 100 / (1 + rs)


def realized_vol(values: list[float], period: int = 20) -> float:
    if len(values) < period + 1:
        return 0.0
    slice_ = values[-(period + 1) :]
    rets = [math.log(slice_[i] / slice_[i - 1]) for i in range(1, len(slice_)) if slice_[i - 1] > 0 and slice_[i] > 0]
    if not rets:
        return 0.0
    mean = sum(rets) / len(rets)
    var = sum((r - mean) ** 2 for r in rets) / len(rets)
    return math.sqrt(var) * math.sqrt(252) * 100


def momentum(values: list[float], lookback: int) -> float:
    if len(values) <= lookback:
        return 0.0
    last = values[-1]
    prev = values[-1 - lookback]
    if prev == 0:
        return 0.0
    return ((last - prev) / prev) * 100


def structure_bias(values: list[float]) -> Structure:
    if len(values) < 12:
        return "balanced"
    recent = values[-12:]
    first, last = recent[0], recent[-1]
    highs = [1 for i in range(1, len(recent)) if recent[i] > recent[i - 1]]
    if last > first * 1.01 and len(highs) >= 6:
        return "uptrend"
    if last < first * 0.99:
        return "downtrend"
    return "range"


def log_returns(values: list[float]) -> list[float]:
    out: list[float] = []
    for i in range(1, len(values)):
        a, b = values[i - 1], values[i]
        if a > 0 and b > 0:
            out.append(math.log(b / a))
    return out


def beta_vs_market(stock: list[float], market: list[float]) -> float:
    rs = log_returns(stock)
    rm = log_returns(market)
    n = min(len(rs), len(rm))
    if n < 15:
        return 1.0
    s = rs[-n:]
    m = rm[-n:]
    mean_s = sum(s) / n
    mean_m = sum(m) / n
    cov = 0.0
    var_m = 0.0
    for i in range(n):
        ds = s[i] - mean_s
        dm = m[i] - mean_m
        cov += ds * dm
        var_m += dm * dm
    if var_m == 0:
        return 1.0
    beta = cov / var_m
    if not math.isfinite(beta):
        return 1.0
    return max(-0.2, min(3.5, beta))

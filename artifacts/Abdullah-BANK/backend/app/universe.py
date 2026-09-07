from __future__ import annotations

from typing import TypedDict


class Listing(TypedDict):
    symbol: str
    ticker: str
    name_ar: str
    name_en: str
    sector: str


UNIVERSE: list[Listing] = [
    {"symbol": "2222", "ticker": "2222.SR", "name_ar": "أرامكو السعودية", "name_en": "Saudi Aramco", "sector": "Energy"},
    {"symbol": "1180", "ticker": "1180.SR", "name_ar": "مصرف الراجحي", "name_en": "Al Rajhi Bank", "sector": "Banks"},
    {"symbol": "1120", "ticker": "1120.SR", "name_ar": "مصرف الإنماء", "name_en": "Alinma Bank", "sector": "Banks"},
    {"symbol": "1010", "ticker": "1010.SR", "name_ar": "بنك الرياض", "name_en": "Riyad Bank", "sector": "Banks"},
    {"symbol": "2010", "ticker": "2010.SR", "name_ar": "سابك", "name_en": "SABIC", "sector": "Materials"},
    {"symbol": "7010", "ticker": "7010.SR", "name_ar": "اس تي سي", "name_en": "stc", "sector": "Telecom"},
    {"symbol": "1211", "ticker": "1211.SR", "name_ar": "معادن", "name_en": "Maaden", "sector": "Materials"},
    {"symbol": "2280", "ticker": "2280.SR", "name_ar": "المراعي", "name_en": "Almarai", "sector": "Staples"},
    {"symbol": "5110", "ticker": "5110.SR", "name_ar": "كهرباء السعودية", "name_en": "Saudi Electricity", "sector": "Utilities"},
    {"symbol": "4030", "ticker": "4030.SR", "name_ar": "البحري", "name_en": "Bahri", "sector": "Industrials"},
    {"symbol": "1060", "ticker": "1060.SR", "name_ar": "ساب", "name_en": "SABB", "sector": "Banks"},
    {"symbol": "2350", "ticker": "2350.SR", "name_ar": "كيان السعودية", "name_en": "Saudi Kayan", "sector": "Materials"},
]

LISTING_MAP = {row["symbol"]: row for row in UNIVERSE}

NAME_KEYS: dict[str, list[str]] = {
    "2222": ["aramco", "أرامكو", "2222"],
    "1180": ["rajhi", "الراجحي", "1180"],
    "1120": ["alinma", "الإنماء", "1120"],
    "1010": ["riyad bank", "بنك الرياض", "1010"],
    "2010": ["sabic", "سابك", "2010"],
    "7010": ["stc", "اس تي سي", "7010"],
    "1211": ["maaden", "معادن", "1211"],
    "2280": ["almarai", "المراعي", "2280"],
    "5110": ["saudi electricity", "كهرباء السعودية", "5110"],
    "4030": ["bahri", "البحري", "4030"],
    "1060": ["sabb", "1060"],
    "2350": ["kayan", "كيان", "2350"],
}

TASI = "^TASI.SR"
BRENT = "BZ=F"
TNX = "^TNX"

AGENTS = [
    {"type": "technical", "name": "Technical", "name_ar": "فني", "blurb": "RSI, moving averages, and momentum on the tape.", "focus": "Price action"},
    {"type": "fundamental", "name": "Fundamental", "name_ar": "أساسي", "blurb": "Sector quality, balance-sheet bias, and valuation posture.", "focus": "Quality"},
    {"type": "news", "name": "News", "name_ar": "أخبار", "blurb": "Headlines mapped to the name and its sector.", "focus": "Flow"},
    {"type": "sentiment", "name": "Sentiment", "name_ar": "مشاعر", "blurb": "Short-horizon crowd bias from returns and tape.", "focus": "Tone"},
    {"type": "macro", "name": "Macro", "name_ar": "كلي", "blurb": "Rates, oil, and SAMA-sensitive regime for TASI.", "focus": "Regime"},
    {"type": "correlation", "name": "Correlation", "name_ar": "ارتباط", "blurb": "How the name moves with the TASI book.", "focus": "Beta"},
    {"type": "market_structure", "name": "Structure", "name_ar": "هيكل", "blurb": "Trend, range, and swing architecture.", "focus": "Path"},
    {"type": "regime", "name": "Regime", "name_ar": "نظام", "blurb": "Volatility regime and risk-on / risk-off.", "focus": "Climate"},
    {"type": "risk", "name": "Risk", "name_ar": "مخاطر", "blurb": "Position size, stops, and book concentration.", "focus": "Limits"},
    {"type": "strategy", "name": "Strategy", "name_ar": "استراتيجية", "blurb": "Synthesizes the desk into a single paper action.", "focus": "Decision"},
    {"type": "volatility", "name": "Volatility", "name_ar": "تقلب", "blurb": "Realized vol, range expansion, and sizing.", "focus": "Range"},
    {"type": "self_healing", "name": "Self-heal", "name_ar": "إصلاح", "blurb": "Watches breakers, errors, and recovery actions.", "focus": "Health"},
]

AGENT_TYPES = [a["type"] for a in AGENTS]

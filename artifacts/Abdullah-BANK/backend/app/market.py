from __future__ import annotations

import asyncio
import re
import time
from html import unescape
from typing import Any
from xml.etree import ElementTree as ET

import httpx

from .config import get_settings
from .indicators import beta_vs_market, realized_vol
from .universe import BRENT, NAME_KEYS, TASI, TNX, UNIVERSE

YAHOO_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json,text/xml,application/xml;q=0.9,*/*;q=0.8",
}
HOSTS = ("query1.finance.yahoo.com", "query2.finance.yahoo.com")

_tape_cache: dict[str, Any] | None = None
_tape_at = 0.0
_news_cache: list[dict[str, Any]] | None = None
_news_at = 0.0


def _nums(arr: list[Any] | None) -> list[float]:
    return [float(n) for n in (arr or []) if isinstance(n, (int, float))]


def _last(arr: list[float], fallback: float = 0.0) -> float:
    return arr[-1] if arr else fallback


async def _yahoo_chart(client: httpx.AsyncClient, symbol: str, range_: str = "3mo") -> dict[str, Any]:
    last_err: Exception | None = None
    for host in HOSTS:
        url = f"https://{host}/v8/finance/chart/{symbol}?interval=1d&range={range_}&includePrePost=false"
        try:
            res = await client.get(url, headers=YAHOO_HEADERS, timeout=12)
            if res.status_code != 200:
                last_err = RuntimeError(f"{symbol} {res.status_code}")
                continue
            body = res.json()
            result = (body.get("chart") or {}).get("result") or []
            if not result:
                desc = ((body.get("chart") or {}).get("error") or {}).get("description")
                last_err = RuntimeError(desc or f"{symbol} empty")
                continue
            return result[0]
        except Exception as exc:  # noqa: BLE001
            last_err = exc
    raise last_err or RuntimeError(f"No chart for {symbol}")


def _session_from(meta: dict[str, Any]) -> str:
    regular = ((meta.get("currentTradingPeriod") or {}).get("regular")) or {}
    start = regular.get("start")
    end = regular.get("end")
    if not start or not end:
        return "closed"
    now = time.time()
    return "open" if start <= now < end else "closed"


def _parse_chart(listing: dict[str, str], result: dict[str, Any], tasi_history: list[float]) -> dict[str, Any]:
    quote = ((result.get("indicators") or {}).get("quote") or [{}])[0]
    closes = _nums(quote.get("close"))
    opens = _nums(quote.get("open"))
    highs = _nums(quote.get("high"))
    lows = _nums(quote.get("low"))
    vols = _nums(quote.get("volume"))
    meta = result.get("meta") or {}
    last = float(meta.get("regularMarketPrice") or _last(closes))
    prev = float(meta.get("chartPreviousClose") or (closes[-2] if len(closes) > 1 else last))
    history = ([*closes[:-1], last] if closes else ([last] if last else []))
    high = float(meta.get("regularMarketDayHigh") or _last(highs, last))
    low = float(meta.get("regularMarketDayLow") or _last(lows, last))
    open_px = _last(opens, last)
    volume = float(meta.get("regularMarketVolume") or _last(vols, 0))
    return {
        **listing,
        "currency": "SAR",
        "last": last,
        "prev_close": prev,
        "open": open_px,
        "high": high,
        "low": low,
        "volume": volume,
        "history": history,
        "volatility": realized_vol(history),
        "beta": beta_vs_market(history, tasi_history),
        "fifty_two_week_high": float(meta.get("fiftyTwoWeekHigh") or max([*history, last], default=last)),
        "fifty_two_week_low": float(meta.get("fiftyTwoWeekLow") or min([*history, last], default=last)),
        "quoted": last > 0,
        "session_at": int((meta.get("regularMarketTime") or 0) * 1000),
        "name_ar": listing["name_ar"],
        "name_en": listing["name_en"],
        "ticker": listing["ticker"],
        "symbol": listing["symbol"],
        "sector": listing["sector"],
    }


def _index_from(result: dict[str, Any]) -> dict[str, Any]:
    quote = ((result.get("indicators") or {}).get("quote") or [{}])[0]
    closes = _nums(quote.get("close"))
    meta = result.get("meta") or {}
    last = float(meta.get("regularMarketPrice") or _last(closes))
    prev = float(meta.get("chartPreviousClose") or (closes[-2] if len(closes) > 1 else last))
    history = ([*closes[:-1], last] if closes else ([last] if last else []))
    change = meta.get("regularMarketChangePercent")
    change_pct = float(change) if change is not None else ((last - prev) / prev * 100 if prev else 0.0)
    return {"last": last, "prev": prev, "history": history, "change_pct": change_pct, "meta": meta}


async def pull_yahoo_tape(force: bool = False) -> dict[str, Any]:
    global _tape_cache, _tape_at
    settings = get_settings()
    if not force and _tape_cache and (time.time() - _tape_at) < settings.tape_ttl_s:
        return _tape_cache

    async with httpx.AsyncClient() as client:
        tasi_t, brent_t, tnx_t, *name_t = await asyncio.gather(
            _yahoo_chart(client, TASI),
            _yahoo_chart(client, BRENT),
            _yahoo_chart(client, TNX, "6mo"),
            *[_yahoo_chart(client, n["ticker"]) for n in UNIVERSE],
            return_exceptions=True,
        )

    if isinstance(tasi_t, Exception):
        raise RuntimeError(f"TASI feed failed: {tasi_t}") from tasi_t

    tasi = _index_from(tasi_t)
    brent = _index_from(brent_t) if not isinstance(brent_t, Exception) else {
        "last": 0.0, "prev": 0.0, "history": [], "change_pct": 0.0, "meta": tasi["meta"]
    }
    rates_10y = None if isinstance(tnx_t, Exception) else _index_from(tnx_t)["last"]

    assets: dict[str, Any] = {}
    failed: list[str] = []
    for listing, result in zip(UNIVERSE, name_t, strict=True):
        if isinstance(result, Exception):
            failed.append(listing["symbol"])
            continue
        assets[listing["symbol"]] = _parse_chart(listing, result, tasi["history"])

    if not assets:
        raise RuntimeError("No TASI names quoted")

    session = _session_from(tasi["meta"])
    as_of = max(
        int((tasi["meta"].get("regularMarketTime") or 0) * 1000),
        *(a["session_at"] for a in assets.values()),
        time.time() * 1000,
    )
    data = {
        "assets": assets,
        "macro": {
            "tasi_last": tasi["last"],
            "tasi_prev": tasi["prev"],
            "tasi_change_pct": tasi["change_pct"],
            "tasi_history": tasi["history"],
            "brent_last": brent["last"],
            "brent_change_pct": brent["change_pct"],
            "rates_10y": rates_10y,
        },
        "session": session,
        "as_of": int(as_of),
        "source": "Yahoo Finance · Tadawul",
        "failed": failed,
    }
    _tape_cache = data
    _tape_at = time.time()
    return data


def _key_hits(hay: str, key: str) -> bool:
    k = key.lower()
    if len(k) <= 4 and k.isalnum():
        return re.search(rf"(?:^|[^a-z0-9]){re.escape(k)}(?:$|[^a-z0-9])", hay, re.I) is not None
    return k in hay


def _match_symbol(title: str, tickers: list[str] | None = None) -> str | None:
    for ticker in tickers or []:
        raw = ticker.replace(".SR", "").replace(".sr", "")
        if raw in NAME_KEYS:
            return raw
    hay = title.lower()
    for symbol, keys in NAME_KEYS.items():
        if any(_key_hits(hay, k) for k in keys):
            return symbol
    return None


def _tone_of(title: str) -> str:
    t = title.lower()
    if re.search(r"surge|jump|gain|rally|upgrade|record|نمو|ارتفاع|يرتفع|صعود|قفز", t):
        return "bull"
    if re.search(r"fall|drop|plunge|loss|cut|خس|تراجع|يهبط|هبوط|ضغط", t):
        return "bear"
    return "neutral"


def _is_desk_relevant(title: str, symbol: str | None) -> bool:
    if symbol:
        return True
    t = title.lower()
    return bool(
        re.search(
            r"tasi|tadawul|aramco|al rajhi|alinma|sabic|maaden|almarai|bahri|riyad bank|"
            r"saudi electricity|\bstc\b|saudi kayan|sabb\b|السعود|تداول|أرامكو|الراجحي|"
            r"الإنماء|سابك|معادن|المراعي|البحري|كيان|اس تي سي|السوق السعودي",
            t,
        )
    )


def _hash(s: str) -> int:
    h = 0
    for ch in s:
        h = (h * 31 + ord(ch)) & 0xFFFFFFFF
        if h >= 0x80000000:
            h -= 0x100000000
    return h


def _parse_rss(xml: str) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return out
    for item in root.iter("item"):
        title_el = item.find("title")
        if title_el is None or not (title_el.text or "").strip():
            continue
        title = unescape(re.sub(r"<[^>]+>", "", title_el.text or "")).strip()
        link_el = item.find("link")
        guid_el = item.find("guid")
        source_el = item.find("source")
        pub_el = item.find("pubDate")
        link = (link_el.text if link_el is not None else None) or (guid_el.text if guid_el is not None else "") or ""
        source = (source_el.text if source_el is not None else None) or "Google News"
        pub = pub_el.text if pub_el is not None else None
        at = int(time.time() * 1000)
        if pub:
            try:
                from email.utils import parsedate_to_datetime

                at = int(parsedate_to_datetime(pub).timestamp() * 1000)
            except Exception:  # noqa: BLE001
                pass
        out.append(
            {
                "id": f"rss_{abs(_hash(title)):x}",
                "title": title,
                "source": source,
                "url": link,
                "symbol": _match_symbol(title),
                "tone": _tone_of(title),
                "at": at,
            }
        )
    return out


async def _fetch_text(client: httpx.AsyncClient, url: str) -> str:
    res = await client.get(url, headers=YAHOO_HEADERS, timeout=12, follow_redirects=True)
    res.raise_for_status()
    return res.text


async def _yahoo_news(client: httpx.AsyncClient, query: str) -> list[dict[str, Any]]:
    last_err: Exception | None = None
    for host in HOSTS:
        url = f"https://{host}/v1/finance/search?q={query}&quotesCount=0&newsCount=10"
        try:
            res = await client.get(url, headers=YAHOO_HEADERS, timeout=12)
            if res.status_code != 200:
                last_err = RuntimeError(f"news {res.status_code}")
                continue
            news = res.json().get("news") or []
            return [
                {
                    "id": n.get("uuid") or f"y_{_hash(n.get('title') or '')}",
                    "title": n["title"],
                    "source": n.get("publisher") or "Yahoo Finance",
                    "url": n["link"],
                    "symbol": _match_symbol(n["title"], n.get("relatedTickers") or []),
                    "tone": _tone_of(n["title"]),
                    "at": int((n.get("providerPublishTime") or 0) * 1000) or int(time.time() * 1000),
                }
                for n in news
                if n.get("title") and n.get("link")
            ]
        except Exception as exc:  # noqa: BLE001
            last_err = exc
    if last_err:
        raise last_err
    return []


async def pull_market_wire(force: bool = False) -> list[dict[str, Any]]:
    global _news_cache, _news_at
    settings = get_settings()
    if not force and _news_cache is not None and (time.time() - _news_at) < settings.news_ttl_s:
        return _news_cache

    rss_ar = (
        "https://news.google.com/rss/search?q=TASI%20OR%20Tadawul%20OR%20%D8%A7%D9%84%D8%B3%D9%88%D9%82%20"
        "%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%20OR%20%D8%A3%D8%B1%D8%A7%D9%85%D9%83%D9%88&hl=ar&gl=SA&ceid=SA:ar"
    )
    rss_en = (
        "https://news.google.com/rss/search?q=TASI%20OR%20Tadawul%20OR%20%22Saudi%20exchange%22%20OR%20Aramco"
        "&hl=en-SA&gl=SA&ceid=SA:en"
    )
    async with httpx.AsyncClient() as client:
        settled = await asyncio.gather(
            _fetch_text(client, rss_ar),
            _fetch_text(client, rss_en),
            _yahoo_news(client, "TASI Tadawul"),
            _yahoo_news(client, "Saudi Aramco"),
            _yahoo_news(client, "Al Rajhi Bank"),
            _yahoo_news(client, "SABIC"),
            return_exceptions=True,
        )

    merged: list[dict[str, Any]] = []
    seen: set[str] = set()
    for i, result in enumerate(settled):
        if isinstance(result, Exception):
            continue
        items = _parse_rss(result) if i < 2 and isinstance(result, str) else result
        if not isinstance(items, list):
            continue
        for h in items:
            if not _is_desk_relevant(h["title"], h.get("symbol")):
                continue
            key = h["title"].lower()[:80]
            if key in seen:
                continue
            seen.add(key)
            merged.append(h)
    merged.sort(key=lambda h: (not bool(h.get("symbol")), -h["at"]))
    data = merged[:18]
    if not data:
        raise RuntimeError("News wire is empty")
    _news_cache = data
    _news_at = time.time()
    return data

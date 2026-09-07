import { createServerFn } from "@tanstack/react-start";
import { NAME_KEYS, UNIVERSE } from "./assets";
import { betaVsMarket, realizedVol } from "./indicators";
import type { Asset, Headline, TapePayload } from "./types";

const YAHOO_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json,text/xml,application/xml;q=0.9,*/*;q=0.8",
};

const HOSTS = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"] as const;
const TASI = "^TASI.SR";
const BRENT = "BZ=F";
const TNX = "^TNX";

type YahooResult = {
  meta: {
    currency?: string;
    symbol: string;
    regularMarketPrice?: number;
    chartPreviousClose?: number;
    regularMarketDayHigh?: number;
    regularMarketDayLow?: number;
    regularMarketVolume?: number;
    regularMarketTime?: number;
    regularMarketChangePercent?: number;
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
    currentTradingPeriod?: { regular?: { start: number; end: number } };
  };
  timestamp?: number[];
  indicators: {
    quote: Array<{
      close?: Array<number | null>;
      open?: Array<number | null>;
      high?: Array<number | null>;
      low?: Array<number | null>;
      volume?: Array<number | null>;
    }>;
  };
};

type YahooNewsItem = {
  uuid?: string;
  title?: string;
  publisher?: string;
  link?: string;
  providerPublishTime?: number;
  relatedTickers?: string[];
};

let tapeCache: { at: number; data: TapePayload } | null = null;
let newsCache: { at: number; data: Headline[] } | null = null;

function nums(arr: Array<number | null> | undefined) {
  return (arr ?? []).filter((n): n is number => typeof n === "number" && Number.isFinite(n));
}

async function yahooChart(symbol: string, range = "3mo"): Promise<YahooResult> {
  let lastErr: Error | null = null;
  for (const host of HOSTS) {
    const url = `https://${host}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}&includePrePost=false`;
    try {
      const res = await fetch(url, {
        headers: YAHOO_HEADERS,
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) {
        lastErr = new Error(`${symbol} ${res.status}`);
        continue;
      }
      const body = (await res.json()) as {
        chart?: { result?: YahooResult[] | null; error?: { description?: string } };
      };
      const result = body.chart?.result?.[0];
      if (!result) {
        lastErr = new Error(body.chart?.error?.description ?? `${symbol} empty`);
        continue;
      }
      return result;
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
    }
  }
  throw lastErr ?? new Error(`No chart for ${symbol}`);
}

function lastOf(arr: number[], fallback = 0) {
  return arr.at(-1) ?? fallback;
}

function sessionFrom(meta: YahooResult["meta"], fallbackOpen: boolean): "open" | "closed" {
  const regular = meta.currentTradingPeriod?.regular;
  if (!regular) return fallbackOpen ? "open" : "closed";
  const now = Date.now() / 1000;
  return now >= regular.start && now < regular.end ? "open" : "closed";
}

function parseChart(
  listing: (typeof UNIVERSE)[number],
  result: YahooResult,
  tasiHistory: number[],
): Asset {
  const quote = result.indicators.quote[0] ?? {};
  const closes = nums(quote.close);
  const opens = nums(quote.open);
  const highs = nums(quote.high);
  const lows = nums(quote.low);
  const vols = nums(quote.volume);
  const meta = result.meta;
  const last = meta.regularMarketPrice ?? lastOf(closes);
  const prevClose =
    meta.chartPreviousClose ?? (closes.length > 1 ? closes[closes.length - 2]! : last);
  const history = closes.length ? [...closes.slice(0, -1), last] : last ? [last] : [];
  const high = meta.regularMarketDayHigh ?? lastOf(highs, last);
  const low = meta.regularMarketDayLow ?? lastOf(lows, last);
  const open = lastOf(opens, last);
  const volume = meta.regularMarketVolume ?? lastOf(vols, 0);
  return {
    ...listing,
    currency: "SAR",
    last,
    prevClose,
    open,
    high,
    low,
    volume,
    history,
    volatility: realizedVol(history),
    beta: betaVsMarket(history, tasiHistory),
    fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? Math.max(...history, last),
    fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? Math.min(...history, last),
    quoted: last > 0,
    sessionAt: (meta.regularMarketTime ?? 0) * 1000,
  };
}

function indexFrom(result: YahooResult) {
  const quote = result.indicators.quote[0] ?? {};
  const closes = nums(quote.close);
  const last = result.meta.regularMarketPrice ?? lastOf(closes);
  const prev =
    result.meta.chartPreviousClose ?? (closes.length > 1 ? closes[closes.length - 2]! : last);
  const history = closes.length ? [...closes.slice(0, -1), last] : last ? [last] : [];
  const changePct =
    result.meta.regularMarketChangePercent ?? (prev ? ((last - prev) / prev) * 100 : 0);
  return { last, prev, history, changePct, meta: result.meta };
}

export async function pullYahooTape(force = false): Promise<TapePayload> {
  if (!force && tapeCache && Date.now() - tapeCache.at < 12_000) {
    return tapeCache.data;
  }

  const [tasiRes, brentRes, tnxRes, ...nameRes] = await Promise.allSettled([
    yahooChart(TASI),
    yahooChart(BRENT),
    yahooChart(TNX, "6mo"),
    ...UNIVERSE.map((n) => yahooChart(n.ticker)),
  ]);

  if (tasiRes.status !== "fulfilled") {
    throw new Error(`TASI feed failed: ${tasiRes.reason instanceof Error ? tasiRes.reason.message : "error"}`);
  }

  const tasi = indexFrom(tasiRes.value);
  const brent =
    brentRes.status === "fulfilled"
      ? indexFrom(brentRes.value)
      : { last: 0, prev: 0, history: [] as number[], changePct: 0, meta: tasiRes.value.meta };
  const rates10y =
    tnxRes.status === "fulfilled" ? indexFrom(tnxRes.value).last : null;

  const assets: Record<string, Asset> = {};
  const failed: string[] = [];
  UNIVERSE.forEach((listing, i) => {
    const r = nameRes[i];
    if (!r || r.status !== "fulfilled") {
      failed.push(listing.symbol);
      return;
    }
    assets[listing.symbol] = parseChart(listing, r.value, tasi.history);
  });

  if (Object.keys(assets).length === 0) {
    throw new Error("No TASI names quoted");
  }

  const session = sessionFrom(tasi.meta, false);
  const asOf =
    Math.max(
      (tasi.meta.regularMarketTime ?? 0) * 1000,
      ...Object.values(assets).map((a) => a.sessionAt),
    ) || Date.now();

  const data: TapePayload = {
    assets,
    macro: {
      tasiLast: tasi.last,
      tasiPrev: tasi.prev,
      tasiChangePct: tasi.changePct,
      tasiHistory: tasi.history,
      brentLast: brent.last,
      brentChangePct: brent.changePct,
      rates10y,
    },
    session,
    asOf,
    source: "Yahoo Finance · Tadawul",
    failed,
  };
  tapeCache = { at: Date.now(), data };
  return data;
}

function decodeEntities(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/'/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/<[^>]+>/g, "")
    .trim();
}

function textOf(block: string, tag: string) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? decodeEntities(m[1]!) : "";
}

function toneOf(title: string): Headline["tone"] {
  const t = title.toLowerCase();
  if (/surge|jump|gain|rally|upgrade|record|نمو|ارتفاع|يرتفع|صعود|قفز/.test(t)) return "bull";
  if (/fall|drop|plunge|loss|cut|خس|تراجع|يهبط|هبوط|ضغط/.test(t)) return "bear";
  return "neutral";
}

function isDeskRelevant(title: string, symbol?: string) {
  if (symbol) return true;
  const t = title.toLowerCase();
  return /tasi|tadawul|aramco|al rajhi|alinma|sabic|maaden|almarai|bahri|riyad bank|saudi electricity|\bstc\b|saudi kayan|sabb\b|السعود|تداول|أرامكو|الراجحي|الإنماء|سابك|معادن|المراعي|البحري|كيان|اس تي سي|السوق السعودي/.test(
    t,
  );
}

function matchSymbol(title: string, tickers: string[] = []): string | undefined {
  for (const ticker of tickers) {
    const raw = ticker.replace(".SR", "").replace(".sr", "");
    if (NAME_KEYS[raw]) return raw;
  }
  const hay = title.toLowerCase();
  for (const [symbol, keys] of Object.entries(NAME_KEYS)) {
    if (keys.some((k) => keyHits(hay, k))) return symbol;
  }
  return undefined;
}

function keyHits(hay: string, key: string) {
  const k = key.toLowerCase();
  if (k.length <= 4 && /^[a-z0-9]+$/i.test(k)) {
    return new RegExp(`(?:^|[^a-z0-9])${k}(?:$|[^a-z0-9])`, "i").test(hay);
  }
  return hay.includes(k);
}

function parseRss(xml: string): Headline[] {
  const out: Headline[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const block = m[1]!;
    const title = textOf(block, "title");
    if (!title) continue;
    const link = textOf(block, "link") || textOf(block, "guid");
    const source = textOf(block, "source") || "Google News";
    const pub = textOf(block, "pubDate");
    const at = pub ? Date.parse(pub) : Date.now();
    out.push({
      id: `rss_${Math.abs(hash(title)).toString(36)}`,
      title,
      source,
      url: link,
      symbol: matchSymbol(title),
      tone: toneOf(title),
      at: Number.isFinite(at) ? at : Date.now(),
    });
  }
  return out;
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

async function fetchText(url: string) {
  const res = await fetch(url, {
    headers: YAHOO_HEADERS,
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function yahooNews(query: string): Promise<Headline[]> {
  let lastErr: Error | null = null;
  for (const host of HOSTS) {
    const url = `https://${host}/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=0&newsCount=10`;
    try {
      const res = await fetch(url, {
        headers: YAHOO_HEADERS,
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) {
        lastErr = new Error(`news ${res.status}`);
        continue;
      }
      const body = (await res.json()) as { news?: YahooNewsItem[] };
      return (body.news ?? [])
        .filter((n) => n.title && n.link)
        .map((n) => ({
          id: n.uuid ?? `y_${hash(n.title!)}`,
          title: n.title!,
          source: n.publisher ?? "Yahoo Finance",
          url: n.link!,
          symbol: matchSymbol(n.title!, n.relatedTickers),
          tone: toneOf(n.title!),
          at: (n.providerPublishTime ?? 0) * 1000 || Date.now(),
        }));
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error(String(err));
    }
  }
  if (lastErr) throw lastErr;
  return [];
}

export async function pullMarketWire(force = false): Promise<Headline[]> {
  if (!force && newsCache && Date.now() - newsCache.at < 120_000) {
    return newsCache.data;
  }

  const rssAr =
    "https://news.google.com/rss/search?q=TASI%20OR%20Tadawul%20OR%20%D8%A7%D9%84%D8%B3%D9%88%D9%82%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%20OR%20%D8%A3%D8%B1%D8%A7%D9%85%D9%83%D9%88&hl=ar&gl=SA&ceid=SA:ar";
  const rssEn =
    "https://news.google.com/rss/search?q=TASI%20OR%20Tadawul%20OR%20%22Saudi%20exchange%22%20OR%20Aramco&hl=en-SA&gl=SA&ceid=SA:en";

  const settled = await Promise.allSettled([
    fetchText(rssAr).then(parseRss),
    fetchText(rssEn).then(parseRss),
    yahooNews("TASI Tadawul"),
    yahooNews("Saudi Aramco"),
    yahooNews("Al Rajhi Bank"),
    yahooNews("SABIC"),
  ]);

  const merged: Headline[] = [];
  const seen = new Set<string>();
  for (const r of settled) {
    if (r.status !== "fulfilled") continue;
    for (const h of r.value) {
      if (!isDeskRelevant(h.title, h.symbol)) continue;
      const key = h.title.toLowerCase().slice(0, 80);
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(h);
    }
  }
  merged.sort((a, b) => {
    const named = Number(Boolean(b.symbol)) - Number(Boolean(a.symbol));
    if (named !== 0) return named;
    return b.at - a.at;
  });
  const data = merged.slice(0, 18);
  if (data.length === 0) {
    throw new Error("News wire is empty");
  }
  newsCache = { at: Date.now(), data };
  return data;
}

export const loadMarketTape = createServerFn({ method: "POST" })
  .validator((input: { force?: boolean } | undefined) => input ?? {})
  .handler(async ({ data }) => pullYahooTape(Boolean(data.force)));

export const loadMarketWire = createServerFn({ method: "POST" })
  .validator((input: { force?: boolean } | undefined) => input ?? {})
  .handler(async ({ data }) => pullMarketWire(Boolean(data.force)));

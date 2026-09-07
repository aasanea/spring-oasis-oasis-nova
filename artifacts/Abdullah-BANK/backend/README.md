# Abdullah BANK — Backend (FastAPI)

Live TASI last prints (Yahoo Finance), real headlines (Google News RSS + Yahoo), paper fills at **15.5 bps**, 12 desk agents (Grok when `XAI_API_KEY` is set, otherwise local quant).

Not a live broker. Not Al Rajhi / Derayah routing.

## API

| Method | Path | What |
| --- | --- | --- |
| GET | `/api/v1/health` | Status, Grok flag |
| GET | `/api/v1/universe` | 12 TASI names + agent catalog |
| GET | `/api/v1/market/tape?force=` | Yahoo chart tape → marks the book |
| GET | `/api/v1/market/news?force=` | Filtered Saudi/TASI wire |
| GET | `/api/v1/desk` | Full paper desk snapshot |
| GET | `/api/v1/portfolio` | Positions + metrics |
| POST | `/api/v1/orders` | `{symbol, side, qty, sl?, tp?}` fill at **live last** |
| POST | `/api/v1/orders/{id}/close` | Flatten a position |
| GET | `/api/v1/performance` | Equity curve |
| GET | `/api/v1/agents` | Catalog + recent theses |
| POST | `/api/v1/agents/{type}/run` | `{symbol}` — Grok JSON or quant fallback |
| GET | `/api/v1/system` | Breakers + errors |
| POST | `/api/v1/system/heal` | Close breakers |
| POST | `/api/v1/system/reset` | Reset cash to SAR 1,000,000, keep tape |

Paper book persists to `backend/data/book.json`.

## Modules

- `app/market.py` — Yahoo `/v8/finance/chart` + RSS
- `app/paper.py` — long-only executor, SL/TP on live last
- `app/agents.py` — 12 specialists + xAI
- `app/universe.py` — TASI 12 + NAME_KEYS
- `app/indicators.py` — RSI, SMA, vol, beta vs TASI
- `app/main.py` — FastAPI routes

# Abdullah BANK — continue from here

You are continuing **Abdullah BANK**, a TASI paper-trading desk for an Arabic-speaking user. Reply in Arabic unless they switch. Do not invent fake prices. Do not claim a live broker.

## What already works (do not rebuild from scratch)

Two complete trees ship in this archive:

### A. Live app (`app-builder/`) — TanStack Start + React 19

This is the running product. Server functions inside the same app:

- Live Tadawul last via Yahoo Finance chart API (`2222.SR`, `^TASI.SR`, `BZ=F`, `^TNX`)
- Real headlines: Google News RSS (AR/EN) + Yahoo news, filtered to Saudi/TASI names
- Paper fills at **live last**, 15.5 bps commission, long-only, SL/TP
- Starting cash SAR 1,000,000, empty book (persist key `abdullah-bank-desk-v2`)
- 12 agents; Grok (`grok-4.5` via `XAI_API_KEY`) when present, else local quant
- Poll tape 30s when TASI open, 180s when closed; news every 3 min
- Auth OFF, database OFF — paper book is localStorage only

### B. Split architecture (`backend/` + `frontend/`)

Faithful FastAPI port of the same desk, matching the original spec in `docs/abdullahnote.md`:

- `backend/app/market.py` — Yahoo + RSS (no mock data)
- `backend/app/paper.py` — paper executor, JSON persist
- `backend/app/agents.py` — 12 agents + xAI
- `frontend/src/lib/api.ts` — FastAPI client
- `frontend/src/routes/*` — same UI surfaces

## File map

### Frontend
- `frontend/src/routes/index.tsx` — desk, watchlist, ticket, wire
- `frontend/src/routes/agents.tsx` — 12-agent grid
- `frontend/src/routes/portfolio.tsx` — positions, allocation pie
- `frontend/src/routes/orders.tsx` — blotter
- `frontend/src/routes/performance.tsx` — equity curve
- `frontend/src/routes/system.tsx` — breakers, reset to cash
- `frontend/src/components/desk/*` — ticket, sparkline, run-agent, tiles
- `frontend/src/styles.css` — tokens

### Backend
- `backend/app/main.py` — FastAPI routes `/api/v1/*`
- `backend/app/market.py` — `pull_yahoo_tape`, `pull_market_wire`
- `backend/app/paper.py` — paper broker
- `backend/app/agents.py` — Grok JSON + quant fallback
- `backend/app/universe.py` — TASI 12 + NAME_KEYS
- `backend/app/indicators.py` — RSI, SMA, vol, beta

## Hard rules

- Never mock prices, headlines, or Grok when a key exists
- Paper ≠ live broker. Say so. Do not claim Al Rajhi/Derayah routing without their API
- Do not add auth/db unless the user asks for accounts
- Yahoo chart API: `/v8/finance/chart/{symbol}?interval=1d&range=3mo`, User-Agent header, query1/query2 failover
- Commission 15.5 bps (`0.00155`)

## Likely next asks

1. Wire the React UI to FastAPI via `frontend/src/lib/api.ts` (replace Zustand local fills with REST)
2. Live broker / order routing (needs credentials)
3. Accounts + Postgres so the book follows the user
4. More TASI names, fundamentals (PE, mkt cap — Yahoo quoteSummary is often 401)
5. Intraday 5m bars while the session is open
6. WebSocket tape (`/ws/tape`) as in the original spec

Original architecture dump: `docs/abdullahnote.md`.

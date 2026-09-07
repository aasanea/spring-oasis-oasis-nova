# Abdullah BANK — Frontend

React 19 trading desk UI (TanStack Start in the live app).

## Pages

| Route | File | What |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | Watchlist, ticket, wire, TASI/Brent |
| `/agents` | `src/routes/agents.tsx` | 12-agent grid |
| `/portfolio` | `src/routes/portfolio.tsx` | Positions + allocation |
| `/orders` | `src/routes/orders.tsx` | Blotter |
| `/performance` | `src/routes/performance.tsx` | Equity curve |
| `/system` | `src/routes/system.tsx` | Breakers, reset |

## Wiring

Two backends exist. Do not mix them in one process.

1. **Live Grok App Builder app** (`../app-builder`) — `createServerFn` in `src/lib/desk/market.ts` and `run-agent.ts`. This is what the preview runs today.
2. **Split FastAPI** (`../backend`) — use `src/lib/api.ts` (`VITE_API_URL`). Poll `/api/v1/market/tape` every 30s when the session is open.

Shared desk types and the Zustand paper book live in `src/lib/desk/`.

## UI tokens

`src/styles.css` — charcoal / bone / steel, IBM Plex + Noto Naskh Arabic.

# File map

## frontend/

```
frontend/src/routes/index.tsx          desk / watchlist / ticket / wire
frontend/src/routes/agents.tsx         12-agent grid
frontend/src/routes/portfolio.tsx      positions + pie
frontend/src/routes/orders.tsx         blotter
frontend/src/routes/performance.tsx    equity curve
frontend/src/routes/system.tsx         breakers / reset
frontend/src/routes/__root.tsx         shell
frontend/src/components/layout/app-shell.tsx
frontend/src/components/desk/*         ticket, sparkline, run-agent, tiles
frontend/src/components/ui/*           button, input, sheet, badge
frontend/src/lib/desk/store.ts         Zustand paper book (client)
frontend/src/lib/desk/use-market-feed.ts
frontend/src/lib/desk/types.ts
frontend/src/lib/api.ts                FastAPI client (split mode)
frontend/src/styles.css
```

## backend/

```
backend/app/main.py         FastAPI + /api/v1/*
backend/app/market.py       Yahoo tape + RSS wire
backend/app/paper.py        paper executor, SL/TP, persist
backend/app/agents.py       12 agents + xAI grok-4.5
backend/app/universe.py     TASI 12 + NAME_KEYS
backend/app/indicators.py   RSI / SMA / vol / beta
backend/app/config.py
backend/requirements.txt
backend/.env.example
```

## app-builder/

Full TanStack Start tree that the live preview runs. Server functions:

```
app-builder/src/lib/desk/market.ts      loadMarketTape / loadMarketWire
app-builder/src/lib/desk/run-agent.ts   runDeskAgent
app-builder/src/lib/desk/store.ts       paper broker
```

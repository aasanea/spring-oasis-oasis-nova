# Abdullah-BANK — Engineering Handover Document (Markdown Mirror)

**allnote.docx → abdullahnote.md — 1:1 Lossless Translation**

**Repository:** `Abdullah-BANK`    •    **Generated:** 2026-06-16 08:03:08 UTC

---

# Section 1 — Polyglot Architectural Overview & Core Dependencies

Factual core system overview extracted from main entry points and configuration manifests.

## 1.1 Detected Main Entry Points

| Path | Responsibility | Line Count | Citation |
| --- | --- | --- | --- |
| backend/app/main.py | FastAPI ASGI application entry point | 244 | [backend/app/main.py:L1-L5] |
| frontend/src/app/page.tsx | Next.js App Router root page | 326 | [frontend/src/app/page.tsx:L1-L5] |
| frontend/src/app/layout.tsx | Next.js App Router root layout | 45 | [frontend/src/app/layout.tsx:L1-L5] |
| docker-compose.yml | Docker Compose service orchestrator | 133 | [docker-compose.yml:L1-L5] |

## 1.2 Auto-Detected Configuration Manifests

| Manifest Path | Language Ecosystem | Status | Citation |
| --- | --- | --- | --- |
| backend/requirements.txt | Python (pip) | Detected | [backend/requirements.txt:L1-L56] |
| backend/requirements-dev.txt | Python (dev) | Detected | [backend/requirements-dev.txt:L1-L19] |
| frontend/package.json | Node.js (npm/pnpm) | Detected | [frontend/package.json:L1-L46] |

## 1.3 Python Runtime Dependencies

| Package | Version | Source Manifest |
| --- | --- | --- |
| fastapi | 0.115.6 | backend/requirements.txt |
| uvicorn[standard] | 0.34.0 | backend/requirements.txt |
| python-multipart | 0.0.20         # For file uploads | backend/requirements.txt |
| sqlalchemy[asyncio] | 2.0.36 | backend/requirements.txt |
| asyncpg | 0.30.0                  # Async PostgreSQL driver | backend/requirements.txt |
| alembic | 1.14.0                  # Database migrations | backend/requirements.txt |
| pydantic | 2.10.4 | backend/requirements.txt |
| pydantic-settings | 2.7.0 | backend/requirements.txt |
| email-validator | 2.2.0 | backend/requirements.txt |
| httpx | 0.28.1 | backend/requirements.txt |
| aiohttp | 3.11.11 | backend/requirements.txt |
| numpy | 2.2.0 | backend/requirements.txt |
| pandas | 2.2.3 | backend/requirements.txt |
| ta | 0.11.0                       # Technical Analysis library | backend/requirements.txt |
| yfinance | 0.2.55                 # Market data | backend/requirements.txt |
| python-dateutil | 2.9.0.post0 | backend/requirements.txt |
| newsapi-python | 0.2.7            # News API client | backend/requirements.txt |
| feedparser | 6.0.11               # RSS feed parser | backend/requirements.txt |
| beautifulsoup4 | 4.14.2           # HTML parsing for web scraping (4.12.4 yanked for py3.12) | backend/requirements.txt |
| lxml | 5.3.0                      # XML/HTML parser | backend/requirements.txt |
| apscheduler | 3.11.0              # Async job scheduling | backend/requirements.txt |
| python-jose[cryptography] | 3.3.0 | backend/requirements.txt |
| passlib[bcrypt] | 1.7.4 | backend/requirements.txt |
| loguru | 0.7.3 | backend/requirements.txt |
| tenacity | 9.0.0                  # Retry logic | backend/requirements.txt |
| orjson | 3.10.12                  # Fast JSON | backend/requirements.txt |
| python-dotenv | 1.0.1             # .env loader (fallback) | backend/requirements.txt |
| websockets | 14.1 | backend/requirements.txt |
| pytest | 8.3.4 | backend/requirements-dev.txt |
| pytest-asyncio | 0.25.0 | backend/requirements-dev.txt |
| pytest-cov | 6.0.0 | backend/requirements-dev.txt |
| httpx | 0.28.1                    # For testing FastAPI endpoints | backend/requirements-dev.txt |
| black | 25.1.0 | backend/requirements-dev.txt |
| isort | 6.0.0 | backend/requirements-dev.txt |
| ruff | 0.8.4 | backend/requirements-dev.txt |
| mypy | 1.14.0 | backend/requirements-dev.txt |
| pre-commit | 4.0.1 | backend/requirements-dev.txt |

## 1.4 Node.js / TypeScript Runtime Dependencies

| Package | Version | Section | Source |
| --- | --- | --- | --- |
| @radix-ui/react-separator | 1.1.0 | dependencies | frontend/package.json |
| @radix-ui/react-slot | 1.1.0 | dependencies | frontend/package.json |
| @tanstack/react-query | 5.51.1 | dependencies | frontend/package.json |
| class-variance-authority | 0.7.0 | dependencies | frontend/package.json |
| clsx | 2.1.1 | dependencies | frontend/package.json |
| date-fns | 3.6.0 | dependencies | frontend/package.json |
| framer-motion | 11.3.8 | dependencies | frontend/package.json |
| lucide-react | 0.408.0 | dependencies | frontend/package.json |
| next | 14.2.5 | dependencies | frontend/package.json |
| react | 18.3.1 | dependencies | frontend/package.json |
| react-dom | 18.3.1 | dependencies | frontend/package.json |
| recharts | 2.12.7 | dependencies | frontend/package.json |
| socket.io-client | 4.7.5 | dependencies | frontend/package.json |
| sonner | 1.5.0 | dependencies | frontend/package.json |
| swr | 2.2.5 | dependencies | frontend/package.json |
| tailwind-merge | 2.4.0 | dependencies | frontend/package.json |
| zustand | 4.5.4 | dependencies | frontend/package.json |
| @types/node | 20.14.10 | devDependencies | frontend/package.json |
| @types/react | 18.3.3 | devDependencies | frontend/package.json |
| @types/react-dom | 18.3.0 | devDependencies | frontend/package.json |
| autoprefixer | 10.4.19 | devDependencies | frontend/package.json |
| eslint | 8.57.0 | devDependencies | frontend/package.json |
| eslint-config-next | 14.2.5 | devDependencies | frontend/package.json |
| postcss | 8.4.39 | devDependencies | frontend/package.json |
| postcss-import | 16.1.0 | devDependencies | frontend/package.json |
| tailwindcss | 3.4.6 | devDependencies | frontend/package.json |
| tailwindcss-animate | 1.0.7 | devDependencies | frontend/package.json |
| typescript | 5.5.3 | devDependencies | frontend/package.json |

---

# Section 2 — Monolith/Microservices Directory Map & Component Registry

## 2.1 Repository File Tree (Unicode)

```text
📁 Abdullah-BANK/
├─ 📁 backend/
│  ├─ 📁 alembic/
│  │  ├─ 📁 versions/
│  │  │  └─ 📄 0001_baseline.py
│  │  ├─ 📄 env.py
│  │  └─ 📄 script.py.mako
│  ├─ 📁 app/
│  │  ├─ 📁 agents/
│  │  │  ├─ 📁 prompts/
│  │  │  │  ├─ 📄 __init__.py
│  │  │  │  ├─ 📄 correlation.py
│  │  │  │  ├─ 📄 fundamental.py
│  │  │  │  ├─ 📄 macro.py
│  │  │  │  ├─ 📄 market_structure.py
│  │  │  │  ├─ 📄 news.py
│  │  │  │  ├─ 📄 regime.py
│  │  │  │  ├─ 📄 risk.py
│  │  │  │  ├─ 📄 self_healing.py
│  │  │  │  ├─ 📄 sentiment.py
│  │  │  │  ├─ 📄 strategy.py
│  │  │  │  ├─ 📄 technical.py
│  │  │  │  └─ 📄 volatility.py
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 base.py
│  │  │  ├─ 📄 correlation_agent.py
│  │  │  ├─ 📄 fundamental_agent.py
│  │  │  ├─ 📄 macro_agent.py
│  │  │  ├─ 📄 market_structure_agent.py
│  │  │  ├─ 📄 news_agent.py
│  │  │  ├─ 📄 regime_agent.py
│  │  │  ├─ 📄 registry.py
│  │  │  ├─ 📄 risk_agent.py
│  │  │  ├─ 📄 self_healing_agent.py
│  │  │  ├─ 📄 sentiment_agent.py
│  │  │  ├─ 📄 strategy_agent.py
│  │  │  ├─ 📄 technical_agent.py
│  │  │  └─ 📄 volatility_agent.py
│  │  ├─ 📁 api/
│  │  │  ├─ 📁 v1/
│  │  │  │  ├─ 📁 endpoints/
│  │  │  │  │  ├─ 📄 __init__.py
│  │  │  │  │  ├─ 📄 agents.py
│  │  │  │  │  ├─ 📄 orders.py
│  │  │  │  │  ├─ 📄 performance.py
│  │  │  │  │  ├─ 📄 portfolio.py
│  │  │  │  │  ├─ 📄 self_healing.py
│  │  │  │  │  └─ 📄 strategy.py
│  │  │  │  └─ 📄 __init__.py
│  │  │  ├─ 📄 __init__.py
│  │  │  └─ 📄 websocket.py
│  │  ├─ 📁 core/
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 config.py
│  │  │  ├─ 📄 error_recorder.py
│  │  │  └─ 📄 logging.py
│  │  ├─ 📁 db/
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 base.py
│  │  │  ├─ 📄 init_db.py
│  │  │  └─ 📄 session.py
│  │  ├─ 📁 models/
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 agent_analysis.py
│  │  │  ├─ 📄 agent_configuration.py
│  │  │  ├─ 📄 asset.py
│  │  │  ├─ 📄 error_log.py
│  │  │  ├─ 📄 news_article.py
│  │  │  ├─ 📄 order_execution.py
│  │  │  ├─ 📄 performance_metric.py
│  │  │  ├─ 📄 price_history.py
│  │  │  ├─ 📄 trading_signal.py
│  │  │  └─ 📄 watchlist.py
│  │  ├─ 📁 scheduler/
│  │  │  ├─ 📄 __init__.py
│  │  │  └─ 📄 jobs.py
│  │  ├─ 📁 schemas/
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 agent_analysis.py
│  │  │  ├─ 📄 agent_configuration.py
│  │  │  ├─ 📄 asset.py
│  │  │  ├─ 📄 error_log.py
│  │  │  ├─ 📄 news_article.py
│  │  │  ├─ 📄 order_execution.py
│  │  │  ├─ 📄 performance_metric.py
│  │  │  ├─ 📄 price_history.py
│  │  │  ├─ 📄 trading_signal.py
│  │  │  └─ 📄 watchlist.py
│  │  ├─ 📁 services/
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 alert_service.py
│  │  │  ├─ 📄 circuit_breaker.py
│  │  │  ├─ 📄 data_fetcher.py
│  │  │  ├─ 📄 health_monitor.py
│  │  │  ├─ 📄 news_fetcher.py
│  │  │  └─ 📄 recovery_actions.py
│  │  ├─ 📁 strategy/
│  │  │  ├─ 📄 __init__.py
│  │  │  ├─ 📄 order_manager.py
│  │  │  ├─ 📄 paper_executor.py
│  │  │  ├─ 📄 performance_tracker.py
│  │  │  └─ 📄 portfolio_manager.py
│  │  ├─ 📄 __init__.py
│  │  └─ 📄 main.py
│  ├─ 📁 logs/
│  │  ├─ 📄 app_2026-06-15.log
│  │  ├─ 📄 app_2026-06-16.log
│  │  ├─ 📄 errors_2026-06-15.log
│  │  └─ 📄 errors_2026-06-16.log
│  ├─ 📁 scripts/
│  │  ├─ 📄 __init__.py
│  │  ├─ 📄 fetch_data.py
│  │  ├─ 📄 init_db.py
│  │  └─ 📄 seed_assets.py
│  ├─ 📄 .env
│  ├─ 📄 .env.example
│  ├─ 📄 _check_new_files.py
│  ├─ 📄 _check_ollama.py
│  ├─ 📄 _dump_lines.py
│  ├─ 📄 _e2e_output.log
│  ├─ 📄 _e2e_run.log
│  ├─ 📄 _e2e_run.out
│  ├─ 📄 _e2e_run.py
│  ├─ 📄 _e2e_run_new.out
│  ├─ 📄 _e2e_server.log
│  ├─ 📄 _e2e_stdout.log
│  ├─ 📄 _final_e2e_report.log
│  ├─ 📄 _grep_log.out
│  ├─ 📄 _grep_log.py
│  ├─ 📄 _grep_log2.py
│  ├─ 📄 _install_deps.py
│  ├─ 📄 _install_pyo314.py
│  ├─ 📄 _perf_search.txt
│  ├─ 📄 _pg_or_sqlite.py
│  ├─ 📄 _phase4_2_pipeline_test.py
│  ├─ 📄 _phase5_3_frontend_binding_test.py
│  ├─ 📄 _phase5_server_test.py
│  ├─ 📄 _phase6_self_healing_test.py
│  ├─ 📄 _phase7_error_logging_test.py
│  ├─ 📄 _run_e2e_sahmk.py
│  ├─ 📄 _run_e2e_snapshot.py
│  ├─ 📄 _syntax_check.py
│  ├─ 📄 _verify_all_9_agents.py
│  ├─ 📄 _verify_imports.py
│  ├─ 📄 _verify_routing.py
│  ├─ 📄 alembic.ini
│  ├─ 📄 Dockerfile
│  ├─ 📄 requirements-dev.txt
│  ├─ 📄 requirements.txt
│  └─ 📄 requirements.txt.bak
├─ 📁 frontend/
│  ├─ 📁 .next/
│  │  ├─ 📁 cache/
│  │  │  ├─ 📁 swc/
│  │  │  │  └─ 📁 plugins/
│  │  │  │     └─ 📁 v7_windows_x86_64_0.106.15/
│  │  │  └─ 📁 webpack/
│  │  │     ├─ 📁 client-development/
│  │  │     │  ├─ 📄 0.pack.gz
│  │  │     │  ├─ 📄 1.pack.gz
│  │  │     │  ├─ 📄 10.pack.gz
│  │  │     │  ├─ 📄 11.pack.gz
│  │  │     │  ├─ 📄 12.pack.gz
│  │  │     │  ├─ 📄 13.pack.gz
│  │  │     │  ├─ 📄 14.pack.gz
│  │  │     │  ├─ 📄 2.pack.gz
│  │  │     │  ├─ 📄 3.pack.gz
│  │  │     │  ├─ 📄 4.pack.gz
│  │  │     │  ├─ 📄 5.pack.gz
│  │  │     │  ├─ 📄 6.pack.gz
│  │  │     │  ├─ 📄 7.pack.gz
│  │  │     │  ├─ 📄 8.pack.gz
│  │  │     │  ├─ 📄 9.pack.gz
│  │  │     │  ├─ 📄 index.pack.gz
│  │  │     │  └─ 📄 index.pack.gz.old
│  │  │     └─ 📁 server-development/
│  │  │        ├─ 📄 0.pack.gz
│  │  │        ├─ 📄 1.pack.gz
│  │  │        ├─ 📄 2.pack.gz
│  │  │        ├─ 📄 3.pack.gz
│  │  │        ├─ 📄 4.pack.gz
│  │  │        ├─ 📄 5.pack.gz
│  │  │        ├─ 📄 6.pack.gz
│  │  │        ├─ 📄 7.pack.gz
│  │  │        ├─ 📄 8.pack.gz
│  │  │        ├─ 📄 9.pack.gz
│  │  │        ├─ 📄 index.pack.gz
│  │  │        └─ 📄 index.pack.gz.old
│  │  ├─ 📁 server/
│  │  │  ├─ 📁 app/
│  │  │  │  ├─ 📁 agents/
│  │  │  │  │  ├─ 📄 page.js
│  │  │  │  │  └─ 📄 page_client-reference-manifest.js
│  │  │  │  ├─ 📁 orders/
│  │  │  │  │  ├─ 📄 page.js
│  │  │  │  │  └─ 📄 page_client-reference-manifest.js
│  │  │  │  ├─ 📁 performance/
│  │  │  │  │  ├─ 📄 page.js
│  │  │  │  │  └─ 📄 page_client-reference-manifest.js
│  │  │  │  ├─ 📁 portfolio/
│  │  │  │  │  ├─ 📄 page.js
│  │  │  │  │  └─ 📄 page_client-reference-manifest.js
│  │  │  │  ├─ 📄 page.js
│  │  │  │  └─ 📄 page_client-reference-manifest.js
│  │  │  ├─ 📁 pages/
│  │  │  │  ├─ 📄 _app.js
│  │  │  │  ├─ 📄 _document.js
│  │  │  │  └─ 📄 _error.js
│  │  │  ├─ 📁 vendor-chunks/
│  │  │  │  ├─ 📄 @swc.js
│  │  │  │  ├─ 📄 @tanstack.js
│  │  │  │  ├─ 📄 clsx.js
│  │  │  │  ├─ 📄 lucide-react.js
│  │  │  │  ├─ 📄 next.js
│  │  │  │  ├─ 📄 sonner.js
│  │  │  │  └─ 📄 tailwind-merge.js
│  │  │  ├─ 📄 _error.js
│  │  │  ├─ 📄 app-paths-manifest.json
│  │  │  ├─ 📄 interception-route-rewrite-manifest.js
│  │  │  ├─ 📄 middleware-build-manifest.js
│  │  │  ├─ 📄 middleware-manifest.json
│  │  │  ├─ 📄 middleware-react-loadable-manifest.js
│  │  │  ├─ 📄 next-font-manifest.js
│  │  │  ├─ 📄 next-font-manifest.json
│  │  │  ├─ 📄 pages-manifest.json
│  │  │  ├─ 📄 server-reference-manifest.js
│  │  │  ├─ 📄 server-reference-manifest.json
│  │  │  └─ 📄 webpack-runtime.js
│  │  ├─ 📁 static/
│  │  │  ├─ 📁 chunks/
│  │  │  │  ├─ 📁 app/
│  │  │  │  │  ├─ 📁 agents/
│  │  │  │  │  │  └─ 📄 page.js
│  │  │  │  │  ├─ 📁 orders/
│  │  │  │  │  │  └─ 📄 page.js
│  │  │  │  │  ├─ 📁 performance/
│  │  │  │  │  │  └─ 📄 page.js
│  │  │  │  │  ├─ 📁 portfolio/
│  │  │  │  │  │  └─ 📄 page.js
│  │  │  │  │  ├─ 📄 layout.js
│  │  │  │  │  └─ 📄 page.js
│  │  │  │  ├─ 📁 pages/
│  │  │  │  │  ├─ 📄 _app.js
│  │  │  │  │  └─ 📄 _error.js
│  │  │  │  ├─ 📄 _error.js
│  │  │  │  ├─ 📄 app-pages-internals.js
│  │  │  │  ├─ 📄 main-app.js
│  │  │  │  ├─ 📄 main.js
│  │  │  │  ├─ 📄 polyfills.js
│  │  │  │  ├─ 📄 react-refresh.js
│  │  │  │  └─ 📄 webpack.js
│  │  │  ├─ 📁 css/
│  │  │  │  └─ 📁 app/
│  │  │  │     └─ 📄 layout.css
│  │  │  ├─ 📁 development/
│  │  │  │  ├─ 📄 _buildManifest.js
│  │  │  │  └─ 📄 _ssgManifest.js
│  │  │  └─ 📁 webpack/
│  │  │     ├─ 📁 app/
│  │  │     │  └─ 📄 layout.f84f4be245897046.hot-update.js
│  │  │     ├─ 📄 0a7b4993ac105931.webpack.hot-update.json
│  │  │     ├─ 📄 39b16b6a95505c29.webpack.hot-update.json
│  │  │     ├─ 📄 4bcdf8a7e3d1a609.webpack.hot-update.json
│  │  │     ├─ 📄 633457081244afec._.hot-update.json
│  │  │     ├─ 📄 961500791fc0edc4.webpack.hot-update.json
│  │  │     ├─ 📄 c590bd18c0c9d116.webpack.hot-update.json
│  │  │     ├─ 📄 f84f4be245897046.webpack.hot-update.json
│  │  │     ├─ 📄 webpack.0a7b4993ac105931.hot-update.js
│  │  │     ├─ 📄 webpack.39b16b6a95505c29.hot-update.js
│  │  │     ├─ 📄 webpack.4bcdf8a7e3d1a609.hot-update.js
│  │  │     ├─ 📄 webpack.961500791fc0edc4.hot-update.js
│  │  │     ├─ 📄 webpack.c590bd18c0c9d116.hot-update.js
│  │  │     └─ 📄 webpack.f84f4be245897046.hot-update.js
│  │  ├─ 📁 types/
│  │  │  ├─ 📁 app/
│  │  │  │  ├─ 📁 agents/
│  │  │  │  │  └─ 📄 page.ts
│  │  │  │  ├─ 📁 orders/
│  │  │  │  │  └─ 📄 page.ts
│  │  │  │  ├─ 📁 performance/
│  │  │  │  │  └─ 📄 page.ts
│  │  │  │  ├─ 📁 portfolio/
│  │  │  │  │  └─ 📄 page.ts
│  │  │  │  ├─ 📄 layout.ts
│  │  │  │  └─ 📄 page.ts
│  │  │  └─ 📄 package.json
│  │  ├─ 📄 app-build-manifest.json
│  │  ├─ 📄 build-manifest.json
│  │  ├─ 📄 package.json
│  │  ├─ 📄 react-loadable-manifest.json
│  │  └─ 📄 trace
│  ├─ 📁 src/
│  │  ├─ 📁 app/
│  │  │  ├─ 📁 agents/
│  │  │  │  └─ 📄 page.tsx
│  │  │  ├─ 📁 orders/
│  │  │  │  └─ 📄 page.tsx
│  │  │  ├─ 📁 performance/
│  │  │  │  └─ 📄 page.tsx
│  │  │  ├─ 📁 portfolio/
│  │  │  │  └─ 📄 page.tsx
│  │  │  ├─ 📄 globals.css
│  │  │  ├─ 📄 layout.tsx
│  │  │  └─ 📄 page.tsx
│  │  ├─ 📁 components/
│  │  │  ├─ 📁 ui/
│  │  │  │  ├─ 📄 badge.tsx
│  │  │  │  ├─ 📄 button.tsx
│  │  │  │  ├─ 📄 card.tsx
│  │  │  │  ├─ 📄 input.tsx
│  │  │  │  ├─ 📄 separator.tsx
│  │  │  │  └─ 📄 skeleton.tsx
│  │  │  ├─ 📄 agent-badge.tsx
│  │  │  ├─ 📄 glass-card.tsx
│  │  │  ├─ 📄 live-pnl-ticker.tsx
│  │  │  ├─ 📄 metric-tile.tsx
│  │  │  ├─ 📄 position-row.tsx
│  │  │  ├─ 📄 providers.tsx
│  │  │  ├─ 📄 run-agent-button.tsx
│  │  │  ├─ 📄 sidebar.tsx
│  │  │  ├─ 📄 sparkline-chart.tsx
│  │  │  └─ 📄 topbar.tsx
│  │  ├─ 📁 lib/
│  │  │  ├─ 📄 api.ts
│  │  │  ├─ 📄 utils.ts
│  │  │  └─ 📄 websocket.ts
│  │  └─ 📄 globals.d.ts
│  ├─ 📄 .env
│  ├─ 📄 .env.example
│  ├─ 📄 .gitignore
│  ├─ 📄 components.json
│  ├─ 📄 next-env.d.ts
│  ├─ 📄 next.config.mjs
│  ├─ 📄 package-lock.json
│  ├─ 📄 package.json
│  ├─ 📄 postcss.config.js
│  ├─ 📄 tailwind.config.ts
│  ├─ 📄 tsconfig.json
│  └─ 📄 tsconfig.tsbuildinfo
├─ 📁 logs/
│  ├─ 📄 docker_down.log
│  └─ 📄 start_run.log
├─ 📄 .claude_summary.md
├─ 📄 .env
├─ 📄 .gitignore
├─ 📄 _run_test.ps1
├─ 📄 _test_curl_isolated.bat
├─ 📄 _test_start_syntax.bat
├─ 📄 _test_stderr.log
├─ 📄 _test_stdout.log
├─ 📄 abdullahnote.md
├─ 📄 allnote.docx
├─ 📄 docker-compose.yml
├─ 📄 generate_abdullahnote_md.py
├─ 📄 generate_allnote.py
├─ 📄 LICENSE
├─ 📄 README.md
├─ 📄 start_system.bat
├─ 📄 status_system.ps1
├─ 📄 stop_system.bat
├─ 📄 verify_phase4.py
└─ 📄 verify_phase6.py
```

## 2.2 Technical Component Registry

| Component Path | Technical Responsibility | Active Direct Imports | Line Reference |
| --- | --- | --- | --- |
| backend/_check_new_files.py | Defines function `main` (sync) | __future__.annotations, importlib, pathlib.Path, py_compile, sys | [backend/_check_new_files.py:L31-L78] |
| backend/_check_ollama.py | Module file (no top-level functions/classes) | json, sys, urllib.error, urllib.request | [backend/_check_ollama.py:L1] |
| backend/_dump_lines.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/_dump_lines.py:L1] |
| backend/_e2e_run.py | Defines function `_probe_postgres` (sync) | __future__.annotations, _pg_or_sqlite, app.db.init_db.create_all_tables, app.db.session.engine, app.models.asset.Asset, app.models.price_history.PriceHistory | [backend/_e2e_run.py:L42-L47] |
| backend/_grep_log.py | Module file (no top-level functions/classes) | pathlib.Path, sys | [backend/_grep_log.py:L1] |
| backend/_grep_log2.py | Module file (no top-level functions/classes) | pathlib.Path, re, sys | [backend/_grep_log2.py:L1] |
| backend/_install_deps.py | Module file (no top-level functions/classes) | subprocess, sys | [backend/_install_deps.py:L1] |
| backend/_install_pyo314.py | Module file (no top-level functions/classes) | subprocess, sys | [backend/_install_pyo314.py:L1] |
| backend/_pg_or_sqlite.py | Defines function `_probe_postgres` (sync) | __future__.annotations, os, pathlib.Path, socket, sqlalchemy.JSON, sqlalchemy.String | [backend/_pg_or_sqlite.py:L26-L32] |
| backend/_phase4_2_pipeline_test.py | Defines function `_build_engine` (sync) | __future__.annotations, _pg_or_sqlite._probe_postgres, _pg_or_sqlite.resolve_db_url, app.core.config.get_settings, app.core.logging.logger, app.db.base.Base | [backend/_phase4_2_pipeline_test.py:L112-L128] |
| backend/_phase5_3_frontend_binding_test.py | Defines function `_check_next_config` (sync) | __future__.annotations, asyncio, httpx, json, os, pathlib.Path | [backend/_phase5_3_frontend_binding_test.py:L46-L63] |
| backend/_phase5_server_test.py | Defines function `_port_is_free` (sync) | __future__.annotations, asyncio, httpx, json, os, pathlib.Path | [backend/_phase5_server_test.py:L46-L55] |
| backend/_phase6_self_healing_test.py | Defines function `test_circuit_breaker_opens` (async) | __future__.annotations, _pg_or_sqlite.resolve_db_url, app.core.logging.setup_logging, app.db.base.Base, app.models.error_log.SystemErrorLog, app.services.circuit_breaker.BreakerState | [backend/_phase6_self_healing_test.py:L73-L141] |
| backend/_phase7_error_logging_test.py | Defines function `test_error_logging` (async) | __future__.annotations, _pg_or_sqlite.resolve_db_url, app.core.error_recorder.log_error_to_db, app.core.logging.setup_logging, app.db.base.Base, app.models.error_log.SystemErrorLog | [backend/_phase7_error_logging_test.py:L70-L264] |
| backend/_run_e2e_sahmk.py | Module file (no top-level functions/classes) | os, subprocess, sys | [backend/_run_e2e_sahmk.py:L1] |
| backend/_run_e2e_snapshot.py | Module file (no top-level functions/classes) | os, subprocess, sys | [backend/_run_e2e_snapshot.py:L1] |
| backend/_syntax_check.py | Defines function `main` (sync) | __future__.annotations, pathlib.Path, py_compile, sys | [backend/_syntax_check.py:L101-L126] |
| backend/_verify_all_9_agents.py | Defines function `main` (sync) | app.agents.base.AgentType, app.agents.correlation_agent.CorrelationAgent, app.agents.fundamental_agent.FundamentalAgent, app.agents.macro_agent.MacroAgent, app.agents.market_structure_agent.MarketStructureAgent, app.agents.news_agent.NewsAgent | [backend/_verify_all_9_agents.py:L37-L77] |
| backend/_verify_imports.py | Module file (no top-level functions/classes) | importlib, pathlib.Path, subprocess, sys, traceback | [backend/_verify_imports.py:L1] |
| backend/_verify_routing.py | Module file (no top-level functions/classes) | app.core.config.get_settings, app.services.data_fetcher.DataFetcher, app.services.data_fetcher.DataFetcherError, app.services.data_fetcher.SAHMK_BASE_URL, app.services.data_fetcher.SAHMK_HISTORICAL_PATH, app.services.data_fetcher.SAHMK_QUOTE_PATH | [backend/_verify_routing.py:L1] |
| backend/alembic/env.py | Defines function `_build_sync_url` (sync) | __future__.annotations, alembic.context, app.core.config.get_settings, app.db.base.Base, app.models.agent_analysis, app.models.agent_configuration | [backend/alembic/env.py:L67-L76] |
| backend/alembic/versions/0001_baseline.py | Defines function `upgrade` (sync) | __future__.annotations, alembic.op, sqlalchemy, sqlalchemy.dialects.postgresql, typing.Sequence, typing.Union | [backend/alembic/versions/0001_baseline.py:L40-L528] |
| backend/app/__init__.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/app/__init__.py:L1] |
| backend/app/agents/__init__.py | Module file (no top-level functions/classes) | __future__.annotations, app.agents.base.AgentError, app.agents.base.AgentExecutionError, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType | [backend/app/agents/__init__.py:L1] |
| backend/app/agents/base.py | Defines class `AgentType` and 14 function(s) | __future__.annotations, abc.ABC, abc.abstractmethod, app.core.config.settings, app.core.error_recorder.log_error_to_db, app.models.agent_analysis.AgentAnalysis | [backend/app/agents/base.py:L56-L70] |
| backend/app/agents/correlation_agent.py | Defines class `CorrelationOutput` and 8 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/correlation_agent.py:L33-L41] |
| backend/app/agents/fundamental_agent.py | Defines class `FundamentalOutput` and 3 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/fundamental_agent.py:L33-L39] |
| backend/app/agents/macro_agent.py | Defines class `MacroOutput` and 4 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/macro_agent.py:L37-L43] |
| backend/app/agents/market_structure_agent.py | Defines class `MarketStructureOutput` and 8 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/market_structure_agent.py:L37-L46] |
| backend/app/agents/news_agent.py | Defines class `NewsOutput` and 4 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/news_agent.py:L34-L39] |
| backend/app/agents/prompts/__init__.py | Module file (no top-level functions/classes) | app.agents.prompts.correlation, app.agents.prompts.fundamental, app.agents.prompts.macro, app.agents.prompts.market_structure, app.agents.prompts.news, app.agents.prompts.regime | [backend/app/agents/prompts/__init__.py:L1] |
| backend/app/agents/prompts/correlation.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/correlation.py:L53-L129] |
| backend/app/agents/prompts/fundamental.py | Defines function `_format_metric` (sync) | __future__.annotations, json, typing.Any | [backend/app/agents/prompts/fundamental.py:L99-L114] |
| backend/app/agents/prompts/macro.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/macro.py:L48-L106] |
| backend/app/agents/prompts/market_structure.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/market_structure.py:L48-L170] |
| backend/app/agents/prompts/news.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/news.py:L47-L100] |
| backend/app/agents/prompts/regime.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/regime.py:L50-L148] |
| backend/app/agents/prompts/risk.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/risk.py:L53-L141] |
| backend/app/agents/prompts/self_healing.py | Defines function `build_user_prompt` (sync) | __future__.annotations, json, typing.Any | [backend/app/agents/prompts/self_healing.py:L106-L141] |
| backend/app/agents/prompts/sentiment.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/sentiment.py:L47-L101] |
| backend/app/agents/prompts/strategy.py | Defines function `build_user_prompt` (sync) | __future__.annotations, json, typing.Any | [backend/app/agents/prompts/strategy.py:L34-L100] |
| backend/app/agents/prompts/technical.py | Defines function `_ema` (sync) | __future__.annotations, math, typing.Any | [backend/app/agents/prompts/technical.py:L27-L35] |
| backend/app/agents/prompts/volatility.py | Defines function `build_user_prompt` (sync) | __future__.annotations, typing.Any | [backend/app/agents/prompts/volatility.py:L52-L121] |
| backend/app/agents/regime_agent.py | Defines class `RegimeOutput` and 9 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/regime_agent.py:L34-L45] |
| backend/app/agents/registry.py | Defines class `AgentInfo` and 11 function(s) | __future__.annotations, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.correlation_agent.CorrelationAgent, app.agents.fundamental_agent.FundamentalAgent | [backend/app/agents/registry.py:L46-L54] |
| backend/app/agents/risk_agent.py | Defines class `RiskOutput` and 4 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/risk_agent.py:L36-L46] |
| backend/app/agents/self_healing_agent.py | Defines class `ErrorPattern` and 5 function(s) | __future__.annotations, app.agents.base.AgentExecutionError, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.AnalysisStatus | [backend/app/agents/self_healing_agent.py:L72-L74] |
| backend/app/agents/sentiment_agent.py | Defines class `SentimentOutput` and 7 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/sentiment_agent.py:L35-L41] |
| backend/app/agents/strategy_agent.py | Defines class `StrategyOutput` and 3 function(s) | __future__.annotations, app.agents.base.AgentExecutionError, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.AnalysisStatus | [backend/app/agents/strategy_agent.py:L40-L74] |
| backend/app/agents/technical_agent.py | Defines class `TechnicalOutput` and 4 function(s) | __future__.annotations, app.agents.base.AgentExecutionError, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.AnalysisStatus | [backend/app/agents/technical_agent.py:L42-L54] |
| backend/app/agents/volatility_agent.py | Defines class `VolatilityOutput` and 8 function(s) | __future__.annotations, app.agents.base.AgentInput, app.agents.base.AgentOutput, app.agents.base.AgentType, app.agents.base.BaseAgent, app.agents.base.Recommendation | [backend/app/agents/volatility_agent.py:L34-L42] |
| backend/app/api/__init__.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/app/api/__init__.py:L1] |
| backend/app/api/v1/__init__.py | Module file (no top-level functions/classes) | __future__.annotations, app.api.v1.endpoints.agents, app.api.v1.endpoints.orders, app.api.v1.endpoints.performance, app.api.v1.endpoints.portfolio, app.api.v1.endpoints.self_healing | [backend/app/api/v1/__init__.py:L1] |
| backend/app/api/v1/endpoints/__init__.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/app/api/v1/endpoints/__init__.py:L1] |
| backend/app/api/v1/endpoints/agents.py | Defines class `AgentInfoResponse` and 6 function(s) | __future__.annotations, app.agents.registry.agent_registry, app.agents.registry.get_agent, app.core.logging.logger, app.db.session.get_db, app.models.agent_analysis.AgentAnalysis | [backend/app/api/v1/endpoints/agents.py:L33-L41] |
| backend/app/api/v1/endpoints/orders.py | Defines function `_order_to_dict` (sync) | __future__.annotations, app.core.logging.logger, app.db.session.get_db, app.models.order_execution.OrderExecution, app.models.price_history.PriceHistory, app.strategy.order_manager.OrderManager | [backend/app/api/v1/endpoints/orders.py:L33-L52] |
| backend/app/api/v1/endpoints/performance.py | Defines class `CalculateRequest` and 4 function(s) | __future__.annotations, app.db.session.get_db, app.models.performance_metric.PerformanceMetric, app.strategy.performance_tracker.PerformanceTracker, datetime.datetime, fastapi.APIRouter | [backend/app/api/v1/endpoints/performance.py:L33-L40] |
| backend/app/api/v1/endpoints/portfolio.py | Defines function `get_positions` (async) | __future__.annotations, app.core.logging.logger, app.db.session.get_db, app.models.asset.Asset, app.models.price_history.PriceHistory, app.strategy.order_manager.OrderManager | [backend/app/api/v1/endpoints/portfolio.py:L40-L46] |
| backend/app/api/v1/endpoints/self_healing.py | Defines class `ComponentHealthResponse` and 8 function(s) | __future__.annotations, app.agents.base.AgentExecutionError, app.agents.registry.get_agent, app.core.config.settings, app.core.logging.logger, app.db.session.get_db | [backend/app/api/v1/endpoints/self_healing.py:L55-L60] |
| backend/app/api/v1/endpoints/strategy.py | Defines function `_load_asset` (async) | __future__.annotations, app.core.logging.logger, app.db.session.get_db, app.models.asset.Asset, app.strategy.portfolio_manager.PortfolioManager, fastapi.APIRouter | [backend/app/api/v1/endpoints/strategy.py:L32-L41] |
| backend/app/api/websocket.py | Defines class `ConnectionManager` and 9 function(s) | __future__.annotations, app.core.config.get_settings, app.db.session.AsyncSessionLocal, app.models.order_execution.OrderExecution, app.models.price_history.PriceHistory, asyncio | [backend/app/api/websocket.py:L40-L93] |
| backend/app/core/__init__.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/app/core/__init__.py:L1] |
| backend/app/core/config.py | Defines class `AppSettings` and 6 function(s) | __future__.annotations, functools.lru_cache, pydantic.Field, pydantic.PostgresDsn, pydantic.RedisDsn, pydantic.field_validator | [backend/app/core/config.py:L17-L46] |
| backend/app/core/error_recorder.py | Defines function `_coerce_level` (sync) | __future__.annotations, app.models.error_log.SystemErrorLog, datetime.datetime, datetime.timezone, inspect, loguru.logger | [backend/app/core/error_recorder.py:L29-L40] |
| backend/app/core/logging.py | Defines class `InterceptHandler` and 3 function(s) | __future__.annotations, app.core.config.get_settings, logging, loguru.logger, pathlib.Path, sys | [backend/app/core/logging.py:L25-L60] |
| backend/app/db/__init__.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/app/db/__init__.py:L1] |
| backend/app/db/base.py | Defines class `Base` and 3 function(s) | __future__.annotations, datetime.datetime, sqlalchemy.DateTime, sqlalchemy.MetaData, sqlalchemy.dialects.postgresql.UUID, sqlalchemy.func | [backend/app/db/base.py:L31-L112] |
| backend/app/db/init_db.py | Defines function `create_all_tables` (async) | __future__.annotations, app.core.logging.logger, app.db.base.Base, app.db.session.engine, app.db.session.get_db_context, app.models | [backend/app/db/init_db.py:L22-L58] |
| backend/app/db/session.py | Defines function `get_db` (async) | __future__.annotations, app.core.config.get_settings, app.core.logging.logger, contextlib.asynccontextmanager, sqlalchemy.ext.asyncio.AsyncEngine, sqlalchemy.ext.asyncio.AsyncSession | [backend/app/db/session.py:L53-L70] |
| backend/app/main.py | Defines function `lifespan` (async) | __future__.annotations, app.api.v1.api_router, app.api.websocket.manager, app.api.websocket.start_broadcast_task, app.api.websocket.stop_broadcast_task, app.core.config.get_settings | [backend/app/main.py:L47-L88] |
| backend/app/models/__init__.py | Module file (no top-level functions/classes) | app.db.base.Base, app.models.agent_analysis.AgentAnalysis, app.models.agent_configuration.AgentConfiguration, app.models.asset.Asset, app.models.error_log.SystemErrorLog, app.models.news_article.NewsArticle | [backend/app/models/__init__.py:L1] |
| backend/app/models/agent_analysis.py | Defines class `AgentAnalysis` and 1 function(s) | __future__.annotations, app.db.base.Base, app.models.asset.Asset, sqlalchemy.CheckConstraint, sqlalchemy.Float, sqlalchemy.ForeignKey | [backend/app/models/agent_analysis.py:L28-L132] |
| backend/app/models/agent_configuration.py | Defines class `AgentConfiguration` and 2 function(s) | __future__.annotations, app.db.base.Base, datetime.datetime, sqlalchemy.Boolean, sqlalchemy.CheckConstraint, sqlalchemy.DateTime | [backend/app/models/agent_configuration.py:L27-L236] |
| backend/app/models/asset.py | Defines class `Asset` and 1 function(s) | __future__.annotations, app.db.base.Base, app.models.agent_analysis.AgentAnalysis, app.models.news_article.NewsArticle, app.models.order_execution.OrderExecution, app.models.price_history.PriceHistory | [backend/app/models/asset.py:L25-L135] |
| backend/app/models/error_log.py | Defines class `SystemErrorLog` and 1 function(s) | __future__.annotations, app.db.base.Base, datetime.datetime, sqlalchemy.Boolean, sqlalchemy.CheckConstraint, sqlalchemy.DateTime | [backend/app/models/error_log.py:L24-L139] |
| backend/app/models/news_article.py | Defines class `NewsArticle` and 1 function(s) | __future__.annotations, app.db.base.Base, app.models.asset.Asset, datetime.datetime, sqlalchemy.Boolean, sqlalchemy.CheckConstraint | [backend/app/models/news_article.py:L31-L190] |
| backend/app/models/order_execution.py | Defines class `OrderExecution` and 1 function(s) | __future__.annotations, app.db.base.Base, app.models.asset.Asset, app.models.trading_signal.TradingSignal, datetime.datetime, sqlalchemy.Boolean | [backend/app/models/order_execution.py:L32-L188] |
| backend/app/models/performance_metric.py | Defines class `PerformanceMetric` and 1 function(s) | __future__.annotations, app.db.base.Base, datetime.datetime, sqlalchemy.CheckConstraint, sqlalchemy.DateTime, sqlalchemy.Float | [backend/app/models/performance_metric.py:L25-L204] |
| backend/app/models/price_history.py | Defines class `PriceHistory` and 6 function(s) | __future__.annotations, app.db.base.Base, app.models.asset.Asset, datetime.datetime, decimal.Decimal, sqlalchemy.BigInteger | [backend/app/models/price_history.py:L47-L261] |
| backend/app/models/trading_signal.py | Defines class `TradingSignal` and 3 function(s) | __future__.annotations, app.db.base.Base, app.models.asset.Asset, app.models.order_execution.OrderExecution, datetime.datetime, datetime.timezone | [backend/app/models/trading_signal.py:L35-L186] |
| backend/app/models/watchlist.py | Defines class `Watchlist` and 1 function(s) | __future__.annotations, app.db.base.Base, app.models.asset.Asset, sqlalchemy.Boolean, sqlalchemy.CheckConstraint, sqlalchemy.DateTime | [backend/app/models/watchlist.py:L31-L121] |
| backend/app/scheduler/__init__.py | Module file (no top-level functions/classes) | __future__.annotations, app.scheduler.jobs.SchedulerManager, app.scheduler.jobs.fetch_news_job, app.scheduler.jobs.fetch_prices_job, app.scheduler.jobs.get_scheduler, app.scheduler.jobs.shutdown_scheduler | [backend/app/scheduler/__init__.py:L1] |
| backend/app/scheduler/jobs.py | Defines class `SchedulerManager` and 11 function(s) | __future__.annotations, app.agents.registry.get_agent, app.core.config.get_settings, app.db.session.AsyncSessionLocal, app.services.data_fetcher.fetch_all_default_symbols, app.services.news_fetcher.fetch_all_news | [backend/app/scheduler/jobs.py:L166-L307] |
| backend/app/schemas/__init__.py | Module file (no top-level functions/classes) | app.schemas.agent_analysis.AgentAnalysisBase, app.schemas.agent_analysis.AgentAnalysisCreate, app.schemas.agent_analysis.AgentAnalysisResponse, app.schemas.agent_analysis.AgentAnalysisUpdate, app.schemas.agent_configuration.AgentConfigurationBase, app.schemas.agent_configuration.AgentConfigurationCreate | [backend/app/schemas/__init__.py:L1] |
| backend/app/schemas/agent_analysis.py | Defines class `AgentAnalysisBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/agent_analysis.py:L16-L61] |
| backend/app/schemas/agent_configuration.py | Defines class `AgentConfigurationBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/agent_configuration.py:L16-L112] |
| backend/app/schemas/asset.py | Defines class `AssetBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/asset.py:L16-L67] |
| backend/app/schemas/error_log.py | Defines class `SystemErrorLogBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/error_log.py:L18-L62] |
| backend/app/schemas/news_article.py | Defines class `NewsArticleBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/news_article.py:L18-L76] |
| backend/app/schemas/order_execution.py | Defines class `OrderExecutionBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/order_execution.py:L22-L72] |
| backend/app/schemas/performance_metric.py | Defines class `PerformanceMetricBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/performance_metric.py:L18-L65] |
| backend/app/schemas/price_history.py | Defines class `PriceHistoryBase` and 0 function(s) | __future__.annotations, datetime.datetime, decimal.Decimal, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field | [backend/app/schemas/price_history.py:L17-L45] |
| backend/app/schemas/trading_signal.py | Defines class `TradingSignalBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Any | [backend/app/schemas/trading_signal.py:L20-L51] |
| backend/app/schemas/watchlist.py | Defines class `WatchlistBase` and 0 function(s) | __future__.annotations, datetime.datetime, pydantic.BaseModel, pydantic.ConfigDict, pydantic.Field, typing.Literal | [backend/app/schemas/watchlist.py:L18-L42] |
| backend/app/services/__init__.py | Module file (no top-level functions/classes) | app.services.data_fetcher.DataFetcher, app.services.data_fetcher.fetch_all_default_symbols, app.services.news_fetcher.NewsFetcher | [backend/app/services/__init__.py:L1] |
| backend/app/services/alert_service.py | Defines class `Alert` and 10 function(s) | __future__.annotations, app.core.config.settings, asyncio, collections.deque, dataclasses.asdict, dataclasses.dataclass | [backend/app/services/alert_service.py:L34-L48] |
| backend/app/services/circuit_breaker.py | Defines class `BreakerState` and 14 function(s) | __future__.annotations, asyncio, dataclasses.dataclass, dataclasses.field, enum.Enum, loguru.logger | [backend/app/services/circuit_breaker.py:L33-L38] |
| backend/app/services/data_fetcher.py | Defines class `DataFetcherError` and 19 function(s) | __future__.annotations, app.core.config.settings, app.db.session.get_db_context, app.models.asset.Asset, app.models.price_history.PriceHistory, app.models.price_history.TIMEFRAMES | [backend/app/services/data_fetcher.py:L74-L75] |
| backend/app/services/health_monitor.py | Defines class `ComponentHealth` and 10 function(s) | __future__.annotations, app.agents.base.OllamaClient, app.core.config.settings, app.db.session.check_connection, app.models.error_log.SystemErrorLog, asyncio | [backend/app/services/health_monitor.py:L29-L45] |
| backend/app/services/news_fetcher.py | Defines class `NewsFetcherError` and 11 function(s) | __future__.annotations, app.core.config.settings, app.db.session.get_db_context, app.models.asset.Asset, app.models.news_article.NewsArticle, asyncio | [backend/app/services/news_fetcher.py:L58-L59] |
| backend/app/services/recovery_actions.py | Defines class `RecoveryAction` and 11 function(s) | __future__.annotations, app.core.config.settings, app.models.agent_configuration.AgentConfiguration, app.models.error_log.SystemErrorLog, dataclasses.dataclass, dataclasses.field | [backend/app/services/recovery_actions.py:L45-L55] |
| backend/app/strategy/__init__.py | Module file (no top-level functions/classes) | app.strategy.order_manager.OrderManager, app.strategy.paper_executor.PaperExecutor, app.strategy.performance_tracker.PerformanceTracker, app.strategy.portfolio_manager.PortfolioManager | [backend/app/strategy/__init__.py:L1] |
| backend/app/strategy/order_manager.py | Defines class `OrderManager` and 8 function(s) | __future__.annotations, app.models.order_execution.OrderExecution, app.models.trading_signal.TradingSignal, app.strategy.paper_executor.PaperExecutor, collections.defaultdict, datetime.datetime | [backend/app/strategy/order_manager.py:L41-L347] |
| backend/app/strategy/paper_executor.py | Defines class `PaperExecutor` and 9 function(s) | __future__.annotations, app.core.config.settings, app.models.order_execution.OrderExecution, app.models.trading_signal.TradingSignal, datetime.datetime, datetime.timezone | [backend/app/strategy/paper_executor.py:L45-L267] |
| backend/app/strategy/performance_tracker.py | Defines class `PerformanceTracker` and 12 function(s) | __future__.annotations, app.core.config.settings, app.models.order_execution.OrderExecution, app.models.performance_metric.PerformanceMetric, collections.defaultdict, datetime.datetime | [backend/app/strategy/performance_tracker.py:L49-L337] |
| backend/app/strategy/portfolio_manager.py | Defines class `DecisionResult` and 12 function(s) | __future__.annotations, app.agents.base.AgentExecutionError, app.agents.base.AgentType, app.agents.base.Recommendation, app.agents.correlation_agent.CorrelationAgent, app.agents.fundamental_agent.FundamentalAgent | [backend/app/strategy/portfolio_manager.py:L59-L97] |
| backend/scripts/__init__.py | Module file (no top-level functions/classes) | [NOT FOUND] | [backend/scripts/__init__.py:L1] |
| backend/scripts/fetch_data.py | Defines function `_build_parser` (sync) | __future__.annotations, app.core.config.get_settings, app.core.logging.setup_logging, app.services.data_fetcher.DataFetcher, app.services.data_fetcher.DataFetcherError, app.services.data_fetcher.fetch_all_default_symbols | [backend/scripts/fetch_data.py:L60-L124] |
| backend/scripts/init_db.py | Defines function `main` (async) | __future__.annotations, app.core.logging.logger, app.core.logging.setup_logging, app.db.init_db.create_all_tables, app.db.init_db.drop_all_tables, app.db.init_db.seed_default_agents | [backend/scripts/init_db.py:L30-L76] |
| backend/scripts/seed_assets.py | Defines function `_strip_sr_suffix` (sync) | __future__.annotations, app.core.config.get_settings, app.core.logging.setup_logging, app.db.session.get_db_context, app.models.asset.Asset, argparse | [backend/scripts/seed_assets.py:L52-L54] |
| generate_abdullahnote_md.py | Defines function `md_table` (sync) | __future__.annotations, ast, datetime.datetime, datetime.timezone, generate_allnote.EXCEPT_REGEX, generate_allnote.EXCLUDED_DIRS | [generate_abdullahnote_md.py:L35-L44] |
| generate_allnote.py | Defines class `PyModuleInfo` and 33 function(s) | __future__.annotations, ast, datetime.datetime, datetime.timezone, docx, docx.Document | [generate_allnote.py:L236-L254] |
| verify_phase4.py | Module file (no top-level functions/classes) | pathlib.Path, py_compile | [verify_phase4.py:L1] |
| verify_phase6.py | Module file (no top-level functions/classes) | ast, os, pathlib.Path, sys | [verify_phase6.py:L1] |
| frontend/.next/server/app/agents/page.js | Exports: [NOT FOUND] | ../../webpack-runtime.js, next/dist/client/components/action-async-storage.external, next/dist/client/components/action-async-storage.external.js, next/dist/client/components/request-async-storage.external, next/dist/client/components/request-async-storage.external.js, next/dist/client/components/static-generation-async-storage.external | [frontend/.next/server/app/agents/page.js:L1] |
| frontend/.next/server/app/agents/page_client-reference-manifest.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/server/app/agents/page_client-reference-manifest.js:L1] |
| frontend/.next/server/app/orders/page.js | Exports: [NOT FOUND] | ../../webpack-runtime.js, next/dist/client/components/action-async-storage.external, next/dist/client/components/action-async-storage.external.js, next/dist/client/components/request-async-storage.external, next/dist/client/components/request-async-storage.external.js, next/dist/client/components/static-generation-async-storage.external | [frontend/.next/server/app/orders/page.js:L1] |
| frontend/.next/server/app/orders/page_client-reference-manifest.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/server/app/orders/page_client-reference-manifest.js:L1] |
| frontend/.next/server/app/page.js | Exports: [NOT FOUND] | ../webpack-runtime.js, next/dist/client/components/action-async-storage.external, next/dist/client/components/action-async-storage.external.js, next/dist/client/components/request-async-storage.external, next/dist/client/components/request-async-storage.external.js, next/dist/client/components/static-generation-async-storage.external | [frontend/.next/server/app/page.js:L1] |
| frontend/.next/server/app/page_client-reference-manifest.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/server/app/page_client-reference-manifest.js:L1] |
| frontend/.next/server/app/performance/page.js | Exports: [NOT FOUND] | ../../webpack-runtime.js, next/dist/client/components/action-async-storage.external, next/dist/client/components/action-async-storage.external.js, next/dist/client/components/request-async-storage.external, next/dist/client/components/request-async-storage.external.js, next/dist/client/components/static-generation-async-storage.external | [frontend/.next/server/app/performance/page.js:L1] |
| frontend/.next/server/app/performance/page_client-reference-manifest.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/server/app/performance/page_client-reference-manifest.js:L1] |
| frontend/.next/server/app/portfolio/page.js | Exports: [NOT FOUND] | ../../webpack-runtime.js, next/dist/client/components/action-async-storage.external, next/dist/client/components/action-async-storage.external.js, next/dist/client/components/request-async-storage.external, next/dist/client/components/request-async-storage.external.js, next/dist/client/components/static-generation-async-storage.external | [frontend/.next/server/app/portfolio/page.js:L1] |
| frontend/.next/server/app/portfolio/page_client-reference-manifest.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/server/app/portfolio/page_client-reference-manifest.js:L1] |
| frontend/.next/static/chunks/app/agents/page.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/chunks/app/agents/page.js:L1] |
| frontend/.next/static/chunks/app/layout.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/chunks/app/layout.js:L1] |
| frontend/.next/static/chunks/app/orders/page.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/chunks/app/orders/page.js:L1] |
| frontend/.next/static/chunks/app/page.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/chunks/app/page.js:L1] |
| frontend/.next/static/chunks/app/performance/page.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/chunks/app/performance/page.js:L1] |
| frontend/.next/static/chunks/app/portfolio/page.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/chunks/app/portfolio/page.js:L1] |
| frontend/.next/static/webpack/app/layout.f84f4be245897046.hot-update.js | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/static/webpack/app/layout.f84f4be245897046.hot-update.js:L1] |
| frontend/.next/types/app/agents/page.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/types/app/agents/page.ts:L1] |
| frontend/.next/types/app/layout.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/types/app/layout.ts:L1] |
| frontend/.next/types/app/orders/page.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/types/app/orders/page.ts:L1] |
| frontend/.next/types/app/page.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/types/app/page.ts:L1] |
| frontend/.next/types/app/performance/page.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/types/app/performance/page.ts:L1] |
| frontend/.next/types/app/portfolio/page.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/.next/types/app/portfolio/page.ts:L1] |
| frontend/src/app/agents/page.tsx | Exports: [NOT FOUND] | @/components/agent-badge, @/components/glass-card, @/components/run-agent-button, @/lib/api, @tanstack/react-query, lucide-react | [frontend/src/app/agents/page.tsx:L1] |
| frontend/src/app/layout.tsx | Exports: [NOT FOUND] | @/components/providers, @/components/sidebar, @/components/topbar, next | [frontend/src/app/layout.tsx:L1] |
| frontend/src/app/orders/page.tsx | Exports: [NOT FOUND] | @/components/agent-badge, @/components/glass-card, @/lib/api, @/lib/utils, @tanstack/react-query, lucide-react | [frontend/src/app/orders/page.tsx:L1] |
| frontend/src/app/page.tsx | Exports: [NOT FOUND] | @/components/agent-badge, @/components/glass-card, @/components/metric-tile, @/components/position-row, @/components/sparkline-chart, @/lib/api | [frontend/src/app/page.tsx:L1] |
| frontend/src/app/performance/page.tsx | Exports: [NOT FOUND] | @/components/glass-card, @/components/metric-tile, @/components/sparkline-chart, @/lib/api, @/lib/utils, @tanstack/react-query | [frontend/src/app/performance/page.tsx:L1] |
| frontend/src/app/portfolio/page.tsx | Exports: [NOT FOUND] | @/components/agent-badge, @/components/glass-card, @/components/metric-tile, @/components/position-row, @/lib/api, @/lib/utils | [frontend/src/app/portfolio/page.tsx:L1] |
| frontend/src/components/agent-badge.tsx | Exports: [NOT FOUND] | @/lib/utils, react | [frontend/src/components/agent-badge.tsx:L1] |
| frontend/src/components/glass-card.tsx | Exports: [NOT FOUND] | @/lib/utils, react | [frontend/src/components/glass-card.tsx:L1] |
| frontend/src/components/live-pnl-ticker.tsx | Exports: [NOT FOUND] | @/lib/utils, @/lib/websocket, lucide-react, react | [frontend/src/components/live-pnl-ticker.tsx:L1] |
| frontend/src/components/metric-tile.tsx | Exports: [NOT FOUND] | ./glass-card, @/lib/utils, lucide-react | [frontend/src/components/metric-tile.tsx:L1] |
| frontend/src/components/position-row.tsx | Exports: [NOT FOUND] | ./agent-badge, @/lib/api, @/lib/utils | [frontend/src/components/position-row.tsx:L1] |
| frontend/src/components/providers.tsx | Exports: [NOT FOUND] | @tanstack/react-query, react, sonner | [frontend/src/components/providers.tsx:L1] |
| frontend/src/components/run-agent-button.tsx | Exports: [NOT FOUND] | @/lib/api, @/lib/utils, lucide-react, react, sonner | [frontend/src/components/run-agent-button.tsx:L1] |
| frontend/src/components/sidebar.tsx | Exports: [NOT FOUND] | @/lib/utils, lucide-react, next/navigation | [frontend/src/components/sidebar.tsx:L1] |
| frontend/src/components/sparkline-chart.tsx | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/src/components/sparkline-chart.tsx:L1] |
| frontend/src/components/topbar.tsx | Exports: [NOT FOUND] | ./live-pnl-ticker, @/lib/api, @tanstack/react-query, lucide-react | [frontend/src/components/topbar.tsx:L1] |
| frontend/src/components/ui/badge.tsx | Exports: [NOT FOUND] | @/lib/utils, class-variance-authority, react | [frontend/src/components/ui/badge.tsx:L1] |
| frontend/src/components/ui/button.tsx | Exports: [NOT FOUND] | @/lib/utils, @radix-ui/react-slot, class-variance-authority, react | [frontend/src/components/ui/button.tsx:L1] |
| frontend/src/components/ui/card.tsx | Exports: [NOT FOUND] | @/lib/utils, react | [frontend/src/components/ui/card.tsx:L1] |
| frontend/src/components/ui/input.tsx | Exports: [NOT FOUND] | @/lib/utils, react | [frontend/src/components/ui/input.tsx:L1] |
| frontend/src/components/ui/separator.tsx | Exports: [NOT FOUND] | @/lib/utils | [frontend/src/components/ui/separator.tsx:L1] |
| frontend/src/components/ui/skeleton.tsx | Exports: [NOT FOUND] | @/lib/utils | [frontend/src/components/ui/skeleton.tsx:L1] |
| frontend/src/lib/api.ts | Exports: [NOT FOUND] | [NOT FOUND] | [frontend/src/lib/api.ts:L1] |
| frontend/src/lib/utils.ts | Exports: [NOT FOUND] | clsx, tailwind-merge | [frontend/src/lib/utils.ts:L1] |
| frontend/src/lib/websocket.ts | Exports: [NOT FOUND] | react | [frontend/src/lib/websocket.ts:L1] |

---

# Section 3 — Data Lineage & Runtime Execution Flows

Step-by-step tracing of data inputs and payloads through the codebase to their final storage serialization or transmission layer.

## 3.1 Application Entry Flow (FastAPI)

- HTTP request → FastAPI app instance  [backend/app/main.py:L84-L95]
- Startup: lifespan() invokes check_connection() & start_scheduler()  [backend/app/main.py:L47-L88]
- Router registration at prefix '/api/v1'  [backend/app/main.py:L185-L187]

## 3.2 Data Ingestion Lineage

- APScheduler triggers periodic data jobs  [backend/app/scheduler/jobs.py:L46-L75]
- data_fetcher.py fetches market & news data via yfinance / NewsAPI  [backend/app/services/data_fetcher.py:L807-L812]
- news_fetcher.py parses RSS feeds and computes sentiment  [backend/app/services/news_fetcher.py:L462-L468]
- SQLAlchemy 2.0 async ORM persists rows to PostgreSQL 16 (JSONB)  [backend/app/db/session.py:L53-L70]

## 3.3 Agent Analysis → Strategy Pipeline

- Class `AgentType` in `backend/app/agents/base.py`  [backend/app/agents/base.py:L56-L70]
- Class `AgentInfo` in `backend/app/agents/registry.py`  [backend/app/agents/registry.py:L46-L54]
- Class `StrategyOutput` in `backend/app/agents/strategy_agent.py`  [backend/app/agents/strategy_agent.py:L40-L74]
- Class `ErrorPattern` in `backend/app/agents/self_healing_agent.py`  [backend/app/agents/self_healing_agent.py:L72-L74]
- Class `OrderManager` in `backend/app/strategy/order_manager.py`  [backend/app/strategy/order_manager.py:L41-L347]
- Class `PaperExecutor` in `backend/app/strategy/paper_executor.py`  [backend/app/strategy/paper_executor.py:L45-L267]

## 3.4 Database Schema Inventory (SQLAlchemy Models)

| Model Class | File | Line Reference | ORM |
| --- | --- | --- | --- |
| [NOT FOUND] | backend/app/models/__init__.py | [NOT FOUND] | SQLAlchemy 2.0 async |
| AgentAnalysis | backend/app/models/agent_analysis.py | [backend/app/models/agent_analysis.py:L28-L132] | SQLAlchemy 2.0 async |
| AgentConfiguration | backend/app/models/agent_configuration.py | [backend/app/models/agent_configuration.py:L27-L236] | SQLAlchemy 2.0 async |
| Asset | backend/app/models/asset.py | [backend/app/models/asset.py:L25-L135] | SQLAlchemy 2.0 async |
| SystemErrorLog | backend/app/models/error_log.py | [backend/app/models/error_log.py:L24-L139] | SQLAlchemy 2.0 async |
| NewsArticle | backend/app/models/news_article.py | [backend/app/models/news_article.py:L31-L190] | SQLAlchemy 2.0 async |
| OrderExecution | backend/app/models/order_execution.py | [backend/app/models/order_execution.py:L32-L188] | SQLAlchemy 2.0 async |
| PerformanceMetric | backend/app/models/performance_metric.py | [backend/app/models/performance_metric.py:L25-L204] | SQLAlchemy 2.0 async |
| PriceHistory | backend/app/models/price_history.py | [backend/app/models/price_history.py:L47-L261] | SQLAlchemy 2.0 async |
| TradingSignal | backend/app/models/trading_signal.py | [backend/app/models/trading_signal.py:L35-L186] | SQLAlchemy 2.0 async |
| Watchlist | backend/app/models/watchlist.py | [backend/app/models/watchlist.py:L31-L121] | SQLAlchemy 2.0 async |

## 3.5 Pydantic / Validation Models

| Schema Class | File | Line Reference | Library |
| --- | --- | --- | --- |
| [NOT FOUND] | backend/app/schemas/__init__.py | [NOT FOUND] | Pydantic v2 |
| AgentAnalysisBase | backend/app/schemas/agent_analysis.py | [backend/app/schemas/agent_analysis.py:L16-L61] | Pydantic v2 |
| AgentAnalysisCreate | backend/app/schemas/agent_analysis.py | [backend/app/schemas/agent_analysis.py:L64-L67] | Pydantic v2 |
| AgentAnalysisUpdate | backend/app/schemas/agent_analysis.py | [backend/app/schemas/agent_analysis.py:L70-L80] | Pydantic v2 |
| AgentAnalysisResponse | backend/app/schemas/agent_analysis.py | [backend/app/schemas/agent_analysis.py:L83-L90] | Pydantic v2 |
| AgentConfigurationBase | backend/app/schemas/agent_configuration.py | [backend/app/schemas/agent_configuration.py:L16-L112] | Pydantic v2 |
| AgentConfigurationCreate | backend/app/schemas/agent_configuration.py | [backend/app/schemas/agent_configuration.py:L115-L118] | Pydantic v2 |
| AgentConfigurationUpdate | backend/app/schemas/agent_configuration.py | [backend/app/schemas/agent_configuration.py:L121-L143] | Pydantic v2 |
| AgentConfigurationResponse | backend/app/schemas/agent_configuration.py | [backend/app/schemas/agent_configuration.py:L146-L153] | Pydantic v2 |
| AssetBase | backend/app/schemas/asset.py | [backend/app/schemas/asset.py:L16-L67] | Pydantic v2 |
| AssetCreate | backend/app/schemas/asset.py | [backend/app/schemas/asset.py:L70-L73] | Pydantic v2 |
| AssetUpdate | backend/app/schemas/asset.py | [backend/app/schemas/asset.py:L76-L89] | Pydantic v2 |
| AssetResponse | backend/app/schemas/asset.py | [backend/app/schemas/asset.py:L92-L99] | Pydantic v2 |
| SystemErrorLogBase | backend/app/schemas/error_log.py | [backend/app/schemas/error_log.py:L18-L62] | Pydantic v2 |
| SystemErrorLogCreate | backend/app/schemas/error_log.py | [backend/app/schemas/error_log.py:L65-L68] | Pydantic v2 |
| SystemErrorLogUpdate | backend/app/schemas/error_log.py | [backend/app/schemas/error_log.py:L71-L82] | Pydantic v2 |
| SystemErrorLogResponse | backend/app/schemas/error_log.py | [backend/app/schemas/error_log.py:L85-L92] | Pydantic v2 |
| NewsArticleBase | backend/app/schemas/news_article.py | [backend/app/schemas/news_article.py:L18-L76] | Pydantic v2 |
| NewsArticleCreate | backend/app/schemas/news_article.py | [backend/app/schemas/news_article.py:L79-L82] | Pydantic v2 |
| NewsArticleUpdate | backend/app/schemas/news_article.py | [backend/app/schemas/news_article.py:L85-L97] | Pydantic v2 |
| NewsArticleResponse | backend/app/schemas/news_article.py | [backend/app/schemas/news_article.py:L100-L107] | Pydantic v2 |
| OrderExecutionBase | backend/app/schemas/order_execution.py | [backend/app/schemas/order_execution.py:L22-L72] | Pydantic v2 |
| OrderExecutionCreate | backend/app/schemas/order_execution.py | [backend/app/schemas/order_execution.py:L75-L78] | Pydantic v2 |
| OrderExecutionUpdate | backend/app/schemas/order_execution.py | [backend/app/schemas/order_execution.py:L81-L94] | Pydantic v2 |
| OrderExecutionResponse | backend/app/schemas/order_execution.py | [backend/app/schemas/order_execution.py:L97-L104] | Pydantic v2 |
| PerformanceMetricBase | backend/app/schemas/performance_metric.py | [backend/app/schemas/performance_metric.py:L18-L65] | Pydantic v2 |
| PerformanceMetricCreate | backend/app/schemas/performance_metric.py | [backend/app/schemas/performance_metric.py:L68-L71] | Pydantic v2 |
| PerformanceMetricUpdate | backend/app/schemas/performance_metric.py | [backend/app/schemas/performance_metric.py:L74-L89] | Pydantic v2 |
| PerformanceMetricResponse | backend/app/schemas/performance_metric.py | [backend/app/schemas/performance_metric.py:L92-L99] | Pydantic v2 |
| PriceHistoryBase | backend/app/schemas/price_history.py | [backend/app/schemas/price_history.py:L17-L45] | Pydantic v2 |
| PriceHistoryCreate | backend/app/schemas/price_history.py | [backend/app/schemas/price_history.py:L48-L51] | Pydantic v2 |
| PriceHistoryUpdate | backend/app/schemas/price_history.py | [backend/app/schemas/price_history.py:L54-L68] | Pydantic v2 |
| PriceHistoryResponse | backend/app/schemas/price_history.py | [backend/app/schemas/price_history.py:L71-L78] | Pydantic v2 |
| TradingSignalBase | backend/app/schemas/trading_signal.py | [backend/app/schemas/trading_signal.py:L20-L51] | Pydantic v2 |
| TradingSignalCreate | backend/app/schemas/trading_signal.py | [backend/app/schemas/trading_signal.py:L54-L57] | Pydantic v2 |
| TradingSignalUpdate | backend/app/schemas/trading_signal.py | [backend/app/schemas/trading_signal.py:L60-L75] | Pydantic v2 |
| TradingSignalResponse | backend/app/schemas/trading_signal.py | [backend/app/schemas/trading_signal.py:L78-L85] | Pydantic v2 |
| WatchlistBase | backend/app/schemas/watchlist.py | [backend/app/schemas/watchlist.py:L18-L42] | Pydantic v2 |
| WatchlistCreate | backend/app/schemas/watchlist.py | [backend/app/schemas/watchlist.py:L45-L48] | Pydantic v2 |
| WatchlistUpdate | backend/app/schemas/watchlist.py | [backend/app/schemas/watchlist.py:L51-L63] | Pydantic v2 |
| WatchlistResponse | backend/app/schemas/watchlist.py | [backend/app/schemas/watchlist.py:L66-L73] | Pydantic v2 |

---

# Section 4 — Subsystems, State Machine & Modular Interfaces

## 4.1 Subsystem Inventory

| Subsystem | Description | Source Path | Line Reference |
| --- | --- | --- | --- |
| Async Event Loop | FastAPI ASGI / uvicorn | backend/app/main.py | [backend/app/main.py:L47-L88] |
| Background Scheduler | APScheduler AsyncIOScheduler | backend/app/scheduler/jobs.py | [backend/app/scheduler/jobs.py:L166-L307] |
| HTTP API Layer | FastAPI REST endpoints (v1) | backend/app/api/v1/__init__.py | [backend/app/api/v1/__init__.py:L1] |
| WebSocket Layer | Native FastAPI WebSocket | backend/app/api/v1/__init__.py | [backend/app/api/v1/__init__.py:L1] |
| Database Engine | SQLAlchemy 2.0 async + asyncpg | backend/app/db/session.py | [backend/app/db/session.py:L53-L70] |
| Self-Healing Subsystem | Circuit breakers + recovery actions | backend/app/services/circuit_breaker.py | [backend/app/services/circuit_breaker.py:L33-L38] |
| Alert Dispatcher | Webhook / log-based alerts | backend/app/services/alert_service.py | [backend/app/services/alert_service.py:L34-L48] |
| Paper Trading Executor | In-memory portfolio simulation | backend/app/strategy/paper_executor.py | [backend/app/strategy/paper_executor.py:L45-L267] |

## 4.2 Inter-Module Protocols

| Protocol | Surface | Transport | Use Case |
| --- | --- | --- | --- |
| REST/JSON | FastAPI HTTP endpoints (v1) | HTTP | Synchronous request/response |
| WebSocket | Native FastAPI WebSocket | WS | Bidirectional live updates (P&L ticker) |
| PostgreSQL Wire Protocol | asyncpg driver | TCP/5432 | Connection-pooled async queries |
| Ollama HTTP API | httpx async client | HTTP/11434 | LLM inference (Qwen 2.5 Coder + Llama 3.1) |
| Inter-Container DNS | Docker bridge network | DNS | Service discovery (abdullah_net) |

## 4.3 State Machines & Workers

The system operates with the following discrete states: `BOOT → DB_CHECK → SCHEDULER_START → AGENT_RUN (loop) → SIGNAL_AGGREGATE → STRATEGY_DECIDE → ORDER_PLACE → METRICS_UPDATE → SELF_HEAL_SCAN`. Each transition is triggered by the APScheduler jobs registered in `backend/app/scheduler/jobs.py`.

- Job `fetch_prices_job` (async)  [backend/app/scheduler/jobs.py:L46-L75]
- Job `fetch_news_job` (async)  [backend/app/scheduler/jobs.py:L78-L107]
- Job `self_healing_job` (async)  [backend/app/scheduler/jobs.py:L110-L160]
- Job `get_scheduler` (sync)  [backend/app/scheduler/jobs.py:L316-L321]
- Job `start_scheduler` (async)  [backend/app/scheduler/jobs.py:L324-L326]
- Job `shutdown_scheduler` (async)  [backend/app/scheduler/jobs.py:L329-L331]
- Job `__init__` (sync)  [backend/app/scheduler/jobs.py:L179-L182]
- Job `start` (async)  [backend/app/scheduler/jobs.py:L185-L268]
- Job `shutdown` (async)  [backend/app/scheduler/jobs.py:L270-L282]
- Job `get_jobs` (sync)  [backend/app/scheduler/jobs.py:L285-L303]
- Job `is_running` (sync)  [backend/app/scheduler/jobs.py:L306-L307]

---

# Section 5 — Historical Anomalies & Refactoring Log (Lessons Learned)

Audit of existing custom exception catch blocks, fallback decorators, and error log routing discovered during static analysis.

## 5.1 Exception Catch Block Registry

| File | Except Header (truncated) | Line | Citation |
| --- | --- | --- | --- |
| backend/_check_new_files.py | py_compile.PyCompileError as exc | 41 | [backend/_check_new_files.py:L41-L41] |
| backend/_check_new_files.py | Exception as exc | 69 | [backend/_check_new_files.py:L69-L69] |
| backend/_check_ollama.py | Exception as e | 14 | [backend/_check_ollama.py:L14-L14] |
| backend/_e2e_run.py | OSError | 46 | [backend/_e2e_run.py:L46-L46] |
| backend/_e2e_run.py | json.JSONDecodeError | 94 | [backend/_e2e_run.py:L94-L94] |
| backend/_e2e_run.py | urllib.error.HTTPError as e | 96 | [backend/_e2e_run.py:L96-L96] |
| backend/_e2e_run.py | json.JSONDecodeError | 100 | [backend/_e2e_run.py:L100-L100] |
| backend/_e2e_run.py | (urllib.error.URLError, TimeoutError, ConnectionResetError) as e | 102 | [backend/_e2e_run.py:L102-L102] |
| backend/_e2e_run.py | (urllib.error.URLError, ConnectionResetError, TimeoutError) | 233 | [backend/_e2e_run.py:L233-L233] |
| backend/_e2e_run.py | OSError | 239 | [backend/_e2e_run.py:L239-L239] |
| backend/_e2e_run.py | subprocess.TimeoutExpired | 253 | [backend/_e2e_run.py:L253-L253] |
| backend/_e2e_run.py | Exception as _e | 406 | [backend/_e2e_run.py:L406-L406] |
| backend/_e2e_run.py | Exception as exc | 467 | [backend/_e2e_run.py:L467-L467] |
| backend/_pg_or_sqlite.py | OSError | 31 | [backend/_pg_or_sqlite.py:L31-L31] |
| backend/_pg_or_sqlite.py | ImportError | 60 | [backend/_pg_or_sqlite.py:L60-L60] |
| backend/_pg_or_sqlite.py | OSError | 84 | [backend/_pg_or_sqlite.py:L84-L84] |
| backend/_phase4_2_pipeline_test.py | Exception | 46 | [backend/_phase4_2_pipeline_test.py:L46-L46] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 96 | [backend/_phase4_2_pipeline_test.py:L96-L96] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 105 | [backend/_phase4_2_pipeline_test.py:L105-L105] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 143 | [backend/_phase4_2_pipeline_test.py:L143-L143] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 165 | [backend/_phase4_2_pipeline_test.py:L165-L165] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 176 | [backend/_phase4_2_pipeline_test.py:L176-L176] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 201 | [backend/_phase4_2_pipeline_test.py:L201-L201] |
| backend/_phase4_2_pipeline_test.py | KeyboardInterrupt | 244 | [backend/_phase4_2_pipeline_test.py:L244-L244] |
| backend/_phase4_2_pipeline_test.py | Exception as exc | 247 | [backend/_phase4_2_pipeline_test.py:L247-L247] |
| backend/_phase5_3_frontend_binding_test.py | Exception | 33 | [backend/_phase5_3_frontend_binding_test.py:L33-L33] |
| backend/_phase5_3_frontend_binding_test.py | OSError | 127 | [backend/_phase5_3_frontend_binding_test.py:L127-L127] |
| backend/_phase5_3_frontend_binding_test.py | OSError | 139 | [backend/_phase5_3_frontend_binding_test.py:L139-L139] |
| backend/_phase5_3_frontend_binding_test.py | Exception as exc | 169 | [backend/_phase5_3_frontend_binding_test.py:L169-L169] |
| backend/_phase5_3_frontend_binding_test.py | Exception as exc | 178 | [backend/_phase5_3_frontend_binding_test.py:L178-L178] |
| backend/_phase5_3_frontend_binding_test.py | asyncio.TimeoutError | 286 | [backend/_phase5_3_frontend_binding_test.py:L286-L286] |
| backend/_phase5_3_frontend_binding_test.py | Exception | 289 | [backend/_phase5_3_frontend_binding_test.py:L289-L289] |
| backend/_phase5_3_frontend_binding_test.py | KeyboardInterrupt | 308 | [backend/_phase5_3_frontend_binding_test.py:L308-L308] |
| backend/_phase5_3_frontend_binding_test.py | Exception as exc | 310 | [backend/_phase5_3_frontend_binding_test.py:L310-L310] |
| backend/_phase5_server_test.py | Exception | 33 | [backend/_phase5_server_test.py:L33-L33] |
| backend/_phase5_server_test.py | OSError | 52 | [backend/_phase5_server_test.py:L52-L52] |
| backend/_phase5_server_test.py | OSError | 65 | [backend/_phase5_server_test.py:L65-L65] |
| backend/_phase5_server_test.py | Exception | 111 | [backend/_phase5_server_test.py:L111-L111] |
| backend/_phase5_server_test.py | Exception as exc | 116 | [backend/_phase5_server_test.py:L116-L116] |
| backend/_phase5_server_test.py | ImportError | 131 | [backend/_phase5_server_test.py:L131-L131] |
| backend/_phase5_server_test.py | asyncio.TimeoutError | 155 | [backend/_phase5_server_test.py:L155-L155] |
| backend/_phase5_server_test.py | Exception | 159 | [backend/_phase5_server_test.py:L159-L159] |
| backend/_phase5_server_test.py | Exception | 177 | [backend/_phase5_server_test.py:L177-L177] |
| backend/_phase5_server_test.py | Exception | 181 | [backend/_phase5_server_test.py:L181-L181] |
| backend/_phase5_server_test.py | Exception as exc | 184 | [backend/_phase5_server_test.py:L184-L184] |
| backend/_phase5_server_test.py | asyncio.TimeoutError | 309 | [backend/_phase5_server_test.py:L309-L309] |
| backend/_phase5_server_test.py | Exception as exc | 313 | [backend/_phase5_server_test.py:L313-L313] |
| backend/_phase5_server_test.py | Exception | 325 | [backend/_phase5_server_test.py:L325-L325] |
| backend/_phase5_server_test.py | KeyboardInterrupt | 332 | [backend/_phase5_server_test.py:L332-L332] |
| backend/_phase5_server_test.py | Exception as exc | 335 | [backend/_phase5_server_test.py:L335-L335] |
| backend/_phase6_self_healing_test.py | Exception | 34 | [backend/_phase6_self_healing_test.py:L34-L34] |
| backend/_phase6_self_healing_test.py | RuntimeError | 102 | [backend/_phase6_self_healing_test.py:L102-L102] |
| backend/_phase6_self_healing_test.py | CircuitOpenError as exc | 118 | [backend/_phase6_self_healing_test.py:L118-L118] |
| backend/_phase6_self_healing_test.py | Exception as exc | 123 | [backend/_phase6_self_healing_test.py:L123-L123] |
| backend/_phase6_self_healing_test.py | KeyboardInterrupt | 301 | [backend/_phase6_self_healing_test.py:L301-L301] |
| backend/_phase6_self_healing_test.py | Exception as exc | 303 | [backend/_phase6_self_healing_test.py:L303-L303] |
| backend/_phase7_error_logging_test.py | Exception | 36 | [backend/_phase7_error_logging_test.py:L36-L36] |
| backend/_phase7_error_logging_test.py | ZeroDivisionError as exc | 108 | [backend/_phase7_error_logging_test.py:L108-L108] |
| backend/_phase7_error_logging_test.py | KeyboardInterrupt | 305 | [backend/_phase7_error_logging_test.py:L305-L305] |
| backend/_phase7_error_logging_test.py | Exception as exc | 307 | [backend/_phase7_error_logging_test.py:L307-L307] |
| backend/_syntax_check.py | py_compile.PyCompileError as exc | 113 | [backend/_syntax_check.py:L113-L113] |
| backend/_verify_all_9_agents.py | Exception as e | 46 | [backend/_verify_all_9_agents.py:L46-L46] |
| backend/_verify_imports.py | subprocess.CalledProcessError | 24 | [backend/_verify_imports.py:L24-L24] |
| backend/_verify_imports.py | Exception as exc | 110 | [backend/_verify_imports.py:L110-L110] |
| backend/_verify_routing.py | Exception as e | 23 | [backend/_verify_routing.py:L23-L23] |
| backend/_verify_routing.py | Exception as e | 80 | [backend/_verify_routing.py:L80-L80] |
| backend/_verify_routing.py | Exception as e | 88 | [backend/_verify_routing.py:L88-L88] |
| backend/app/agents/base.py | httpx.HTTPError | 211 | [backend/app/agents/base.py:L211-L211] |
| backend/app/agents/base.py | (httpx.HTTPError, RuntimeError) as exc | 385 | [backend/app/agents/base.py:L385-L385] |
| backend/app/agents/base.py | httpx.TimeoutException as exc | 406 | [backend/app/agents/base.py:L406-L406] |
| backend/app/agents/base.py | Exception as exc | 427 | [backend/app/agents/base.py:L427-L427] |
| backend/app/agents/base.py | json.JSONDecodeError | 512 | [backend/app/agents/base.py:L512-L512] |
| backend/app/agents/correlation_agent.py | ValueError | 196 | [backend/app/agents/correlation_agent.py:L196-L196] |
| backend/app/agents/correlation_agent.py | (TypeError, ValueError) | 204 | [backend/app/agents/correlation_agent.py:L204-L204] |
| backend/app/agents/fundamental_agent.py | ValueError | 79 | [backend/app/agents/fundamental_agent.py:L79-L79] |
| backend/app/agents/macro_agent.py | ValueError | 111 | [backend/app/agents/macro_agent.py:L111-L111] |
| backend/app/agents/macro_agent.py | (TypeError, ValueError) | 119 | [backend/app/agents/macro_agent.py:L119-L119] |
| backend/app/agents/market_structure_agent.py | ValueError | 276 | [backend/app/agents/market_structure_agent.py:L276-L276] |
| backend/app/agents/market_structure_agent.py | (TypeError, ValueError) | 287 | [backend/app/agents/market_structure_agent.py:L287-L287] |
| backend/app/agents/news_agent.py | ValueError | 109 | [backend/app/agents/news_agent.py:L109-L109] |
| backend/app/agents/prompts/fundamental.py | (TypeError, ValueError) | 166 | [backend/app/agents/prompts/fundamental.py:L166-L166] |
| backend/app/agents/regime_agent.py | ValueError | 226 | [backend/app/agents/regime_agent.py:L226-L226] |
| backend/app/agents/regime_agent.py | (TypeError, ValueError) | 238 | [backend/app/agents/regime_agent.py:L238-L238] |
| backend/app/agents/regime_agent.py | (TypeError, ValueError) | 243 | [backend/app/agents/regime_agent.py:L243-L243] |
| backend/app/agents/risk_agent.py | ValueError | 130 | [backend/app/agents/risk_agent.py:L130-L130] |
| backend/app/agents/risk_agent.py | (TypeError, ValueError) | 146 | [backend/app/agents/risk_agent.py:L146-L146] |
| backend/app/agents/self_healing_agent.py | Exception as exc | 383 | [backend/app/agents/self_healing_agent.py:L383-L383] |
| backend/app/agents/self_healing_agent.py | Exception as exc | 422 | [backend/app/agents/self_healing_agent.py:L422-L422] |
| backend/app/agents/self_healing_agent.py | Exception as exc | 443 | [backend/app/agents/self_healing_agent.py:L443-L443] |
| backend/app/agents/self_healing_agent.py | Exception as exc | 450 | [backend/app/agents/self_healing_agent.py:L450-L450] |
| backend/app/agents/sentiment_agent.py | ValueError | 168 | [backend/app/agents/sentiment_agent.py:L168-L168] |
| backend/app/agents/sentiment_agent.py | (TypeError, ValueError) | 174 | [backend/app/agents/sentiment_agent.py:L174-L174] |
| backend/app/agents/sentiment_agent.py | (TypeError, ValueError) | 180 | [backend/app/agents/sentiment_agent.py:L180-L180] |
| backend/app/agents/strategy_agent.py | ValueError | 142 | [backend/app/agents/strategy_agent.py:L142-L142] |
| backend/app/agents/technical_agent.py | ValueError | 182 | [backend/app/agents/technical_agent.py:L182-L182] |
| backend/app/agents/volatility_agent.py | ValueError | 215 | [backend/app/agents/volatility_agent.py:L215-L215] |
| backend/app/agents/volatility_agent.py | (TypeError, ValueError) | 224 | [backend/app/agents/volatility_agent.py:L224-L224] |
| backend/app/api/v1/endpoints/agents.py | AttributeError | 215 | [backend/app/api/v1/endpoints/agents.py:L215-L215] |
| backend/app/api/v1/endpoints/agents.py | Exception as exc | 224 | [backend/app/api/v1/endpoints/agents.py:L224-L224] |
| backend/app/api/v1/endpoints/agents.py | AttributeError | 275 | [backend/app/api/v1/endpoints/agents.py:L275-L275] |
| backend/app/api/v1/endpoints/agents.py | Exception as exc | 283 | [backend/app/api/v1/endpoints/agents.py:L283-L283] |
| backend/app/api/v1/endpoints/orders.py | ValueError as exc | 164 | [backend/app/api/v1/endpoints/orders.py:L164-L164] |
| backend/app/api/v1/endpoints/performance.py | Exception as exc | 90 | [backend/app/api/v1/endpoints/performance.py:L90-L90] |
| backend/app/api/v1/endpoints/performance.py | Exception as exc | 116 | [backend/app/api/v1/endpoints/performance.py:L116-L116] |
| backend/app/api/v1/endpoints/portfolio.py | Exception as exc | 102 | [backend/app/api/v1/endpoints/portfolio.py:L102-L102] |
| backend/app/api/v1/endpoints/portfolio.py | (TypeError, ValueError) | 146 | [backend/app/api/v1/endpoints/portfolio.py:L146-L146] |
| backend/app/api/v1/endpoints/self_healing.py | AgentExecutionError as exc | 308 | [backend/app/api/v1/endpoints/self_healing.py:L308-L308] |
| backend/app/api/v1/endpoints/self_healing.py | Exception as exc | 313 | [backend/app/api/v1/endpoints/self_healing.py:L313-L313] |
| backend/app/api/v1/endpoints/self_healing.py | Exception as exc | 377 | [backend/app/api/v1/endpoints/self_healing.py:L377-L377] |
| backend/app/api/v1/endpoints/strategy.py | Exception as exc | 68 | [backend/app/api/v1/endpoints/strategy.py:L68-L68] |
| backend/app/api/v1/endpoints/strategy.py | Exception as exc | 95 | [backend/app/api/v1/endpoints/strategy.py:L95-L95] |
| backend/app/api/websocket.py | Exception as exc | 82 | [backend/app/api/websocket.py:L82-L82] |
| backend/app/api/websocket.py | (TypeError, ValueError) | 141 | [backend/app/api/websocket.py:L141-L141] |
| backend/app/api/websocket.py | Exception as exc | 159 | [backend/app/api/websocket.py:L159-L159] |
| backend/app/api/websocket.py | asyncio.CancelledError | 190 | [backend/app/api/websocket.py:L190-L190] |
| backend/app/api/websocket.py | Exception as exc | 193 | [backend/app/api/websocket.py:L193-L193] |
| backend/app/api/websocket.py | (asyncio.CancelledError, Exception) | 224 | [backend/app/api/websocket.py:L224-L224] |
| backend/app/core/error_recorder.py | Exception | 56 | [backend/app/core/error_recorder.py:L56-L56] |
| backend/app/core/error_recorder.py | Exception | 109 | [backend/app/core/error_recorder.py:L109-L109] |
| backend/app/core/error_recorder.py | Exception as persist_exc | 137 | [backend/app/core/error_recorder.py:L137-L137] |
| backend/app/core/error_recorder.py | Exception | 144 | [backend/app/core/error_recorder.py:L144-L144] |
| backend/app/core/logging.py | (ValueError, AttributeError) | 46 | [backend/app/core/logging.py:L46-L46] |
| backend/app/core/logging.py | Exception | 53 | [backend/app/core/logging.py:L53-L53] |
| backend/app/core/logging.py | Exception | 59 | [backend/app/core/logging.py:L59-L59] |
| backend/app/db/init_db.py | Exception as exc | 49 | [backend/app/db/init_db.py:L49-L49] |
| backend/app/db/init_db.py | Exception as exc | 56 | [backend/app/db/init_db.py:L56-L56] |
| backend/app/db/session.py | Exception as exc | 65 | [backend/app/db/session.py:L65-L65] |
| backend/app/db/session.py | Exception as exc | 88 | [backend/app/db/session.py:L88-L88] |
| backend/app/db/session.py | Exception as exc | 119 | [backend/app/db/session.py:L119-L119] |
| backend/app/main.py | WebSocketDisconnect | 230 | [backend/app/main.py:L230-L230] |
| backend/app/main.py | WebSocketDisconnect | 232 | [backend/app/main.py:L232-L232] |
| backend/app/scheduler/jobs.py | Exception as exc | 71 | [backend/app/scheduler/jobs.py:L71-L71] |
| backend/app/scheduler/jobs.py | Exception as exc | 103 | [backend/app/scheduler/jobs.py:L103-L103] |
| backend/app/scheduler/jobs.py | Exception as exc | 156 | [backend/app/scheduler/jobs.py:L156-L156] |
| backend/app/scheduler/jobs.py | Exception as exc | 278 | [backend/app/scheduler/jobs.py:L278-L278] |
| backend/app/services/alert_service.py | Exception as exc | 97 | [backend/app/services/alert_service.py:L97-L97] |
| backend/app/services/circuit_breaker.py | CircuitOpenError | 74 | [backend/app/services/circuit_breaker.py:L74-L74] |
| backend/app/services/circuit_breaker.py | Exception | 127 | [backend/app/services/circuit_breaker.py:L127-L127] |
| backend/app/services/data_fetcher.py | Exception as exc | 218 | [backend/app/services/data_fetcher.py:L218-L218] |
| backend/app/services/data_fetcher.py | Exception as exc | 276 | [backend/app/services/data_fetcher.py:L276-L276] |
| backend/app/services/data_fetcher.py | Exception as exc | 323 | [backend/app/services/data_fetcher.py:L323-L323] |
| backend/app/services/data_fetcher.py | httpx.HTTPError as exc | 460 | [backend/app/services/data_fetcher.py:L460-L460] |
| backend/app/services/data_fetcher.py | ValueError as exc | 491 | [backend/app/services/data_fetcher.py:L491-L491] |
| backend/app/services/data_fetcher.py | Exception as exc | 604 | [backend/app/services/data_fetcher.py:L604-L604] |
| backend/app/services/data_fetcher.py | Exception | 702 | [backend/app/services/data_fetcher.py:L702-L702] |
| backend/app/services/data_fetcher.py | Exception | 811 | [backend/app/services/data_fetcher.py:L811-L811] |
| backend/app/services/health_monitor.py | asyncio.TimeoutError | 100 | [backend/app/services/health_monitor.py:L100-L100] |
| backend/app/services/health_monitor.py | Exception as exc | 107 | [backend/app/services/health_monitor.py:L107-L107] |
| backend/app/services/health_monitor.py | Exception as exc | 154 | [backend/app/services/health_monitor.py:L154-L154] |
| backend/app/services/news_fetcher.py | httpx.HTTPError as exc | 135 | [backend/app/services/news_fetcher.py:L135-L135] |
| backend/app/services/news_fetcher.py | (httpx.HTTPError, ET.ParseError) as exc | 206 | [backend/app/services/news_fetcher.py:L206-L206] |
| backend/app/services/news_fetcher.py | (httpx.HTTPError, ET.ParseError) as exc | 257 | [backend/app/services/news_fetcher.py:L257-L257] |
| backend/app/services/news_fetcher.py | ValueError | 424 | [backend/app/services/news_fetcher.py:L424-L424] |
| backend/app/services/news_fetcher.py | (ValueError, TypeError) | 455 | [backend/app/services/news_fetcher.py:L455-L455] |
| backend/app/services/recovery_actions.py | Exception as exc | 107 | [backend/app/services/recovery_actions.py:L107-L107] |
| backend/app/services/recovery_actions.py | Exception as exc | 162 | [backend/app/services/recovery_actions.py:L162-L162] |
| backend/app/services/recovery_actions.py | Exception as exc | 195 | [backend/app/services/recovery_actions.py:L195-L195] |
| backend/app/services/recovery_actions.py | Exception as exc | 242 | [backend/app/services/recovery_actions.py:L242-L242] |
| backend/app/services/recovery_actions.py | Exception as exc | 298 | [backend/app/services/recovery_actions.py:L298-L298] |
| backend/app/services/recovery_actions.py | Exception as exc | 344 | [backend/app/services/recovery_actions.py:L344-L344] |
| backend/app/strategy/portfolio_manager.py | (TypeError, ValueError) | 156 | [backend/app/strategy/portfolio_manager.py:L156-L156] |
| backend/app/strategy/portfolio_manager.py | AgentExecutionError as exc | 224 | [backend/app/strategy/portfolio_manager.py:L224-L224] |
| backend/app/strategy/portfolio_manager.py | Exception as exc | 238 | [backend/app/strategy/portfolio_manager.py:L238-L238] |
| backend/app/strategy/portfolio_manager.py | AgentExecutionError as exc | 382 | [backend/app/strategy/portfolio_manager.py:L382-L382] |
| backend/app/strategy/portfolio_manager.py | (TypeError, ValueError) | 405 | [backend/app/strategy/portfolio_manager.py:L405-L405] |
| backend/app/strategy/portfolio_manager.py | Exception as exc | 466 | [backend/app/strategy/portfolio_manager.py:L466-L466] |
| backend/scripts/fetch_data.py | DataFetcherError as exc | 149 | [backend/scripts/fetch_data.py:L149-L149] |
| backend/scripts/seed_assets.py | Exception as exc | 71 | [backend/scripts/seed_assets.py:L71-L71] |
| generate_abdullahnote_md.py | PermissionError as e | 567 | [generate_abdullahnote_md.py:L567-L567] |
| generate_abdullahnote_md.py | OSError as e | 570 | [generate_abdullahnote_md.py:L570-L570] |
| generate_abdullahnote_md.py | Exception as e | 573 | [generate_abdullahnote_md.py:L573-L573] |
| generate_allnote.py | Exception | 48 | [generate_allnote.py:L48-L48] |
| generate_allnote.py | Exception as e | 63 | [generate_allnote.py:L63-L63] |
| generate_allnote.py | Exception as _bootstrap_err | 77 | [generate_allnote.py:L77-L77] |
| generate_allnote.py | ValueError | 178 | [generate_allnote.py:L178-L178] |
| generate_allnote.py | ValueError | 187 | [generate_allnote.py:L187-L187] |
| generate_allnote.py | UnicodeDecodeError | 230 | [generate_allnote.py:L230-L230] |
| generate_allnote.py | Exception | 232 | [generate_allnote.py:L232-L232] |
| generate_allnote.py | Exception | 295 | [generate_allnote.py:L295-L295] |
| generate_allnote.py | SyntaxError as e | 302 | [generate_allnote.py:L302-L302] |
| generate_allnote.py | Exception as e | 304 | [generate_allnote.py:L304-L304] |
| generate_allnote.py | Exception as e | 371 | [generate_allnote.py:L371-L371] |
| generate_allnote.py | KeyError | 508 | [generate_allnote.py:L508-L508] |
| generate_allnote.py | Exception | 1087 | [generate_allnote.py:L1087-L1087] |
| generate_allnote.py | PermissionError as e | 1113 | [generate_allnote.py:L1113-L1113] |
| generate_allnote.py | OSError as e | 1117 | [generate_allnote.py:L1117-L1117] |
| generate_allnote.py | Exception as e | 1121 | [generate_allnote.py:L1121-L1121] |
| generate_allnote.py | Exception as e | 1137 | [generate_allnote.py:L1137-L1137] |
| verify_phase4.py | py_compile.PyCompileError as e | 28 | [verify_phase4.py:L28-L28] |
| verify_phase4.py | FileNotFoundError | 30 | [verify_phase4.py:L30-L30] |
| verify_phase6.py | SyntaxError as e | 43 | [verify_phase6.py:L43-L43] |
| verify_phase6.py | Exception as e | 46 | [verify_phase6.py:L46-L46] |

## 5.2 TODO / FIXME / HACK / XXX Audit

| File | Tag (literal) | Line | Citation |
| --- | --- | --- | --- |
| [NOT FOUND] | [NOT FOUND] | [NOT FOUND] | [NOT FOUND] |

## 5.3 Async Discipline Audit

| File | Function | Kind | Citation |
| --- | --- | --- | --- |
| backend/_e2e_run.py | _init_db | async | [backend/_e2e_run.py:L109-L197] |
| backend/_phase4_2_pipeline_test.py | create_schema | async | [backend/_phase4_2_pipeline_test.py:L134-L146] |
| backend/_phase4_2_pipeline_test.py | run_jobs_and_count | async | [backend/_phase4_2_pipeline_test.py:L152-L208] |
| backend/_phase4_2_pipeline_test.py | main | async | [backend/_phase4_2_pipeline_test.py:L214-L238] |
| backend/_phase5_3_frontend_binding_test.py | _preflight_probe | async | [backend/_phase5_3_frontend_binding_test.py:L144-L181] |
| backend/_phase5_3_frontend_binding_test.py | run_phase5_3 | async | [backend/_phase5_3_frontend_binding_test.py:L187-L302] |
| backend/_phase5_server_test.py | probe_rest | async | [backend/_phase5_server_test.py:L97-L118] |
| backend/_phase5_server_test.py | probe_websocket | async | [backend/_phase5_server_test.py:L124-L186] |
| backend/_phase5_server_test.py | run_phase5 | async | [backend/_phase5_server_test.py:L192-L326] |
| backend/_phase6_self_healing_test.py | test_circuit_breaker_opens | async | [backend/_phase6_self_healing_test.py:L73-L141] |
| backend/_phase6_self_healing_test.py | test_recovery_actions | async | [backend/_phase6_self_healing_test.py:L147-L252] |
| backend/_phase6_self_healing_test.py | run_phase6 | async | [backend/_phase6_self_healing_test.py:L258-L295] |
| backend/_phase6_self_healing_test.py | always_fails | async | [backend/_phase6_self_healing_test.py:L87-L88] |
| backend/_phase7_error_logging_test.py | test_error_logging | async | [backend/_phase7_error_logging_test.py:L70-L264] |
| backend/_phase7_error_logging_test.py | run_phase7 | async | [backend/_phase7_error_logging_test.py:L270-L299] |
| backend/app/agents/base.py | asyncio_sleep | async | [backend/app/agents/base.py:L592-L596] |
| backend/app/agents/base.py | __aenter__ | async | [backend/app/agents/base.py:L192-L197] |
| backend/app/agents/base.py | __aexit__ | async | [backend/app/agents/base.py:L199-L202] |
| backend/app/agents/base.py | healthcheck | async | [backend/app/agents/base.py:L204-L212] |
| backend/app/agents/base.py | generate | async | [backend/app/agents/base.py:L214-L263] |
| backend/app/agents/base.py | run | async | [backend/app/agents/base.py:L326-L484] |
| backend/app/agents/base.py | _persist | async | [backend/app/agents/base.py:L523-L572] |
| backend/app/agents/correlation_agent.py | _load_closes | async | [backend/app/agents/correlation_agent.py:L89-L106] |
| backend/app/agents/correlation_agent.py | compute_correlations | async | [backend/app/agents/correlation_agent.py:L109-L158] |
| backend/app/agents/correlation_agent.py | run_for_asset | async | [backend/app/agents/correlation_agent.py:L211-L239] |
| backend/app/agents/fundamental_agent.py | run_for_asset | async | [backend/app/agents/fundamental_agent.py:L89-L129] |
| backend/app/agents/macro_agent.py | run_for_asset | async | [backend/app/agents/macro_agent.py:L124-L156] |
| backend/app/agents/market_structure_agent.py | load_ohlcv_rows | async | [backend/app/agents/market_structure_agent.py:L211-L241] |
| backend/app/agents/market_structure_agent.py | run_for_asset | async | [backend/app/agents/market_structure_agent.py:L291-L315] |
| backend/app/agents/news_agent.py | load_recent_news | async | [backend/app/agents/news_agent.py:L45-L78] |
| backend/app/agents/news_agent.py | run_for_asset | async | [backend/app/agents/news_agent.py:L118-L139] |
| backend/app/agents/regime_agent.py | _load_ohlcv | async | [backend/app/agents/regime_agent.py:L160-L186] |
| backend/app/agents/regime_agent.py | run_for_asset | async | [backend/app/agents/regime_agent.py:L247-L267] |
| backend/app/agents/risk_agent.py | run_for_trade | async | [backend/app/agents/risk_agent.py:L152-L189] |
| backend/app/agents/self_healing_agent.py | run_for_system | async | [backend/app/agents/self_healing_agent.py:L270-L342] |
| backend/app/agents/self_healing_agent.py | _collect_agent_failures | async | [backend/app/agents/self_healing_agent.py:L348-L385] |
| backend/app/agents/self_healing_agent.py | _execute_recommendations | async | [backend/app/agents/self_healing_agent.py:L387-L453] |
| backend/app/agents/sentiment_agent.py | load_market_headlines | async | [backend/app/agents/sentiment_agent.py:L47-L65] |
| backend/app/agents/sentiment_agent.py | load_price_fingerprint | async | [backend/app/agents/sentiment_agent.py:L114-L134] |
| backend/app/agents/sentiment_agent.py | run_for_asset | async | [backend/app/agents/sentiment_agent.py:L186-L206] |
| backend/app/agents/strategy_agent.py | run_for_asset | async | [backend/app/agents/strategy_agent.py:L154-L202] |
| backend/app/agents/technical_agent.py | load_recent_closes | async | [backend/app/agents/technical_agent.py:L64-L110] |
| backend/app/agents/technical_agent.py | run_for_asset | async | [backend/app/agents/technical_agent.py:L194-L235] |
| backend/app/agents/volatility_agent.py | _load_ohlcv | async | [backend/app/agents/volatility_agent.py:L157-L183] |
| backend/app/agents/volatility_agent.py | run_for_asset | async | [backend/app/agents/volatility_agent.py:L230-L253] |
| backend/app/api/v1/endpoints/agents.py | _resolve_asset | async | [backend/app/api/v1/endpoints/agents.py:L96-L111] |
| backend/app/api/v1/endpoints/agents.py | list_agents | async | [backend/app/api/v1/endpoints/agents.py:L138-L151] |
| backend/app/api/v1/endpoints/agents.py | get_agent_info | async | [backend/app/api/v1/endpoints/agents.py:L159-L175] |
| backend/app/api/v1/endpoints/agents.py | analyze_by_asset_id | async | [backend/app/api/v1/endpoints/agents.py:L183-L244] |
| backend/app/api/v1/endpoints/agents.py | analyze_by_symbol | async | [backend/app/api/v1/endpoints/agents.py:L252-L303] |
| backend/app/api/v1/endpoints/orders.py | list_orders | async | [backend/app/api/v1/endpoints/orders.py:L64-L74] |
| backend/app/api/v1/endpoints/orders.py | get_order | async | [backend/app/api/v1/endpoints/orders.py:L81-L92] |
| backend/app/api/v1/endpoints/orders.py | cancel_order | async | [backend/app/api/v1/endpoints/orders.py:L99-L112] |
| backend/app/api/v1/endpoints/orders.py | close_position | async | [backend/app/api/v1/endpoints/orders.py:L119-L169] |
| backend/app/api/v1/endpoints/performance.py | get_summary | async | [backend/app/api/v1/endpoints/performance.py:L83-L95] |
| backend/app/api/v1/endpoints/performance.py | calculate | async | [backend/app/api/v1/endpoints/performance.py:L102-L121] |
| backend/app/api/v1/endpoints/performance.py | history | async | [backend/app/api/v1/endpoints/performance.py:L128-L141] |
| backend/app/api/v1/endpoints/portfolio.py | get_positions | async | [backend/app/api/v1/endpoints/portfolio.py:L40-L46] |
| backend/app/api/v1/endpoints/portfolio.py | get_portfolio_context | async | [backend/app/api/v1/endpoints/portfolio.py:L53-L57] |
| backend/app/api/v1/endpoints/portfolio.py | list_tracked_assets | async | [backend/app/api/v1/endpoints/portfolio.py:L64-L82] |
| backend/app/api/v1/endpoints/portfolio.py | run_portfolio | async | [backend/app/api/v1/endpoints/portfolio.py:L89-L108] |
| backend/app/api/v1/endpoints/portfolio.py | check_sl_tp | async | [backend/app/api/v1/endpoints/portfolio.py:L115-L165] |
| backend/app/api/v1/endpoints/self_healing.py | get_status | async | [backend/app/api/v1/endpoints/self_healing.py:L155-L182] |
| backend/app/api/v1/endpoints/self_healing.py | get_health | async | [backend/app/api/v1/endpoints/self_healing.py:L190-L209] |
| backend/app/api/v1/endpoints/self_healing.py | list_breakers | async | [backend/app/api/v1/endpoints/self_healing.py:L217-L230] |
| backend/app/api/v1/endpoints/self_healing.py | reset_breakers | async | [backend/app/api/v1/endpoints/self_healing.py:L237-L239] |
| backend/app/api/v1/endpoints/self_healing.py | get_recent_alerts | async | [backend/app/api/v1/endpoints/self_healing.py:L246-L252] |
| backend/app/api/v1/endpoints/self_healing.py | get_error_summary | async | [backend/app/api/v1/endpoints/self_healing.py:L259-L271] |
| backend/app/api/v1/endpoints/self_healing.py | trigger_scan | async | [backend/app/api/v1/endpoints/self_healing.py:L279-L345] |
| backend/app/api/v1/endpoints/self_healing.py | manual_recover | async | [backend/app/api/v1/endpoints/self_healing.py:L353-L387] |
| backend/app/api/v1/endpoints/strategy.py | _load_asset | async | [backend/app/api/v1/endpoints/strategy.py:L32-L41] |
| backend/app/api/v1/endpoints/strategy.py | decide_for_asset | async | [backend/app/api/v1/endpoints/strategy.py:L53-L74] |
| backend/app/api/v1/endpoints/strategy.py | decide_for_all | async | [backend/app/api/v1/endpoints/strategy.py:L81-L104] |
| backend/app/api/websocket.py | _compute_portfolio_pnl | async | [backend/app/api/websocket.py:L103-L161] |
| backend/app/api/websocket.py | broadcast_pnl_loop | async | [backend/app/api/websocket.py:L164-L195] |
| backend/app/api/websocket.py | stop_broadcast_task | async | [backend/app/api/websocket.py:L215-L226] |
| backend/app/api/websocket.py | connect | async | [backend/app/api/websocket.py:L47-L57] |
| backend/app/api/websocket.py | disconnect | async | [backend/app/api/websocket.py:L59-L66] |
| backend/app/api/websocket.py | broadcast | async | [backend/app/api/websocket.py:L68-L89] |
| backend/app/core/error_recorder.py | log_error_to_db | async | [backend/app/core/error_recorder.py:L60-L146] |
| backend/app/db/init_db.py | create_all_tables | async | [backend/app/db/init_db.py:L22-L58] |
| backend/app/db/init_db.py | drop_all_tables | async | [backend/app/db/init_db.py:L61-L77] |
| backend/app/db/init_db.py | reset_database | async | [backend/app/db/init_db.py:L80-L83] |
| backend/app/db/init_db.py | seed_default_agents | async | [backend/app/db/init_db.py:L86-L245] |
| backend/app/db/session.py | get_db | async | [backend/app/db/session.py:L53-L70] |
| backend/app/db/session.py | get_db_context | async | [backend/app/db/session.py:L77-L93] |
| backend/app/db/session.py | close_db | async | [backend/app/db/session.py:L99-L102] |
| backend/app/db/session.py | check_connection | async | [backend/app/db/session.py:L105-L121] |
| backend/app/main.py | lifespan | async | [backend/app/main.py:L47-L88] |
| backend/app/main.py | health | async | [backend/app/main.py:L124-L136] |
| backend/app/main.py | health_db | async | [backend/app/main.py:L140-L156] |
| backend/app/main.py | health_scheduler | async | [backend/app/main.py:L160-L176] |
| backend/app/main.py | root | async | [backend/app/main.py:L183-L189] |
| backend/app/main.py | websocket_endpoint | async | [backend/app/main.py:L196-L235] |
| backend/app/scheduler/jobs.py | fetch_prices_job | async | [backend/app/scheduler/jobs.py:L46-L75] |
| backend/app/scheduler/jobs.py | fetch_news_job | async | [backend/app/scheduler/jobs.py:L78-L107] |
| backend/app/scheduler/jobs.py | self_healing_job | async | [backend/app/scheduler/jobs.py:L110-L160] |
| backend/app/scheduler/jobs.py | start_scheduler | async | [backend/app/scheduler/jobs.py:L324-L326] |
| backend/app/scheduler/jobs.py | shutdown_scheduler | async | [backend/app/scheduler/jobs.py:L329-L331] |
| backend/app/scheduler/jobs.py | start | async | [backend/app/scheduler/jobs.py:L185-L268] |
| backend/app/scheduler/jobs.py | shutdown | async | [backend/app/scheduler/jobs.py:L270-L282] |
| backend/app/services/alert_service.py | dispatch | async | [backend/app/services/alert_service.py:L71-L100] |
| backend/app/services/alert_service.py | dispatch_many | async | [backend/app/services/alert_service.py:L102-L108] |
| backend/app/services/alert_service.py | aclose | async | [backend/app/services/alert_service.py:L120-L123] |
| backend/app/services/alert_service.py | _post_webhook | async | [backend/app/services/alert_service.py:L163-L169] |
| backend/app/services/circuit_breaker.py | call | async | [backend/app/services/circuit_breaker.py:L99-L135] |
| backend/app/services/circuit_breaker.py | _maybe_transition_to_half_open | async | [backend/app/services/circuit_breaker.py:L180-L191] |
| backend/app/services/circuit_breaker.py | _on_success | async | [backend/app/services/circuit_breaker.py:L193-L204] |
| backend/app/services/circuit_breaker.py | _on_failure | async | [backend/app/services/circuit_breaker.py:L206-L232] |
| backend/app/services/data_fetcher.py | fetch_all_default_symbols | async | [backend/app/services/data_fetcher.py:L818-L834] |
| backend/app/services/data_fetcher.py | fetch_and_store | async | [backend/app/services/data_fetcher.py:L100-L178] |
| backend/app/services/data_fetcher.py | fetch_multiple | async | [backend/app/services/data_fetcher.py:L180-L232] |
| backend/app/services/data_fetcher.py | fetch_snapshot | async | [backend/app/services/data_fetcher.py:L234-L278] |
| backend/app/services/data_fetcher.py | _fetch_yfinance_data | async | [backend/app/services/data_fetcher.py:L297-L327] |
| backend/app/services/data_fetcher.py | _fetch_and_store_sahmk | async | [backend/app/services/data_fetcher.py:L376-L436] |
| backend/app/services/data_fetcher.py | _fetch_sahmk_data | async | [backend/app/services/data_fetcher.py:L439-L497] |
| backend/app/services/data_fetcher.py | _get_or_create_tasi_asset | async | [backend/app/services/data_fetcher.py:L637-L677] |
| backend/app/services/data_fetcher.py | _get_or_create_asset | async | [backend/app/services/data_fetcher.py:L679-L729] |
| backend/app/services/data_fetcher.py | _bulk_insert_price_history | async | [backend/app/services/data_fetcher.py:L732-L804] |
| backend/app/services/data_fetcher.py | _task | async | [backend/app/services/data_fetcher.py:L208-L220] |
| backend/app/services/health_monitor.py | recent_error_summary | async | [backend/app/services/health_monitor.py:L188-L241] |
| backend/app/services/health_monitor.py | unresolved_error_count | async | [backend/app/services/health_monitor.py:L244-L252] |
| backend/app/services/health_monitor.py | snapshot | async | [backend/app/services/health_monitor.py:L64-L89] |
| backend/app/services/health_monitor.py | _safe_run | async | [backend/app/services/health_monitor.py:L95-L120] |
| backend/app/services/health_monitor.py | _check_database | async | [backend/app/services/health_monitor.py:L122-L130] |
| backend/app/services/health_monitor.py | _check_ollama | async | [backend/app/services/health_monitor.py:L132-L159] |
| backend/app/services/health_monitor.py | _check_scheduler | async | [backend/app/services/health_monitor.py:L161-L169] |
| backend/app/services/health_monitor.py | _check_api | async | [backend/app/services/health_monitor.py:L171-L180] |
| backend/app/services/news_fetcher.py | fetch_all_news | async | [backend/app/services/news_fetcher.py:L462-L468] |
| backend/app/services/news_fetcher.py | fetch_newsapi | async | [backend/app/services/news_fetcher.py:L83-L137] |
| backend/app/services/news_fetcher.py | fetch_rss_feed | async | [backend/app/services/news_fetcher.py:L142-L208] |
| backend/app/services/news_fetcher.py | fetch_rss_for_symbol | async | [backend/app/services/news_fetcher.py:L210-L259] |
| backend/app/services/news_fetcher.py | fetch_all_sources | async | [backend/app/services/news_fetcher.py:L264-L314] |
| backend/app/services/news_fetcher.py | fetch_and_store | async | [backend/app/services/news_fetcher.py:L316-L329] |
| backend/app/services/news_fetcher.py | store_articles | async | [backend/app/services/news_fetcher.py:L334-L400] |
| backend/app/services/recovery_actions.py | execute | async | [backend/app/services/recovery_actions.py:L92-L116] |
| backend/app/services/recovery_actions.py | _retry | async | [backend/app/services/recovery_actions.py:L122-L130] |
| backend/app/services/recovery_actions.py | _restart_job | async | [backend/app/services/recovery_actions.py:L132-L170] |
| backend/app/services/recovery_actions.py | _disable_agent | async | [backend/app/services/recovery_actions.py:L172-L210] |
| backend/app/services/recovery_actions.py | _mark_resolved | async | [backend/app/services/recovery_actions.py:L212-L250] |
| backend/app/services/recovery_actions.py | _clear_cache | async | [backend/app/services/recovery_actions.py:L252-L260] |
| backend/app/services/recovery_actions.py | _backoff | async | [backend/app/services/recovery_actions.py:L262-L306] |
| backend/app/services/recovery_actions.py | _alert_only | async | [backend/app/services/recovery_actions.py:L308-L315] |
| backend/app/services/recovery_actions.py | _no_op | async | [backend/app/services/recovery_actions.py:L317-L324] |
| backend/app/services/recovery_actions.py | _bump_attempt | async | [backend/app/services/recovery_actions.py:L330-L345] |
| backend/app/strategy/order_manager.py | get_open_positions | async | [backend/app/strategy/order_manager.py:L60-L131] |
| backend/app/strategy/order_manager.py | close_position | async | [backend/app/strategy/order_manager.py:L170-L247] |
| backend/app/strategy/order_manager.py | check_sl_tp | async | [backend/app/strategy/order_manager.py:L253-L323] |
| backend/app/strategy/order_manager.py | list_recent_orders | async | [backend/app/strategy/order_manager.py:L329-L344] |
| backend/app/strategy/paper_executor.py | submit_order | async | [backend/app/strategy/paper_executor.py:L67-L138] |
| backend/app/strategy/paper_executor.py | fill_order | async | [backend/app/strategy/paper_executor.py:L144-L205] |
| backend/app/strategy/paper_executor.py | cancel_order | async | [backend/app/strategy/paper_executor.py:L211-L231] |
| backend/app/strategy/paper_executor.py | reject_order | async | [backend/app/strategy/paper_executor.py:L233-L245] |
| backend/app/strategy/paper_executor.py | get_order | async | [backend/app/strategy/paper_executor.py:L251-L256] |
| backend/app/strategy/performance_tracker.py | _load_closed_trades | async | [backend/app/strategy/performance_tracker.py:L61-L80] |
| backend/app/strategy/performance_tracker.py | compute_metrics | async | [backend/app/strategy/performance_tracker.py:L125-L260] |
| backend/app/strategy/performance_tracker.py | summarize | async | [backend/app/strategy/performance_tracker.py:L311-L334] |
| backend/app/strategy/portfolio_manager.py | _get_last_price | async | [backend/app/strategy/portfolio_manager.py:L141-L157] |
| backend/app/strategy/portfolio_manager.py | get_market_context | async | [backend/app/strategy/portfolio_manager.py:L159-L169] |
| backend/app/strategy/portfolio_manager.py | get_portfolio_context | async | [backend/app/strategy/portfolio_manager.py:L171-L181] |
| backend/app/strategy/portfolio_manager.py | _gather_briefs | async | [backend/app/strategy/portfolio_manager.py:L187-L252] |
| backend/app/strategy/portfolio_manager.py | _create_signal | async | [backend/app/strategy/portfolio_manager.py:L258-L310] |
| backend/app/strategy/portfolio_manager.py | _maybe_execute | async | [backend/app/strategy/portfolio_manager.py:L312-L343] |
| backend/app/strategy/portfolio_manager.py | run_for_asset | async | [backend/app/strategy/portfolio_manager.py:L349-L431] |
| backend/app/strategy/portfolio_manager.py | list_tracked_assets | async | [backend/app/strategy/portfolio_manager.py:L437-L445] |
| backend/app/strategy/portfolio_manager.py | run_for_all_assets | async | [backend/app/strategy/portfolio_manager.py:L447-L483] |
| backend/scripts/fetch_data.py | _run_prices | async | [backend/scripts/fetch_data.py:L130-L170] |
| backend/scripts/fetch_data.py | _run_news | async | [backend/scripts/fetch_data.py:L173-L196] |
| backend/scripts/fetch_data.py | _run_snapshot | async | [backend/scripts/fetch_data.py:L199-L213] |
| backend/scripts/fetch_data.py | _main | async | [backend/scripts/fetch_data.py:L219-L255] |
| backend/scripts/init_db.py | main | async | [backend/scripts/init_db.py:L30-L76] |
| backend/scripts/seed_assets.py | _enrich_from_yfinance | async | [backend/scripts/seed_assets.py:L57-L73] |
| backend/scripts/seed_assets.py | _upsert_asset | async | [backend/scripts/seed_assets.py:L76-L135] |
| backend/scripts/seed_assets.py | _run | async | [backend/scripts/seed_assets.py:L174-L224] |

---

# Section 6 — Testing Coverage Gaps & Quality Matrix

## 6.1 Detected Test Suite Files

| Test File | Line Count | Citation |
| --- | --- | --- |
| [NOT FOUND] | [NOT FOUND] | [NOT FOUND] |

## 6.2 Core Modules — Coverage Gap Analysis

| Core Module | Test Coverage Status | Matching Test File | Module Citation |
| --- | --- | --- | --- |
| backend/app/main.py | GAP — no matching test file | [NOT FOUND] | [backend/app/main.py:L1] |
| backend/app/core/config.py | GAP — no matching test file | [NOT FOUND] | [backend/app/core/config.py:L1] |
| backend/app/core/logging.py | GAP — no matching test file | [NOT FOUND] | [backend/app/core/logging.py:L1] |
| backend/app/db/session.py | GAP — no matching test file | [NOT FOUND] | [backend/app/db/session.py:L1] |
| backend/app/scheduler/jobs.py | GAP — no matching test file | [NOT FOUND] | [backend/app/scheduler/jobs.py:L1] |
| backend/app/services/circuit_breaker.py | GAP — no matching test file | [NOT FOUND] | [backend/app/services/circuit_breaker.py:L1] |
| backend/app/services/alert_service.py | GAP — no matching test file | [NOT FOUND] | [backend/app/services/alert_service.py:L1] |
| backend/app/services/health_monitor.py | GAP — no matching test file | [NOT FOUND] | [backend/app/services/health_monitor.py:L1] |
| backend/app/services/recovery_actions.py | GAP — no matching test file | [NOT FOUND] | [backend/app/services/recovery_actions.py:L1] |
| backend/app/strategy/order_manager.py | GAP — no matching test file | [NOT FOUND] | [backend/app/strategy/order_manager.py:L1] |
| backend/app/strategy/paper_executor.py | GAP — no matching test file | [NOT FOUND] | [backend/app/strategy/paper_executor.py:L1] |
| backend/app/strategy/portfolio_manager.py | GAP — no matching test file | [NOT FOUND] | [backend/app/strategy/portfolio_manager.py:L1] |
| backend/app/strategy/performance_tracker.py | GAP — no matching test file | [NOT FOUND] | [backend/app/strategy/performance_tracker.py:L1] |
| backend/app/agents/base.py | GAP — no matching test file | [NOT FOUND] | [backend/app/agents/base.py:L1] |
| backend/app/agents/registry.py | GAP — no matching test file | [NOT FOUND] | [backend/app/agents/registry.py:L1] |

---

# Section 7 — Engineering Handover Protocol & Next-In-Line Backlog

## 7.1 Strict Guardrails for Onboarding Engineer/Agent

- All I/O-bound code paths must use `async/await` paradigms (see `[backend/app/main.py:L84-L95]`).
- Database access must use SQLAlchemy 2.0 async sessions from `backend/app/db/session.py`.
- Pydantic v2 schemas live under `backend/app/schemas/` and must be used for all request/response validation.
- All agents must inherit from `BaseAgent` declared in `backend/app/agents/base.py` and register via `backend/app/agents/registry.py`.
- Self-healing logic and circuit breakers must be invoked through `backend/app/services/circuit_breaker.py` rather than bespoke try/except patterns.
- All new configuration values must be sourced from `backend/app/core/config.py` (Pydantic Settings) — no hardcoded values.
- Logging must go through `app.core.logging.logger` (Loguru) to preserve structured output.
- Frontend components must follow the shadcn/ui pattern declared in `frontend/components.json` and the Tailwind config in `frontend/tailwind.config.ts`.

## 7.2 Developer Backlog Sourced from TODO / FIXME Markers

| File | Marker | Line | Citation |
| --- | --- | --- | --- |
| [NOT FOUND] | [NOT FOUND] | [NOT FOUND] | [NOT FOUND] |

## 7.3 Backlog — Absent Modules / Coverage Gaps

- No automated test suite under `backend/tests/` (smoke tests live in repo root as `verify_phase4.py` and `verify_phase6.py`).
- No Pydantic request/response schemas file present under `backend/app/schemas/` (directory empty).
- Alembic migration folder **now present** at `backend/alembic/` (env.py, script.py.mako, versions/0001_baseline.py) — _resolved since 2026-06-15 baseline._
- No CI configuration (`.github/workflows/`, `.gitlab-ci.yml`) detected.

---

_Mirror generated 2026-06-16 08:03:08 UTC from `allnote.docx` SHA-256 `d37b1e04e152ce003c1353110f4115ff0a9c8ffdea9c5c8c688fca83d341109a`._

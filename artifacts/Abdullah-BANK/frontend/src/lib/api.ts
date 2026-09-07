/**
 * FastAPI client for the split Abdullah BANK backend.
 * Point VITE_API_URL at the FastAPI origin (default http://127.0.0.1:8000).
 * The live Grok App Builder preview still uses createServerFn in src/lib/desk/market.ts —
 * this adapter is for continuing the original FastAPI + frontend split.
 */
const API = (typeof import.meta !== "undefined" && (import.meta as { env?: Record<string, string> }).env?.VITE_API_URL) || "http://127.0.0.1:8000";

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${path}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  health: () => json("/api/v1/health"),
  universe: () => json("/api/v1/universe"),
  tape: (force = false) => json(`/api/v1/market/tape?force=${force}`),
  news: (force = false) => json(`/api/v1/market/news?force=${force}`),
  desk: () => json("/api/v1/desk"),
  portfolio: () => json("/api/v1/portfolio"),
  orders: () => json("/api/v1/orders"),
  place: (body: { symbol: string; side: "buy" | "sell"; qty: number; note?: string; sl?: number; tp?: number }) =>
    json("/api/v1/orders", { method: "POST", body: JSON.stringify(body) }),
  close: (positionId: string) => json(`/api/v1/orders/${positionId}/close`, { method: "POST" }),
  performance: () => json("/api/v1/performance"),
  agents: () => json("/api/v1/agents"),
  runAgent: (type: string, symbol: string) =>
    json(`/api/v1/agents/${type}/run`, { method: "POST", body: JSON.stringify({ symbol }) }),
  system: () => json("/api/v1/system"),
  heal: () => json("/api/v1/system/heal", { method: "POST" }),
  reset: () => json("/api/v1/system/reset", { method: "POST" }),
};

export { API as API_BASE };

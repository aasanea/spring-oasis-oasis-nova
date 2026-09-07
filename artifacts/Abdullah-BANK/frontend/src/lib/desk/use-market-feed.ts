import { useEffect } from "react";
import { loadMarketTape, loadMarketWire } from "./market";
import { isTasiOpen } from "./assets";
import { useDeskStore } from "./store";

export function useMarketFeed() {
  const hydrated = useDeskStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    let tapeTimer: ReturnType<typeof setTimeout> | undefined;
    let newsTimer: ReturnType<typeof setTimeout> | undefined;

    const pullTape = async (force = false) => {
      const store = useDeskStore.getState();
      if (store.feed.status === "idle") {
        store.setFeedStatus({ status: "loading" });
      }
      try {
        const tape = await loadMarketTape({ data: { force } });
        if (cancelled) return;
        store.applyTape(tape);
        if (store.breakers.find((b) => b.id === "market" && b.failures > 0)) {
          store.resetBreaker("market");
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Tape failed";
        useDeskStore.getState().tripBreaker("market", message);
        useDeskStore.getState().setFeedStatus({ status: "error", error: message });
      }
    };

    const pullNews = async (force = false) => {
      try {
        const headlines = await loadMarketWire({ data: { force } });
        if (cancelled) return;
        useDeskStore.getState().applyHeadlines(headlines);
        useDeskStore.getState().resetBreaker("news");
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Wire failed";
        useDeskStore.getState().tripBreaker("news", message);
      }
    };

    const loopTape = async () => {
      await pullTape();
      if (cancelled) return;
      const session = useDeskStore.getState().feed.session;
      const open = session === "open" || (session === "unknown" && isTasiOpen());
      tapeTimer = setTimeout(loopTape, open ? 30_000 : 180_000);
    };

    const loopNews = async () => {
      await pullNews();
      if (cancelled) return;
      newsTimer = setTimeout(loopNews, 180_000);
    };

    void loopTape();
    void loopNews();

    const onVis = () => {
      if (document.visibilityState === "visible") void pullTape(true);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      if (tapeTimer) clearTimeout(tapeTimer);
      if (newsTimer) clearTimeout(newsTimer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [hydrated]);
}

export async function refreshMarketNow() {
  useDeskStore.getState().setFeedStatus({ status: "loading" });
  try {
    const [tape, headlines] = await Promise.all([
      loadMarketTape({ data: { force: true } }),
      loadMarketWire({ data: { force: true } }).catch(() => null),
    ]);
    useDeskStore.getState().applyTape(tape);
    if (headlines) useDeskStore.getState().applyHeadlines(headlines);
    useDeskStore.getState().resetBreaker("market");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Refresh failed";
    useDeskStore.getState().tripBreaker("market", message);
    useDeskStore.getState().setFeedStatus({ status: "error", error: message });
    throw err;
  }
}

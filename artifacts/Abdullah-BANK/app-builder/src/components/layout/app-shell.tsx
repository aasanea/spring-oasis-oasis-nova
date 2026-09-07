import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Briefcase,
  Cpu,
  LayoutDashboard,
  Menu,
  RefreshCw,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { isTasiOpen } from "@/lib/desk/assets";
import { formatPct, formatSar, formatTime, signedClass } from "@/lib/desk/format";
import { deskMetrics, useDeskStore } from "@/lib/desk/store";
import { refreshMarketNow } from "@/lib/desk/use-market-feed";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Desk", ar: "المكتب", icon: LayoutDashboard },
  { to: "/agents", label: "Agents", ar: "الوكلاء", icon: Cpu },
  { to: "/portfolio", label: "Portfolio", ar: "المحفظة", icon: Briefcase },
  { to: "/orders", label: "Orders", ar: "الأوامر", icon: SlidersHorizontal },
  { to: "/performance", label: "Performance", ar: "الأداء", icon: Activity },
  { to: "/system", label: "System", ar: "النظام", icon: Shield },
] as const;

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 text-accent" aria-hidden>
      <rect x="6" y="10" width="3.5" height="14" rx="0.6" fill="currentColor" />
      <rect x="14.25" y="6" width="3.5" height="18" rx="0.6" fill="currentColor" />
      <rect x="22.5" y="12" width="3.5" height="12" rx="0.6" fill="currentColor" />
      <rect x="5" y="25" width="22" height="1.6" rx="0.4" fill="currentColor" />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const book = useDeskStore((s) => s.book);
  const positions = useDeskStore((s) => s.positions);
  const cash = useDeskStore((s) => s.cash);
  const equityHist = useDeskStore((s) => s.equity);
  const orders = useDeskStore((s) => s.orders);
  const feed = useDeskStore((s) => s.feed);
  const [now, setNow] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const metrics = deskMetrics({ book, positions, cash, orders, equity: equityHist });
  const open =
    feed.session === "open" ||
    (feed.session === "unknown" && now != null ? isTasiOpen(new Date(now)) : false);
  const live = feed.status === "live" && feed.lastSync != null && now != null && now - feed.lastSync < 90_000;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border bg-bg lg:flex">
          <div className="flex items-center gap-3 px-5 py-6">
            <BrandMark />
            <div>
              <p className="font-display text-lg leading-none">عبدالله</p>
              <p className="mt-1 text-[10px] tracking-[0.22em] text-muted uppercase">Bank · Live tape</p>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-3">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                    active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[11px] text-subtle">{item.ar}</span>
                </Link>
              );
            })}
          </nav>
          <p className="px-5 py-5 text-[11px] leading-relaxed text-subtle">
            Live Tadawul last via Yahoo Finance. Paper fills in this browser. Not an offer to deal.
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3 lg:hidden">
              <BrandMark />
              <div className="min-w-0">
                <p className="font-display text-base leading-none">عبدالله بنك</p>
                <p className="text-[10px] tracking-[0.18em] text-muted uppercase">Live desk</p>
              </div>
            </div>
            <div className="hidden items-center gap-4 lg:flex">
              <span className="flex items-center gap-2 text-xs text-muted">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    feed.status === "error"
                      ? "bg-down"
                      : live && open
                        ? "bg-up"
                        : feed.status === "loading"
                          ? "bg-warn"
                          : "bg-subtle",
                  )}
                />
                {feed.status === "error"
                  ? "Tape error"
                  : feed.status === "loading"
                    ? "Syncing"
                    : open
                      ? "TASI Open"
                      : "TASI Closed"}
              </span>
              {feed.tasiLast > 0 ? (
                <span className={cn("text-xs tabular-nums", signedClass(feed.tasiChangePct))}>
                  TASI {feed.tasiLast.toFixed(0)} {formatPct(feed.tasiChangePct)}
                </span>
              ) : null}
              <span className="text-xs tabular-nums text-muted" suppressHydrationWarning>
                {now != null ? `${formatTime(now)} AST` : "—"}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Refresh tape"
                disabled={refreshing}
                onClick={() => {
                  setRefreshing(true);
                  void refreshMarketNow()
                    .then(() => toast.success("Tape refreshed"))
                    .catch((e: unknown) =>
                      toast.error(e instanceof Error ? e.message : "Refresh failed"),
                    )
                    .finally(() => setRefreshing(false));
                }}
              >
                <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
              </Button>
              <div className="text-right">
                <p className="text-[10px] tracking-[0.14em] text-subtle uppercase">Equity</p>
                <p className="text-sm tabular-nums">{formatSar(metrics.equity, true)}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-[10px] tracking-[0.14em] text-subtle uppercase">Day</p>
                <p className={cn("text-sm tabular-nums", signedClass(metrics.dayPnL))}>
                  {formatPct(metrics.dayPct)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMenu(true)}
                aria-label="Menu"
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </header>

          <div className="border-b border-border bg-elevated/40 px-4 py-2 text-[11px] text-muted md:px-6">
            Live TASI last · paper fills · 15.5 bps · not financial advice · أسعار حقيقية · تداول ورقي
            {feed.lastSync ? ` · synced ${formatTime(feed.lastSync)}` : ""}
          </div>

          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-5 pb-24 md:px-6 md:py-6 lg:pb-8">
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV.slice(0, 4).map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px]",
                active ? "text-fg" : "text-muted",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMenu(true)}
          className={cn(
            "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px]",
            pathname === "/performance" || pathname === "/system" ? "text-fg" : "text-muted",
          )}
        >
          <Menu className="size-4" />
          More
        </button>
      </nav>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="bottom" className="p-2 pb-8">
          <SheetHeader>
            <SheetTitle>Desk</SheetTitle>
          </SheetHeader>
          <div className="grid gap-1 px-3 pb-4">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenu(false)}
                  className="flex min-h-12 items-center gap-3 rounded-md px-3 text-sm hover:bg-elevated"
                >
                  <Icon className="size-4 text-muted" />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-xs text-subtle">{item.ar}</span>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

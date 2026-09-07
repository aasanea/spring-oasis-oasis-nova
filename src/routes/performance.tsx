import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricTile } from "@/components/desk/metric-tile";
import { Panel, PanelTitle } from "@/components/desk/panel";
import { formatPct, formatSar } from "@/lib/desk/format";
import { CHART } from "@/lib/desk/chart";
import { deskMetrics, useDeskStore } from "@/lib/desk/store";

export const Route = createFileRoute("/performance")({ component: PerformancePage });

function PerformancePage() {
  const book = useDeskStore((s) => s.book);
  const positions = useDeskStore((s) => s.positions);
  const cash = useDeskStore((s) => s.cash);
  const orders = useDeskStore((s) => s.orders);
  const equity = useDeskStore((s) => s.equity);
  const metrics = deskMetrics({ book, positions, cash, orders, equity });

  const series = equity.map((p) => ({
    t: new Date(p.t).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Riyadh",
    }),
    equity: Math.round(p.equity),
  }));

  const peak = equity.reduce((m, p) => Math.max(m, p.equity), 0);
  const last = equity.at(-1)?.equity ?? metrics.equity;
  const dd = peak ? ((last - peak) / peak) * 100 : 0;
  const first = equity[0]?.equity ?? last;
  const total = first ? ((last - first) / first) * 100 : 0;
  const filled = orders.filter((o) => o.status === "filled");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <header>
        <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">الأداء</p>
        <h1 className="font-display text-3xl md:text-4xl">Track record</h1>
        <p className="mt-1 text-sm text-muted">
          Equity is marked to the live TASI last. Curve starts when the tape arrives — no seed history.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Total return" value={formatPct(total)} signed={total} />
        <MetricTile label="Drawdown" value={formatPct(dd)} signed={dd} />
        <MetricTile label="Fills" value={String(filled.length)} hint="Paper prints" />
        <MetricTile label="Win rate" value={formatPct(metrics.winRate, 0)} hint="Closed sells" />
      </div>

      <Panel>
        <PanelTitle kicker="Equity">Mark-to-market</PanelTitle>
        {series.length < 2 ? (
          <p className="text-sm text-muted">Curve builds as the live tape marks the book.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART.accent} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={CHART.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fill: CHART.subtle, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: CHART.subtle, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                  tickFormatter={(v: number) => formatSar(v, true)}
                />
                <Tooltip
                  contentStyle={{ background: CHART.surface, border: `1px solid ${CHART.grid}`, color: CHART.fg }}
                  formatter={(v: number) => formatSar(v)}
                />
                <Area type="monotone" dataKey="equity" stroke={CHART.accent} fill="url(#eq)" strokeWidth={1.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Panel>
    </div>
  );
}

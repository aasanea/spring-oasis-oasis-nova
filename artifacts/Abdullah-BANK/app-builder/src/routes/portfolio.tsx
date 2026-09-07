import { createFileRoute } from "@tanstack/react-router";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { MetricTile } from "@/components/desk/metric-tile";
import { OrderTicket } from "@/components/desk/order-ticket";
import { Panel, PanelTitle } from "@/components/desk/panel";
import { Button } from "@/components/ui/button";
import { formatNum, formatPct, formatSar, signedClass } from "@/lib/desk/format";
import { PIE_SLICES } from "@/lib/desk/chart";
import { deskMetrics, positionPnl, useDeskStore } from "@/lib/desk/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({ component: PortfolioPage });

const SLICE = PIE_SLICES;

function PortfolioPage() {
  const book = useDeskStore((s) => s.book);
  const positions = useDeskStore((s) => s.positions);
  const cash = useDeskStore((s) => s.cash);
  const orders = useDeskStore((s) => s.orders);
  const equity = useDeskStore((s) => s.equity);
  const selected = useDeskStore((s) => s.selected);
  const close = useDeskStore((s) => s.cancelLikeClose);
  const metrics = deskMetrics({ book, positions, cash, orders, equity });

  const slices = [
    { name: "Cash", value: Math.max(0, cash) },
    ...positions.map((p) => {
      const last = book[p.symbol]?.last || p.avgPrice;
      return { name: p.symbol, value: p.qty * last };
    }),
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <header>
        <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">المحفظة</p>
        <h1 className="font-display text-3xl md:text-4xl">Paper book</h1>
        <p className="mt-1 text-sm text-muted">
          Long-only inventory, marked to the live Tadawul last. Fills stay in this browser.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Equity" value={formatSar(metrics.equity)} />
        <MetricTile label="Cash" value={formatSar(metrics.cash)} />
        <MetricTile label="Invested" value={formatSar(metrics.market)} />
        <MetricTile label="Unrealized" value={formatSar(metrics.uPnL)} signed={metrics.uPnL} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <PanelTitle kicker="Positions">Open names</PanelTitle>
          {positions.length === 0 ? (
            <p className="text-sm text-muted">No inventory. Buy from the ticket at the live last.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {positions.map((p) => {
                const a = book[p.symbol];
                if (!a) return null;
                const last = a.last || p.avgPrice;
                const pnl = positionPnl(p, last);
                const weight = metrics.equity ? (pnl.mkt / metrics.equity) * 100 : 0;
                return (
                  <article key={p.id} className="rounded-lg bg-elevated p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{a.nameEn}</p>
                        <p className="text-xs text-muted">
                          {a.nameAr} · {a.symbol} · {weight.toFixed(1)}% of book
                        </p>
                      </div>
                      <p className={cn("text-lg tabular-nums", signedClass(pnl.pnl))}>
                        {formatSar(pnl.pnl)}
                      </p>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted sm:grid-cols-4">
                      <div>
                        Qty <span className="block text-fg tabular-nums">{p.qty.toLocaleString()}</span>
                      </div>
                      <div>
                        Avg <span className="block text-fg tabular-nums">{formatNum(p.avgPrice)}</span>
                      </div>
                      <div>
                        Last <span className="block text-fg tabular-nums">{formatNum(last)}</span>
                      </div>
                      <div>
                        Return{" "}
                        <span className={cn("block tabular-nums", signedClass(pnl.pnlPct))}>
                          {formatPct(pnl.pnlPct)}
                        </span>
                      </div>
                    </dl>
                    {(p.stopLoss || p.takeProfit) && (
                      <p className="mt-2 text-[11px] text-subtle tabular-nums">
                        {p.stopLoss ? `SL ${formatNum(p.stopLoss)}` : ""}{" "}
                        {p.takeProfit ? `TP ${formatNum(p.takeProfit)}` : ""}
                      </p>
                    )}
                    <div className="mt-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          const o = close(p.id);
                          if (o?.status === "filled") toast.success(`Closed ${a.nameEn}`);
                          else toast.error(o?.note ?? "Close failed");
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel>
            <PanelTitle kicker="Mix">Allocation</PanelTitle>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={slices} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} stroke="none">
                    {slices.map((s, i) => (
                      <Cell key={s.name} fill={SLICE[i % SLICE.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-muted">
              {slices.map((s, i) => (
                <li key={s.name} className="flex justify-between tabular-nums">
                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: SLICE[i % SLICE.length] }} />
                    {s.name}
                  </span>
                  {formatSar(s.value, true)}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <PanelTitle kicker="Ticket">Trade {book[selected]?.nameEn}</PanelTitle>
            <OrderTicket symbol={selected} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

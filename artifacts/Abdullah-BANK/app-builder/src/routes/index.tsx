import { createFileRoute, Link } from "@tanstack/react-router";
import { RecoBadge } from "@/components/desk/agent-badge";
import { MetricTile } from "@/components/desk/metric-tile";
import { OrderTicket } from "@/components/desk/order-ticket";
import { Panel, PanelTitle } from "@/components/desk/panel";
import { RunAgentButton } from "@/components/desk/run-agent-button";
import { Sparkline } from "@/components/desk/sparkline";
import { Skeleton } from "@/components/ui/skeleton";
import { UNIVERSE } from "@/lib/desk/assets";
import { formatDate, formatNum, formatPct, formatSar, formatUsd, signedClass } from "@/lib/desk/format";
import { deskMetrics, positionPnl, useDeskStore } from "@/lib/desk/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: DeskHome });

function DeskHome() {
  const book = useDeskStore((s) => s.book);
  const positions = useDeskStore((s) => s.positions);
  const cash = useDeskStore((s) => s.cash);
  const orders = useDeskStore((s) => s.orders);
  const equity = useDeskStore((s) => s.equity);
  const headlines = useDeskStore((s) => s.headlines);
  const analyses = useDeskStore((s) => s.analyses);
  const selected = useDeskStore((s) => s.selected);
  const select = useDeskStore((s) => s.select);
  const feed = useDeskStore((s) => s.feed);
  const metrics = deskMetrics({ book, positions, cash, orders, equity });
  const selectedAsset = book[selected];
  const latestByAgent = analyses.slice(0, 6);

  const consensus = (() => {
    const recent = analyses.filter((a) => a.symbol === selected).slice(0, 8);
    if (!recent.length) return null;
    const score = recent.reduce(
      (a, x) => a + (x.recommendation === "BUY" ? 1 : x.recommendation === "SELL" ? -1 : 0),
      0,
    );
    return score >= 2 ? "BUY" : score <= -2 ? "SELL" : "HOLD";
  })();

  return (
    <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-5">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
            Private desk
          </p>
          <h1 className="font-display text-3xl leading-tight md:text-4xl">The tape is live</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Tadawul last prints, real headlines, and twelve agents. Paper fills at the live last —
            cash starts at one million SAR, book is yours.
          </p>
        </div>
        {selectedAsset?.quoted ? (
          <div className="rounded-lg bg-elevated px-4 py-3">
            <p className="text-[11px] text-subtle uppercase tracking-widest">{selectedAsset.ticker}</p>
            <p className="font-display text-2xl tabular-nums">{formatNum(selectedAsset.last)}</p>
            <p className={cn("text-xs tabular-nums", signedClass(selectedAsset.last - selectedAsset.prevClose))}>
              {formatPct(((selectedAsset.last - selectedAsset.prevClose) / selectedAsset.prevClose) * 100)}
            </p>
          </div>
        ) : (
          <Skeleton className="h-20 w-36" />
        )}
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricTile label="Equity" value={formatSar(metrics.equity, true)} hint="Mark to live last" />
        <MetricTile
          label="Day P&L"
          value={formatPct(metrics.dayPct)}
          signed={metrics.dayPnL}
          hint={formatSar(metrics.dayPnL)}
        />
        <MetricTile
          label="TASI"
          value={feed.tasiLast ? feed.tasiLast.toFixed(0) : "—"}
          signed={feed.tasiChangePct}
          hint={feed.tasiLast ? formatPct(feed.tasiChangePct) : "Waiting"}
        />
        <MetricTile
          label="Brent"
          value={feed.brentLast ? formatUsd(feed.brentLast) : "—"}
          signed={feed.brentChangePct}
          hint={feed.brentLast ? formatPct(feed.brentChangePct) : "Waiting"}
        />
      </div>

      {feed.status === "error" ? (
        <p className="rounded-lg bg-down/10 px-4 py-3 text-sm text-down">{feed.error}</p>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
        <Panel>
          <PanelTitle kicker="Watchlist" action={<span className="text-xs text-muted">SAR · live</span>}>
            TASI names
          </PanelTitle>
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] tracking-widest text-subtle uppercase">
                <tr>
                  <th className="px-2 py-2 font-medium">Name</th>
                  <th className="px-2 py-2 font-medium">Last</th>
                  <th className="px-2 py-2 font-medium">Chg</th>
                  <th className="hidden px-2 py-2 font-medium sm:table-cell">Tape</th>
                </tr>
              </thead>
              <tbody>
                {UNIVERSE.map((seed) => {
                  const a = book[seed.symbol];
                  if (!a) return null;
                  const on = a.symbol === selected;
                  const chg = a.prevClose ? ((a.last - a.prevClose) / a.prevClose) * 100 : 0;
                  return (
                    <tr
                      key={a.symbol}
                      onClick={() => select(a.symbol)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") select(a.symbol);
                      }}
                      tabIndex={0}
                      className={cn(
                        "cursor-pointer border-t border-border/80 transition-colors duration-150",
                        on ? "bg-elevated" : "hover:bg-elevated/50",
                      )}
                    >
                      <td className="px-2 py-2.5">
                        <p className="font-medium">{a.nameEn}</p>
                        <p className="text-[11px] text-muted">
                          {a.symbol} · {a.nameAr}
                        </p>
                      </td>
                      <td className="px-2 py-2.5 tabular-nums">
                        {a.quoted ? formatNum(a.last) : <Skeleton className="h-4 w-12" />}
                      </td>
                      <td className={cn("px-2 py-2.5 tabular-nums", a.quoted ? signedClass(chg) : "text-muted")}>
                        {a.quoted ? formatPct(chg) : "—"}
                      </td>
                      <td className="hidden px-2 py-2.5 sm:table-cell">
                        <Sparkline values={a.history.slice(-28)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel>
            <PanelTitle
              kicker="Ticket"
              action={consensus ? <RecoBadge reco={consensus} /> : null}
            >
              {selectedAsset?.nameEn ?? "Select a name"}
            </PanelTitle>
            {selectedAsset ? <OrderTicket symbol={selectedAsset.symbol} /> : null}
            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs text-muted">Strategy agent on the selected name</p>
              {selectedAsset ? <RunAgentButton agentType="strategy" symbol={selectedAsset.symbol} /> : null}
            </div>
          </Panel>

          <Panel>
            <PanelTitle kicker="Inventory">Open risk</PanelTitle>
            <div className="flex flex-col gap-2">
              {positions.length === 0 ? (
                <p className="text-sm text-muted">Book is flat. Buy from the ticket at the live last.</p>
              ) : (
                positions.map((p) => {
                  const a = book[p.symbol];
                  if (!a) return null;
                  const pnl = positionPnl(p, a.last || p.avgPrice);
                  return (
                    <Link
                      key={p.id}
                      to="/portfolio"
                      className="flex items-center justify-between rounded-lg bg-elevated px-3 py-2.5"
                    >
                      <div>
                        <p className="text-sm font-medium">{a.nameEn}</p>
                        <p className="text-[11px] text-muted tabular-nums">
                          {p.qty.toLocaleString()} @ {formatNum(p.avgPrice)}
                        </p>
                      </div>
                      <p className={cn("text-sm tabular-nums", signedClass(pnl.pnl))}>
                        {formatPct(pnl.pnlPct)}
                      </p>
                    </Link>
                  );
                })
              )}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelTitle kicker="Agents" action={<Link to="/agents" className="text-xs text-muted hover:text-fg">All twelve</Link>}>
            Latest calls
          </PanelTitle>
          {latestByAgent.length === 0 ? (
            <p className="text-sm text-muted">No runs yet. Open Agents and put a name on the desk.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {latestByAgent.map((a) => (
                <li key={a.id} className="rounded-lg bg-elevated p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {a.agentType.replaceAll("_", " ")} · {a.symbol}
                    </p>
                    <RecoBadge reco={a.recommendation} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{a.thesis}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel>
          <PanelTitle kicker="Wire">Session headlines</PanelTitle>
          {headlines.length === 0 ? (
            <p className="text-sm text-muted">
              {feed.status === "loading" ? "Pulling the wire…" : "No headlines yet. Refresh the tape."}
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {headlines.map((h) => (
                <li key={h.id} className="border-t border-border pt-3 first:border-0 first:pt-0">
                  {h.url ? (
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-snug hover:text-accent"
                    >
                      {h.title}
                    </a>
                  ) : (
                    <p className="text-sm leading-snug">{h.title}</p>
                  )}
                  <p className="mt-1 text-[11px] text-subtle">
                    {h.source}
                    {h.symbol ? ` · ${h.symbol}` : ""} · {formatDate(h.at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}

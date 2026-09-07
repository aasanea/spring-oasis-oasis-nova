import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Panel, PanelTitle } from "@/components/desk/panel";
import { RunAgentButton } from "@/components/desk/run-agent-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/desk/format";
import { STARTING_CASH, useDeskStore } from "@/lib/desk/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/system")({ component: SystemPage });

function SystemPage() {
  const breakers = useDeskStore((s) => s.breakers);
  const errors = useDeskStore((s) => s.errors);
  const heal = useDeskStore((s) => s.healScan);
  const resetBreaker = useDeskStore((s) => s.resetBreaker);
  const resetBook = useDeskStore((s) => s.resetBook);
  const selected = useDeskStore((s) => s.selected);
  const feed = useDeskStore((s) => s.feed);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">النظام</p>
          <h1 className="font-display text-3xl md:text-4xl">Self-healing</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Circuit breakers guard the live tape, the news wire, and the agent bus. Recovery is local
            to this browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <RunAgentButton agentType="self_healing" symbol={selected} size="default" />
          <Button
            variant="secondary"
            onClick={() => {
              heal();
              toast.success("Breakers reset, errors marked resolved");
            }}
          >
            Recover all
          </Button>
        </div>
      </header>

      <Panel>
        <PanelTitle kicker="Feed">Live sources</PanelTitle>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-subtle uppercase tracking-widest">Tape</dt>
            <dd className="mt-1">{feed.source}</dd>
          </div>
          <div>
            <dt className="text-xs text-subtle uppercase tracking-widest">Status</dt>
            <dd className="mt-1">
              {feed.status}
              {feed.lastSync ? ` · ${formatTime(feed.lastSync)} AST` : ""}
              {feed.session !== "unknown" ? ` · session ${feed.session}` : ""}
            </dd>
          </div>
          {feed.failed.length ? (
            <div className="sm:col-span-2">
              <dt className="text-xs text-subtle uppercase tracking-widest">Unquoted</dt>
              <dd className="mt-1 text-down">{feed.failed.join(", ")}</dd>
            </div>
          ) : null}
          {feed.error ? (
            <div className="sm:col-span-2 text-down">{feed.error}</div>
          ) : null}
        </dl>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        {breakers.map((b) => (
          <Panel key={b.id}>
            <PanelTitle
              kicker="Breaker"
              action={
                <Badge tone={b.state === "closed" ? "live" : b.state === "open" ? "sell" : "warn"}>
                  {b.state.replace("_", " ")}
                </Badge>
              }
            >
              {b.name}
            </PanelTitle>
            <p className="text-sm text-muted">Failures {b.failures}{b.lastError ? ` · ${b.lastError}` : ""}</p>
            <Button variant="ghost" size="sm" className="mt-3 px-0" onClick={() => resetBreaker(b.id)}>
              Close breaker
            </Button>
          </Panel>
        ))}
      </div>

      <Panel>
        <PanelTitle kicker="Log">Error ledger</PanelTitle>
        {errors.length === 0 ? (
          <p className="text-sm text-muted">Clean book. Failed tape or agent runs will land here.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {errors.map((e) => (
              <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg bg-elevated px-3 py-2">
                <p className={cn("text-sm", e.resolved && "text-muted")}>
                  {e.component} · {e.message}
                </p>
                <span className="text-[11px] text-subtle">
                  {e.resolved ? "resolved · " : ""}
                  {formatDate(e.at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel>
        <PanelTitle kicker="Danger">Reset paper book</PanelTitle>
        <p className="mb-3 text-sm text-muted">
          Clears inventory and orders, restores SAR {STARTING_CASH.toLocaleString()} cash. Live quotes stay.
        </p>
        <Button
          variant="danger"
          onClick={() => {
            resetBook();
            toast.success("Book reset to cash");
          }}
        >
          Reset to cash
        </Button>
      </Panel>
    </div>
  );
}

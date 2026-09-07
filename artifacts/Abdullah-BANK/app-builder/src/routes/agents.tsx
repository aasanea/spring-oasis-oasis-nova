import { createFileRoute } from "@tanstack/react-router";
import { RecoBadge } from "@/components/desk/agent-badge";
import { Panel, PanelTitle } from "@/components/desk/panel";
import { RunAgentButton } from "@/components/desk/run-agent-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AGENTS } from "@/lib/desk/agents";
import { UNIVERSE } from "@/lib/desk/assets";
import { formatDate } from "@/lib/desk/format";
import { useDeskStore } from "@/lib/desk/store";
import type { AgentType } from "@/lib/desk/types";

export const Route = createFileRoute("/agents")({ component: AgentsPage });

function AgentsPage() {
  const book = useDeskStore((s) => s.book);
  const selected = useDeskStore((s) => s.selected);
  const select = useDeskStore((s) => s.select);
  const analyses = useDeskStore((s) => s.analyses);
  const names = UNIVERSE.map((a) => book[a.symbol]).filter((a) => a != null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">وكلاء المكتب</p>
          <h1 className="font-display text-3xl md:text-4xl">Twelve specialists</h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Each run is user-started and capped. Agents read the live TASI last, realized vol, and
            the wire. Grok writes the thesis when the key is live.
          </p>
        </div>
        <div className="w-full md:w-72">
          <p className="mb-1 text-xs text-muted">Working name</p>
          <Select value={selected} onValueChange={select}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {names.map((a) => (
                <SelectItem key={a.symbol} value={a.symbol}>
                  {a.symbol} · {a.nameEn}
                  {a.quoted ? ` · ${a.last.toFixed(2)}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {AGENTS.map((agent) => {
          const last = analyses.find(
            (a) =>
              a.agentType === agent.type &&
              (agent.type === "self_healing" ? a.symbol === "SYSTEM" : a.symbol === selected),
          );
          return (
            <Panel key={agent.type} className="flex flex-col">
              <PanelTitle
                kicker={agent.focus}
                action={<RunAgentButton agentType={agent.type as AgentType} symbol={selected} />}
              >
                {agent.name}
              </PanelTitle>
              <p className="text-[13px] text-muted">{agent.nameAr} — {agent.blurb}</p>
              {last ? (
                <div className="mt-4 rounded-lg bg-elevated p-3">
                  <div className="flex items-center justify-between gap-2">
                    <RecoBadge reco={last.recommendation} />
                    <span className="text-[11px] tabular-nums text-subtle">
                      {last.confidence}% · {last.source} · {formatDate(last.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{last.thesis}</p>
                  {last.risks ? <p className="mt-2 text-xs text-muted">{last.risks}</p> : null}
                </div>
              ) : (
                <p className="mt-4 text-xs text-subtle">No note on this name yet.</p>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

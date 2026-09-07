import { useState } from "react";
import { LoaderCircle, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AGENT_MAP } from "@/lib/desk/agents";
import { runDeskAgent } from "@/lib/desk/run-agent";
import { buildSnapshot } from "@/lib/desk/snapshot";
import { deskMetrics, useDeskStore } from "@/lib/desk/store";
import type { AgentType } from "@/lib/desk/types";

export function RunAgentButton({
  agentType,
  symbol,
  size = "sm",
}: {
  agentType: AgentType;
  symbol: string;
  size?: "sm" | "default";
}) {
  const [busy, setBusy] = useState(false);
  const meta = AGENT_MAP[agentType];

  async function run() {
    const state = useDeskStore.getState();
    const asset = state.book[symbol];
    if (!asset && agentType !== "self_healing") {
      toast.error("Unknown symbol");
      return;
    }
    const target = asset ?? state.book[state.selected];
    if (!target) {
      toast.error("No working name");
      return;
    }
    if (!target.quoted && agentType !== "self_healing") {
      toast.error("Waiting for a live quote");
      return;
    }
    const headlines = state.headlines
      .filter((h) => !h.symbol || h.symbol === target.symbol)
      .map((h) => h.title);
    const snap = buildSnapshot(
      target,
      state.book,
      state.positions.find((p) => p.symbol === target.symbol),
      headlines,
      state.feed,
    );
    const m = deskMetrics(state);
    setBusy(true);
    try {
      const result = await runDeskAgent({
        data: {
          agentType,
          snapshot: snap,
          bookHealth: {
            breakersOpen: state.breakers.filter((b) => b.state === "open").length,
            unresolvedErrors: state.errors.filter((e) => !e.resolved).length,
            equity: m.equity,
            cash: m.cash,
          },
        },
      });
      useDeskStore.getState().addAnalysis({
        agentType,
        symbol: agentType === "self_healing" ? "SYSTEM" : target.symbol,
        recommendation: result.recommendation,
        confidence: result.confidence,
        thesis: result.thesis,
        risks: result.risks,
        horizon: result.horizon,
        source: result.source,
      });
      toast.success(`${meta.name} · ${result.recommendation} (${result.confidence}%)`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Agent failed";
      useDeskStore.getState().tripBreaker("agents", message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="secondary" size={size} onClick={run} disabled={busy}>
      {busy ? <LoaderCircle className="size-3.5 animate-spin" /> : <Play className="size-3.5" />}
      Run
    </Button>
  );
}

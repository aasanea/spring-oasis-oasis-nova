import { Badge } from "@/components/ui/badge";
import type { Reco } from "@/lib/desk/types";

export function RecoBadge({ reco }: { reco: Reco }) {
  const tone = reco === "BUY" ? "buy" : reco === "SELL" ? "sell" : "hold";
  return <Badge tone={tone}>{reco}</Badge>;
}

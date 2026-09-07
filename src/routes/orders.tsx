import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelTitle } from "@/components/desk/panel";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNum, formatSar } from "@/lib/desk/format";
import { FEE_BPS, useDeskStore } from "@/lib/desk/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const orders = useDeskStore((s) => s.orders);
  const book = useDeskStore((s) => s.book);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <header>
        <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">الأوامر</p>
        <h1 className="font-display text-3xl md:text-4xl">Paper blotter</h1>
        <p className="mt-1 text-sm text-muted">
          Market fills at the live last. Commission {(FEE_BPS * 10_000).toFixed(1)} bps incl. VAT, long-only.
        </p>
      </header>
      <Panel>
        <PanelTitle kicker="History">{orders.length} prints</PanelTitle>
        {orders.length === 0 ? (
          <p className="text-sm text-muted">No tickets yet. Send a buy from the desk at the live last.</p>
        ) : (
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-xl text-left text-sm">
              <thead className="text-[11px] tracking-widest text-subtle uppercase">
                <tr>
                  <th className="px-2 py-2 font-medium">When</th>
                  <th className="px-2 py-2 font-medium">Name</th>
                  <th className="px-2 py-2 font-medium">Side</th>
                  <th className="px-2 py-2 font-medium">Qty</th>
                  <th className="px-2 py-2 font-medium">Px</th>
                  <th className="px-2 py-2 font-medium">Fee</th>
                  <th className="px-2 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const a = book[o.symbol];
                  return (
                    <tr key={o.id} className="border-t border-border">
                      <td className="px-2 py-3 text-xs text-muted tabular-nums">{formatDate(o.createdAt)}</td>
                      <td className="px-2 py-3">
                        <p>{a?.nameEn ?? o.symbol}</p>
                        <p className="text-[11px] text-muted">{o.note}</p>
                      </td>
                      <td className={cn("px-2 py-3 uppercase", o.side === "buy" ? "text-up" : "text-down")}>
                        {o.side}
                      </td>
                      <td className="px-2 py-3 tabular-nums">{o.qty.toLocaleString()}</td>
                      <td className="px-2 py-3 tabular-nums">{formatNum(o.price)}</td>
                      <td className="px-2 py-3 tabular-nums text-muted">{formatSar(o.fee)}</td>
                      <td className="px-2 py-3">
                        <Badge tone={o.status === "filled" ? "live" : o.status === "rejected" ? "sell" : "default"}>
                          {o.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

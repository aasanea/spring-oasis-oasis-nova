import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatNum, formatSar } from "@/lib/desk/format";
import { FEE_BPS, useDeskStore } from "@/lib/desk/store";

export function OrderTicket({ symbol }: { symbol: string }) {
  const asset = useDeskStore((s) => s.book[symbol]);
  const cash = useDeskStore((s) => s.cash);
  const position = useDeskStore((s) => s.positions.find((p) => p.symbol === symbol));
  const place = useDeskStore((s) => s.place);
  const [qty, setQty] = useState("100");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");

  if (!asset) return null;
  const n = Math.max(0, Math.floor(Number(qty) || 0));
  const notional = n * asset.last;
  const fee = notional * FEE_BPS;
  const quoted = asset.quoted;

  function send(side: "buy" | "sell") {
    const order = place({
      symbol,
      side,
      qty: n,
      sl: sl ? Number(sl) : undefined,
      tp: tp ? Number(tp) : undefined,
      note: side === "buy" ? "Ticket buy · live last" : "Ticket sell · live last",
    });
    if (order.status === "rejected") {
      toast.error(order.note);
      return;
    }
    toast.success(`${side === "buy" ? "Bought" : "Sold"} ${order.qty} × ${order.symbol} @ ${order.price.toFixed(2)}`);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <label className="col-span-2 text-xs text-muted">
          Quantity
          <Input
            className="mt-1"
            inputMode="numeric"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
        <label className="text-xs text-muted">
          Stop
          <Input className="mt-1" inputMode="decimal" placeholder="Optional" value={sl} onChange={(e) => setSl(e.target.value)} />
        </label>
        <label className="text-xs text-muted">
          Target
          <Input className="mt-1" inputMode="decimal" placeholder="Optional" value={tp} onChange={(e) => setTp(e.target.value)} />
        </label>
      </div>
      <p className="text-xs text-muted tabular-nums">
        {quoted ? (
          <>
            Last {formatNum(asset.last)} · Notional {formatSar(notional)} · Fee {formatSar(fee)} · Cash{" "}
            {formatSar(cash)}
            {position ? ` · Long ${position.qty.toLocaleString()}` : ""}
          </>
        ) : (
          "Waiting for a live quote before the ticket will send."
        )}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="buy" onClick={() => send("buy")} disabled={n <= 0 || !quoted}>
          Buy
        </Button>
        <Button variant="sell" onClick={() => send("sell")} disabled={n <= 0 || !quoted}>
          Sell
        </Button>
      </div>
    </div>
  );
}

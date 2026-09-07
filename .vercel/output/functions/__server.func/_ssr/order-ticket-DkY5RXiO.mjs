import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as formatSar, o as formatNum, p as useDeskStore, r as cn, t as FEE_BPS } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-Dcy2Oume.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-ticket-DkY5RXiO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg tabular-nums shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-40", className),
		...props
	});
}
function OrderTicket({ symbol }) {
	const asset = useDeskStore((s) => s.book[symbol]);
	const cash = useDeskStore((s) => s.cash);
	const position = useDeskStore((s) => s.positions.find((p) => p.symbol === symbol));
	const place = useDeskStore((s) => s.place);
	const [qty, setQty] = (0, import_react.useState)("100");
	const [sl, setSl] = (0, import_react.useState)("");
	const [tp, setTp] = (0, import_react.useState)("");
	if (!asset) return null;
	const n = Math.max(0, Math.floor(Number(qty) || 0));
	const notional = n * asset.last;
	const fee = notional * FEE_BPS;
	const quoted = asset.quoted;
	function send(side) {
		const order = place({
			symbol,
			side,
			qty: n,
			sl: sl ? Number(sl) : void 0,
			tp: tp ? Number(tp) : void 0,
			note: side === "buy" ? "Ticket buy · live last" : "Ticket sell · live last"
		});
		if (order.status === "rejected") {
			toast.error(order.note);
			return;
		}
		toast.success(`${side === "buy" ? "Bought" : "Sold"} ${order.qty} × ${order.symbol} @ ${order.price.toFixed(2)}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "col-span-2 text-xs text-muted",
						children: ["Quantity", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							inputMode: "numeric",
							value: qty,
							onChange: (e) => setQty(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted",
						children: ["Stop", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							inputMode: "decimal",
							placeholder: "Optional",
							value: sl,
							onChange: (e) => setSl(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted",
						children: ["Target", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							inputMode: "decimal",
							placeholder: "Optional",
							value: tp,
							onChange: (e) => setTp(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted tabular-nums",
				children: quoted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Last ",
					formatNum(asset.last),
					" · Notional ",
					formatSar(notional),
					" · Fee ",
					formatSar(fee),
					" · Cash",
					" ",
					formatSar(cash),
					position ? ` · Long ${position.qty.toLocaleString()}` : ""
				] }) : "Waiting for a live quote before the ticket will send."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "buy",
					onClick: () => send("buy"),
					disabled: n <= 0 || !quoted,
					children: "Buy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "sell",
					onClick: () => send("sell"),
					disabled: n <= 0 || !quoted,
					children: "Sell"
				})]
			})
		]
	});
}
//#endregion
export { OrderTicket as t };

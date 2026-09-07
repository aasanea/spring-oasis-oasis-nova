import { a as formatDate, c as formatSar, o as formatNum, p as useDeskStore, r as cn, t as FEE_BPS } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./badge-DwOFitFv.mjs";
import { n as PanelTitle, t as Panel } from "./panel-BDYUr42O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-Cq69HadR.js
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const orders = useDeskStore((s) => s.orders);
	const book = useDeskStore((s) => s.book);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
				children: "الأوامر"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl md:text-4xl",
				children: "Paper blotter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Market fills at the live last. Commission ",
					(FEE_BPS * 1e4).toFixed(1),
					" bps incl. VAT, long-only."
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelTitle, {
			kicker: "History",
			children: [orders.length, " prints"]
		}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No tickets yet. Send a buy from the desk at the live last."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-xl text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-[11px] tracking-widest text-subtle uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "When"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Side"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Qty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Px"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Fee"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 py-2 font-medium",
							children: "Status"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((o) => {
					const a = book[o.symbol];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-3 text-xs text-muted tabular-nums",
								children: formatDate(o.createdAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a?.nameEn ?? o.symbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted",
									children: o.note
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("px-2 py-3 uppercase", o.side === "buy" ? "text-up" : "text-down"),
								children: o.side
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-3 tabular-nums",
								children: o.qty.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-3 tabular-nums",
								children: formatNum(o.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-3 tabular-nums text-muted",
								children: formatSar(o.fee)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: o.status === "filled" ? "live" : o.status === "rejected" ? "sell" : "default",
									children: o.status
								})
							})
						]
					}, o.id);
				}) })]
			})
		})] })]
	});
}
//#endregion
export { OrdersPage as component };

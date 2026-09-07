import { c as formatSar, d as positionPnl, f as signedClass, i as deskMetrics, o as formatNum, p as useDeskStore, r as cn, s as formatPct } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PanelTitle, t as Panel } from "./panel-BDYUr42O.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-Dcy2Oume.mjs";
import { t as MetricTile } from "./metric-tile-CwX9cajZ.mjs";
import { n as PIE_SLICES } from "./chart-DbBtktDI.mjs";
import { c as ResponsiveContainer, n as PieChart, o as Pie, s as Cell } from "../_libs/recharts+[...].mjs";
import { t as OrderTicket } from "./order-ticket-DkY5RXiO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-BMZu-495.js
var import_jsx_runtime = require_jsx_runtime();
var SLICE = PIE_SLICES;
function PortfolioPage() {
	const book = useDeskStore((s) => s.book);
	const positions = useDeskStore((s) => s.positions);
	const cash = useDeskStore((s) => s.cash);
	const orders = useDeskStore((s) => s.orders);
	const equity = useDeskStore((s) => s.equity);
	const selected = useDeskStore((s) => s.selected);
	const close = useDeskStore((s) => s.cancelLikeClose);
	const metrics = deskMetrics({
		book,
		positions,
		cash,
		orders,
		equity
	});
	const slices = [{
		name: "Cash",
		value: Math.max(0, cash)
	}, ...positions.map((p) => {
		const last = book[p.symbol]?.last || p.avgPrice;
		return {
			name: p.symbol,
			value: p.qty * last
		};
	})];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
					children: "المحفظة"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl md:text-4xl",
					children: "Paper book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Long-only inventory, marked to the live Tadawul last. Fills stay in this browser."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Equity",
						value: formatSar(metrics.equity)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Cash",
						value: formatSar(metrics.cash)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Invested",
						value: formatSar(metrics.market)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Unrealized",
						value: formatSar(metrics.uPnL),
						signed: metrics.uPnL
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
					kicker: "Positions",
					children: "Open names"
				}), positions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No inventory. Buy from the ticket at the live last."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: positions.map((p) => {
						const a = book[p.symbol];
						if (!a) return null;
						const last = a.last || p.avgPrice;
						const pnl = positionPnl(p, last);
						const weight = metrics.equity ? pnl.mkt / metrics.equity * 100 : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg bg-elevated p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: a.nameEn
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											a.nameAr,
											" · ",
											a.symbol,
											" · ",
											weight.toFixed(1),
											"% of book"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-lg tabular-nums", signedClass(pnl.pnl)),
										children: formatSar(pnl.pnl)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-3 grid grid-cols-2 gap-2 text-xs text-muted sm:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Qty ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-fg tabular-nums",
											children: p.qty.toLocaleString()
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Avg ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-fg tabular-nums",
											children: formatNum(p.avgPrice)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Last ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-fg tabular-nums",
											children: formatNum(last)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											"Return",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("block tabular-nums", signedClass(pnl.pnlPct)),
												children: formatPct(pnl.pnlPct)
											})
										] })
									]
								}),
								(p.stopLoss || p.takeProfit) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-[11px] text-subtle tabular-nums",
									children: [
										p.stopLoss ? `SL ${formatNum(p.stopLoss)}` : "",
										" ",
										p.takeProfit ? `TP ${formatNum(p.takeProfit)}` : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "danger",
										size: "sm",
										onClick: () => {
											const o = close(p.id);
											if (o?.status === "filled") toast.success(`Closed ${a.nameEn}`);
											else toast.error(o?.note ?? "Close failed");
										},
										children: "Close"
									})
								})
							]
						}, p.id);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
							kicker: "Mix",
							children: "Allocation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-52",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: slices,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 48,
									outerRadius: 80,
									stroke: "none",
									children: slices.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: SLICE[i % SLICE.length] }, s.name))
								}) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-col gap-1 text-xs text-muted",
							children: slices.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 rounded-full",
										style: { background: SLICE[i % SLICE.length] }
									}), s.name]
								}), formatSar(s.value, true)]
							}, s.name))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelTitle, {
						kicker: "Ticket",
						children: ["Trade ", book[selected]?.nameEn]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTicket, { symbol: selected })] })]
				})]
			})
		]
	});
}
//#endregion
export { PortfolioPage as component };

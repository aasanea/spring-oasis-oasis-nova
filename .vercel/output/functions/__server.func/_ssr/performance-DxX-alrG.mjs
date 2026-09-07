import { c as formatSar, i as deskMetrics, p as useDeskStore, s as formatPct } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PanelTitle, t as Panel } from "./panel-BDYUr42O.mjs";
import { t as MetricTile } from "./metric-tile-CwX9cajZ.mjs";
import { t as CHART } from "./chart-DbBtktDI.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, r as YAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/performance-DxX-alrG.js
var import_jsx_runtime = require_jsx_runtime();
function PerformancePage() {
	const book = useDeskStore((s) => s.book);
	const positions = useDeskStore((s) => s.positions);
	const cash = useDeskStore((s) => s.cash);
	const orders = useDeskStore((s) => s.orders);
	const equity = useDeskStore((s) => s.equity);
	const metrics = deskMetrics({
		book,
		positions,
		cash,
		orders,
		equity
	});
	const series = equity.map((p) => ({
		t: new Date(p.t).toLocaleDateString("en-GB", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "Asia/Riyadh"
		}),
		equity: Math.round(p.equity)
	}));
	const peak = equity.reduce((m, p) => Math.max(m, p.equity), 0);
	const last = equity.at(-1)?.equity ?? metrics.equity;
	const dd = peak ? (last - peak) / peak * 100 : 0;
	const first = equity[0]?.equity ?? last;
	const total = first ? (last - first) / first * 100 : 0;
	const filled = orders.filter((o) => o.status === "filled");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
					children: "الأداء"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl md:text-4xl",
					children: "Track record"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Equity is marked to the live TASI last. Curve starts when the tape arrives — no seed history."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Total return",
						value: formatPct(total),
						signed: total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Drawdown",
						value: formatPct(dd),
						signed: dd
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Fills",
						value: String(filled.length),
						hint: "Paper prints"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Win rate",
						value: formatPct(metrics.winRate, 0),
						hint: "Closed sells"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				kicker: "Equity",
				children: "Mark-to-market"
			}), series.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Curve builds as the live tape marks the book."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: series,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "eq",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: CHART.accent,
									stopOpacity: .28
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: CHART.accent,
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								tick: {
									fill: CHART.subtle,
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: CHART.subtle,
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 56,
								tickFormatter: (v) => formatSar(v, true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: CHART.surface,
									border: `1px solid ${CHART.grid}`,
									color: CHART.fg
								},
								formatter: (v) => formatSar(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "equity",
								stroke: CHART.accent,
								fill: "url(#eq)",
								strokeWidth: 1.6
							})
						]
					})
				})
			})] })
		]
	});
}
//#endregion
export { PerformancePage as component };

import { n as UNIVERSE } from "./assets-CiXb2yRx.mjs";
import { a as formatDate, p as useDeskStore, r as cn } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as RecoBadge } from "./agent-badge-BjUanOzN.mjs";
import { n as PanelTitle, t as Panel } from "./panel-BDYUr42O.mjs";
import { d as ChevronDown, f as Check } from "../_libs/lucide-react.mjs";
import { n as RunAgentButton, t as AGENTS } from "./run-agent-button-Dn9_JCww.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-Crj05-AD.js
var import_jsx_runtime = require_jsx_runtime();
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1, { ...props });
}
function SelectValue(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue$1, { ...props });
}
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/40", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted" }) })]
	});
}
function SelectContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("z-50 max-h-72 overflow-auto rounded-lg bg-surface p-1 text-fg shadow-[var(--shadow-border)]", className),
		position: "popper",
		sideOffset: 6,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, { children })
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex h-10 cursor-pointer items-center rounded-md px-8 text-sm outline-none data-[highlighted]:bg-elevated", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			className: "absolute left-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
function AgentsPage() {
	const book = useDeskStore((s) => s.book);
	const selected = useDeskStore((s) => s.selected);
	const select = useDeskStore((s) => s.select);
	const analyses = useDeskStore((s) => s.analyses);
	const names = UNIVERSE.map((a) => book[a.symbol]).filter((a) => a != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
					children: "وكلاء المكتب"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl md:text-4xl",
					children: "Twelve specialists"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-muted",
					children: "Each run is user-started and capped. Agents read the live TASI last, realized vol, and the wire. Grok writes the thesis when the key is live."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full md:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs text-muted",
					children: "Working name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: selected,
					onValueChange: select,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: names.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
						value: a.symbol,
						children: [
							a.symbol,
							" · ",
							a.nameEn,
							a.quoted ? ` · ${a.last.toFixed(2)}` : ""
						]
					}, a.symbol)) })]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: AGENTS.map((agent) => {
				const last = analyses.find((a) => a.agentType === agent.type && (agent.type === "self_healing" ? a.symbol === "SYSTEM" : a.symbol === selected));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
							kicker: agent.focus,
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunAgentButton, {
								agentType: agent.type,
								symbol: selected
							}),
							children: agent.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[13px] text-muted",
							children: [
								agent.nameAr,
								" — ",
								agent.blurb
							]
						}),
						last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg bg-elevated p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoBadge, { reco: last.recommendation }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] tabular-nums text-subtle",
										children: [
											last.confidence,
											"% · ",
											last.source,
											" · ",
											formatDate(last.createdAt)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed",
									children: last.thesis
								}),
								last.risks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted",
									children: last.risks
								}) : null
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-subtle",
							children: "No note on this name yet."
						})
					]
				}, agent.type);
			})
		})]
	});
}
//#endregion
export { AgentsPage as component };

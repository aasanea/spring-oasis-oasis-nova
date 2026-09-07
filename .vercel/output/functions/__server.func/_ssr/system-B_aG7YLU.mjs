import { a as formatDate, l as formatTime, n as STARTING_CASH, p as useDeskStore, r as cn } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./badge-DwOFitFv.mjs";
import { n as PanelTitle, t as Panel } from "./panel-BDYUr42O.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./router-Dcy2Oume.mjs";
import { n as RunAgentButton } from "./run-agent-button-Dn9_JCww.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/system-B_aG7YLU.js
var import_jsx_runtime = require_jsx_runtime();
function SystemPage() {
	const breakers = useDeskStore((s) => s.breakers);
	const errors = useDeskStore((s) => s.errors);
	const heal = useDeskStore((s) => s.healScan);
	const resetBreaker = useDeskStore((s) => s.resetBreaker);
	const resetBook = useDeskStore((s) => s.resetBook);
	const selected = useDeskStore((s) => s.selected);
	const feed = useDeskStore((s) => s.feed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
						children: "النظام"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl md:text-4xl",
						children: "Self-healing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: "Circuit breakers guard the live tape, the news wire, and the agent bus. Recovery is local to this browser."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunAgentButton, {
						agentType: "self_healing",
						symbol: selected,
						size: "default"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							heal();
							toast.success("Breakers reset, errors marked resolved");
						},
						children: "Recover all"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				kicker: "Feed",
				children: "Live sources"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-3 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-subtle uppercase tracking-widest",
						children: "Tape"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: feed.source
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-subtle uppercase tracking-widest",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "mt-1",
						children: [
							feed.status,
							feed.lastSync ? ` · ${formatTime(feed.lastSync)} AST` : "",
							feed.session !== "unknown" ? ` · session ${feed.session}` : ""
						]
					})] }),
					feed.failed.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle uppercase tracking-widest",
							children: "Unquoted"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-down",
							children: feed.failed.join(", ")
						})]
					}) : null,
					feed.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2 text-down",
						children: feed.error
					}) : null
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: breakers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
						kicker: "Breaker",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: b.state === "closed" ? "live" : b.state === "open" ? "sell" : "warn",
							children: b.state.replace("_", " ")
						}),
						children: b.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Failures ",
							b.failures,
							b.lastError ? ` · ${b.lastError}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "mt-3 px-0",
						onClick: () => resetBreaker(b.id),
						children: "Close breaker"
					})
				] }, b.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
				kicker: "Log",
				children: "Error ledger"
			}), errors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Clean book. Failed tape or agent runs will land here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-baseline justify-between gap-2 rounded-lg bg-elevated px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-sm", e.resolved && "text-muted"),
						children: [
							e.component,
							" · ",
							e.message
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-subtle",
						children: [e.resolved ? "resolved · " : "", formatDate(e.at)]
					})]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
					kicker: "Danger",
					children: "Reset paper book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 text-sm text-muted",
					children: [
						"Clears inventory and orders, restores SAR ",
						STARTING_CASH.toLocaleString(),
						" cash. Live quotes stay."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => {
						resetBook();
						toast.success("Book reset to cash");
					},
					children: "Reset to cash"
				})
			] })
		]
	});
}
//#endregion
export { SystemPage as component };

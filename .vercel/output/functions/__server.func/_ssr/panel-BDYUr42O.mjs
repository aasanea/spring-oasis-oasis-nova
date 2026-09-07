import { r as cn } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panel-BDYUr42O.js
var import_jsx_runtime = require_jsx_runtime();
function Panel({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("min-w-0 rounded-xl bg-surface p-4 text-fg shadow-[var(--shadow-border)] md:p-5", className),
		...props,
		children
	});
}
function PanelTitle({ className, kicker, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("mb-4 flex items-start justify-between gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-[11px] font-medium tracking-[0.16em] text-subtle uppercase",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg leading-snug text-fg",
			children
		})] }), action]
	});
}
//#endregion
export { PanelTitle as n, Panel as t };

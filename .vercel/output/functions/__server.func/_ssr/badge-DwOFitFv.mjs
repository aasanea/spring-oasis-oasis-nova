import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DwOFitFv.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { tone: {
		default: "bg-elevated text-muted",
		buy: "bg-up/15 text-up",
		sell: "bg-down/15 text-down",
		hold: "bg-elevated text-muted",
		live: "bg-up/15 text-up",
		closed: "bg-down/15 text-down",
		warn: "bg-warn/15 text-warn"
	} },
	defaultVariants: { tone: "default" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { Badge as t };

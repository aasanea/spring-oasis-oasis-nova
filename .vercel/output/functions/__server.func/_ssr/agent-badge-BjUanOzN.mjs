import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./badge-DwOFitFv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agent-badge-BjUanOzN.js
var import_jsx_runtime = require_jsx_runtime();
function RecoBadge({ reco }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: reco === "BUY" ? "buy" : reco === "SELL" ? "sell" : "hold",
		children: reco
	});
}
//#endregion
export { RecoBadge as t };

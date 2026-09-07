import { n as UNIVERSE } from "./assets-CiXb2yRx.mjs";
import { a as formatDate, c as formatSar, d as positionPnl, f as signedClass, i as deskMetrics, o as formatNum, p as useDeskStore, r as cn, s as formatPct, u as formatUsd } from "./format-D0pLZxNc.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as RecoBadge } from "./agent-badge-BjUanOzN.mjs";
import { n as PanelTitle, t as Panel } from "./panel-BDYUr42O.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as RunAgentButton } from "./run-agent-button-Dn9_JCww.mjs";
import { t as MetricTile } from "./metric-tile-CwX9cajZ.mjs";
import { t as OrderTicket } from "./order-ticket-DkY5RXiO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-xaXrmjS8.js
var import_jsx_runtime = require_jsx_runtime();
function Sparkline({ values, className }) {
	if (values.length < 2) return null;
	const min = Math.min(...values);
	const span = Math.max(...values) - min || 1;
	const w = 88;
	const h = 28;
	const pts = values.map((v, i) => {
		const x = i / (values.length - 1) * w;
		const y = h - (v - min) / span * h;
		return `${x.toFixed(2)},${y.toFixed(2)}`;
	}).join(" ");
	const up = values.at(-1) >= values[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-7 w-[88px]", up ? "text-up" : "text-down", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinejoin: "round",
			strokeLinecap: "round",
			points: pts
		})
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-elevated", className),
		...props
	});
}
function DeskHome() {
	const book = useDeskStore((s) => s.book);
	const positions = useDeskStore((s) => s.positions);
	const cash = useDeskStore((s) => s.cash);
	const orders = useDeskStore((s) => s.orders);
	const equity = useDeskStore((s) => s.equity);
	const headlines = useDeskStore((s) => s.headlines);
	const analyses = useDeskStore((s) => s.analyses);
	const selected = useDeskStore((s) => s.selected);
	const select = useDeskStore((s) => s.select);
	const feed = useDeskStore((s) => s.feed);
	const metrics = deskMetrics({
		book,
		positions,
		cash,
		orders,
		equity
	});
	const selectedAsset = book[selected];
	const latestByAgent = analyses.slice(0, 6);
	const consensus = (() => {
		const recent = analyses.filter((a) => a.symbol === selected).slice(0, 8);
		if (!recent.length) return null;
		const score = recent.reduce((a, x) => a + (x.recommendation === "BUY" ? 1 : x.recommendation === "SELL" ? -1 : 0), 0);
		return score >= 2 ? "BUY" : score <= -2 ? "SELL" : "HOLD";
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-w-0 max-w-6xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-2 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.18em] text-subtle uppercase",
						children: "Private desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl leading-tight md:text-4xl",
						children: "The tape is live"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: "Tadawul last prints, real headlines, and twelve agents. Paper fills at the live last — cash starts at one million SAR, book is yours."
					})
				] }), selectedAsset?.quoted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-elevated px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle uppercase tracking-widest",
							children: selectedAsset.ticker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl tabular-nums",
							children: formatNum(selectedAsset.last)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-xs tabular-nums", signedClass(selectedAsset.last - selectedAsset.prevClose)),
							children: formatPct((selectedAsset.last - selectedAsset.prevClose) / selectedAsset.prevClose * 100)
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 w-36" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Equity",
						value: formatSar(metrics.equity, true),
						hint: "Mark to live last"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Day P&L",
						value: formatPct(metrics.dayPct),
						signed: metrics.dayPnL,
						hint: formatSar(metrics.dayPnL)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "TASI",
						value: feed.tasiLast ? feed.tasiLast.toFixed(0) : "—",
						signed: feed.tasiChangePct,
						hint: feed.tasiLast ? formatPct(feed.tasiChangePct) : "Waiting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricTile, {
						label: "Brent",
						value: feed.brentLast ? formatUsd(feed.brentLast) : "—",
						signed: feed.brentChangePct,
						hint: feed.brentLast ? formatPct(feed.brentChangePct) : "Waiting"
					})
				]
			}),
			feed.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg bg-down/10 px-4 py-3 text-sm text-down",
				children: feed.error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[1.4fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
					kicker: "Watchlist",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "SAR · live"
					}),
					children: "TASI names"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-[11px] tracking-widest text-subtle uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-medium",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-medium",
									children: "Last"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-2 py-2 font-medium",
									children: "Chg"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-2 py-2 font-medium sm:table-cell",
									children: "Tape"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: UNIVERSE.map((seed) => {
							const a = book[seed.symbol];
							if (!a) return null;
							const on = a.symbol === selected;
							const chg = a.prevClose ? (a.last - a.prevClose) / a.prevClose * 100 : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => select(a.symbol),
								onKeyDown: (e) => {
									if (e.key === "Enter") select(a.symbol);
								},
								tabIndex: 0,
								className: cn("cursor-pointer border-t border-border/80 transition-colors duration-150", on ? "bg-elevated" : "hover:bg-elevated/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-2 py-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: a.nameEn
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted",
											children: [
												a.symbol,
												" · ",
												a.nameAr
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2.5 tabular-nums",
										children: a.quoted ? formatNum(a.last) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-12" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("px-2 py-2.5 tabular-nums", a.quoted ? signedClass(chg) : "text-muted"),
										children: a.quoted ? formatPct(chg) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "hidden px-2 py-2.5 sm:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, { values: a.history.slice(-28) })
									})
								]
							}, a.symbol);
						}) })]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
							kicker: "Ticket",
							action: consensus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoBadge, { reco: consensus }) : null,
							children: selectedAsset?.nameEn ?? "Select a name"
						}),
						selectedAsset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTicket, { symbol: selectedAsset.symbol }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Strategy agent on the selected name"
							}), selectedAsset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunAgentButton, {
								agentType: "strategy",
								symbol: selectedAsset.symbol
							}) : null]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
						kicker: "Inventory",
						children: "Open risk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: positions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Book is flat. Buy from the ticket at the live last."
						}) : positions.map((p) => {
							const a = book[p.symbol];
							if (!a) return null;
							const pnl = positionPnl(p, a.last || p.avgPrice);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/portfolio",
								className: "flex items-center justify-between rounded-lg bg-elevated px-3 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: a.nameEn
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted tabular-nums",
									children: [
										p.qty.toLocaleString(),
										" @ ",
										formatNum(p.avgPrice)
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-sm tabular-nums", signedClass(pnl.pnl)),
									children: formatPct(pnl.pnlPct)
								})]
							}, p.id);
						})
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
					kicker: "Agents",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/agents",
						className: "text-xs text-muted hover:text-fg",
						children: "All twelve"
					}),
					children: "Latest calls"
				}), latestByAgent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No runs yet. Open Agents and put a name on the desk."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: latestByAgent.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-elevated p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium",
								children: [
									a.agentType.replaceAll("_", " "),
									" · ",
									a.symbol
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoBadge, { reco: a.recommendation })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-xs text-muted",
							children: a.thesis
						})]
					}, a.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelTitle, {
					kicker: "Wire",
					children: "Session headlines"
				}), headlines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: feed.status === "loading" ? "Pulling the wire…" : "No headlines yet. Refresh the tape."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: headlines.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-border pt-3 first:border-0 first:pt-0",
						children: [h.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: h.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-sm leading-snug hover:text-accent",
							children: h.title
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-snug",
							children: h.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-subtle",
							children: [
								h.source,
								h.symbol ? ` · ${h.symbol}` : "",
								" · ",
								formatDate(h.at)
							]
						})]
					}, h.id))
				})] })]
			})
		]
	});
}
//#endregion
export { DeskHome as component };

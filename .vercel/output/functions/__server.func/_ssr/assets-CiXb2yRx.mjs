//#region node_modules/.nitro/vite/services/ssr/assets/assets-CiXb2yRx.js
var UNIVERSE = [
	{
		symbol: "2222",
		ticker: "2222.SR",
		nameAr: "أرامكو السعودية",
		nameEn: "Saudi Aramco",
		sector: "Energy"
	},
	{
		symbol: "1180",
		ticker: "1180.SR",
		nameAr: "مصرف الراجحي",
		nameEn: "Al Rajhi Bank",
		sector: "Banks"
	},
	{
		symbol: "1120",
		ticker: "1120.SR",
		nameAr: "مصرف الإنماء",
		nameEn: "Alinma Bank",
		sector: "Banks"
	},
	{
		symbol: "1010",
		ticker: "1010.SR",
		nameAr: "بنك الرياض",
		nameEn: "Riyad Bank",
		sector: "Banks"
	},
	{
		symbol: "2010",
		ticker: "2010.SR",
		nameAr: "سابك",
		nameEn: "SABIC",
		sector: "Materials"
	},
	{
		symbol: "7010",
		ticker: "7010.SR",
		nameAr: "اس تي سي",
		nameEn: "stc",
		sector: "Telecom"
	},
	{
		symbol: "1211",
		ticker: "1211.SR",
		nameAr: "معادن",
		nameEn: "Maaden",
		sector: "Materials"
	},
	{
		symbol: "2280",
		ticker: "2280.SR",
		nameAr: "المراعي",
		nameEn: "Almarai",
		sector: "Staples"
	},
	{
		symbol: "5110",
		ticker: "5110.SR",
		nameAr: "كهرباء السعودية",
		nameEn: "Saudi Electricity",
		sector: "Utilities"
	},
	{
		symbol: "4030",
		ticker: "4030.SR",
		nameAr: "البحري",
		nameEn: "Bahri",
		sector: "Industrials"
	},
	{
		symbol: "1060",
		ticker: "1060.SR",
		nameAr: "ساب",
		nameEn: "SABB",
		sector: "Banks"
	},
	{
		symbol: "2350",
		ticker: "2350.SR",
		nameAr: "كيان السعودية",
		nameEn: "Saudi Kayan",
		sector: "Materials"
	}
];
Object.fromEntries(UNIVERSE.map((a) => [a.symbol, a]));
var NAME_KEYS = {
	"2222": [
		"aramco",
		"أرامكو",
		"2222"
	],
	"1180": [
		"rajhi",
		"الراجحي",
		"1180"
	],
	"1120": [
		"alinma",
		"الإنماء",
		"1120"
	],
	"1010": [
		"riyad bank",
		"بنك الرياض",
		"1010"
	],
	"2010": [
		"sabic",
		"سابك",
		"2010"
	],
	"7010": [
		"stc",
		"اس تي سي",
		"7010"
	],
	"1211": [
		"maaden",
		"معادن",
		"1211"
	],
	"2280": [
		"almarai",
		"المراعي",
		"2280"
	],
	"5110": [
		"saudi electricity",
		"كهرباء السعودية",
		"5110"
	],
	"4030": [
		"bahri",
		"البحري",
		"4030"
	],
	"1060": ["sabb", "1060"],
	"2350": [
		"kayan",
		"كيان",
		"2350"
	]
};
function emptyAsset(listing) {
	return {
		...listing,
		currency: "SAR",
		last: 0,
		prevClose: 0,
		open: 0,
		high: 0,
		low: 0,
		volume: 0,
		history: [],
		volatility: 0,
		beta: 1,
		fiftyTwoWeekHigh: 0,
		fiftyTwoWeekLow: 0,
		quoted: false,
		sessionAt: 0
	};
}
function emptyBook() {
	const book = {};
	for (const listing of UNIVERSE) book[listing.symbol] = emptyAsset(listing);
	return book;
}
function isTasiOpen(now = /* @__PURE__ */ new Date()) {
	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Riyadh",
		weekday: "short",
		hour: "2-digit",
		hour12: false,
		minute: "2-digit"
	}).formatToParts(now);
	const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
	const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
	const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
	if ((/* @__PURE__ */ new Set([
		"Friday",
		"Fri",
		"Saturday",
		"Sat"
	])).has(weekday)) return false;
	const mins = hour * 60 + minute;
	return mins >= 600 && mins < 900;
}
//#endregion
export { isTasiOpen as i, UNIVERSE as n, emptyBook as r, NAME_KEYS as t };

const int = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function formatSar(value: number, compact = false) {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (compact) {
    if (abs >= 1_000_000) return `${sign}SAR ${(abs / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${sign}SAR ${(abs / 1_000).toFixed(1)}K`;
  }
  return `${sign}SAR ${abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatNum(value: number, digits = 2) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatInt(value: number) {
  return int.format(value);
}

export function formatPct(value: number, digits = 2) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatTime(ts: number) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Riyadh",
  }).format(new Date(ts));
}

export function formatDate(ts: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Riyadh",
  }).format(new Date(ts));
}

export function signedClass(value: number) {
  if (value > 0.0001) return "text-up";
  if (value < -0.0001) return "text-down";
  return "text-muted";
}

export function formatUsd(value: number) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

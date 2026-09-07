export function sma(values: number[], period: number) {
  if (values.length < period) return values.at(-1) ?? 0;
  const slice = values.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

export function rsi(values: number[], period = 14) {
  if (values.length < period + 1) return 50;
  let gain = 0;
  let loss = 0;
  const start = values.length - period - 1;
  for (let i = start + 1; i < values.length; i++) {
    const ch = values[i]! - values[i - 1]!;
    if (ch >= 0) gain += ch;
    else loss -= ch;
  }
  if (loss === 0) return 100;
  const rs = gain / loss;
  return 100 - 100 / (1 + rs);
}

export function realizedVol(values: number[], period = 20) {
  if (values.length < period + 1) return 0;
  const rets: number[] = [];
  const slice = values.slice(-(period + 1));
  for (let i = 1; i < slice.length; i++) {
    rets.push(Math.log(slice[i]! / slice[i - 1]!));
  }
  const mean = rets.reduce((a, b) => a + b, 0) / rets.length;
  const var_ = rets.reduce((a, b) => a + (b - mean) ** 2, 0) / rets.length;
  return Math.sqrt(var_) * Math.sqrt(252) * 100;
}

export function momentum(values: number[], lookback: number) {
  if (values.length <= lookback) return 0;
  const last = values.at(-1)!;
  const prev = values.at(-1 - lookback)!;
  return ((last - prev) / prev) * 100;
}

export function structureBias(values: number[]) {
  if (values.length < 12) return "balanced" as const;
  const recent = values.slice(-12);
  const first = recent[0]!;
  const last = recent.at(-1)!;
  const highs = recent.filter((_, i) => i > 0 && recent[i]! > recent[i - 1]!);
  if (last > first * 1.01 && highs.length >= 6) return "uptrend" as const;
  if (last < first * 0.99) return "downtrend" as const;
  return "range" as const;
}

export function logReturns(values: number[]) {
  const out: number[] = [];
  for (let i = 1; i < values.length; i++) {
    const a = values[i - 1]!;
    const b = values[i]!;
    if (a > 0 && b > 0) out.push(Math.log(b / a));
  }
  return out;
}

export function betaVsMarket(stock: number[], market: number[]) {
  const rs = logReturns(stock);
  const rm = logReturns(market);
  const n = Math.min(rs.length, rm.length);
  if (n < 15) return 1;
  const s = rs.slice(-n);
  const m = rm.slice(-n);
  const meanS = s.reduce((a, b) => a + b, 0) / n;
  const meanM = m.reduce((a, b) => a + b, 0) / n;
  let cov = 0;
  let varM = 0;
  for (let i = 0; i < n; i++) {
    const ds = s[i]! - meanS;
    const dm = m[i]! - meanM;
    cov += ds * dm;
    varM += dm * dm;
  }
  if (varM === 0) return 1;
  const beta = cov / varM;
  if (!Number.isFinite(beta)) return 1;
  return Math.max(-0.2, Math.min(3.5, beta));
}

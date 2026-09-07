/** Keep in sync with `src/styles.css` @theme tokens. */
export const CHART = {
  accent: "#c5ccd6",
  muted: "#8b8f98",
  up: "#5ecf9a",
  warn: "#d4a574",
  fg: "#ecece8",
  subtle: "#5c616b",
  grid: "#22262f",
  surface: "#101218",
} as const;

export const PIE_SLICES = [
  CHART.accent,
  CHART.muted,
  CHART.up,
  CHART.warn,
  CHART.fg,
  CHART.subtle,
] as const;

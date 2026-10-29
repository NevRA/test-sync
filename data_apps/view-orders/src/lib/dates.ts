export type DateRange = [string | null, string | null];

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const lastDays = (n: number): DateRange => {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - n);
  return [ymd(start), ymd(end)];
};

const lastMonths = (n: number): DateRange => {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth() - n, end.getDate());
  return [ymd(start), ymd(end)];
};

export const DATE_PRESETS = [
  { id: "30d", label: "Last 30 days", range: () => lastDays(30) },
  { id: "3m", label: "Last 3 months", range: () => lastMonths(3) },
  { id: "12m", label: "Last 12 months", range: () => lastMonths(12) },
  { id: "all", label: "All time", range: (): DateRange => [null, null] },
] as const;

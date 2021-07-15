export const minutesBetween = (date1: Date, date2: Date): number => {
  if (!date1 || !date2) return Number.POSITIVE_INFINITY;

  const diff = date1.getTime() - date2.getTime();
  return Math.abs(Math.round(((diff % 86400000) % 3600000) / 60000));
};

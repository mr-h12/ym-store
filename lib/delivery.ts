/**
 * Working-day rule for delivery estimates (placeholder: no Friday deliveries).
 * Shared by the product page and checkout so both always show the same dates.
 */
export const NON_WORKING_DAYS = new Set([5]);
export const DELIVERY_MIN_DAYS = 2;
export const DELIVERY_MAX_DAYS = 4;

export function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (!NON_WORKING_DAYS.has(d.getDay())) left--;
  }
  return d;
}

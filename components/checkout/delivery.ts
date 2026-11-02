/**
 * Delivery window: today + 2–4 working days.
 * Placeholder rule: couriers don't deliver on Fridays (weekday 5).
 */
const NON_WORKING = new Set([5]);

function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (!NON_WORKING.has(d.getDay())) left--;
  }
  return d;
}

const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });

export function deliveryRange(from = new Date()): string {
  return `${fmt.format(addWorkingDays(from, 2))} – ${fmt.format(addWorkingDays(from, 4))}`;
}

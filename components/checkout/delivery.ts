import { addWorkingDays, DELIVERY_MAX_DAYS, DELIVERY_MIN_DAYS } from "@/lib/delivery";

const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });

export function deliveryRange(from = new Date()): string {
  return `${fmt.format(addWorkingDays(from, DELIVERY_MIN_DAYS))} – ${fmt.format(addWorkingDays(from, DELIVERY_MAX_DAYS))}`;
}

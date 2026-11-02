import { storeConfig } from "./store-config";

const fmt = new Intl.NumberFormat(storeConfig.locale, {
  style: "currency",
  currency: storeConfig.currency,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return fmt.format(value);
}

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

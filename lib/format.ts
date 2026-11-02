import { storeConfig } from "./store-config";

const fmt = new Intl.NumberFormat(storeConfig.locale, {
  style: "currency",
  currency: storeConfig.currency,
  maximumFractionDigits: 0,
});

export const PRICE_ON_REQUEST = "Price on WhatsApp";

/** 0 means the price isn't published yet. */
export function formatPrice(value: number): string {
  return value > 0 ? fmt.format(value) : PRICE_ON_REQUEST;
}

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

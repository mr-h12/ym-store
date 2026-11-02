/**
 * Store-wide settings. Swap these placeholder values for the real
 * Y.M Store details (from Instagram @y_m_storee / the Facebook page).
 */
export const storeConfig = {
  name: "Y.M Store",
  shortName: "Y.M",
  tagline: "Everyday clothing, made to be worn often.",
  instagram: "https://www.instagram.com/y_m_storee",
  facebook: "https://www.facebook.com/share/1SEgUHRtpi/",
  /** International format, digits only, no "+" — used for wa.me links. Placeholder. */
  whatsapp: "201000000000",
  /** ISO 4217 code + locale used by Intl.NumberFormat. Placeholder. */
  currency: "EGP",
  locale: "en-EG",
  /** "ltr" or "rtl" — layout uses logical properties so RTL flips cleanly. */
  dir: "ltr" as "ltr" | "rtl",
  lang: "en",
  freeShippingThreshold: 1500,
  shippingFee: 75,
  deliveryEstimate: "2–4 working days",
  returnsWindowDays: 14,
} as const;

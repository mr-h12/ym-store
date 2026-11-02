/** Store-wide settings, from the store's Instagram and Facebook pages (collected 2026-11-03). */
export const storeConfig = {
  name: "Y&M STORE",
  shortName: "Y&M",
  tagline: "Modern men's outfit. Your fashion dealer in Alexandria.",
  instagram: "https://www.instagram.com/y_m_storee/",
  instagramHandle: "@y_m_storee",
  facebook: "https://www.facebook.com/profile.php?id=100063988685725",
  threads: "https://www.threads.com/@y_m_storee",
  /** International format, digits only, no "+" — used for wa.me links. */
  whatsapp: "201202363509",
  whatsappGroup: "https://chat.whatsapp.com/DhNZJ3PGnJODX9R5x7gu9t",
  phones: ["01202363509", "01210393942"],
  addressEn:
    "New Hadara, El-Mahmoudia Road, corner of Mohamed El-Dorra St., next to Al-Aziz Al-Mannan Mosque, before El-Nozha Hospital St., Alexandria",
  addressAr:
    "اسكندريه الحضره الجديده طريق المحموديه ناصيه شارع محمد الدرة بجوار مسجد العزيز المنان قبل شارع مستشفي النزهه",
  mapUrl: "https://maps.google.com/?q=31.195396,29.933811",
  /** ISO 4217 code + locale used by Intl.NumberFormat. */
  currency: "EGP",
  locale: "en-EG",
  /** "ltr" or "rtl" — layout uses logical properties so RTL flips cleanly. */
  dir: "ltr" as "ltr" | "rtl",
  lang: "en",
  /** 0 = fee not published; the store confirms it on WhatsApp. */
  shippingFee: 0,
  deliveryEstimate: "same day in Alexandria",
  deliveryNote: "Same-day delivery in Alexandria · Shipping to all governorates",
  payment: "Pay cash or Visa",
} as const;

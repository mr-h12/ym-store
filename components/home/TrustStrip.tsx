import { storeConfig } from "@/lib/store-config";

/** Quiet inline row of the store's real promises (not a banner): hairline dividers, no colour fills. */
export function TrustStrip() {
  const items: { title: string; detail: React.ReactNode }[] = [
    { title: "Same-day delivery", detail: "Order today, get it today in Alexandria" },
    { title: "All of Egypt", detail: "Shipping to every governorate" },
    { title: "Cash or Visa", detail: "Pay the way you prefer" },
    {
      title: "Order on WhatsApp",
      detail: (
        <a href={`https://wa.me/${storeConfig.whatsapp}`} className="underline underline-offset-2 hover:text-ink" target="_blank" rel="noopener noreferrer">
          Ask for prices and sizes
        </a>
      ),
    },
  ];

  return (
    <section aria-label="Delivery and payment" className="mx-auto max-w-7xl px-4 md:px-6">
      <ul className="grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line md:grid-cols-4">
        {items.map((it) => (
          <li key={it.title} className="bg-bg px-4 py-4 md:px-5 md:py-5">
            <p className="text-sm font-semibold">{it.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted md:text-sm">{it.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

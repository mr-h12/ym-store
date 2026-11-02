import { storeConfig } from "@/lib/store-config";
import { formatPrice } from "@/lib/format";

/** Quiet inline row of store promises (not a banner): hairline dividers, no colour fills. */
export function TrustStrip() {
  const items: { title: string; detail: React.ReactNode }[] = [
    {
      title: `Delivery in ${storeConfig.deliveryEstimate}`,
      detail: (
        <>
          Free over <span className="price">{formatPrice(storeConfig.freeShippingThreshold)}</span>, otherwise{" "}
          <span className="price">{formatPrice(storeConfig.shippingFee)}</span>
        </>
      ),
    },
    { title: `${storeConfig.returnsWindowDays}-day returns`, detail: "Unworn, with tags on" },
    { title: "Cash on delivery", detail: "Pay when your order arrives" },
    {
      title: "Help on WhatsApp",
      detail: (
        <a href={`https://wa.me/${storeConfig.whatsapp}`} className="underline underline-offset-2 hover:text-ink" target="_blank" rel="noopener noreferrer">
          Message us about sizes or orders
        </a>
      ),
    },
  ];

  return (
    <section aria-label="Delivery, returns and payment" className="mx-auto max-w-7xl px-4 md:px-6">
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

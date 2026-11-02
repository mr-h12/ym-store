import Link from "next/link";
import { categories } from "@/data/products";
import { storeConfig } from "@/lib/store-config";
import { formatPrice } from "@/lib/format";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm md:grid-cols-4 md:px-6">
        <div>
          <p className="text-base font-bold">{storeConfig.name}</p>
          <p className="mt-2 text-muted">{storeConfig.tagline}</p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-3 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:underline" href={`/shop/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Help</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li>Delivery in {storeConfig.deliveryEstimate}</li>
            <li>Free delivery over <span className="price">{formatPrice(storeConfig.freeShippingThreshold)}</span></li>
            <li>{storeConfig.returnsWindowDays}-day returns</li>
            <li>Cash on delivery available</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Follow</p>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:underline" href={storeConfig.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a className="hover:underline" href={storeConfig.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a className="hover:underline" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-10 text-xs text-muted md:px-6">
        © 2026 {storeConfig.name}. Demo store — placeholder products and prices.
      </p>
    </footer>
  );
}

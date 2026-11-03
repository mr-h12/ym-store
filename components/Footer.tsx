import Link from "next/link";
import { categories } from "@/data/products";
import { storeConfig } from "@/lib/store-config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2 text-sm text-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <p className="wordmark text-sm text-ink">{storeConfig.name}</p>
          <p className="mt-2">{storeConfig.tagline}</p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-3 space-y-2 text-ink">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:underline" href={`/shop/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-3 space-y-2 text-ink">
            <li><a className="hover:underline" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {storeConfig.phones[0]}</a></li>
            {storeConfig.phones.map((p) => (
              <li key={p}><a className="price hover:underline" href={`tel:${p}`}>Call {p}</a></li>
            ))}
            <li><a className="hover:underline" href={storeConfig.mapUrl} target="_blank" rel="noopener noreferrer">New Hadara, Alexandria</a></li>
            <li lang="ar" dir="rtl" className="ar text-start">اسكندريه - الحضره الجديده</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Follow</p>
          <ul className="mt-3 space-y-2 text-ink">
            <li><a className="hover:underline" href={storeConfig.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="hover:underline" href={storeConfig.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a className="hover:underline" href={storeConfig.threads} target="_blank" rel="noopener noreferrer">Threads</a></li>
          </ul>
          <p className="mt-6">{storeConfig.deliveryNote}. {storeConfig.payment}.</p>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-10 text-xs md:px-6">
        © 2026 {storeConfig.name}. Prices on request via WhatsApp.
      </p>
    </footer>
  );
}

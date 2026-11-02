import Link from "next/link";
import { categories } from "@/data/products";
import { storeConfig } from "@/lib/store-config";

export function Footer() {
  return (
    <footer className="border-t border-night-line bg-night text-sm text-silver-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <p className="display text-base font-semibold text-white">{storeConfig.name}</p>
          <p className="mt-2">{storeConfig.tagline}</p>
        </div>
        <div>
          <p className="text-xs tracking-[.16em] uppercase">Shop</p>
          <ul className="mt-3 space-y-2 text-silver">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:text-white" href={`/shop/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[.16em] uppercase">Contact</p>
          <ul className="mt-3 space-y-2 text-silver">
            <li><a className="hover:text-white" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {storeConfig.phones[0]}</a></li>
            {storeConfig.phones.map((p) => (
              <li key={p}><a className="price hover:text-white" href={`tel:${p}`}>Call {p}</a></li>
            ))}
            <li><a className="hover:text-white" href={storeConfig.mapUrl} target="_blank" rel="noopener noreferrer">New Hadara, Alexandria</a></li>
            <li lang="ar" dir="rtl" className="ar text-start">اسكندريه - الحضره الجديده</li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[.16em] uppercase">Follow</p>
          <ul className="mt-3 space-y-2 text-silver">
            <li><a className="hover:text-white" href={storeConfig.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="hover:text-white" href={storeConfig.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a className="hover:text-white" href={storeConfig.threads} target="_blank" rel="noopener noreferrer">Threads</a></li>
          </ul>
          <p className="mt-6">{storeConfig.deliveryNote}. {storeConfig.payment}.</p>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-24 text-xs md:px-6 md:pb-10">
        © 2026 {storeConfig.name}. Prices on request via WhatsApp.
      </p>
    </footer>
  );
}

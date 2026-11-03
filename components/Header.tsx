"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/products";
import { storeConfig } from "@/lib/store-config";
import { useCart } from "./CartProvider";
import { WhatsAppIcon } from "./WhatsAppFab";

export function Header() {
  const { count, open } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-night-line bg-night/95 text-silver backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 md:h-16 md:px-6">
        <button
          type="button"
          className="tap -ms-2 inline-flex items-center justify-center rounded-[var(--radius-input)] px-2 lg:hidden"
          aria-label="Open menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
        </button>

        <Link href="/" className="flex items-center gap-2.5" aria-label={`${storeConfig.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo_704x705.jpg" alt="" width={40} height={40} className="h-9 w-9 rounded-[var(--radius-badge)] md:h-10 md:w-10" />
          <span className="display text-base font-semibold whitespace-nowrap text-white md:text-lg">{storeConfig.name}</span>
        </Link>

        <nav aria-label="Categories" className="ms-8 hidden gap-5 text-sm lg:flex">
          <Link href="/shop" className="hover:text-white">All</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="whitespace-nowrap hover:text-white">
              {c.name}
            </Link>
          ))}
        </nav>

        <a
          href={`https://wa.me/${storeConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tap ms-auto hidden items-center gap-2 rounded-[var(--radius-input)] px-2 text-sm hover:text-white sm:inline-flex"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="hidden xl:inline">{storeConfig.phones[0]}</span>
        </a>

        <button
          type="button"
          onClick={open}
          className="tap ms-auto inline-flex items-center gap-2 rounded-[var(--radius-input)] px-2 text-sm font-medium hover:text-white sm:ms-0"
          aria-label={`Bag, ${count} item${count === 1 ? "" : "s"}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <span className="hidden sm:inline">Bag</span>
          <span className="price min-w-5 rounded-[var(--radius-badge)] bg-silver px-1.5 text-center text-xs leading-5 text-night" suppressHydrationWarning>
            {count}
          </span>
        </button>
      </div>

      {menu && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="absolute inset-0 bg-scrim transition-opacity duration-200 ease-out starting:opacity-0" aria-label="Close menu" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 start-0 flex w-[82%] max-w-sm flex-col bg-surface text-ink shadow-[var(--shadow-float)] transition-transform duration-300 ease-drawer starting:-translate-x-full rtl:starting:translate-x-full">
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <span className="display font-semibold">{storeConfig.name}</span>
              <button className="tap -me-2 px-2" aria-label="Close menu" onClick={() => setMenu(false)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <nav className="flex flex-col overflow-y-auto p-2 text-base" aria-label="Categories">
              <Link href="/shop" onClick={() => setMenu(false)} className="tap flex items-center rounded-[var(--radius-input)] px-3 py-3 hover:bg-surface-2">Shop all</Link>
              {categories.map((c) => (
                <Link key={c.slug} href={`/shop/${c.slug}`} onClick={() => setMenu(false)} className="tap flex items-center rounded-[var(--radius-input)] px-3 py-3 hover:bg-surface-2">
                  {c.name}
                </Link>
              ))}
              <Link href="/#contact" onClick={() => setMenu(false)} className="tap flex items-center rounded-[var(--radius-input)] px-3 py-3 hover:bg-surface-2">Visit the store</Link>
            </nav>
            <div className="mt-auto space-y-1 border-t border-line p-4 text-sm text-muted">
              <a className="flex items-center gap-2 font-medium text-ink" href={`https://wa.me/${storeConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp {storeConfig.phones[0]}
              </a>
              <p>
                Call <a className="link-quiet" href={`tel:${storeConfig.phones[0]}`}>{storeConfig.phones[0]}</a> ·{" "}
                <a className="link-quiet" href={`tel:${storeConfig.phones[1]}`}>{storeConfig.phones[1]}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

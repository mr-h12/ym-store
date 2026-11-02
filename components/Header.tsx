"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/products";
import { storeConfig } from "@/lib/store-config";
import { useCart } from "./CartProvider";

export function Header() {
  const { count, open } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 md:h-16 md:px-6">
        <button
          type="button"
          className="tap -ms-2 inline-flex items-center justify-center rounded-[var(--radius-input)] px-2 md:hidden"
          aria-label="Open menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
        </button>

        <Link href="/" className="text-lg font-bold tracking-tight md:text-xl">
          {storeConfig.name}
        </Link>

        <nav aria-label="Categories" className="ms-8 hidden gap-6 text-sm md:flex">
          <Link href="/shop" className="hover:underline underline-offset-4">All</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="hover:underline underline-offset-4">
              {c.name}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={open}
          className="tap ms-auto inline-flex items-center gap-2 rounded-[var(--radius-input)] px-2 text-sm font-medium"
          aria-label={`Bag, ${count} item${count === 1 ? "" : "s"}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          <span className="hidden sm:inline">Bag</span>
          <span className="price min-w-5 rounded-[var(--radius-badge)] bg-ink px-1.5 text-center text-xs leading-5 text-bg" suppressHydrationWarning>
            {count}
          </span>
        </button>
      </div>

      {menu && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="absolute inset-0 bg-scrim" aria-label="Close menu" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 start-0 flex w-[82%] max-w-sm flex-col bg-surface shadow-[var(--shadow-float)]">
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <span className="font-bold">{storeConfig.name}</span>
              <button className="tap -me-2 px-2" aria-label="Close menu" onClick={() => setMenu(false)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <nav className="flex flex-col p-2 text-base" aria-label="Categories">
              <Link href="/shop" onClick={() => setMenu(false)} className="tap flex items-center rounded-[var(--radius-input)] px-3 py-3 hover:bg-surface-2">Shop all</Link>
              {categories.map((c) => (
                <Link key={c.slug} href={`/shop/${c.slug}`} onClick={() => setMenu(false)} className="tap flex items-center rounded-[var(--radius-input)] px-3 py-3 hover:bg-surface-2">
                  {c.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-line p-4 text-sm text-muted">
              Questions? <a className="link-quiet" href={`https://wa.me/${storeConfig.whatsapp}`}>Message us on WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

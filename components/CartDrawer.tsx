"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { ProductImage } from "./ProductImage";
import { Totals } from "./checkout/Totals";
import { getCategory, getProductById, imageFor } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { storeConfig } from "@/lib/store-config";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import type { CartLine } from "@/lib/types";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const cart = useCart();
  const { isOpen, close, lines, count, subtotal, shipping, total, setQty, remove, lastAdded } = cart;
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef(close);
  closeRef.current = close;

  // "Added" confirmation shows only for an add the shopper hasn't seen yet.
  const [seenAdded, setSeenAdded] = useState<CartLine | null>(null);
  const showAdded = isOpen && lastAdded !== null && lastAdded !== seenAdded;

  // Close on route change.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      closeRef.current();
    }
  }, [pathname]);

  // Focus in, scroll lock, Esc, focus trap; restore focus on close.
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      const t = triggerRef.current;
      if (t && document.contains(t)) t.focus();
    };
  }, [isOpen]);

  // Once the drawer closes, the last add counts as seen.
  useEffect(() => {
    if (!isOpen) setSeenAdded(lastAdded);
  }, [isOpen, lastAdded]);

  if (!isOpen) return null;

  const added = showAdded && lastAdded ? getProductById(lastAdded.productId) : undefined;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close bag"
        className="absolute inset-0 h-full w-full cursor-default bg-scrim"
        onClick={close}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 end-0 flex w-full max-w-[420px] flex-col bg-surface shadow-[var(--shadow-float)] outline-none"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
          <h2 id="cart-title" className="text-base font-semibold">
            Bag <span className="price">({count})</span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close bag"
            className="tap -me-2 inline-flex items-center justify-center rounded-[var(--radius-input)] px-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div aria-live="polite" className="shrink-0">
          {added && lastAdded && (
            <p className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-sm">
              <span aria-hidden="true" className="text-ok">✓</span>
              <span>
                Added: <span className="font-medium">{added.name}</span> · {lastAdded.colour} · {lastAdded.size}
              </span>
            </p>
          )}
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-muted">Your bag is empty.</p>
            <Link href="/shop" onClick={close} className="btn btn-primary w-full max-w-xs">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <p className="border-b border-line px-4 py-3 text-sm text-muted">
                Prices and delivery are confirmed with you on WhatsApp before anything ships.
              </p>

              <ul className="divide-y divide-line px-4">
                {lines.map((l) => {
                  const hex = l.product.colours.find((c) => c.name === l.colour)?.hex ?? l.product.colours[0]?.hex ?? "#ccc";
                  const shape = getCategory(l.product.category)?.shape ?? "tee";
                  const max = l.product.stock[l.size] ?? l.qty;
                  const label = `${l.product.name}, ${l.colour}, ${l.size}`;
                  return (
                    <li key={`${l.productId}-${l.size}-${l.colour}`} className="flex gap-3 py-4">
                      <Link
                        href={`/product/${l.product.slug}`}
                        onClick={close}
                        className="aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-[var(--radius-badge)] border border-line"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <ProductImage shape={shape} colour={hex} name={l.product.name} src={imageFor(l.product, l.colour)} />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 text-sm">
                            <Link href={`/product/${l.product.slug}`} onClick={close} className="font-medium hover:underline">
                              {l.product.name}
                            </Link>
                            <p className="text-muted">
                              {l.colour} · {l.size}
                            </p>
                          </div>
                          <p className="price text-end text-sm font-medium">{formatPrice(l.lineTotal)}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                          <div className="inline-flex items-center rounded-[var(--radius-input)] border border-line">
                            <button
                              type="button"
                              className="tap inline-flex h-8 w-8 items-center justify-center"
                              aria-label={`Decrease quantity of ${label}`}
                              onClick={() => setQty(l.productId, l.size, l.colour, l.qty - 1)}
                            >
                              −
                            </button>
                            <span className="price min-w-7 text-center text-sm" aria-label={`Quantity ${l.qty}`}>
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              className="tap inline-flex h-8 w-8 items-center justify-center disabled:opacity-35"
                              aria-label={`Increase quantity of ${label}`}
                              disabled={l.qty >= max}
                              onClick={() => setQty(l.productId, l.size, l.colour, l.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="link-quiet tap text-sm"
                            aria-label={`Remove ${label}`}
                            onClick={() => remove(l.productId, l.size, l.colour)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="shrink-0 border-t border-line bg-surface px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <Totals subtotal={subtotal} shipping={shipping} total={total} />
              <p className="mt-2 text-xs text-muted">
                {storeConfig.payment} · Delivery {storeConfig.deliveryEstimate}
              </p>
              <Link href="/checkout" onClick={close} className="btn btn-primary mt-3 w-full">
                Checkout{total > 0 && <> · <span className="price">{formatPrice(total)}</span></>}
              </Link>
              <p className="mt-3 text-center text-sm">
                <a
                  className="link-quiet"
                  href={whatsappOrderUrl(lines, { subtotal, shipping, total })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on WhatsApp instead
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

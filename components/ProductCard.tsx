"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/lib/types";
import { getCategory } from "@/data/products";
import { formatPrice, SIZES } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { useCart } from "./CartProvider";
import { isOnSale } from "./shop/filters";

/**
 * Product card: 3:4 image, ONE badge max, name, price (sale shown against the
 * original), colour swatches with "+N", and a labelled quick-add size row.
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [picking, setPicking] = useState(false);
  const shape = getCategory(product.category)!.shape;
  const first = product.colours[0];
  const onSale = isOnSale(product);
  const lowStock = Object.values(product.stock).reduce((a, b) => a + (b ?? 0), 0) <= 6;
  const badge = onSale ? "Sale" : product.isNew ? "New" : lowStock ? "Low stock" : null;
  const shown = product.colours.slice(0, 4);
  const extra = product.colours.length - shown.length;

  return (
    <article className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border border-line">
          <ProductImage shape={shape} colour={first.hex} name={`${product.name} in ${first.name}`} src={product.images[0]} priority={priority} />
          {badge && (
            <span className={`absolute start-2 top-2 rounded-[var(--radius-badge)] px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge === "Sale" ? "bg-sale text-white" : "bg-surface text-ink"}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="mt-2.5 min-w-0">
          <h3 className="text-sm leading-snug">{product.name}</h3>
          <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 text-sm font-semibold">
            <span className={`price ${onSale ? "text-sale" : ""}`}>{formatPrice(product.price)}</span>
            {onSale && (
              <span className="price text-xs font-normal text-muted line-through">
                <span className="sr-only">Was </span>{formatPrice(product.compareAt!)}
              </span>
            )}
          </p>
        </div>
      </Link>

      <div className="mt-1.5 flex items-center justify-between">
        <ul className="flex items-center gap-1.5" aria-label={`Colours: ${product.colours.map((c) => c.name).join(", ")}`}>
          {shown.map((c) => (
            <li key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-black/15" style={{ background: c.hex }} />
          ))}
          {extra > 0 && <li className="text-xs text-muted">+{extra}</li>}
        </ul>
        <button
          type="button"
          onClick={() => setPicking((v) => !v)}
          aria-expanded={picking}
          className="tap -me-1 rounded-[var(--radius-input)] px-1 text-xs font-medium underline underline-offset-2"
        >
          {picking ? "Close" : "Quick add"}
        </button>
      </div>

      {picking && (
        <div className="mt-2" role="group" aria-label={`Choose a size for ${product.name}`}>
          <p className="mb-1.5 text-xs text-muted">Choose size · adds {first.name}</p>
          <div className="grid grid-cols-5 gap-1">
            {SIZES.map((s: Size) => {
              const qty = product.stock[s] ?? 0;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={qty === 0}
                  onClick={() => { add(product.id, s, first.name); setPicking(false); }}
                  className="tap h-9 rounded-[var(--radius-input)] border border-line bg-surface text-xs font-medium hover:border-ink disabled:cursor-not-allowed disabled:text-muted disabled:line-through"
                  aria-label={qty === 0 ? `${s}, sold out` : `Add size ${s}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}

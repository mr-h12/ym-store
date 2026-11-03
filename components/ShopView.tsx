"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { CategorySlug } from "@/lib/types";
import { categories, getCategory, products, productsIn } from "@/data/products";
import { FilterSheet } from "./shop/FilterSheet";
import { ProductGrid } from "./shop/ProductGrid";
import {
  EMPTY_FILTERS,
  SORTS,
  appliedChips,
  applyFilters,
  itemsLabel,
  parseFilters,
  parseSort,
  sortProducts,
  writeFilters,
  type FilterState,
  type SortKey,
} from "./shop/filters";

/**
 * Product listing shared by /shop and /shop/[category].
 * Filters and sort live in the query string (replace, no scroll) so the
 * state survives opening a product and pressing back.
 */
export function ShopView({ category }: { category?: CategorySlug }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const filterButton = useRef<HTMLButtonElement>(null);

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const sort = parseSort(searchParams.get("sort"));
  const base = useMemo(() => (category ? productsIn(category) : products), [category]);
  const results = useMemo(() => sortProducts(applyFilters(base, filters), sort), [base, filters, sort]);
  const chips = appliedChips(filters);
  const title = category ? getCategory(category)!.name : "All products";
  const query = searchParams.toString();

  const replace = (next: URLSearchParams) => {
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };
  const setFilters = (f: FilterState) => replace(writeFilters(new URLSearchParams(searchParams), f));
  const setSort = (s: SortKey) => {
    const next = new URLSearchParams(searchParams);
    if (s === "newest") next.delete("sort");
    else next.set("sort", s);
    replace(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <div className="flex items-baseline gap-3 pt-6 md:pt-10">
        <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
        <p className="text-sm text-muted" aria-live="polite">
          {itemsLabel(results.length)}
        </p>
      </div>

      <nav aria-label="Categories" className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
        <ul className="flex w-max gap-2">
          {[{ slug: undefined, name: "All" }, ...categories].map((c) => {
            const current = c.slug === category;
            const href = (c.slug ? `/shop/${c.slug}` : "/shop") + (query ? `?${query}` : "");
            return (
              <li key={c.name}>
                <Link
                  href={href}
                  scroll={false}
                  aria-current={current ? "page" : undefined}
                  className={`tap inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    current ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-ink"
                  }`}
                >
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sticky filter bar sits right under the header (h-14 / md:h-16). */}
      <div className="sticky top-14 z-20 -mx-4 mt-4 border-b border-line bg-bg/95 px-4 backdrop-blur md:top-16 md:-mx-6 md:px-6">
        <div className="flex h-14 items-center justify-between gap-3">
          <button
            ref={filterButton}
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            className="tap inline-flex h-10 items-center gap-2 rounded-[var(--radius-input)] border border-line bg-surface px-3 text-sm font-medium hover:border-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" strokeLinecap="round" />
              <circle cx="16" cy="7" r="2" />
              <circle cx="10" cy="17" r="2" />
            </svg>
            Filter
            {chips.length > 0 && (
              <span className="price rounded-[var(--radius-badge)] bg-accent px-1.5 text-xs leading-5 text-accent-ink">
                <span className="sr-only">, </span>
                {chips.length}
                <span className="sr-only"> applied</span>
              </span>
            )}
          </button>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort</span>
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="tap h-10 appearance-none rounded-[var(--radius-input)] border border-line bg-surface ps-3 pe-9 text-[16px] font-medium hover:border-ink md:text-sm"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </label>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ul className="contents">
            {chips.map((chip) => (
              <li key={chip.id}>
                <button
                  type="button"
                  onClick={() => setFilters(chip.without)}
                  aria-label={`Remove filter: ${chip.label}`}
                  className="tap price inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-surface ps-3 pe-2 text-sm hover:border-ink"
                >
                  {chip.label}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setFilters(EMPTY_FILTERS)} className="link-quiet tap ms-1 text-sm">
            Clear all
          </button>
        </div>
      )}

      <div className="mt-6">
        {results.length > 0 ? (
          <ProductGrid items={results} />
        ) : (
          <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-line px-6 py-16 text-center">
            <p className="text-base">Nothing matches these filters{category ? ` in ${title.toLowerCase()}` : ""}.</p>
            <button type="button" onClick={() => setFilters(EMPTY_FILTERS)} className="btn btn-primary mt-5 w-full sm:w-auto">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {sheetOpen && (
        <FilterSheet
          initial={filters}
          items={base}
          returnFocusRef={filterButton}
          onClose={() => setSheetOpen(false)}
          onApply={(f) => {
            setFilters(f);
            setSheetOpen(false);
          }}
        />
      )}
    </div>
  );
}

/** Server-rendered fallback while search params resolve (same layout, default filters). */
export function ShopFallback({ category, sort }: { category?: CategorySlug; sort?: string }) {
  const base = category ? productsIn(category) : products;
  const items = sortProducts(base, parseSort(sort));
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
      <div className="flex items-baseline gap-3 pt-6 md:pt-10">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {category ? getCategory(category)!.name : "All products"}
        </h1>
        <p className="text-sm text-muted">{itemsLabel(items.length)}</p>
      </div>
      <div className="mt-[7.5rem]">
        <ProductGrid items={items} />
      </div>
    </div>
  );
}

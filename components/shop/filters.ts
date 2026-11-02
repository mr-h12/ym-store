import type { Product } from "@/lib/types";
import { products as allProducts } from "@/data/products";

/** Filter + sort state is stored in the URL so it survives navigating away and back. */

export type SortKey = "newest" | "oldest" | "brand";

export interface FilterState {
  brands: string[];
  colours: string[];
}

export const EMPTY_FILTERS: FilterState = { brands: [], colours: [] };

export const SORTS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "brand", label: "Brand A–Z" },
];

const UNBRANDED = "Other";
const brandOf = (p: Product) => p.brand || UNBRANDED;

/** Every brand in the catalogue, A–Z, unbranded last. */
export const BRANDS = [...new Set(allProducts.map(brandOf))].sort((a, b) =>
  a === UNBRANDED ? 1 : b === UNBRANDED ? -1 : a.localeCompare(b),
);

/** Every colour used in the catalogue, in first-seen order. */
export const COLOURS = (() => {
  const seen = new Map<string, string>();
  for (const p of allProducts) for (const c of p.colours) if (!seen.has(c.name)) seen.set(c.name, c.hex);
  return [...seen].map(([name, hex]) => ({ name, hex }));
})();

type Getter = { get(key: string): string | null };

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function parseSort(v: string | null | undefined): SortKey {
  return SORTS.some((s) => s.value === v) ? (v as SortKey) : "newest";
}

export function parseFilters(sp: Getter): FilterState {
  return {
    brands: list(sp.get("brand")).filter((b) => BRANDS.includes(b)),
    colours: list(sp.get("colour")).filter((c) => COLOURS.some((x) => x.name === c)),
  };
}

/** Returns a copy of `base` with the filter keys replaced by `f` (other keys, e.g. sort, kept). */
export function writeFilters(base: URLSearchParams, f: FilterState): URLSearchParams {
  const next = new URLSearchParams(base);
  const set = (k: string, v: string) => (v ? next.set(k, v) : next.delete(k));
  set("brand", f.brands.join(","));
  set("colour", f.colours.join(","));
  return next;
}

export const isOnSale = (p: Product) => !!p.compareAt && p.compareAt > p.price;

export function applyFilters(items: Product[], f: FilterState): Product[] {
  return items.filter(
    (p) =>
      (f.brands.length === 0 || f.brands.includes(brandOf(p))) &&
      (f.colours.length === 0 || p.colours.some((c) => f.colours.includes(c.name))),
  );
}

export function sortProducts(items: Product[], sort: SortKey): Product[] {
  const out = [...items];
  switch (sort) {
    case "oldest":
      return out.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
    case "brand":
      return out.sort((a, b) => brandOf(a).localeCompare(brandOf(b)));
    default:
      return out.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  }
}

/** One removable chip per applied value. */
export function appliedChips(f: FilterState): { id: string; label: string; without: FilterState }[] {
  const chips: { id: string; label: string; without: FilterState }[] = [];
  for (const b of f.brands) chips.push({ id: `brand-${b}`, label: b, without: { ...f, brands: f.brands.filter((x) => x !== b) } });
  for (const c of f.colours) chips.push({ id: `colour-${c}`, label: c, without: { ...f, colours: f.colours.filter((x) => x !== c) } });
  return chips;
}

export const itemsLabel = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

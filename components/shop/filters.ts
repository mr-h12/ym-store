import type { Product, Size } from "@/lib/types";
import { formatPrice, SIZES } from "@/lib/format";
import { products as allProducts } from "@/data/products";

/** Filter + sort state is stored in the URL so it survives navigating away and back. */

export type SortKey = "popular" | "newest" | "price-asc" | "price-desc";
export type Fit = Product["fit"];
export type PriceBand = "under-500" | "500-1000" | "1000-2000" | "2000-plus";

export interface FilterState {
  sizes: Size[];
  colours: string[];
  fits: Fit[];
  price: PriceBand | null;
  sale: boolean;
}

export const EMPTY_FILTERS: FilterState = { sizes: [], colours: [], fits: [], price: null, sale: false };

export const SORTS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export const FITS: Fit[] = ["Relaxed", "Regular", "Slim", "Oversized"];

export const PRICE_BANDS: { value: PriceBand; label: string; min: number; max: number }[] = [
  { value: "under-500", label: `Under ${formatPrice(500)}`, min: 0, max: 500 },
  { value: "500-1000", label: `${formatPrice(500)}–${formatPrice(1000)}`, min: 500, max: 1000 },
  { value: "1000-2000", label: `${formatPrice(1000)}–${formatPrice(2000)}`, min: 1000, max: 2000 },
  { value: "2000-plus", label: `${formatPrice(2000)}+`, min: 2000, max: Infinity },
];

/** Every colour used in the catalogue, in first-seen order. */
export const COLOURS = (() => {
  const seen = new Map<string, string>();
  for (const p of allProducts) for (const c of p.colours) if (!seen.has(c.name)) seen.set(c.name, c.hex);
  return [...seen].map(([name, hex]) => ({ name, hex }));
})();

type Getter = { get(key: string): string | null };

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function parseSort(v: string | null | undefined): SortKey {
  return SORTS.some((s) => s.value === v) ? (v as SortKey) : "popular";
}

export function parseFilters(sp: Getter): FilterState {
  const price = sp.get("price");
  return {
    sizes: list(sp.get("size")).filter((s): s is Size => (SIZES as readonly string[]).includes(s)),
    colours: list(sp.get("colour")).filter((c) => COLOURS.some((x) => x.name === c)),
    fits: list(sp.get("fit")).filter((f): f is Fit => (FITS as string[]).includes(f)),
    price: PRICE_BANDS.some((b) => b.value === price) ? (price as PriceBand) : null,
    sale: sp.get("sale") === "1",
  };
}

/** Returns a copy of `base` with the filter keys replaced by `f` (other keys, e.g. sort, kept). */
export function writeFilters(base: URLSearchParams, f: FilterState): URLSearchParams {
  const next = new URLSearchParams(base);
  const set = (k: string, v: string) => (v ? next.set(k, v) : next.delete(k));
  set("size", f.sizes.join(","));
  set("colour", f.colours.join(","));
  set("fit", f.fits.join(","));
  set("price", f.price ?? "");
  set("sale", f.sale ? "1" : "");
  return next;
}

export const isOnSale = (p: Product) => !!p.compareAt && p.compareAt > p.price;

export function applyFilters(items: Product[], f: FilterState): Product[] {
  const band = PRICE_BANDS.find((b) => b.value === f.price);
  return items.filter(
    (p) =>
      (f.sizes.length === 0 || f.sizes.some((s) => (p.stock[s] ?? 0) > 0)) &&
      (f.colours.length === 0 || p.colours.some((c) => f.colours.includes(c.name))) &&
      (f.fits.length === 0 || f.fits.includes(p.fit)) &&
      (!band || (p.price >= band.min && p.price < band.max)) &&
      (!f.sale || isOnSale(p)),
  );
}

export function sortProducts(items: Product[], sort: SortKey): Product[] {
  const out = [...items];
  switch (sort) {
    case "newest":
      return out.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    default:
      return out.sort((a, b) => b.popularity - a.popularity);
  }
}

/** One removable chip per applied value. */
export function appliedChips(f: FilterState): { id: string; label: string; without: FilterState }[] {
  const chips: { id: string; label: string; without: FilterState }[] = [];
  for (const s of f.sizes) chips.push({ id: `size-${s}`, label: `Size ${s}`, without: { ...f, sizes: f.sizes.filter((x) => x !== s) } });
  for (const c of f.colours) chips.push({ id: `colour-${c}`, label: c, without: { ...f, colours: f.colours.filter((x) => x !== c) } });
  for (const fit of f.fits) chips.push({ id: `fit-${fit}`, label: `${fit} fit`, without: { ...f, fits: f.fits.filter((x) => x !== fit) } });
  if (f.price) chips.push({ id: "price", label: PRICE_BANDS.find((b) => b.value === f.price)!.label, without: { ...f, price: null } });
  if (f.sale) chips.push({ id: "sale", label: "On sale", without: { ...f, sale: false } });
  return chips;
}

export const itemsLabel = (n: number) => `${n} ${n === 1 ? "item" : "items"}`;

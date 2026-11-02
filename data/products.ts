import type { Category, CategorySlug, Colour, Product, Size } from "@/lib/types";
import catalog from "./catalog.json";

export const categories: Category[] = [
  { slug: "t-shirts", name: "T-Shirts", shape: "tee", blurb: "Designer tees from Balmain, Burberry, Moncler and more." },
  { slug: "long-sleeves", name: "Long Sleeves", shape: "tee", blurb: "Long-sleeve tees from Hermès, Armani and Calvin Klein." },
  { slug: "polos", name: "Polos", shape: "shirt", blurb: "Polos from Casablanca, Hermès and Lacoste." },
  { slug: "hoodies", name: "Hoodies & Sweats", shape: "knit", blurb: "Hoodies, zip hoodies and sweatshirts." },
  { slug: "tracksuits", name: "Tracksuits", shape: "trouser", blurb: "Tracksuits, track jackets and joggers." },
  { slug: "swim", name: "Swim Shorts", shape: "trouser", blurb: "Swim shorts for the Alexandria summer." },
  { slug: "jackets-denim", name: "Jackets & Denim", shape: "jacket", blurb: "Leather bombers and jeans." },
];

type Entry = Omit<Product, "id" | "stock" | "description" | "images" | "isNew"> & { type: string; colours: Colour[] };

// ponytail: sizes and stock aren't in the store data; every size shows as available until the real stock is filled in.
const PLACEHOLDER_STOCK: Partial<Record<Size, number>> = { S: 10, M: 10, L: 10, XL: 10, XXL: 10 };
const NEW_SINCE = "2026-09-01";

export const products: Product[] = (catalog as Entry[]).map(({ type, ...e }) => ({
  ...e,
  category: e.category as CategorySlug,
  id: e.slug,
  stock: PLACEHOLDER_STOCK,
  images: e.colours[0].images,
  isNew: e.addedAt >= NEW_SINCE,
  description: `${e.brand ? `${e.brand} ${type}` : `${type[0].toUpperCase()}${type.slice(1)}`} in ${e.colours
    .map((c) => c.name.toLowerCase())
    .join(", ")}. In store now in Alexandria; message us on WhatsApp for the price and your size.`,
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((cat) => cat.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);
export const totalStock = (p: Product) => Object.values(p.stock).reduce((a, b) => a + (b ?? 0), 0);
/** Photo for a cart line's colour, falling back to the product's first photo. */
export const imageFor = (p: Product, colour: string) => p.colours.find((c) => c.name === colour)?.images[0] ?? p.images[0];

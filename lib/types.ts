export type CategorySlug =
  | "t-shirts"
  | "long-sleeves"
  | "polos"
  | "hoodies"
  | "tracksuits"
  | "swim"
  | "jackets-denim";

export type GarmentShape =
  | "tee"
  | "shirt"
  | "knit"
  | "trouser"
  | "jacket"
  | "dress";

export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface Colour {
  name: string;
  /** Any CSS background (flat hex, two-tone gradient, checkerboard). */
  hex: string;
  /** Photos of this colourway: front first, then back if there is one. */
  images: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shape: GarmentShape;
  blurb: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  /** 0 = price on request (asked on WhatsApp). */
  price: number;
  /** Original price when on sale. */
  compareAt?: number;
  colours: Colour[];
  /** Sizes in stock → units left. Missing size = sold out. */
  stock: Partial<Record<Size, number>>;
  fit?: "Relaxed" | "Regular" | "Slim" | "Oversized";
  material?: string;
  care?: string;
  description: string;
  /** First colourway's photos. */
  images: string[];
  /** The Instagram post the photos come from. */
  instagram: string;
  isNew?: boolean;
  /** ISO date, used for "Newest" sort. */
  addedAt: string;
}

export interface CartLine {
  productId: string;
  size: Size;
  colour: string;
  qty: number;
}

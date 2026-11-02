export type CategorySlug =
  | "t-shirts"
  | "shirts"
  | "knitwear"
  | "trousers"
  | "outerwear"
  | "dresses";

export type GarmentShape =
  | "tee"
  | "shirt"
  | "knit"
  | "trouser"
  | "jacket"
  | "dress";

export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface Colour {
  name: string;
  hex: string;
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
  category: CategorySlug;
  price: number;
  /** Original price when on sale. */
  compareAt?: number;
  colours: Colour[];
  /** Sizes in stock → units left. Missing size = sold out. */
  stock: Partial<Record<Size, number>>;
  fit: "Relaxed" | "Regular" | "Slim" | "Oversized";
  material: string;
  care: string;
  description: string;
  /** Real photo paths (e.g. /products/abc-1.jpg). Empty → illustrated placeholder. */
  images: string[];
  isNew?: boolean;
  /** Higher = more popular; used for "Popular" sort. */
  popularity: number;
  /** ISO date, used for "Newest" sort. */
  addedAt: string;
}

export interface CartLine {
  productId: string;
  size: Size;
  colour: string;
  qty: number;
}

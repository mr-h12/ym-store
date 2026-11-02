import type { Category, Colour, Product } from "@/lib/types";

export const categories: Category[] = [
  { slug: "t-shirts", name: "T-shirts", shape: "tee", blurb: "Heavy cotton, cut to last." },
  { slug: "shirts", name: "Shirts", shape: "shirt", blurb: "Oxford, poplin and linen." },
  { slug: "knitwear", name: "Knitwear", shape: "knit", blurb: "Merino and cotton knits." },
  { slug: "trousers", name: "Trousers", shape: "trouser", blurb: "Tailored, wide and cargo." },
  { slug: "outerwear", name: "Outerwear", shape: "jacket", blurb: "Layers for cool evenings." },
  { slug: "dresses", name: "Dresses", shape: "dress", blurb: "Easy shapes in soft fabrics." },
];

const c = {
  ecru: { name: "Ecru", hex: "#ece6da" },
  black: { name: "Black", hex: "#1c1b1a" },
  navy: { name: "Navy", hex: "#24304a" },
  olive: { name: "Olive", hex: "#5b5e3f" },
  sand: { name: "Sand", hex: "#cdb994" },
  white: { name: "White", hex: "#f7f6f2" },
  grey: { name: "Grey melange", hex: "#a9a8a4" },
  brown: { name: "Chocolate", hex: "#5a3e2e" },
  blue: { name: "Sky blue", hex: "#a9c2db" },
  rust: { name: "Rust", hex: "#a2512f" },
  sage: { name: "Sage", hex: "#a6b39b" },
} satisfies Record<string, Colour>;

type Seed = Omit<Product, "id" | "slug" | "images" | "care"> & { care?: string };

const seeds: Seed[] = [
  // T-shirts
  { name: "Heavyweight Boxy Tee", category: "t-shirts", price: 450, colours: [c.white, c.black, c.olive], stock: { XS: 4, S: 12, M: 20, L: 9, XL: 3 }, fit: "Oversized", material: "100% cotton, 240 gsm", description: "A dense, structured tee with a dropped shoulder and a short, boxy body. It holds its shape wash after wash.", isNew: true, popularity: 98, addedAt: "2026-10-28" },
  { name: "Everyday Crew Tee", category: "t-shirts", price: 320, colours: [c.white, c.grey, c.navy, c.black], stock: { S: 18, M: 25, L: 14, XL: 6 }, fit: "Regular", material: "100% combed cotton, 180 gsm", description: "Our most-worn tee. A clean crew neck, a regular fit and a soft hand-feel.", popularity: 95, addedAt: "2026-06-02" },
  { name: "Long-Sleeve Rib Tee", category: "t-shirts", price: 390, colours: [c.ecru, c.brown], stock: { XS: 5, S: 7, M: 2 }, fit: "Slim", material: "95% cotton, 5% elastane rib", description: "A close-fitting rib knit with long sleeves, made for layering under shirts and jackets.", popularity: 71, addedAt: "2026-09-14" },
  { name: "Pocket Tee", category: "t-shirts", price: 340, compareAt: 420, colours: [c.sand, c.sage], stock: { S: 3, M: 6, L: 4 }, fit: "Relaxed", material: "100% cotton slub", description: "A relaxed tee in textured slub cotton with a single chest pocket.", popularity: 64, addedAt: "2026-04-20" },
  // Shirts
  { name: "Oxford Button-Down", category: "shirts", price: 690, colours: [c.blue, c.white], stock: { S: 6, M: 11, L: 8, XL: 2 }, fit: "Regular", material: "100% cotton oxford", description: "A classic button-down collar in a sturdy oxford weave that softens with every wash.", popularity: 90, addedAt: "2026-07-11" },
  { name: "Linen Camp Shirt", category: "shirts", price: 750, colours: [c.ecru, c.olive, c.rust], stock: { M: 5, L: 7, XL: 4 }, fit: "Relaxed", material: "100% linen", description: "An open camp collar and a straight hem in breathable washed linen.", isNew: true, popularity: 86, addedAt: "2026-10-30" },
  { name: "Poplin Overshirt", category: "shirts", price: 820, colours: [c.navy, c.black], stock: { S: 2, M: 4, L: 3 }, fit: "Oversized", material: "100% cotton poplin", description: "A crisp, oversized poplin shirt that also works as a light jacket.", popularity: 58, addedAt: "2026-05-18" },
  { name: "Striped Popover", category: "shirts", price: 640, compareAt: 790, colours: [c.blue], stock: { XS: 3, S: 5, M: 1 }, fit: "Regular", material: "100% cotton", description: "A half-placket popover in a fine blue stripe.", popularity: 49, addedAt: "2026-03-09" },
  // Knitwear
  { name: "Merino Crewneck", category: "knitwear", price: 1250, colours: [c.navy, c.grey, c.brown], stock: { S: 6, M: 9, L: 7, XL: 3 }, fit: "Regular", material: "100% extra-fine merino wool", description: "A lightweight, temperature-regulating merino knit that is easy to layer.", isNew: true, popularity: 92, addedAt: "2026-10-25" },
  { name: "Chunky Cardigan", category: "knitwear", price: 1490, colours: [c.ecru, c.olive], stock: { S: 2, M: 3, L: 2 }, fit: "Oversized", material: "60% cotton, 40% wool", description: "A thick, cosy cardigan with horn-effect buttons and deep pockets.", popularity: 77, addedAt: "2026-10-01" },
  { name: "Cotton Knit Polo", category: "knitwear", price: 890, colours: [c.sand, c.black], stock: { S: 5, M: 8, L: 6 }, fit: "Regular", material: "100% cotton", description: "A textured knit polo with a three-button placket and a ribbed hem.", popularity: 69, addedAt: "2026-08-19" },
  { name: "Half-Zip Sweater", category: "knitwear", price: 1150, compareAt: 1390, colours: [c.navy], stock: { M: 3, L: 4, XL: 2 }, fit: "Relaxed", material: "80% cotton, 20% wool", description: "A mid-weight knit with a funnel neck and a metal half-zip.", popularity: 55, addedAt: "2026-02-03" },
  // Trousers
  { name: "Pleated Wide Trouser", category: "trousers", price: 980, colours: [c.black, c.sand, c.brown], stock: { XS: 3, S: 8, M: 10, L: 6, XL: 2 }, fit: "Relaxed", material: "68% polyester, 30% viscose, 2% elastane", description: "Front pleats and a wide, fluid leg. Smart enough for work and easy enough for the weekend.", popularity: 94, addedAt: "2026-09-02" },
  { name: "Straight Chino", category: "trousers", price: 790, colours: [c.sand, c.navy, c.olive], stock: { S: 7, M: 12, L: 9, XL: 5 }, fit: "Regular", material: "98% cotton, 2% elastane twill", description: "A straight-leg chino in a soft brushed twill.", popularity: 88, addedAt: "2026-06-21" },
  { name: "Cargo Parachute Pant", category: "trousers", price: 860, colours: [c.olive, c.black], stock: { S: 4, M: 6, L: 5 }, fit: "Oversized", material: "100% nylon", description: "A lightweight nylon cargo with drawcord hems and six pockets.", isNew: true, popularity: 81, addedAt: "2026-10-29" },
  { name: "Linen Drawstring Trouser", category: "trousers", price: 720, compareAt: 890, colours: [c.ecru, c.sage], stock: { XS: 2, S: 3, M: 4 }, fit: "Relaxed", material: "100% linen", description: "An elasticated drawstring waist with a relaxed linen leg.", popularity: 60, addedAt: "2026-04-07" },
  // Outerwear
  { name: "Wool-Blend Overcoat", category: "outerwear", price: 2950, colours: [c.black, c.brown], stock: { S: 2, M: 4, L: 3, XL: 1 }, fit: "Relaxed", material: "60% wool, 40% polyester", description: "A single-breasted overcoat that falls just below the knee, with a notch lapel.", isNew: true, popularity: 84, addedAt: "2026-10-27" },
  { name: "Cotton Chore Jacket", category: "outerwear", price: 1650, colours: [c.navy, c.sand], stock: { S: 5, M: 7, L: 6 }, fit: "Regular", material: "100% cotton canvas", description: "A workwear-inspired jacket with three patch pockets in a heavy canvas.", popularity: 79, addedAt: "2026-08-30" },
  { name: "Padded Gilet", category: "outerwear", price: 1290, colours: [c.black, c.olive], stock: { M: 3, L: 2 }, fit: "Regular", material: "100% recycled polyester", description: "A lightweight quilted gilet for layering over knits.", popularity: 52, addedAt: "2026-09-25" },
  { name: "Suede-Effect Trucker", category: "outerwear", price: 1890, compareAt: 2290, colours: [c.brown, c.sand], stock: { S: 1, M: 2, L: 1 }, fit: "Regular", material: "100% polyester suede-effect", description: "A classic trucker shape in a soft suede-effect fabric.", popularity: 66, addedAt: "2026-01-15" },
  // Dresses
  { name: "Slip Midi Dress", category: "dresses", price: 1190, colours: [c.black, c.sage, c.rust], stock: { XS: 4, S: 6, M: 5, L: 3 }, fit: "Regular", material: "100% viscose satin", description: "A bias-cut slip dress in a fluid satin that falls to mid-calf.", isNew: true, popularity: 89, addedAt: "2026-10-26" },
  { name: "Poplin Shirt Dress", category: "dresses", price: 1090, colours: [c.white, c.blue], stock: { XS: 3, S: 5, M: 6, L: 2 }, fit: "Relaxed", material: "100% cotton poplin", description: "A relaxed shirt dress with a removable tie belt.", popularity: 80, addedAt: "2026-07-03" },
  { name: "Knit Maxi Dress", category: "dresses", price: 1350, colours: [c.brown, c.grey], stock: { S: 2, M: 3 }, fit: "Slim", material: "70% viscose, 30% polyamide rib", description: "A long ribbed knit dress with a high neck.", popularity: 63, addedAt: "2026-09-10" },
  { name: "Linen Tiered Dress", category: "dresses", price: 990, compareAt: 1250, colours: [c.ecru, c.sand], stock: { XS: 2, S: 4, M: 3, L: 1 }, fit: "Relaxed", material: "100% linen", description: "A light, airy tiered linen dress with a square neck.", popularity: 57, addedAt: "2026-05-05" },
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = seeds.map((s) => ({
  ...s,
  id: slugify(s.name),
  slug: slugify(s.name),
  images: [],
  care: s.care ?? "Machine wash cold, inside out. Dry flat. Cool iron.",
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((cat) => cat.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);
export const totalStock = (p: Product) => Object.values(p.stock).reduce((a, b) => a + (b ?? 0), 0);

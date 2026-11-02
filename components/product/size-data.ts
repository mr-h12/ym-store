import type { GarmentShape, Product, Size } from "@/lib/types";
import { SIZES } from "@/lib/format";

/** General garment measurements in cm (placeholder until the store supplies its own; brands vary). */
const TOP = { chest: [96, 102, 108, 114, 120], waist: [90, 96, 102, 108, 114], length: [68, 70, 72, 74, 76] };
const DRESS = { chest: [84, 88, 94, 100, 106], waist: [68, 72, 78, 84, 90], length: [112, 114, 116, 118, 120] };
const TROUSER = { waist: [70, 76, 82, 88, 94], hip: [94, 100, 106, 112, 118], length: [76, 78, 80, 81, 82] };

type Fit = NonNullable<Product["fit"]>;

const FIT_EASE: Record<Fit, number> = { Slim: -4, Regular: 0, Relaxed: 4, Oversized: 8 };

export interface SizeTable {
  columns: [string, string, string];
  rows: { size: Size; values: [number, number, number] }[];
}

export function sizeTable(shape: GarmentShape, fit: Product["fit"]): SizeTable {
  const ease = FIT_EASE[fit ?? "Regular"];
  if (shape === "trouser") {
    return {
      columns: ["Waist", "Hip", "Inside leg"],
      rows: SIZES.map((size, i) => ({ size, values: [TROUSER.waist[i] + ease / 2, TROUSER.hip[i] + ease, TROUSER.length[i]] })),
    };
  }
  const base = shape === "dress" ? DRESS : TOP;
  return {
    columns: ["Chest", "Waist", "Length"],
    rows: SIZES.map((size, i) => ({ size, values: [base.chest[i] + ease, base.waist[i] + ease, base.length[i]] })),
  };
}

export const FIT_NOTE: Record<Fit, string> = {
  Slim: "Cut close to the body. If you are between sizes, take the larger one.",
  Regular: "True to size. Take your usual size.",
  Relaxed: "A little roomier than regular. Take your usual size for an easy fit.",
  Oversized: "Cut generously on purpose. Size down for a closer fit.",
};

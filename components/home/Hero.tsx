import Link from "next/link";
import { getProduct } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import type { GarmentShape } from "@/lib/types";

const FEATURED: { slug: string; shape: GarmentShape }[] = [
  { slug: "wool-blend-overcoat", shape: "jacket" },
  { slug: "merino-crewneck", shape: "knit" },
];

/** Calm, full-bleed hero: one headline, one line, one primary action. */
export function Hero() {
  const [back, front] = FEATURED.map((f) => ({ ...f, product: getProduct(f.slug)! }));

  return (
    <section className="bg-surface-2">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-8 md:grid-cols-2 md:px-6 md:py-16 lg:py-20">
        <div>
          <p className="eyebrow">Autumn edit</p>
          <h1 className="mt-3 text-[2rem] leading-[1.08] font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            New season basics, built to be worn often.
          </h1>
          <p className="mt-3 max-w-md text-base text-muted md:mt-5 md:text-lg">
            Heavy cotton, merino and linen in easy shapes. Pay cash on delivery.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 md:mt-8">
            <Link href="/shop?sort=newest" className="btn btn-primary w-full sm:w-auto sm:px-8">
              Shop new in
            </Link>
            <Link href="/shop" className="link-quiet tap inline-flex items-center justify-center text-sm">
              Browse all clothing
            </Link>
          </div>
        </div>

        {/* Two overlapping garments; desktop only so products stay above the fold on phones. */}
        <div className="relative hidden aspect-[5/4] md:block" aria-hidden="true">
          <div className="absolute inset-y-0 start-0 w-[60%] overflow-hidden rounded-[var(--radius-card)] border border-line [&>div]:bg-surface">
            <ProductImage shape={back.shape} colour={back.product.colours[1]?.hex ?? back.product.colours[0].hex} name={back.product.name} priority />
          </div>
          <div className="absolute end-0 bottom-[-6%] w-[52%] overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg p-2 [&_div]:bg-surface-2">
            <div className="aspect-[3/4] overflow-hidden rounded-[calc(var(--radius-card)-4px)]">
              <ProductImage shape={front.shape} colour={front.product.colours[0].hex} name={front.product.name} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

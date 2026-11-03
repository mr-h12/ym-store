import Link from "next/link";
import { productsIn } from "@/data/products";
import { Hero } from "@/components/home/Hero";
import { BrandRow } from "@/components/home/BrandRow";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { TrustStrip } from "@/components/home/TrustStrip";
import { VisitStore } from "@/components/home/VisitStore";
import { NewInRail } from "@/components/NewInRail";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { sortProducts } from "@/components/shop/filters";
import { products } from "@/data/products";

export default function Home() {
  const newIn = sortProducts(products, "newest").slice(0, 8);
  const tees = sortProducts(productsIn("t-shirts"), "newest").slice(0, 4);

  return (
    <div className="pb-0">
      <Hero />
      <BrandRow />
      <div className="space-y-14 py-12 md:space-y-20 md:py-20">
        <NewInRail items={newIn} />
        <CategoryTiles />
        <TrustStrip />
        <section aria-labelledby="tees-title" className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 id="tees-title" className="text-xl font-semibold md:text-2xl">
              Designer tees
            </h2>
            <Link href="/shop/t-shirts" className="text-sm font-medium underline underline-offset-4">
              All tees
            </Link>
          </div>
          <ProductGrid items={tees} />
        </section>
      </div>
      <VisitStore />
    </div>
  );
}

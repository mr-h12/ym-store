import Link from "next/link";
import { products } from "@/data/products";
import { Hero } from "@/components/home/Hero";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { TrustStrip } from "@/components/home/TrustStrip";
import { NewInRail } from "@/components/NewInRail";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { sortProducts } from "@/components/shop/filters";

export default function Home() {
  const newIn = sortProducts(products, "newest").slice(0, 8);
  const popular = sortProducts(products, "popular").slice(0, 4);

  return (
    <div className="space-y-12 pb-16 md:space-y-20">
      <Hero />
      <CategoryTiles />
      <NewInRail items={newIn} />
      <TrustStrip />
      <section aria-labelledby="popular-title" className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 id="popular-title" className="text-xl font-semibold tracking-tight md:text-2xl">
            Popular right now
          </h2>
          <Link href="/shop" className="text-sm font-medium underline underline-offset-4">
            Shop all
          </Link>
        </div>
        <ProductGrid items={popular} />
      </section>
    </div>
  );
}

import Link from "next/link";
import { categories, productsIn } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { itemsLabel } from "@/components/shop/filters";

/** Six large category tiles: 2×3 on phones, 3×2 from md. */
export function CategoryTiles() {
  return (
    <section aria-labelledby="categories-title" className="mx-auto max-w-7xl px-4 md:px-6">
      <h2 id="categories-title" className="mb-4 text-xl font-semibold tracking-tight md:text-2xl">
        Shop by category
      </h2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {categories.map((cat) => {
          const items = productsIn(cat.slug);
          const colour = items[0]?.colours[0].hex ?? "#cdb994";
          return (
            <li key={cat.slug}>
              <Link href={`/shop/${cat.slug}`} className="group block">
                <div aria-hidden="true" className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line transition-colors group-hover:border-ink md:aspect-[16/10]">
                  <ProductImage shape={cat.shape} colour={colour} name="" />
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold md:text-base">{cat.name}</span>
                  <span className="text-xs text-muted md:text-sm">{itemsLabel(items.length)}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

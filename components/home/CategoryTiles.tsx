import Link from "next/link";
import { categories, productsIn } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { itemsLabel } from "@/components/shop/filters";

/** Category tiles with a real photo each, plus a "Shop all" tile: 2 columns on phones, 4 from md. */
export function CategoryTiles() {
  return (
    <section aria-labelledby="categories-title" className="mx-auto max-w-7xl px-4 md:px-6">
      <h2 id="categories-title" className="display mb-5 text-xl font-semibold md:text-2xl">
        Shop by category
      </h2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {categories.map((cat) => {
          const items = productsIn(cat.slug);
          const first = items[0];
          return (
            <li key={cat.slug}>
              <Link href={`/shop/${cat.slug}`} className="group block">
                <div aria-hidden="true" className="aspect-square overflow-hidden rounded-[var(--radius-card)] bg-white">
                  <ProductImage
                    shape={cat.shape}
                    colour={first?.colours[0].hex ?? "#ccc"}
                    name=""
                    src={first?.images[0]}
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium md:text-base">{cat.name}</span>
                  <span className="text-xs text-muted md:text-sm">{itemsLabel(items.length)}</span>
                </div>
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/shop" className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] bg-night text-silver">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo_704x705.jpg" alt="" className="h-1/2 w-1/2 object-contain" />
            <span className="display text-sm font-semibold text-white group-hover:underline md:text-base">Shop all</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

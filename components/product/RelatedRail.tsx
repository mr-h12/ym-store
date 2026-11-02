import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

/** "You may also like": horizontal rail with the next card peeking. */
export function RelatedRail({ items }: { items: Product[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-title" className="mt-16 md:mt-24">
      <h2 id="related-title" className="text-lg font-semibold md:text-xl">You may also like</h2>
      <ul className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 md:-mx-6 md:scroll-px-6 md:px-6">
        {items.map((p) => (
          <li key={p.id} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[22%]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

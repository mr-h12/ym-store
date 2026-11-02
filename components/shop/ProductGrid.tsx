import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

/** 2 columns on phones, 3 at md, 4 at lg; generous row gap leaves room for quick-add. */
export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
      {items.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}

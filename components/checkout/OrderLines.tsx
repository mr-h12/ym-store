import { ProductImage } from "@/components/ProductImage";
import { getCategory } from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { ResolvedLine } from "@/components/CartProvider";

/** Read-only list of order lines (summary, confirm, success). */
export function OrderLines({ lines }: { lines: ResolvedLine[] }) {
  return (
    <ul className="divide-y divide-line">
      {lines.map((l) => {
        const hex = l.product.colours.find((c) => c.name === l.colour)?.hex ?? l.product.colours[0]?.hex ?? "#ccc";
        const shape = getCategory(l.product.category)?.shape ?? "tee";
        return (
          <li key={`${l.productId}-${l.size}-${l.colour}`} className="flex gap-3 py-3">
            <div className="aspect-[3/4] w-14 shrink-0 overflow-hidden rounded-[var(--radius-badge)] border border-line">
              <ProductImage shape={shape} colour={hex} name={l.product.name} src={l.product.images[0]} />
            </div>
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-medium">{l.product.name}</p>
              <p className="text-muted">
                {l.colour} · {l.size} · Qty {l.qty}
              </p>
            </div>
            <p className="price text-end text-sm">{formatPrice(l.lineTotal)}</p>
          </li>
        );
      })}
    </ul>
  );
}

import { formatPrice } from "@/lib/format";

/** Subtotal / Delivery / Total — label at start, value at end, tabular figures. */
export function Totals({
  subtotal,
  shipping,
  total,
  className = "",
}: {
  subtotal: number;
  shipping: number;
  total: number;
  className?: string;
}) {
  return (
    <dl className={`space-y-1.5 text-sm ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted">Subtotal</dt>
        <dd className="price">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted">Delivery</dt>
        <dd className="price">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-2 text-base font-semibold">
        <dt>Total</dt>
        <dd className="price">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

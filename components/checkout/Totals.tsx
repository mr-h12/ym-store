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
  // Prices aren't published yet: the store quotes the total on WhatsApp.
  if (subtotal === 0)
    return (
      <dl className={`flex items-baseline justify-between gap-4 text-sm font-semibold ${className}`}>
        <dt>Total</dt>
        <dd>Confirmed on WhatsApp</dd>
      </dl>
    );
  return (
    <dl className={`space-y-1.5 text-sm ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted">Subtotal</dt>
        <dd className="price">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted">Delivery</dt>
        <dd className="price">{shipping === 0 ? "Confirmed on WhatsApp" : formatPrice(shipping)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-2 text-base font-semibold">
        <dt>Total</dt>
        <dd className="price">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}

"use client";

import type { ResolvedLine } from "@/components/CartProvider";
import { OrderLines } from "./OrderLines";
import { Totals } from "./Totals";
import { paymentLabel, type Details } from "./fields";

interface Props {
  details: Details;
  lines: ResolvedLine[];
  subtotal: number;
  shipping: number;
  total: number;
  delivery: string;
  onEdit: (fieldId: string) => void;
  footer: React.ReactNode;
}

function Block({ title, onEdit, editLabel, children }: { title: string; onEdit: () => void; editLabel: string; children: React.ReactNode }) {
  return (
    <section className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button type="button" onClick={onEdit} className="link-quiet tap text-sm" aria-label={editLabel}>
          Edit
        </button>
      </div>
      <div className="mt-1 text-sm text-muted">{children}</div>
    </section>
  );
}

export function ConfirmStep({ details: d, lines, subtotal, shipping, total, delivery, onEdit, footer }: Props) {
  return (
    <div>
      <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface px-4 sm:px-5">
        <Block title="Contact" onEdit={() => onEdit("co-name")} editLabel="Edit contact details">
          <p className="text-ink">{d.name}</p>
          <p>{d.phone}</p>
        </Block>
        <Block title="Deliver to" onEdit={() => onEdit("co-street")} editLabel="Edit delivery address">
          <p className="text-ink">
            {d.street}
            {d.apartment && <>, {d.apartment}</>}
          </p>
          <p>
            {d.area}, {d.city}
          </p>
          {d.notes && <p className="mt-1">Note: {d.notes}</p>}
        </Block>
        <Block title="Payment" onEdit={() => onEdit("payment")} editLabel="Edit payment method">
          <p className="text-ink">{paymentLabel(d.payment)}</p>
        </Block>
        <section className="py-4">
          <h3 className="text-sm font-semibold">Estimated delivery</h3>
          <p className="mt-1 text-sm">{delivery}</p>
        </section>
      </div>

      <section className="mt-6 rounded-[var(--radius-card)] border border-line bg-surface px-4 pb-4 sm:px-5" aria-label="Items">
        <OrderLines lines={lines} />
        <Totals className="border-t border-line pt-3" subtotal={subtotal} shipping={shipping} total={total} />
      </section>

      {footer}
    </div>
  );
}

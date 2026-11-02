"use client";

import { useId, useState } from "react";
import type { ResolvedLine } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { OrderLines } from "./OrderLines";
import { Totals } from "./Totals";

interface Props {
  lines: ResolvedLine[];
  subtotal: number;
  shipping: number;
  total: number;
}

/** Desktop: sticky right column. */
export function OrderSummary(p: Props) {
  return (
    <section aria-labelledby="summary-title" className="sticky top-24 rounded-[var(--radius-card)] border border-line bg-surface p-5">
      <h2 id="summary-title" className="text-base font-semibold">
        Order summary
      </h2>
      <div className="mt-2">
        <OrderLines lines={p.lines} />
      </div>
      <Totals className="mt-3 border-t border-line pt-3" subtotal={p.subtotal} shipping={p.shipping} total={p.total} />
    </section>
  );
}

/** Mobile: collapsible row at the top of the page. */
export function OrderSummaryToggle(p: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-sm"
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {open ? "Hide" : "Show"} order summary
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className="price font-semibold">{formatPrice(p.total)}</span>
      </button>
      <div id={id} hidden={!open} className="border-t border-line px-4 pb-4">
        <OrderLines lines={p.lines} />
        <Totals className="border-t border-line pt-3" subtotal={p.subtotal} shipping={p.shipping} total={p.total} />
      </div>
    </section>
  );
}

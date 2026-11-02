"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ResolvedLine } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { OrderLines } from "./OrderLines";
import { Totals } from "./Totals";
import { paymentLabel, type Details } from "./fields";

export interface PlacedOrder {
  number: string;
  details: Details;
  lines: ResolvedLine[];
  subtotal: number;
  shipping: number;
  total: number;
  delivery: string;
  /** wa.me link carrying this order, so it can be re-sent. */
  whatsapp: string;
}

export const Success = forwardRef<HTMLHeadingElement, { order: PlacedOrder }>(function Success({ order }, ref) {
  const d = order.details;
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 ref={ref} tabIndex={-1} className="mt-4 text-2xl font-bold tracking-tight outline-none">
        Thank you, {d.name.split(/\s+/)[0]}. Your order is placed.
      </h1>
      <p className="mt-2 text-muted">
        Order number <span className="price font-semibold text-ink">{order.number}</span>
      </p>

      <div className="mt-6 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface px-4 sm:px-5">
        <section className="py-4">
          <h2 className="text-sm font-semibold">What happens next</h2>
          <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm">
            <li>
              Send the WhatsApp message we opened with your order.{" "}
              <a className="link-quiet" href={order.whatsapp} target="_blank" rel="noopener noreferrer">
                Didn&apos;t open? Send it again
              </a>
            </li>
            <li>We&apos;ll call or WhatsApp you on {d.phone} to confirm within a few hours.</li>
            <li>
              Your order arrives <span className="font-medium">{order.delivery}</span> at {d.street}, {d.area}, {d.city}.
            </li>
            <li>
              {paymentLabel(d.payment)}: {order.total > 0 ? <><span className="price font-medium">{formatPrice(order.total)}</span> due on delivery.</> : "we'll confirm the total with you on WhatsApp."}
            </li>
          </ol>
        </section>
        <section className="pb-4">
          <OrderLines lines={order.lines} />
          <Totals className="border-t border-line pt-3" subtotal={order.subtotal} shipping={order.shipping} total={order.total} />
        </section>
      </div>

      <Link href="/shop" className="btn btn-primary mt-6 w-full sm:w-auto">
        Continue shopping
      </Link>
    </div>
  );
});

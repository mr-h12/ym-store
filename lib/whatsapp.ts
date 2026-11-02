import { storeConfig } from "./store-config";
import { formatPrice } from "./format";
import type { CartLine } from "./types";

/** A cart line with enough product info to describe it in a message. */
export interface MessageLine extends CartLine {
  product: { name: string; price: number };
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface OrderCustomer {
  name?: string;
  phone?: string;
  city?: string;
  area?: string;
  street?: string;
  apartment?: string;
  notes?: string;
  /** Human label, e.g. "Cash on delivery". */
  payment?: string;
}

/** Plain-text order message (WhatsApp renders *bold*). */
export function buildOrderMessage(
  lines: MessageLine[],
  totals: OrderTotals,
  customer?: OrderCustomer,
  orderNumber?: string,
): string {
  const out: string[] = [];
  out.push(
    orderNumber
      ? `Hello ${storeConfig.name}, this is my order ${orderNumber}:`
      : `Hello ${storeConfig.name}, I'd like to order:`,
  );
  out.push("");
  lines.forEach((l, i) => {
    out.push(
      `${i + 1}. ${l.product.name} · ${l.colour} · ${l.size} × ${l.qty} = ${formatPrice(l.product.price * l.qty)}`,
    );
  });
  out.push("");
  out.push(`Subtotal: ${formatPrice(totals.subtotal)}`);
  out.push(`Delivery: ${totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}`);
  out.push(`*Total: ${formatPrice(totals.total)}*`);

  if (customer) {
    const address = [customer.street, customer.apartment, customer.area, customer.city]
      .map((s) => s?.trim())
      .filter(Boolean)
      .join(", ");
    const rows: [string, string | undefined][] = [
      ["Name", customer.name],
      ["Mobile", customer.phone],
      ["Address", address],
      ["Notes", customer.notes],
      ["Payment", customer.payment],
    ];
    const filled = rows.filter(([, v]) => v && v.trim());
    if (filled.length) {
      out.push("");
      filled.forEach(([k, v]) => out.push(`${k}: ${v!.trim()}`));
    }
  }
  return out.join("\n");
}

/** wa.me deep link to the store number with a pre-filled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappOrderUrl(
  lines: MessageLine[],
  totals: OrderTotals,
  customer?: OrderCustomer,
  orderNumber?: string,
): string {
  return whatsappUrl(buildOrderMessage(lines, totals, customer, orderNumber));
}

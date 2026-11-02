"use client";

import { useCallback, useRef, useState } from "react";
import type { Colour, GarmentShape, Product, Size } from "@/lib/types";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { storeConfig } from "@/lib/store-config";
import { SizePicker } from "./SizePicker";
import { SizeGuideDialog } from "./SizeGuideDialog";
import { DeliveryInfo } from "./DeliveryInfo";
import { StickyAddBar } from "./StickyAddBar";

export function ProductBuyBox({
  product,
  shape,
  colour,
  onColour,
}: {
  product: Product;
  shape: GarmentShape;
  colour: Colour;
  onColour: (c: Colour) => void;
}) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const sizeRef = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  const onSale = !!product.compareAt && product.compareAt > product.price;
  const soldOut = Object.values(product.stock).every((n) => !n);
  const price = formatPrice(product.price);

  function requireSize() {
    setSizeError(true);
    const box = sizeRef.current;
    if (!box) return;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    const first = box.querySelector<HTMLButtonElement>("button[data-size]:not(:disabled)");
    first?.focus({ preventScroll: true });
  }

  function handleAdd() {
    if (soldOut) return;
    if (!size) return requireSize();
    add(product.id, size, colour.name);
    setAnnounce("");
    window.setTimeout(() => setAnnounce(`Added to bag: ${product.name}, ${colour.name}, size ${size}`), 50);
  }

  function whatsappHref(withUrl: boolean) {
    const url = withUrl ? window.location.href : "";
    const msg = [
      `Hi ${storeConfig.name}, I'd like to order:`,
      product.name,
      `Colour: ${colour.name}`,
      `Size: ${size ?? "not chosen yet"}`,
      `Price: ${price}`,
      url,
    ].filter(Boolean).join("\n");
    return `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-[28px]">{product.name}</h1>
        <p className="price mt-2 text-lg">
          {onSale ? (
            <>
              <span className="sr-only">Sale price </span>
              <span className="font-semibold text-sale">{price}</span>
              <span className="sr-only">, was </span>
              <s className="ms-2 text-base text-muted">{formatPrice(product.compareAt!)}</s>
              <span className="ms-2 text-sm font-medium text-sale">Save {formatPrice(product.compareAt! - product.price)}</span>
            </>
          ) : (
            <span className="font-semibold">{price}</span>
          )}
        </p>
      </div>

      {/* Colour */}
      <div>
        <p id="colour-label" className="mb-2 text-sm font-semibold">
          Colour <span className="font-normal text-muted">· {colour.name}</span>
        </p>
        <div role="group" aria-labelledby="colour-label" className="flex flex-wrap gap-3">
          {product.colours.map((c) => {
            const selected = c.name === colour.name;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={selected}
                aria-label={c.name}
                title={c.name}
                onClick={() => onColour(c)}
                className={`tap inline-flex h-10 w-10 items-center justify-center rounded-full ${selected ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "ring-1 ring-line hover:ring-ink"}`}
              >
                <span className="h-8 w-8 rounded-full border border-black/15" style={{ background: c.hex }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <SizePicker
        ref={sizeRef}
        stock={product.stock}
        value={size}
        onChange={(s) => {
          setSize(s);
          setSizeError(false);
        }}
        onOpenGuide={() => setGuideOpen(true)}
        error={sizeError}
      />

      {/* Actions: one primary, one quiet alternative */}
      <div>
        <button
          ref={addRef}
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          aria-describedby={sizeError ? "size-error" : undefined}
          className="btn btn-primary h-13 w-full text-base"
        >
          {soldOut ? "Sold out" : <>Add to bag · <span className="price">{price}</span></>}
        </button>
        <a
          href={whatsappHref(false)}
          onClick={(e) => {
            // Rebuild at click time so the message carries the current URL and choices.
            e.currentTarget.href = whatsappHref(true);
          }}
          target="_blank"
          rel="noreferrer"
          className="link-quiet tap mt-3 flex items-center justify-center gap-2 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
          </svg>
          Or order on WhatsApp
        </a>
        <p aria-live="polite" role="status" className="sr-only">{announce}</p>
      </div>

      <div className="border-t border-line pt-5">
        <DeliveryInfo price={product.price} />
      </div>

      <SizeGuideDialog open={guideOpen} onClose={closeGuide} productName={product.name} shape={shape} fit={product.fit} />

      <StickyAddBar
        target={addRef}
        name={product.name}
        price={<span className={`price font-semibold ${onSale ? "text-sale" : "text-ink"}`}>{price}</span>}
        detail={size ? `${colour.name}, ${size}` : colour.name}
        label={soldOut ? "Sold out" : size ? "Add to bag" : "Select size"}
        disabled={soldOut}
        onAdd={handleAdd}
      />
    </div>
  );
}

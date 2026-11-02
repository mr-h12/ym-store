"use client";

import { forwardRef } from "react";
import type { Product, Size } from "@/lib/types";
import { SIZES } from "@/lib/format";

/** Size buttons in one row. Sold-out sizes stay visible, disabled and struck through. */
export const SizePicker = forwardRef<
  HTMLDivElement,
  {
    stock: Product["stock"];
    value: Size | null;
    onChange: (s: Size) => void;
    onOpenGuide: () => void;
    error: boolean;
  }
>(function SizePicker({ stock, value, onChange, onOpenGuide, error }, ref) {
  const left = value ? stock[value] ?? 0 : 0;
  return (
    <div ref={ref} className="scroll-mt-28">
      <div className="mb-2 flex items-baseline gap-3">
        <span id="size-label" className="text-sm font-semibold">
          Size{value && <span className="font-normal text-muted"> · {value}</span>}
        </span>
        <button type="button" onClick={onOpenGuide} className="link-quiet text-sm" aria-haspopup="dialog">
          Size guide
        </button>
      </div>
      <div
        role="group"
        aria-labelledby="size-label"
        aria-describedby={error ? "size-error" : undefined}
        className="grid grid-cols-5 gap-2"
      >
        {SIZES.map((s) => {
          const qty = stock[s] ?? 0;
          const selected = value === s;
          return (
            <button
              key={s}
              type="button"
              data-size={s}
              disabled={qty === 0}
              aria-pressed={selected}
              aria-label={qty === 0 ? `${s}, sold out` : s}
              onClick={() => onChange(s)}
              className={`h-12 rounded-[var(--radius-input)] border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-muted disabled:line-through ${
                selected
                  ? "border-accent bg-accent text-accent-ink"
                  : error
                    ? "border-sale bg-surface hover:border-ink"
                    : "border-line bg-surface hover:border-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      {error && (
        <p id="size-error" className="mt-2 text-sm text-sale">Please choose a size</p>
      )}
      {value && left > 0 && left <= 3 && (
        <p className="mt-2 text-sm text-muted">Only {left} left in {value}</p>
      )}
    </div>
  );
});

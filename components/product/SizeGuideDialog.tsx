"use client";

import { useEffect, useRef } from "react";
import type { GarmentShape, Product } from "@/lib/types";
import { FIT_NOTE, sizeTable } from "./size-data";

/**
 * Size guide: native modal <dialog> (focus moves in, background is inert,
 * Esc closes). Bottom sheet on phones, centred on desktop, 70% scrim.
 * Pushes a history entry so the phone's Back button closes it instead of
 * leaving the product page.
 */
export function SizeGuideDialog({
  open,
  onClose,
  productName,
  shape,
  fit,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
  shape: GarmentShape;
  fit: Product["fit"];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pushed = useRef(false);
  const table = sizeTable(shape, fit);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      const root = document.documentElement;
      const prev = root.style.overflow;
      root.style.overflow = "hidden";
      const onPop = () => {
        pushed.current = false;
        onClose();
      };
      // Deferred so a mount/unmount/remount (React dev) never pushes twice.
      const t = window.setTimeout(() => {
        history.pushState({ sizeGuide: true }, "");
        pushed.current = true;
        window.addEventListener("popstate", onPop);
      }, 0);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener("popstate", onPop);
        root.style.overflow = prev;
        if (dlg.open) dlg.close();
        if (pushed.current) {
          pushed.current = false;
          history.back();
        }
      };
    }
  }, [open, onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="size-guide-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Click on the scrim (the dialog element itself, outside the panel) closes.
        if (e.target === e.currentTarget) onClose();
      }}
      className="sheet-dialog fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto rounded-t-[var(--radius-card)] bg-surface p-0 text-ink shadow-[var(--shadow-float)] backdrop:bg-scrim md:inset-0 md:m-auto md:max-w-lg md:rounded-[var(--radius-card)]"
    >
      <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="size-guide-title" className="text-lg font-semibold">Size guide</h2>
            <p className="mt-0.5 text-sm text-muted">{productName} · garment measurements in cm</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="tap -me-2 -mt-1 inline-flex items-center justify-center rounded-[var(--radius-input)] p-2 hover:bg-surface-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <table className="mt-5 w-full text-sm [font-variant-numeric:tabular-nums]">
          <caption className="sr-only">Measurements in centimetres for sizes XS to XL</caption>
          <thead>
            <tr className="border-b border-line text-muted">
              <th scope="col" className="py-2 text-start font-medium">Size</th>
              {table.columns.map((c) => (
                <th key={c} scope="col" className="py-2 text-end font-medium">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => (
              <tr key={r.size} className="border-b border-line last:border-0">
                <th scope="row" className="py-2.5 text-start font-semibold">{r.size}</th>
                {r.values.map((v, i) => (
                  <td key={i} className="py-2.5 text-end">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {fit && <p className="mt-4 text-sm"><span className="font-semibold">{fit} fit.</span> {FIT_NOTE[fit]}</p>}
        <p className="mt-2 text-sm text-muted">
          A general guide: designer sizing varies by brand. Measure a garment you own that fits well, lying flat,
          and compare. Not sure? Message us on WhatsApp and we&apos;ll help you pick.
        </p>
      </div>
    </dialog>
  );
}

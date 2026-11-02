"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { Product, Size } from "@/lib/types";
import { SIZES } from "@/lib/format";
import {
  COLOURS,
  EMPTY_FILTERS,
  FITS,
  PRICE_BANDS,
  applyFilters,
  itemsLabel,
  type FilterState,
} from "./filters";

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

const pill =
  "tap inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-input)] border px-3 text-sm font-medium transition-colors";
const pillState = (on: boolean) =>
  on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-ink";

/**
 * Filter sheet: bottom sheet on phones, side sheet from the end edge on desktop.
 * Edits a draft; nothing changes until "Show N items" is pressed.
 */
export function FilterSheet({
  initial,
  items,
  onApply,
  onClose,
  returnFocusRef,
}: {
  initial: FilterState;
  items: Product[];
  onApply: (f: FilterState) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const [draft, setDraft] = useState<FilterState>(initial);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Open the secondary groups that already have a value.
  const [openGroups] = useState(() => ({
    colour: initial.colours.length > 0,
    fit: initial.fits.length > 0,
    price: initial.price !== null,
  }));

  const count = applyFilters(items, draft).length;

  useEffect(() => {
    const returnTo = returnFocusRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select, summary, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus();
    };
  }, [returnFocusRef]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="filter-title">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-scrim transition-opacity duration-200 starting:opacity-0"
      />
      <div
        ref={panelRef}
        className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[var(--radius-card)] bg-surface shadow-[var(--shadow-float)] transition-transform duration-200 starting:translate-y-full md:inset-y-0 md:start-auto md:end-0 md:max-h-none md:w-[420px] md:rounded-none md:starting:translate-y-0 md:starting:translate-x-full md:rtl:starting:-translate-x-full"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-6">
          <h2 id="filter-title" className="text-lg font-semibold">
            Filter
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="tap -me-2 inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-input)] hover:bg-surface-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-6">
          {/* Size first and always expanded: it is the filter people use most. */}
          <fieldset className="border-b border-line py-5">
            <legend className="float-start mb-3 w-full text-sm font-semibold">Size</legend>
            <div className="clear-both grid grid-cols-5 gap-2">
              {SIZES.map((s: Size) => {
                const on = draft.sizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDraft((d) => ({ ...d, sizes: toggle(d.sizes, s) }))}
                    className={`${pill} h-11 px-0 ${pillState(on)}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted">Shows items in stock in the sizes you pick.</p>
          </fieldset>

          <Group title="Colour" defaultOpen={openGroups.colour} count={draft.colours.length}>
            <div className="flex flex-wrap gap-2">
              {COLOURS.map((c) => {
                const on = draft.colours.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDraft((d) => ({ ...d, colours: toggle(d.colours, c.name) }))}
                    className={`${pill} ${on ? "border-accent bg-surface ring-2 ring-accent ring-offset-1" : "border-line bg-surface hover:border-ink"}`}
                  >
                    <span className="h-4 w-4 rounded-full border border-black/15" style={{ background: c.hex }} aria-hidden="true" />
                    {c.name}
                  </button>
                );
              })}
            </div>
          </Group>

          <Group title="Fit" defaultOpen={openGroups.fit} count={draft.fits.length}>
            <div className="grid grid-cols-2 gap-2">
              {FITS.map((f) => {
                const on = draft.fits.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDraft((d) => ({ ...d, fits: toggle(d.fits, f) }))}
                    className={`${pill} ${pillState(on)}`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </Group>

          <Group title="Price" defaultOpen={openGroups.price} count={draft.price ? 1 : 0}>
            <div className="grid grid-cols-2 gap-2">
              {PRICE_BANDS.map((b) => {
                const on = draft.price === b.value;
                return (
                  <button
                    key={b.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDraft((d) => ({ ...d, price: on ? null : b.value }))}
                    className={`${pill} price ${pillState(on)}`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </Group>

          <div className="flex items-center justify-between py-5">
            <span id="sale-label" className="text-sm font-semibold">
              On sale
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={draft.sale}
              aria-labelledby="sale-label"
              onClick={() => setDraft((d) => ({ ...d, sale: !d.sale }))}
              className="tap inline-flex items-center"
            >
              <span
                className={`relative inline-block h-7 w-12 rounded-full border transition-colors ${draft.sale ? "border-accent bg-accent" : "border-line bg-surface-2"}`}
              >
                <span
                  className={`absolute top-0.5 h-[22px] w-[22px] rounded-full bg-surface shadow-sm transition-[inset-inline-start] ${draft.sale ? "start-[22px]" : "start-0.5"}`}
                />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-line px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
          <button
            type="button"
            disabled={count === 0}
            onClick={() => onApply(draft)}
            className="btn btn-primary w-full"
          >
            {count === 0 ? "No items match" : `Show ${itemsLabel(count)}`}
          </button>
          <button type="button" onClick={() => setDraft(EMPTY_FILTERS)} className="link-quiet tap text-sm">
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

function Group({
  title,
  count,
  defaultOpen,
  children,
}: {
  title: string;
  count: number;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-line" open={defaultOpen}>
      <summary className="tap flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        <span>
          {title}
          {count > 0 && <span className="ms-2 font-normal text-muted">({count})</span>}
        </span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="pb-5">{children}</div>
    </details>
  );
}

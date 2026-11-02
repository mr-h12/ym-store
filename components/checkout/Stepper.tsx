"use client";

import { useCart } from "@/components/CartProvider";

export type Step = "details" | "confirm" | "done";

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** Bag ✓ — Details — Confirm, joined by one line inside a single bordered container. */
export function Stepper({ step, onDetails }: { step: Step; onDetails: () => void }) {
  const { open } = useCart();
  const idx = step === "details" ? 1 : step === "confirm" ? 2 : 3;
  const items = [
    { label: "Bag", action: step === "done" ? undefined : open },
    { label: "Details", action: step === "confirm" ? onDetails : undefined },
    { label: "Confirm", action: undefined },
  ];

  return (
    <nav aria-label="Checkout progress" className="rounded-[var(--radius-card)] border border-line bg-surface px-4 py-3 sm:px-6">
      <ol className="flex items-center">
        {items.map((it, i) => {
          const state = i < idx ? "done" : i === idx ? "current" : "future";
          const dot =
            state === "done" ? (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">{CHECK}</span>
            ) : state === "current" ? (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink text-sm font-bold">{i + 1}</span>
            ) : (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sm text-muted">{i + 1}</span>
            );
          const text = (
            <span className={`text-sm ${state === "current" ? "font-semibold" : state === "future" ? "text-muted" : ""}`}>
              {it.label}
              {state === "done" && <span className="sr-only"> (completed)</span>}
            </span>
          );
          return (
            <li
              key={it.label}
              className={`flex items-center ${i < items.length - 1 ? "flex-1" : ""}`}
              aria-current={state === "current" ? "step" : undefined}
            >
              {it.action ? (
                <button type="button" onClick={it.action} className="tap -m-1 inline-flex items-center gap-2 rounded-[var(--radius-input)] p-1 hover:underline underline-offset-4">
                  {dot}
                  {text}
                </button>
              ) : (
                <span className="inline-flex items-center gap-2">
                  {dot}
                  {text}
                </span>
              )}
              {i < items.length - 1 && (
                <span aria-hidden="true" className={`mx-2 h-px flex-1 sm:mx-4 ${i < idx ? "bg-accent" : "bg-line"}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

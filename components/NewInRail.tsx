"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

/**
 * Horizontal scroll-snap rail. Cards are sized so the next one peeks (~30%),
 * which makes swiping obvious; prev/next buttons appear for mouse users only.
 */
export function NewInRail({
  items,
  title = "New in",
  seeAllHref = "/shop?sort=newest",
}: {
  items: Product[];
  title?: string;
  seeAllHref?: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const pos = Math.abs(el.scrollLeft); // negative in RTL
    setAtStart(pos < 4);
    setAtEnd(pos + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "tap inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface hover:border-ink disabled:cursor-default disabled:opacity-35 disabled:hover:border-line";

  return (
    <section aria-labelledby="new-in-title" className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 id="new-in-title" className="text-xl font-semibold md:text-2xl">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          <Link href={seeAllHref} className="text-sm font-medium underline underline-offset-4">
            See all
          </Link>
          <div className="hidden gap-2 pointer-fine:md:flex">
            <button type="button" className={arrow} onClick={() => step(-1)} disabled={atStart} aria-label="Previous items">
              <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className={arrow} onClick={() => step(1)} disabled={atEnd} aria-label="Next items">
              <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={railRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:-mx-6 md:scroll-px-6 md:gap-5 md:px-6"
      >
        {items.map((p) => (
          <li key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[42%] md:w-[40%] lg:w-[29%]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

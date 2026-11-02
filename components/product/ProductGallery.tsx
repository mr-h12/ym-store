"use client";

import { useRef, useState } from "react";
import type { GarmentShape } from "@/lib/types";
import { ProductImage } from "@/components/ProductImage";

/**
 * Four views per product. Real photos are used when the product has them;
 * otherwise the illustrated silhouette is varied (tint / scale / crop) so
 * the four placeholder views read as different shots.
 */
const VIEWS = [
  { label: "front view", tint: "var(--surface-2)", transform: "none" },
  { label: "back view", tint: "color-mix(in srgb, var(--surface-2) 88%, var(--ink))", transform: "scaleX(-1)" },
  { label: "fabric detail", tint: "color-mix(in srgb, var(--surface-2) 70%, var(--surface))", transform: "scale(1.9) translateY(12%)" },
  { label: "on model", tint: "color-mix(in srgb, var(--surface-2) 82%, var(--line))", transform: "scale(0.86) translateY(4%)" },
] as const;

function View({
  index,
  shape,
  colour,
  alt,
  src,
}: {
  index: number;
  shape: GarmentShape;
  colour: string;
  alt: string;
  src?: string;
}) {
  const v = VIEWS[index];
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border border-line" style={{ background: v.tint }}>
      {src ? (
        <ProductImage shape={shape} colour={colour} name={alt} src={src} priority={index === 0} />
      ) : (
        <div className="h-full w-full" style={{ transform: v.transform }}>
          <ProductImage shape={shape} colour={colour} name={alt} className="bg-transparent!" />
        </div>
      )}
    </div>
  );
}

export function ProductGallery({
  name,
  shape,
  colour,
  images,
}: {
  name: string;
  shape: GarmentShape;
  colour: { name: string; hex: string };
  images: string[];
}) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const alts = VIEWS.map((v) => `${name} in ${colour.name}, ${v.label}`);

  function onScroll() {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const step = (el.firstElementChild as HTMLElement).offsetWidth + 8;
    setActive(Math.min(VIEWS.length - 1, Math.round(Math.abs(el.scrollLeft) / step)));
  }

  function goTo(i: number) {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  return (
    <section aria-label="Product images">
      {/* Mobile: swipe carousel, next image peeks */}
      <div className="md:hidden">
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-4 px-4"
          tabIndex={0}
          aria-label={`Image ${active + 1} of ${VIEWS.length}. Swipe for more.`}
        >
          {VIEWS.map((_, i) => (
            <div key={i} className="w-[84%] shrink-0 snap-start">
              <View index={i} shape={shape} colour={colour.hex} alt={alts[i]} src={images[i]} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {VIEWS.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${v.label}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-ink" : "w-1.5 bg-line"}`}
              />
            ))}
          </div>
          <span className="price text-xs text-muted" aria-hidden="true">
            {active + 1} / {VIEWS.length}
          </span>
        </div>
      </div>

      {/* Desktop: two-column editorial grid */}
      <ul className="hidden grid-cols-2 gap-2 md:grid">
        {VIEWS.map((_, i) => (
          <li key={i}>
            <View index={i} shape={shape} colour={colour.hex} alt={alts[i]} src={images[i]} />
          </li>
        ))}
      </ul>
    </section>
  );
}

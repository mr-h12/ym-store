"use client";

import { useRef, useState } from "react";
import type { GarmentShape } from "@/lib/types";
import { ProductImage } from "@/components/ProductImage";

const LABELS = ["front view", "back view"];

/** One slide per real photo of the selected colour (front, then back); a drawn placeholder if there are none. */
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
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-white">
      <ProductImage shape={shape} colour={colour} name={alt} src={src} priority={index === 0} className="object-contain" />
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
  /** Photos of the selected colour. */
  images: string[];
}) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const views: (string | undefined)[] = images.length ? images : [undefined];
  const alts = views.map((_, i) => `${name} in ${colour.name}, ${LABELS[i] ?? `view ${i + 1}`}`);

  function onScroll() {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const step = (el.firstElementChild as HTMLElement).offsetWidth + 8;
    setActive(Math.min(views.length - 1, Math.round(Math.abs(el.scrollLeft) / step)));
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
          aria-label={`Image ${active + 1} of ${views.length}.`}
        >
          {views.map((src, i) => (
            <div key={`${colour.name}-${i}`} className={`${views.length > 1 ? "w-[84%]" : "w-full"} shrink-0 snap-start`}>
              <View index={i} shape={shape} colour={colour.hex} alt={alts[i]} src={src} />
            </div>
          ))}
        </div>
        {views.length > 1 && <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {views.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${LABELS[i] ?? `view ${i + 1}`}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-colors duration-200 ease-out ${i === active ? "w-5 bg-ink" : "w-1.5 bg-line"}`}
              />
            ))}
          </div>
          <span className="price text-xs text-muted" aria-hidden="true">
            {active + 1} / {views.length}
          </span>
        </div>}
      </div>

      {/* Desktop: two-column editorial grid */}
      <ul className={`hidden gap-2 md:grid ${views.length > 1 ? "grid-cols-2" : "mx-auto max-w-xl grid-cols-1"}`}>
        {views.map((src, i) => (
          <li key={`${colour.name}-${i}`}>
            <View index={i} shape={shape} colour={colour.hex} alt={alts[i]} src={src} />
          </li>
        ))}
      </ul>
    </section>
  );
}

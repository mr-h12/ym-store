"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Mobile-only bottom bar. Shows once the main "Add to bag" button has scrolled
 * up out of view, and hides again at the end of the product content
 * (#pdp-end) so it never sits over the footer.
 */
export function StickyAddBar({
  target,
  name,
  price,
  detail,
  label,
  disabled,
  onAdd,
}: {
  target: RefObject<HTMLElement | null>;
  name: string;
  price: React.ReactNode;
  detail: string;
  label: string;
  disabled: boolean;
  onAdd: () => void;
}) {
  const [pastButton, setPastButton] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setPastButton(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(el);
    const end = document.getElementById("pdp-end");
    const io2 = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting || e.boundingClientRect.top < 0));
    if (end) io2.observe(end);
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, [target]);

  const show = pastButton && !atEnd;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-float)] transition-transform duration-300 ease-drawer md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-muted">
            {price}
            <span> · {detail}</span>
          </p>
        </div>
        <button type="button" onClick={onAdd} disabled={disabled} className="btn btn-primary shrink-0 px-5">
          {label}
        </button>
      </div>
    </div>
  );
}

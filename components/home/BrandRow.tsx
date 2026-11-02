import Link from "next/link";
import { BRANDS } from "@/components/shop/filters";

/** Every brand in stock as a link into the filtered shop. Scrolls sideways on phones. */
export function BrandRow() {
  return (
    <section aria-labelledby="brands-title" className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 md:px-6">
        <h2 id="brands-title" className="brand-label shrink-0">Brands</h2>
        <ul className="no-scrollbar -me-4 flex gap-5 overflow-x-auto pe-4 md:-me-6 md:pe-6">
          {BRANDS.filter((b) => b !== "Other").map((b) => (
            <li key={b} className="shrink-0">
              <Link href={`/shop?brand=${encodeURIComponent(b)}`} className="display text-sm font-medium whitespace-nowrap text-ink/80 hover:text-ink">
                {b}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

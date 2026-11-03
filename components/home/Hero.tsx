import Link from "next/link";
import { getProduct } from "@/data/products";

const FEATURED = "y-3-leather-bomber-jacket";

/**
 * Short hero: one real product photo, one headline, ONE action. On phones it
 * stays under ~45% of the screen so the first products show above the fold.
 */
export function Hero() {
  const featured = getProduct(FEATURED)!;

  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto grid max-w-7xl md:grid-cols-2 md:items-center md:gap-10 md:px-6">
        {/* Photo first on phones (fills the top), second on desktop (end side). */}
        <div className="relative h-[40svh] max-h-[400px] min-h-[240px] overflow-hidden md:order-2 md:aspect-[4/5] md:h-auto md:max-h-none md:rounded-[var(--radius-card)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.images[0]}
            alt={`${featured.name}, new in`}
            fetchPriority="high"
            className="settle-in h-full w-full object-cover object-[50%_18%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-2 to-transparent md:hidden" aria-hidden="true" />
        </div>

        <div className="px-4 pt-1 pb-6 md:order-1 md:px-0 md:py-20 lg:py-24">
          <p className="eyebrow">Same-day delivery in Alexandria</p>
          <h1 className="mt-2 text-[1.9rem] leading-[1.1] font-semibold md:mt-4 md:text-5xl lg:text-[3.4rem]">
            Designer menswear in Alexandria
          </h1>
          <p className="mt-2 max-w-md text-base leading-relaxed text-muted md:mt-5 md:text-lg">
            Balmain, Armani, Hermès, Burberry and more. <span className="hidden md:inline">Order on WhatsApp, pay cash or Visa on delivery.</span>
          </p>
          <div className="mt-4 md:mt-8">
            <Link href="/shop?sort=newest" className="btn btn-primary w-full sm:w-auto sm:px-10">
              Shop new in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

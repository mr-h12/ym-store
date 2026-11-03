import Link from "next/link";
import { getProduct } from "@/data/products";
import { storeConfig } from "@/lib/store-config";
import { WhatsAppIcon } from "@/components/WhatsAppFab";

const FEATURED = ["y-3-leather-bomber-jacket", "valentino-sweatshirt"];

/** Night hero: one headline, one primary action, two real product shots (desktop). */
export function Hero() {
  const [back, front] = FEATURED.map((slug) => getProduct(slug)!);

  return (
    <section className="bg-night text-silver">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-12 md:grid-cols-[1.1fr_1fr] md:px-6 md:py-20 lg:py-24">
        <div>
          <p className="text-xs tracking-[.2em] text-silver-muted uppercase">Alexandria · Your fashion dealer</p>
          <h1 className="display mt-4 text-[2.1rem] leading-[1.08] font-semibold text-white md:text-5xl lg:text-[3.6rem]">
            Designer menswear, picked for Alexandria.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-silver-muted md:mt-6 md:text-lg">
            Balmain, Calvin Klein, Armani, Hermès, Burberry and more. Order on WhatsApp and get it the same day in
            Alexandria.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-9">
            <Link href="/shop" className="btn btn-silver w-full sm:w-auto sm:px-8">
              Shop the collection
            </Link>
            <a
              href={`https://wa.me/${storeConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-night w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" /> {storeConfig.phones[0]}
            </a>
          </div>
        </div>

        {/* Two overlapping real photos; desktop only so products stay near the top on phones. */}
        <div className="relative hidden aspect-[5/4] md:block" aria-hidden="true">
          <div className="absolute inset-y-0 start-0 w-[58%] overflow-hidden rounded-[var(--radius-card)] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={back.images[0]} alt="" className="settle-in h-full w-full object-cover" />
          </div>
          <div className="absolute end-0 bottom-[-8%] w-[50%] rounded-[var(--radius-card)] bg-night p-2">
            <div className="aspect-[3/4] overflow-hidden rounded-[calc(var(--radius-card)-4px)] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={front.images[0]} alt="" className="settle-in h-full w-full object-cover" style={{ animationDelay: "120ms" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

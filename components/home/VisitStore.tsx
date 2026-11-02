import { storeConfig } from "@/lib/store-config";
import { WhatsAppIcon } from "@/components/WhatsAppFab";

/** Contact section: address (Arabic + English), map, phones, WhatsApp and socials. */
export function VisitStore() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-night text-silver">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/cover_banner_1696x624.jpg" alt={`${storeConfig.name}, your fashion dealer`} className="mx-auto block w-full max-w-7xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-14 md:grid-cols-2 md:px-6 md:pb-20">
        <div>
          <h2 id="contact-title" className="display text-2xl font-semibold text-white md:text-3xl">Visit the store</h2>
          <p lang="ar" dir="rtl" className="ar mt-4 text-start text-white">{storeConfig.addressAr}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-silver-muted">{storeConfig.addressEn}</p>
          <a href={storeConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-night mt-5">
            Open in Google Maps
          </a>
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-xs tracking-[.16em] text-silver-muted uppercase">Order or ask</p>
            <a
              href={`https://wa.me/${storeConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-silver mt-3 w-full sm:w-auto sm:px-8"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp {storeConfig.phones[0]}
            </a>
            <p className="mt-3 text-sm">
              Call{" "}
              {storeConfig.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && " · "}
                  <a href={`tel:${p}`} className="price underline underline-offset-2 hover:text-white">{p}</a>
                </span>
              ))}
            </p>
            <p className="mt-1 text-sm">
              <a href={storeConfig.whatsappGroup} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                Join our WhatsApp group for new arrivals
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[.16em] text-silver-muted uppercase">Follow</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li><a href={storeConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram {storeConfig.instagramHandle}</a></li>
              <li><a href={storeConfig.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
              <li><a href={storeConfig.threads} target="_blank" rel="noopener noreferrer" className="hover:text-white">Threads</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

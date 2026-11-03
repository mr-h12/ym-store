import { storeConfig } from "@/lib/store-config";
import { WhatsAppIcon } from "@/components/WhatsAppFab";

/** Contact section: the brand banner (the one dark block on the page), address, map, phones, WhatsApp and socials. */
export function VisitStore() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 pt-14 md:px-6 md:pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/cover_banner_1696x624.jpg"
          alt={`${storeConfig.name}, your fashion dealer`}
          className="block w-full rounded-[var(--radius-card)]"
        />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-14 md:grid-cols-2 md:px-6 md:pb-20">
        <div>
          <h2 id="contact-title" className="text-2xl font-semibold md:text-3xl">Visit the store</h2>
          <p lang="ar" dir="rtl" className="ar mt-4 text-start">{storeConfig.addressAr}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{storeConfig.addressEn}</p>
          <a href={storeConfig.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-5">
            Open in Google Maps
          </a>
        </div>
        <div className="space-y-6">
          <div>
            <p className="eyebrow">Order or ask</p>
            <a
              href={`https://wa.me/${storeConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-3 w-full sm:w-auto sm:px-8"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp {storeConfig.phones[0]}
            </a>
            <p className="mt-3 text-sm text-muted">
              Call{" "}
              {storeConfig.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && " · "}
                  <a href={`tel:${p}`} className="price text-ink underline underline-offset-2">{p}</a>
                </span>
              ))}
            </p>
            <p className="mt-1 text-sm">
              <a href={storeConfig.whatsappGroup} target="_blank" rel="noopener noreferrer" className="link-quiet">
                Join our WhatsApp group for new arrivals
              </a>
            </p>
          </div>
          <div>
            <p className="eyebrow">Follow</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li><a href={storeConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram {storeConfig.instagramHandle}</a></li>
              <li><a href={storeConfig.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href={storeConfig.threads} target="_blank" rel="noopener noreferrer" className="hover:underline">Threads</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

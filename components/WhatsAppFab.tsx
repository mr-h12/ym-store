"use client";

import { usePathname } from "next/navigation";
import { storeConfig } from "@/lib/store-config";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
    </svg>
  );
}

/**
 * One floating WhatsApp button. Hidden on the product page (its sticky add bar
 * sits at the bottom) and in checkout, which already ends on WhatsApp.
 * Dark icon on WhatsApp green: white on #25D366 fails contrast.
 */
export function WhatsAppFab() {
  const path = usePathname();
  if (path.startsWith("/product/") || path.startsWith("/checkout")) return null;
  return (
    <a
      href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(`Hi ${storeConfig.shortName}, I have a question`)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-night shadow-[var(--shadow-float)] transition-transform duration-150 ease-out active:scale-[.97]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

import { storeConfig } from "@/lib/store-config";

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-px shrink-0 text-muted">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  truck: "M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14",
  cash: "M3 7h18v10H3zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6 10v.01M18 14v.01",
};

/** The store's own delivery and payment promises (from its Instagram and Facebook posts). */
export function DeliveryInfo() {
  return (
    <ul className="space-y-2.5 text-sm">
      <li className="flex gap-2.5">
        <Icon d={ICONS.truck} />
        <span>
          <span className="font-semibold">Same-day delivery</span> in Alexandria{" "}
          <span lang="ar" dir="rtl" className="ar text-muted">· يجيلك ف نفس اليوم</span>
        </span>
      </li>
      <li className="flex gap-2.5">
        <Icon d={ICONS.map} />
        <span>Shipping to all governorates in Egypt</span>
      </li>
      <li className="flex gap-2.5">
        <Icon d={ICONS.cash} />
        <span>{storeConfig.payment}</span>
      </li>
    </ul>
  );
}

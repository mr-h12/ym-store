"use client";

import { useSyncExternalStore } from "react";
import { storeConfig } from "@/lib/store-config";
import { formatPrice } from "@/lib/format";

/** Days couriers don't deliver (0 = Sun … 6 = Sat). Friday is the weekend day here. */
const NON_WORKING = new Set([5]);

function addWorkingDays(from: Date, n: number) {
  const d = new Date(from);
  let left = n;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (!NON_WORKING.has(d.getDay())) left--;
  }
  return d;
}

const wd = new Intl.DateTimeFormat(storeConfig.locale, { weekday: "short" });
const mon = new Intl.DateTimeFormat(storeConfig.locale, { month: "short" });

export function deliveryRange(today: Date) {
  const a = addWorkingDays(today, 2);
  const b = addWorkingDays(today, 4);
  const sameMonth = a.getMonth() === b.getMonth();
  const left = `${wd.format(a)} ${a.getDate()}${sameMonth ? "" : ` ${mon.format(a)}`}`;
  const right = `${wd.format(b)} ${b.getDate()} ${mon.format(b)}`;
  return `${left} – ${right}`;
}

// The date is computed in the browser (the page is pre-rendered), keyed by day.
const subscribe = () => () => {};
const todayKey = () => new Date().toDateString();
const serverKey = () => null;

function Icon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-px shrink-0 text-muted">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  truck: "M3 6h11v10H3zM14 9h4l3 3v4h-7M7.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  tag: "M3 12V4h8l10 10-8 8L3 12zM7.5 8.5h.01",
  cash: "M3 7h18v10H3zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6 10v.01M18 14v.01",
  returns: "M4 9h11a5 5 0 0 1 0 10H9M4 9l4-4M4 9l4 4",
};

export function DeliveryInfo({ price }: { price: number }) {
  const key = useSyncExternalStore(subscribe, todayKey, serverKey);
  const range = key ? deliveryRange(new Date(key)) : null;
  const free = price >= storeConfig.freeShippingThreshold;

  return (
    <ul className="space-y-2.5 text-sm">
      <li className="flex gap-2.5">
        <Icon d={ICONS.truck} />
        <span>
          {range ? (
            <>Delivery <span className="font-semibold">{range}</span></>
          ) : (
            <>Delivery in {storeConfig.deliveryEstimate}</>
          )}
        </span>
      </li>
      <li className="flex gap-2.5">
        <Icon d={ICONS.tag} />
        <span>
          {free ? (
            "Free delivery on this item"
          ) : (
            <>
              Free delivery over <span className="price">{formatPrice(storeConfig.freeShippingThreshold)}</span>
              <span className="text-muted">, otherwise <span className="price">{formatPrice(storeConfig.shippingFee)}</span></span>
            </>
          )}
        </span>
      </li>
      <li className="flex gap-2.5">
        <Icon d={ICONS.cash} />
        <span>Cash on delivery available</span>
      </li>
      <li className="flex gap-2.5">
        <Icon d={ICONS.returns} />
        <span>{storeConfig.returnsWindowDays}-day free returns</span>
      </li>
    </ul>
  );
}

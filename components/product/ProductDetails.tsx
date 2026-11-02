import type { Product } from "@/lib/types";
import { storeConfig } from "@/lib/store-config";
import { Accordion } from "./Accordion";
import { FIT_NOTE } from "./size-data";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="border-t border-line">
      <Accordion title="Description" defaultOpen>
        <p>{product.description}</p>
        <p className="mt-2">
          <a className="link-quiet" href={product.instagram} target="_blank" rel="noopener noreferrer">
            See the original post on Instagram
          </a>
        </p>
      </Accordion>
      <Accordion title="Fit & size">
        <ul className="space-y-1.5">
          {product.fit && <li><span className="font-medium">{product.fit} fit.</span> {FIT_NOTE[product.fit]}</li>}
          <li>Sizing varies by brand. Tell us your usual size on WhatsApp and we&apos;ll confirm what fits.</li>
          <li className="text-muted">A general size guide is next to the size buttons.</li>
        </ul>
      </Accordion>
      {product.material && (
        <Accordion title="Material & care">
          <dl className="space-y-1.5">
            <div><dt className="inline font-medium">Material: </dt><dd className="inline">{product.material}</dd></div>
            {product.care && <div><dt className="inline font-medium">Care: </dt><dd className="inline">{product.care}</dd></div>}
          </dl>
        </Accordion>
      )}
      <Accordion title="Delivery & payment">
        <ul className="space-y-1.5">
          <li>Same-day delivery in Alexandria.</li>
          <li>Shipping to all governorates in Egypt; we confirm the fee and timing on WhatsApp.</li>
          <li>{storeConfig.payment}.</li>
          <li>Or visit the store: {storeConfig.addressEn}.</li>
        </ul>
      </Accordion>
    </div>
  );
}

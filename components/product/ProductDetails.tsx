import type { Product } from "@/lib/types";
import { storeConfig } from "@/lib/store-config";
import { formatPrice } from "@/lib/format";
import { Accordion } from "./Accordion";
import { FIT_NOTE } from "./size-data";

const MODEL: Record<string, string> = {
  dresses: "Model is 172 cm and wears S.",
  trousers: "Model is 185 cm and wears M (32 waist).",
};

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="border-t border-line">
      <Accordion title="Description" defaultOpen>
        <p>{product.description}</p>
      </Accordion>
      <Accordion title="Fit & size">
        <ul className="space-y-1.5">
          <li><span className="font-medium">{product.fit} fit.</span> {FIT_NOTE[product.fit]}</li>
          <li>{MODEL[product.category] ?? "Model is 185 cm and wears M."}</li>
          <li className="text-muted">Full measurements are in the size guide next to the size buttons.</li>
        </ul>
      </Accordion>
      <Accordion title="Material & care">
        <dl className="space-y-1.5">
          <div><dt className="inline font-medium">Material: </dt><dd className="inline">{product.material}</dd></div>
          <div><dt className="inline font-medium">Care: </dt><dd className="inline">{product.care}</dd></div>
        </dl>
      </Accordion>
      <Accordion title="Delivery & returns">
        <ul className="space-y-1.5">
          <li>Delivered in {storeConfig.deliveryEstimate}.</li>
          <li>
            Delivery is <span className="price">{formatPrice(storeConfig.shippingFee)}</span>, free on orders over{" "}
            <span className="price">{formatPrice(storeConfig.freeShippingThreshold)}</span>.
          </li>
          <li>Cash on delivery available.</li>
          <li>Free returns within {storeConfig.returnsWindowDays} days of delivery, unworn with tags attached.</li>
        </ul>
      </Accordion>
    </div>
  );
}

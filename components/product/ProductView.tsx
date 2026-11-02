"use client";

import { useState } from "react";
import type { Colour, GarmentShape, Product } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { ProductBuyBox } from "./ProductBuyBox";

/**
 * Gallery + buy box share the selected colour. Desktop: gallery (~60%) on the
 * start side with the details under it; buy box sticky on the end side.
 * Mobile: gallery, buy box, details.
 */
export function ProductView({
  product,
  shape,
  details,
}: {
  product: Product;
  shape: GarmentShape;
  details: React.ReactNode;
}) {
  const [colour, setColour] = useState<Colour>(product.colours[0]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-x-10 lg:gap-x-14">
      <div className="md:col-start-1 md:row-start-1">
        <ProductGallery name={product.name} shape={shape} colour={colour} images={colour.images} />
      </div>
      <div className="md:col-start-2 md:row-span-2 md:row-start-1">
        <div className="md:sticky md:top-24">
          <ProductBuyBox product={product} shape={shape} colour={colour} onColour={setColour} />
        </div>
      </div>
      <div className="md:col-start-1 md:row-start-2">{details}</div>
    </div>
  );
}

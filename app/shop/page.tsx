import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopFallback, ShopView } from "@/components/ShopView";

export const metadata: Metadata = {
  title: "Shop all clothing",
  description: "T-shirts, shirts, knitwear, trousers, outerwear and dresses.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopView />
    </Suspense>
  );
}

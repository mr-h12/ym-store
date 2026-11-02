import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopFallback, ShopView } from "@/components/ShopView";

export const metadata: Metadata = {
  title: "Shop all clothing",
  description: "T-shirts, shirts, knitwear, trousers, outerwear and dresses.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { sort } = await searchParams;
  return (
    <Suspense fallback={<ShopFallback sort={typeof sort === "string" ? sort : undefined} />}>
      <ShopView />
    </Suspense>
  );
}

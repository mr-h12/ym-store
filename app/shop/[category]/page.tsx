import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ShopFallback, ShopView } from "@/components/ShopView";
import { categories, getCategory } from "@/data/products";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cat = getCategory((await params).category);
  return cat ? { title: cat.name, description: cat.blurb } : {};
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cat = getCategory((await params).category);
  if (!cat) notFound();
  const { sort } = await searchParams;
  return (
    <Suspense fallback={<ShopFallback category={cat.slug} sort={typeof sort === "string" ? sort : undefined} />}>
      <ShopView category={cat.slug} />
    </Suspense>
  );
}

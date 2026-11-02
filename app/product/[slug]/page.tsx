import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products } from "@/data/products";
import { ProductView } from "@/components/product/ProductView";
import { ProductDetails } from "@/components/product/ProductDetails";
import { RelatedRail } from "@/components/product/RelatedRail";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  const desc = product.description;
  return {
    title: product.name,
    description: desc,
    openGraph: { title: product.name, description: desc, type: "website" },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;

  const others = products.filter((p) => p.id !== product.id);
  const related = [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category).sort((a, b) => b.addedAt.localeCompare(a.addedAt)),
  ].slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-28 md:px-6 md:pt-6 md:pb-20">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted md:mb-6">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/shop" className="hover:text-ink hover:underline">Shop</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/shop/${category.slug}`} className="hover:text-ink hover:underline">{category.name}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink/70">{product.name}</li>
        </ol>
      </nav>

      <ProductView product={product} shape={category.shape} details={<ProductDetails product={product} />} />

      <RelatedRail items={related} />
      {/* The mobile sticky bar hides once this is reached, so it never covers the footer. */}
      <div id="pdp-end" aria-hidden="true" className="h-px" />
    </div>
  );
}

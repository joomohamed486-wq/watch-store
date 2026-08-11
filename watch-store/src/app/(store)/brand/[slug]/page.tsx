import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/product-card";

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({ where: { slug: params.slug } });
  if (!brand) notFound();

  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", brandId: brand.id },
    include: { brand: true, images: { take: 1 } },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
        <p className="text-muted-foreground">{brand.description}</p>
      </div>
      {products.length === 0 ? <p className="text-center text-muted-foreground">لا توجد منتجات</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}

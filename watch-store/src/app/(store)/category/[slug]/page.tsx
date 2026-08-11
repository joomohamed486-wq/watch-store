import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/product-card";
import { ProductFilters } from "@/components/store/product-filters";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug } });
  if (!category) notFound();

  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({ where: { status: "ACTIVE", categoryId: category.id }, include: { brand: true, images: { take: 1 } } }),
    prisma.category.findMany({ where: { status: "ACTIVE" } }),
    prisma.brand.findMany({ where: { status: "ACTIVE" } }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{category.nameAr}</h1>
      <p className="text-muted-foreground mb-6">{category.description}</p>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0"><ProductFilters categories={categories} brands={brands} /></aside>
        <div className="flex-1">
          {products.length === 0 ? <p className="text-muted-foreground">لا توجد منتجات</p> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

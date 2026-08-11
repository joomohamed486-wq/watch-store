import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/product-card";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";

  const products = query
    ? await prisma.product.findMany({
        where: {
          status: "ACTIVE",
          OR: [
            { nameAr: { contains: query, mode: "insensitive" } },
            { nameEn: { contains: query, mode: "insensitive" } },
            { sku: { contains: query, mode: "insensitive" } },
            { brand: { name: { contains: query, mode: "insensitive" } } },
          ],
        },
        include: { brand: true, images: { take: 1 } },
        take: 20,
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">نتائج البحث</h1>
      <p className="text-muted-foreground mb-6">{query ? `نتائج البحث عن "${query}"` : "ابحث عن ساعتك المفضلة"}</p>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">لا توجد نتائج مطابقة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

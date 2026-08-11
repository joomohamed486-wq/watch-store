import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default async function WishlistPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/wishlist");

  const wishlist = await prisma.wishlist.findUnique({
    where: { userId: session.id },
    include: { items: { include: { product: { include: { brand: true, images: { take: 1 } } } } } },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">المفضلة</h1>
      {!wishlist || wishlist.items.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">لا توجد منتجات في المفضلة</p>
          <Button asChild><Link href="/shop">تسوق الآن</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ product }: { product: any }) {
  const { toast } = useToast();
  const mainImage = product.images?.[0]?.url || "/placeholder-watch.jpg";
  const hasDiscount = product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);
  const discountPercent = hasDiscount ? calculateDiscount(Number(product.compareAtPrice), Number(product.price)) : 0;

  const handleAddToCart = async () => {
    const result = await addToCart(product.id, 1);
    if (result.success) toast({ title: "تمت الإضافة", description: "تمت إضافة الساعة إلى السلة" });
    else toast({ title: "خطأ", description: result.error, variant: "destructive" });
  };

  return (
    <div className="group">
      <div className="bg-card rounded-xl border overflow-hidden transition-shadow hover:shadow-lg">
        <Link href={`/product/${product.slug}`}>
          <div className="relative aspect-square bg-muted">
            <Image src={mainImage} alt={product.nameAr} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            {hasDiscount && <Badge className="absolute top-2 left-2 bg-red-500 text-white">خصم {discountPercent}%</Badge>}
            {product.newArrival && <Badge className="absolute top-2 right-2 bg-green-500 text-white">جديد</Badge>}
          </div>
        </Link>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.brand.name}</p>
          <Link href={`/product/${product.slug}`}><h3 className="font-bold text-sm mb-2 line-clamp-1 hover:text-primary transition-colors">{product.nameAr}</h3></Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gold-600">{formatPrice(product.price)}</span>
              {hasDiscount && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>}
            </div>
            <Button size="icon" variant="ghost" onClick={handleAddToCart} disabled={product.stockQuantity === 0}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Loader2 } from "lucide-react";

export function AddToCartButton({ productId, stock }: { productId: string; stock: number }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (stock <= 0) { toast({ title: "نفذ من المخزون", variant: "destructive" }); return; }
    setLoading(true);
    const result = await addToCart(productId, 1);
    setLoading(false);
    if (result.success) toast({ title: "تمت الإضافة", description: "تمت إضافة الساعة إلى السلة" });
    else toast({ title: "خطأ", description: result.error, variant: "destructive" });
  };

  return (
    <Button size="lg" className="flex-1" onClick={handleClick} disabled={loading || stock === 0}>
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-5 w-5 ml-2" />}
      {stock === 0 ? "نفذ من المخزون" : "أضف للسلة"}
    </Button>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateCartItem } from "@/actions/cart";
import { Minus, Plus, Loader2 } from "lucide-react";

export function UpdateQuantity({ itemId, currentQty }: { itemId: string; currentQty: number }) {
  const [quantity, setQuantity] = useState(currentQty);
  const [loading, setLoading] = useState(false);

  const update = async (newQty: number) => {
    if (newQty < 1) return;
    setLoading(true);
    const result = await updateCartItem(itemId, newQty);
    setLoading(false);
    if (result.success) setQuantity(newQty);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => update(quantity - 1)} disabled={loading}>
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Minus className="h-3 w-3" />}
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => update(quantity + 1)} disabled={loading}>
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
      </Button>
    </div>
  );
}

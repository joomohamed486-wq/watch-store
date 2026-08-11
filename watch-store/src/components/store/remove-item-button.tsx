"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/actions/cart";
import { Trash2, Loader2 } from "lucide-react";

export function RemoveItemButton({ itemId }: { itemId: string }) {
  const [loading, setLoading] = useState(false);
  const handleRemove = async () => { setLoading(true); await removeFromCart(itemId); setLoading(false); };
  return (
    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={handleRemove} disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}

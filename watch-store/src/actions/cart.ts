"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, quantity: number) {
  const session = await getSession();
  if (!session) return { error: "يرجى تسجيل الدخول أولاً" };

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stockQuantity < quantity) return { error: "المخزون غير كافٍ" };

  let cart = await prisma.cart.findUnique({ where: { userId: session.id }, include: { items: true } });
  if (!cart) cart = await prisma.cart.create({ data: { userId: session.id }, include: { items: true } });

  const existingItem = cart.items.find((item) => item.productId === productId);
  if (existingItem) {
    const newQty = existingItem.quantity + quantity;
    if (newQty > product.stockQuantity) return { error: "لا يمكن إضافة أكثر من المخزون المتاح" };
    await prisma.cartItem.update({ where: { id: existingItem.id }, data: { quantity: newQty } });
  } else {
    await prisma.cartItem.create({ data: { cartId: cart.id, productId, quantity } });
  }
  revalidatePath("/cart");
  return { success: true, message: "تمت الإضافة إلى السلة" };
}

export async function removeFromCart(itemId: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };
  await prisma.cartItem.deleteMany({ where: { id: itemId, cart: { userId: session.id } } });
  revalidatePath("/cart");
  return { success: true };
}

export async function updateCartItem(itemId: string, quantity: number) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };
  if (quantity <= 0) { await removeFromCart(itemId); return { success: true }; }
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cart: { userId: session.id } }, include: { product: true } });
  if (!item) return { error: "العنصر غير موجود" };
  if (quantity > item.product.stockQuantity) return { error: "المخزون غير كافٍ" };
  await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  revalidatePath("/cart");
  return { success: true };
}

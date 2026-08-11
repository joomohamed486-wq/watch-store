import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { addressId, shippingMethodId, couponCode, customerNotes } = await req.json();

  const cart = await prisma.cart.findUnique({
    where: { userId: session.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

  // Validate stock
  for (const item of cart.items) {
    if (item.quantity > item.product.stockQuantity) {
      return NextResponse.json({ error: `Insufficient stock for ${item.product.nameAr}` }, { status: 400 });
    }
  }

  const shippingMethod = await prisma.shippingMethod.findUnique({ where: { id: shippingMethodId } });
  if (!shippingMethod) return NextResponse.json({ error: "Invalid shipping method" }, { status: 400 });

  let subtotal = cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
  let discount = 0;

  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });
    if (coupon && coupon.active) {
      if (coupon.type === "PERCENTAGE") discount = subtotal * (Number(coupon.value) / 100);
      else if (coupon.type === "FIXED_AMOUNT") discount = Number(coupon.value);
      if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
    }
  }

  const shippingCost = shippingMethod.isFreeShipping && subtotal >= Number(shippingMethod.freeShippingThreshold || 0) ? 0 : Number(shippingMethod.cost);
  const tax = (subtotal - discount) * 0.15;
  const total = subtotal - discount + shippingCost + tax;

  const orderNumber = `ORD-${Date.now()}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: session.id,
      addressId,
      subtotal,
      discount,
      couponCode: couponCode || null,
      shippingCost,
      tax,
      total,
      status: "PENDING",
      paymentStatus: "PENDING",
      paymentMethod: "CASH_ON_DELIVERY",
      shippingMethodId,
      customerNotes,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          productName: item.product.nameAr,
          productSku: item.product.sku,
          productImage: null,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: Number(item.product.price) * item.quantity,
        })),
      },
    },
  });

  // Deduct inventory
  for (const item of cart.items) {
    await prisma.product.update({ where: { id: item.productId }, data: { stockQuantity: { decrement: item.quantity } } });
    await prisma.inventoryTransaction.create({
      data: {
        productId: item.productId,
        userId: session.id,
        previousQty: item.product.stockQuantity,
        change: -item.quantity,
        newQty: item.product.stockQuantity - item.quantity,
        reason: `Order ${orderNumber}`,
        type: "SALE",
        orderId: order.id,
      },
    });
  }

  // Clear cart
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return NextResponse.json({ success: true, order: { id: order.id, orderNumber: order.orderNumber, total } });
}

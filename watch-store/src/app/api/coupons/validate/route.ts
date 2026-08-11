import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { code, subtotal } = await req.json();
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });

  if (!coupon || !coupon.active) return NextResponse.json({ error: "كوبون غير صالح" }, { status: 400 });
  if (coupon.startDate && new Date() < coupon.startDate) return NextResponse.json({ error: "الكوبون غير نشط بعد" }, { status: 400 });
  if (coupon.endDate && new Date() > coupon.endDate) return NextResponse.json({ error: "انتهت صلاحية الكوبون" }, { status: 400 });
  if (coupon.minOrder && subtotal < Number(coupon.minOrder)) return NextResponse.json({ error: `الحد الأدنى للطلب ${coupon.minOrder}` }, { status: 400 });
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) return NextResponse.json({ error: "تم استنفاد الكوبون" }, { status: 400 });

  const userUsage = await prisma.couponUsage.count({ where: { couponId: coupon.id, userId: session.id } });
  if (coupon.perCustomerLimit && userUsage >= coupon.perCustomerLimit) return NextResponse.json({ error: "لقد استخدمت هذا الكوبون مسبقاً" }, { status: 400 });

  let discount = 0;
  if (coupon.type === "PERCENTAGE") discount = subtotal * (Number(coupon.value) / 100);
  else if (coupon.type === "FIXED_AMOUNT") discount = Number(coupon.value);
  else if (coupon.type === "FREE_SHIPPING") discount = 0;

  if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));

  return NextResponse.json({ success: true, coupon: { code: coupon.code, type: coupon.type, discount } });
}

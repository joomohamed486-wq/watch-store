import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ items: [] }, { status: 401 });

  const cart = await prisma.cart.findUnique({
    where: { userId: session.id },
    include: { items: { include: { product: { include: { brand: true, images: { take: 1 } } } } } },
  });

  return NextResponse.json({ items: cart?.items || [] });
}

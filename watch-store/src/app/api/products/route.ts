import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const where: any = { status: "ACTIVE" };
  if (category) where.category = { slug: category };
  if (brand) where.brand = { slug: brand };
  if (search) where.OR = [{ nameAr: { contains: search, mode: "insensitive" } }, { nameEn: { contains: search, mode: "insensitive" } }, { sku: { contains: search, mode: "insensitive" } }];

  const orderBy: any = {};
  switch (sort) { case "price-asc": orderBy.price = "asc"; break; case "price-desc": orderBy.price = "desc"; break; case "newest": orderBy.createdAt = "desc"; break; default: orderBy.createdAt = "desc"; }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, include: { brand: true, images: { take: 1 }, category: true }, orderBy, skip: (page - 1) * limit, take: limit }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, pages: Math.ceil(total / limit) });
}

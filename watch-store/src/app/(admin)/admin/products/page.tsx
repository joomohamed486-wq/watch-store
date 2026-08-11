import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { brand: true, category: true, images: { take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">المنتجات</h1><p className="text-muted-foreground">إدارة منتجات المتجر</p></div>
        <Button asChild><Link href="/admin/products/new"><Plus className="h-4 w-4 ml-2" />إضافة منتج</Link></Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead><TableHead>الماركة</TableHead><TableHead>التصنيف</TableHead>
                <TableHead>السعر</TableHead><TableHead>المخزون</TableHead><TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.nameAr}</TableCell>
                  <TableCell>{product.brand.name}</TableCell>
                  <TableCell>{product.category.nameAr}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell><Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>{product.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminInventoryPage() {
  const products = await prisma.product.findMany({
    include: { brand: true },
    orderBy: { stockQuantity: "asc" },
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">المخزون</h1><p className="text-muted-foreground">إدارة مخزون المنتجات</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">إجمالي المنتجات</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{products.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">منخفض المخزون</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-orange-600">{products.filter(p => p.stockQuantity <= p.lowStockThreshold && p.stockQuantity > 0).length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">نفذ من المخزون</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-red-600">{products.filter(p => p.stockQuantity === 0).length}</p></CardContent></Card>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow><TableHead>المنتج</TableHead><TableHead>الماركة</TableHead><TableHead>المخزون</TableHead><TableHead>الحد الأدنى</TableHead><TableHead>الحالة</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.nameAr}</TableCell>
                  <TableCell>{product.brand.name}</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>{product.lowStockThreshold}</TableCell>
                  <TableCell>
                    {product.stockQuantity === 0 ? <Badge className="bg-red-100 text-red-800">نفذ</Badge> :
                     product.stockQuantity <= product.lowStockThreshold ? <Badge className="bg-orange-100 text-orange-800">منخفض</Badge> :
                     <Badge className="bg-green-100 text-green-800">متوفر</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

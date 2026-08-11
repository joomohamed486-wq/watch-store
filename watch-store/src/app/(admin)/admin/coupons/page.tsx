import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">الكوبونات</h1><p className="text-muted-foreground">إدارة أكواد الخصم</p></div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow><TableHead>الكود</TableHead><TableHead>النوع</TableHead><TableHead>القيمة</TableHead><TableHead>الاستخدام</TableHead><TableHead>الحالة</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-bold">{coupon.code}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>{coupon.value.toString()}</TableCell>
                  <TableCell>{coupon.usageCount} / {coupon.usageLimit || "∞"}</TableCell>
                  <TableCell><Badge variant={coupon.active ? "default" : "secondary"}>{coupon.active ? "نشط" : "غير نشط"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

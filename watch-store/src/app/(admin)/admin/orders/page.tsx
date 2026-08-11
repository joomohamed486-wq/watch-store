import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: { select: { name: true, email: true } }, items: true },
    orderBy: { createdAt: "desc" },
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800", CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800", PACKED: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-cyan-100 text-cyan-800", DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "معلق", CONFIRMED: "مؤكد", PROCESSING: "قيد المعالجة",
    PACKED: "تم التغليف", SHIPPED: "تم الشحن", DELIVERED: "تم التوصيل", CANCELLED: "ملغي",
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">الطلبات</h1><p className="text-muted-foreground">إدارة طلبات العملاء</p></div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead><TableHead>العميل</TableHead>
                <TableHead>المنتجات</TableHead><TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead><TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium"><Link href={`/admin/orders/${order.id}`} className="hover:underline">{order.orderNumber}</Link></TableCell>
                  <TableCell>{order.user.name || order.user.email}</TableCell>
                  <TableCell>{order.items.length} منتج</TableCell>
                  <TableCell>{formatPrice(order.total)}</TableCell>
                  <TableCell><Badge className={statusColors[order.status] || ""}>{statusLabels[order.status] || order.status}</Badge></TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

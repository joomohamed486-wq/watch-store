import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    PACKED: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-cyan-100 text-cyan-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "معلق", CONFIRMED: "مؤكد", PROCESSING: "قيد المعالجة",
    PACKED: "تم التغليف", SHIPPED: "تم الشحن", DELIVERED: "تم التوصيل",
    CANCELLED: "ملغي",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">طلباتي</h1>
      {orders.length === 0 ? (
        <Card><CardContent className="py-16 text-center"><p className="text-muted-foreground">لا توجد طلبات</p></CardContent></Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold">{order.orderNumber}</span>
                      <Badge className={statusColors[order.status] || "bg-gray-100"}>{statusLabels[order.status] || order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} منتج</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                    <Link href={`/orders/${order.id}`} className="text-sm text-primary hover:underline">تفاصيل الطلب</Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

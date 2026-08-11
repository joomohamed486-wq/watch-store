import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/account");

  const [orders, wishlist] = await Promise.all([
    prisma.order.findMany({ where: { userId: session.id }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.wishlist.findUnique({ where: { userId: session.id }, include: { items: { include: { product: { include: { brand: true, images: { take: 1 } } } } } } }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">حسابي</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>معلوماتي</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p><span className="text-muted-foreground">الاسم:</span> {session.name || "—"}</p>
            <p><span className="text-muted-foreground">البريد:</span> {session.email}</p>
            <Button variant="outline" className="w-full mt-4" asChild><Link href="/account/addresses">إدارة العناوين</Link></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>طلباتي</CardTitle></CardHeader>
          <CardContent>
            {orders.length === 0 ? <p className="text-muted-foreground">لا توجد طلبات</p> : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center border-b pb-2">
                    <div><p className="font-medium">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{order.status}</p></div>
                    <span className="font-bold">{formatPrice(order.total)}</span>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild><Link href="/account/orders">عرض الكل</Link></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>المفضلة</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{wishlist?.items?.length || 0} منتج في المفضلة</p>
            <Button variant="outline" className="w-full mt-4" asChild><Link href="/wishlist">عرض المفضلة</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

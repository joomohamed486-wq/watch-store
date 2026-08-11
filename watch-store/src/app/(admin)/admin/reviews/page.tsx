import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: { user: { select: { name: true } }, product: { select: { nameAr: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">التقييمات</h1><p className="text-muted-foreground">إدارة تقييمات العملاء</p></div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
             <TableRow>
  <TableHead>المنتج</TableHead>
  <TableHead>العميل</TableHead>
  <TableHead>التقييم</TableHead>
  <TableHead>العنوان</TableHead>
  <TableHead>الحالة</TableHead>
             </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.product.nameAr}</TableCell>
                  <TableCell>{review.user.name}</TableCell>
                  <TableCell><div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />)}</div></TableCell>
                  <TableCell>{review.title}</TableCell>
                  <TableCell><Badge variant={review.status === "APPROVED" ? "default" : "secondary"}>{review.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

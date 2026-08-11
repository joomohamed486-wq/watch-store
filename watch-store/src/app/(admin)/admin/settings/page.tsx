import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function AdminSettingsPage() {
  const settings = await prisma.storeSetting.findMany();
  const store = settings.find(s => s.key === "store")?.value as any || {};

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">الإعدادات</h1><p className="text-muted-foreground">إعدادات المتجر</p></div>
      <Card>
        <CardHeader><CardTitle>إعدادات المتجر</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>اسم المتجر</Label><Input defaultValue={store.name || ""} /></div>
            <div><Label>البريد الإلكتروني</Label><Input defaultValue={store.email || ""} /></div>
            <div><Label>الجوال</Label><Input defaultValue={store.phone || ""} /></div>
            <div><Label>واتساب</Label><Input defaultValue={store.whatsapp || ""} /></div>
          </div>
          <div><Label>العنوان</Label><Input defaultValue={store.address || ""} /></div>
          <Button>حفظ التغييرات</Button>
        </CardContent>
      </Card>
    </div>
  );
}

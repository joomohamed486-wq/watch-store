import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">تواصل معنا</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><Phone className="h-5 w-5 text-primary" /></div>
              <div><p className="font-medium">الجوال</p><p className="text-sm text-muted-foreground">+966 50 123 4567</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><Mail className="h-5 w-5 text-primary" /></div>
              <div><p className="font-medium">البريد الإلكتروني</p><p className="text-sm text-muted-foreground">info@goldtime.com</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-primary" /></div>
              <div><p className="font-medium">العنوان</p><p className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><Clock className="h-5 w-5 text-primary" /></div>
              <div><p className="font-medium">ساعات العمل</p><p className="text-sm text-muted-foreground">الأحد - الخميس: 9 ص - 10 م</p></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>الاسم</Label><Input placeholder="اسمك" /></div>
                <div><Label>البريد</Label><Input type="email" placeholder="بريدك" /></div>
              </div>
              <div><Label>الموضوع</Label><Input placeholder="موضوع الرسالة" /></div>
              <div><Label>الرسالة</Label><textarea className="w-full p-3 border rounded-md" rows={4} placeholder="اكتب رسالتك هنا..." /></div>
              <Button className="w-full">إرسال</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

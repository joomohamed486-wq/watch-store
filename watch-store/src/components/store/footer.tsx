import Link from "next/link";
import { Watch, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      {/* Newsletter */}
      <div className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold">اشترك في نشرتنا الإخبارية</h3>
              <p className="text-sm opacity-90">احصل على أحدث العروض والتشكيلات الجديدة</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 md:w-64 px-4 py-2 rounded-md text-foreground"
              />
              <button className="px-6 py-2 bg-gold-500 text-gold-950 font-bold rounded-md hover:bg-gold-400 transition-colors">
                اشترك
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Watch className="h-6 w-6 text-gold-500" />
              <span>وقت الذهب</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              وجهتك الأولى للساعات الفاخرة في المملكة العربية السعودية. نقدم تشكيلة واسعة من الساعات السويسرية الأصلية بأسعار تنافسية.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@goldtime.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>الأحد - الخميس: 9 ص - 10 م</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">المتجر</Link></li>
              <li><Link href="/category/men-watches" className="text-muted-foreground hover:text-foreground transition-colors">ساعات رجالية</Link></li>
              <li><Link href="/category/women-watches" className="text-muted-foreground hover:text-foreground transition-colors">ساعات نسائية</Link></li>
              <li><Link href="/category/luxury-watches" className="text-muted-foreground hover:text-foreground transition-colors">ساعات فاخرة</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold mb-4">خدمة العملاء</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-foreground transition-colors">سياسة الشحن</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">سياسة الإرجاع</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">الشروط والأحكام</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="font-bold mb-4">لماذا تختارنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center">
                  <Watch className="h-5 w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">أصلية 100%</p>
                  <p className="text-xs text-muted-foreground">ضمان أصالة على جميع الساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">شحن سريع</p>
                  <p className="text-xs text-muted-foreground">توصيل خلال 1-5 أيام عمل</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-gold-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">دعم 24/7</p>
                  <p className="text-xs text-muted-foreground">فريق دعم متخصص</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>جميع الحقوق محفوظة © 2024 وقت الذهب</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-foreground transition-colors">الشروط</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">الخصوصية</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

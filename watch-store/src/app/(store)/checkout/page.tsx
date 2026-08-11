"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Loader2, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [customerNotes, setCustomerNotes] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    fetchCart();
    fetchAddresses();
    fetchShippingMethods();
  }, []);

  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCart(data);
    }
  };

  const fetchAddresses = async () => {
    const res = await fetch("/api/auth/me");
    if (res.ok) {
      const data = await res.json();
      // In real app, fetch addresses from API
      setAddresses([]);
    }
  };

  const fetchShippingMethods = async () => {
    // In real app, fetch from API
    setShippingMethods([
      { id: "1", nameAr: "شحن قياسي", cost: 25, estimatedDays: "3-5 أيام" },
      { id: "2", nameAr: "شحن سريع", cost: 60, estimatedDays: "1-2 يوم" },
    ]);
  };

  const validateCoupon = async () => {
    if (!couponCode) return;
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode, subtotal: cart?.items?.reduce((sum: number, item: any) => sum + Number(item.product.price) * item.quantity, 0) || 0 }),
    });
    const data = await res.json();
    if (data.success) setCouponDiscount(data.coupon.discount);
  };

  const placeOrder = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId: selectedAddress, shippingMethodId: selectedShipping, couponCode, customerNotes }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setOrderNumber(data.order.orderNumber);
      setOrderComplete(true);
    }
  };

  if (!cart) return <div className="container mx-auto px-4 py-16 text-center">جاري التحميل...</div>;

  const subtotal = cart.items?.reduce((sum: number, item: any) => sum + Number(item.product.price) * item.quantity, 0) || 0;
  const shippingCost = selectedShipping ? Number(shippingMethods.find((s) => s.id === selectedShipping)?.cost || 0) : 0;
  const tax = (subtotal - couponDiscount) * 0.15;
  const total = subtotal - couponDiscount + shippingCost + tax;

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">تم تأكيد طلبك!</h1>
        <p className="text-muted-foreground mb-4">رقم الطلب: {orderNumber}</p>
        <p className="mb-6">سنقوم بالتواصل معك قريباً لتأكيد التفاصيل</p>
        <Button asChild><Link href="/orders">عرض طلباتي</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">إتمام الشراء</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Address */}
          <Card>
            <CardHeader><CardTitle>1. عنوان التوصيل</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">يرجى إضافة عنوان في إعدادات حسابك</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>الاسم</Label><Input placeholder="الاسم الكامل" /></div>
                  <div><Label>الجوال</Label><Input placeholder="05xxxxxxxx" /></div>
                </div>
                <div><Label>المدينة</Label><Input placeholder="المدينة" /></div>
                <div><Label>العنوان</Label><Input placeholder="العنوان التفصيلي" /></div>
                <Button onClick={() => setStep(2)}>متابعة</Button>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Shipping */}
          <Card>
            <CardHeader><CardTitle>2. طريقة الشحن</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {shippingMethods.map((method) => (
                <div key={method.id} className={`p-4 border rounded-lg cursor-pointer ${selectedShipping === method.id ? "border-primary bg-primary/5" : ""}`} onClick={() => setSelectedShipping(method.id)}>
                  <div className="flex justify-between">
                    <span className="font-medium">{method.nameAr}</span>
                    <span>{formatPrice(method.cost)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{method.estimatedDays}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Step 3: Payment */}
          <Card>
            <CardHeader><CardTitle>3. طريقة الدفع</CardTitle></CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-primary/5 border-primary">
                <p className="font-medium">الدفع عند الاستلام</p>
                <p className="text-sm text-muted-foreground">ادفع نقداً عند استلام طلبك</p>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Notes */}
          <Card>
            <CardHeader><CardTitle>4. ملاحظات</CardTitle></CardHeader>
            <CardContent>
              <textarea className="w-full p-3 border rounded-md" rows={3} placeholder="أي ملاحظات خاصة بالطلب..." value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader><CardTitle>ملخص الطلب</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {cart.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product.nameAr} × {item.quantity}</span>
                  <span>{formatPrice(Number(item.product.price) * item.quantity)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex gap-2">
                <Input placeholder="كود الكوبون" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <Button variant="outline" onClick={validateCoupon}>تطبيق</Button>
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">المجموع</span><span>{formatPrice(subtotal)}</span></div>
              {couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>الخصم</span><span>-{formatPrice(couponDiscount)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">الشحن</span><span>{shippingCost === 0 ? "مجاني" : formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">الضريبة (15%)</span><span>{formatPrice(tax)}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>الإجمالي</span><span className="text-gold-600">{formatPrice(total)}</span></div>
              <Button className="w-full" size="lg" onClick={placeOrder} disabled={loading || !selectedShipping}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "تأكيد الطلب"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

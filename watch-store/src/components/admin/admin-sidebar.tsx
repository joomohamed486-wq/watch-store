"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Tags,
  Award,
  Layers,
  ClipboardList,
  Users,
  Star,
  Ticket,
  Truck,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  Shield,
  Watch,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/categories", label: "التصنيفات", icon: Tags },
  { href: "/admin/brands", label: "الماركات", icon: Award },
  { href: "/admin/collections", label: "المجموعات", icon: Layers },
  { href: "/admin/inventory", label: "المخزون", icon: ClipboardList },
  { href: "/admin/orders", label: "الطلبات", icon: Truck },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/reviews", label: "التقييمات", icon: Star },
  { href: "/admin/coupons", label: "الكوبونات", icon: Ticket },
  { href: "/admin/shipping", label: "الشحن", icon: Truck },
  { href: "/admin/payments", label: "المدفوعات", icon: CreditCard },
  { href: "/admin/reports", label: "التقارير", icon: BarChart3 },
  { href: "/admin/notifications", label: "الإشعارات", icon: Bell },
  { href: "/admin/users", label: "المستخدمين", icon: Shield },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-l bg-background h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-bold">
          <Watch className="h-6 w-6 text-gold-500" />
          <span>وقت الذهب</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">لوحة التحكم</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {isActive && <ChevronLeft className="h-4 w-4 mr-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>العودة للمتجر</span>
        </Link>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Menu, Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useState } from "react";
import type { SessionUser } from "@/lib/auth";
import { getInitials } from "@/lib/utils";

interface AdminHeaderProps {
  user: SessionUser;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px]">
          <div className="flex flex-col gap-4 mt-4">
            <p className="font-bold text-lg">القائمة</p>
            <nav className="flex flex-col gap-2">
              <Link href="/admin" className="p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>لوحة التحكم</Link>
              <Link href="/admin/products" className="p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>المنتجات</Link>
              <Link href="/admin/orders" className="p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>الطلبات</Link>
              <Link href="/admin/customers" className="p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>العملاء</Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>

        <div className="flex items-center gap-2 mr-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user.name || user.email}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductFilters({ categories, brands }: { categories: any[]; brands: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value); else params.delete(name);
    params.delete("page");
    return params.toString();
  };

  const currentCategory = searchParams.get("category");
  const currentBrand = searchParams.get("brand");
  const currentSort = searchParams.get("sort");

  return (
    <div className="space-y-4">
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">ترتيب حسب</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {[{ value: "", label: "الافتراضي" }, { value: "newest", label: "الأحدث" }, { value: "price-asc", label: "السعر: من الأقل" }, { value: "price-desc", label: "السعر: من الأعلى" }, { value: "best-selling", label: "الأكثر مبيعاً" }].map((sort) => (
            <Button key={sort.value} variant={currentSort === sort.value || (!currentSort && !sort.value) ? "default" : "ghost"} size="sm" className="w-full justify-start" onClick={() => router.push(`/shop?${createQueryString("sort", sort.value)}`)}>{sort.label}</Button>
          ))}
        </CardContent>
      </Card>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">التصنيفات</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Button variant={!currentCategory ? "default" : "ghost"} size="sm" className="w-full justify-start" onClick={() => router.push(`/shop?${createQueryString("category", "")}`)}>الكل</Button>
          {categories.map((cat) => <Button key={cat.id} variant={currentCategory === cat.slug ? "default" : "ghost"} size="sm" className="w-full justify-start" onClick={() => router.push(`/shop?${createQueryString("category", cat.slug)}`)}>{cat.nameAr}</Button>)}
        </CardContent>
      </Card>
      <Card><CardHeader className="pb-3"><CardTitle className="text-base">الماركات</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Button variant={!currentBrand ? "default" : "ghost"} size="sm" className="w-full justify-start" onClick={() => router.push(`/shop?${createQueryString("brand", "")}`)}>الكل</Button>
          {brands.map((brand) => <Button key={brand.id} variant={currentBrand === brand.slug ? "default" : "ghost"} size="sm" className="w-full justify-start" onClick={() => router.push(`/shop?${createQueryString("brand", brand.slug)}`)}>{brand.name}</Button>)}
        </CardContent>
      </Card>
    </div>
  );
}

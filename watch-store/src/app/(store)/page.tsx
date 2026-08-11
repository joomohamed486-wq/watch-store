import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { ArrowLeft, Star, Truck, Shield, Clock, ChevronLeft } from "lucide-react";

async function getHomepageData() {
  const [featuredProducts, newArrivals, bestSellers, brands, categories] = await Promise.all([
    prisma.product.findMany({
      where: { status: "ACTIVE", featured: true },
      include: { brand: true, images: { take: 1 }, category: true },
      take: 8,
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE", newArrival: true },
      include: { brand: true, images: { take: 1 }, category: true },
      take: 4,
    }),
    prisma.product.findMany({
      where: { status: "ACTIVE", bestSeller: true },
      include: { brand: true, images: { take: 1 }, category: true },
      take: 4,
    }),
    prisma.brand.findMany({
      where: { status: "ACTIVE" },
      take: 6,
    }),
    prisma.category.findMany({
      where: { status: "ACTIVE" },
      take: 4,
    }),
  ]);

  return { featuredProducts, newArrivals, bestSellers, brands, categories };
}

export default async function HomePage() {
  const { featuredProducts, newArrivals, bestSellers, brands, categories } = await getHomepageData();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-gold-500 text-gold-950 hover:bg-gold-400">مجموعة جديدة 2024</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              اكتشف عالم الساعات الفاخرة
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              تشكيلة حصرية من أرقى الساعات السويسرية الأصلية. اختر الساعة التي تعكس أناقتك وتميزك.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gold-500 text-gold-950 hover:bg-gold-400 font-bold" asChild>
                <Link href="/shop">تسوق الآن</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10" asChild>
                <Link href="/category/luxury-watches">الساعات الفاخرة</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gold-500/10 to-transparent hidden lg:block" />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, title: "أصلية 100%", desc: "ضمان أصالة على كل ساعة" },
            { icon: Truck, title: "شحن سريع", desc: "توصيل خلال 1-5 أيام" },
            { icon: Clock, title: "ضمان شامل", desc: "ضمان يصل إلى 5 سنوات" },
            { icon: Star, title: "أفضل الأسعار", desc: "أسعار تنافسية مضمونة" },
          ].map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 p-4 bg-card rounded-xl border">
              <div className="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                <feature.icon className="h-5 w-5 text-gold-600" />
              </div>
              <div>
                <p className="font-bold text-sm">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">تصفح حسب التصنيف</h2>
          <Link href="/shop" className="text-sm text-primary hover:underline flex items-center gap-1">
            عرض الكل <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-muted"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg">{cat.nameAr}</h3>
                <p className="text-sm opacity-80">{cat.nameEn}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">ساعات مميزة</h2>
          <Link href="/shop?featured=true" className="text-sm text-primary hover:underline flex items-center gap-1">
            عرض الكل <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">الأكثر مبيعاً</h2>
            <Link href="/shop?sort=best-selling" className="text-sm text-primary hover:underline flex items-center gap-1">
              عرض الكل <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">وصل حديثاً</h2>
          <Link href="/shop?sort=newest" className="text-sm text-primary hover:underline flex items-center gap-1">
            عرض الكل <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">الماركات العالمية</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="flex items-center justify-center p-6 bg-card rounded-xl border hover:border-primary transition-colors"
            >
              <span className="font-bold text-lg">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">ابحث عن ساعتك المثالية</h2>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
            لدينا أكثر من 500 ساعة فاخرة من أشهر الماركات العالمية. استخدم فلتر البحث المتقدم للعثور على ساعتك.
          </p>
          <Button size="lg" className="bg-gold-500 text-gold-950 hover:bg-gold-400 font-bold" asChild>
            <Link href="/shop">استكشف المجموعة</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const mainImage = product.images[0]?.url || "/placeholder-watch.jpg";
  const hasDiscount = product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? calculateDiscount(Number(product.compareAtPrice), Number(product.price))
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="bg-card rounded-xl border overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-square bg-muted">
          <Image
            src={mainImage}
            alt={product.nameAr}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              خصم {discountPercent}%
            </Badge>
          )}
          {product.newArrival && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">جديد</Badge>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.brand.name}</p>
          <h3 className="font-bold text-sm mb-2 line-clamp-1">{product.nameAr}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gold-600">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

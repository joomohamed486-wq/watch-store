import { PrismaClient, UserRole, ProductStatus, Status, MovementType, Gender, OrderStatus, PaymentStatus, PaymentMethod, CouponType, ReviewStatus, NotificationType, InventoryType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.$transaction([
    prisma.couponUsage.deleteMany(),
    prisma.coupon.deleteMany(),
    prisma.review.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.inventoryTransaction.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.order.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.wishlist.deleteMany(),
    prisma.address.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.productSpecification.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.brand.deleteMany(),
    prisma.collection.deleteMany(),
    prisma.shippingMethod.deleteMany(),
    prisma.storeSetting.deleteMany(),
    prisma.passwordReset.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // ==================== USERS ====================
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin123!", 12);
  const customerPassword = await bcrypt.hash("Customer123!", 12);

  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: adminPassword,
      name: "مدير النظام",
      phone: "+966501234567",
      role: UserRole.SUPER_ADMIN,
      status: "ACTIVE" as const,
    },
  });

  const staff = await prisma.user.create({
    data: {
      email: "staff@example.com",
      password: adminPassword,
      name: "موظف المخزن",
      role: UserRole.INVENTORY_MANAGER,
      status: "ACTIVE" as const,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: "ahmed@example.com",
      password: customerPassword,
      name: "أحمد محمد",
      phone: "+966501111111",
      role: UserRole.CUSTOMER,
      status: "ACTIVE" as const,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: "khalid@example.com",
      password: customerPassword,
      name: "خالد عبدالله",
      phone: "+966502222222",
      role: UserRole.CUSTOMER,
      status: "ACTIVE" as const,
    },
  });

  console.log("Users created");

  // ==================== ADDRESSES ====================
  await prisma.address.createMany({
    data: [
      {
        userId: customer1.id,
        name: "المنزل",
        country: "المملكة العربية السعودية",
        city: "الرياض",
        area: "الملز",
        address: "شارع الملك فهد، عمارة 123",
        building: "12",
        apartment: "45",
        postalCode: "11564",
        phone: "+966501111111",
        isDefault: true,
      },
      {
        userId: customer2.id,
        name: "العمل",
        country: "المملكة العربية السعودية",
        city: "جدة",
        area: "الروضة",
        address: "شارع التحلية، برج الفيصلية",
        building: "A",
        apartment: "101",
        postalCode: "23434",
        phone: "+966502222222",
        isDefault: true,
      },
    ],
  });

  console.log("Addresses created");

  // ==================== CATEGORIES ====================
  const categories = await prisma.$transaction([
    prisma.category.create({
      data: { nameAr: "ساعات رجالية", nameEn: "Men Watches", slug: "men-watches", description: "مجموعة متميزة من الساعات الرجالية الفاخرة", status: Status.ACTIVE, sortOrder: 1, seoTitle: "ساعات رجالية فاخرة", seoDesc: "اكتشف تشكيلة ساعات رجالية فاخرة من أشهر الماركات العالمية" },
    }),
    prisma.category.create({
      data: { nameAr: "ساعات نسائية", nameEn: "Women Watches", slug: "women-watches", description: "ساعات نسائية أنيقة وراقية", status: Status.ACTIVE, sortOrder: 2, seoTitle: "ساعات نسائية فاخرة", seoDesc: "تشكيلة راقية من الساعات النسائية من أفضل الماركات" },
    }),
    prisma.category.create({
      data: { nameAr: "ساعات فاخرة", nameEn: "Luxury Watches", slug: "luxury-watches", description: "ساعات فاخرة بمعايير عالمية", status: Status.ACTIVE, sortOrder: 3, seoTitle: "ساعات فاخرة", seoDesc: "أفخم الساعات العالمية بأسعار مميزة" },
    }),
    prisma.category.create({
      data: { nameAr: "ساعات أوتوماتيك", nameEn: "Automatic Watches", slug: "automatic-watches", description: "ساعات أوتوماتيكية بتقنية سويسرية", status: Status.ACTIVE, sortOrder: 4 },
    }),
    prisma.category.create({
      data: { nameAr: "ساعات ميكانيكية", nameEn: "Mechanical Watches", slug: "mechanical-watches", description: "ساعات ميكانيكية تقليدية", status: Status.ACTIVE, sortOrder: 5 },
    }),
    prisma.category.create({
      data: { nameAr: "ساعات كوارتز", nameEn: "Quartz Watches", slug: "quartz-watches", description: "ساعات كوارتز دقيقة وموثوقة", status: Status.ACTIVE, sortOrder: 6 },
    }),
    prisma.category.create({
      data: { nameAr: "ساعات ذكية", nameEn: "Smart Watches", slug: "smart-watches", description: "ساعات ذكية بتقنيات حديثة", status: Status.ACTIVE, sortOrder: 7 },
    }),
    prisma.category.create({
      data: { nameAr: "كرونوغراف", nameEn: "Chronograph", slug: "chronograph", description: "ساعات كرونوغراف رياضية", status: Status.ACTIVE, sortOrder: 8 },
    }),
  ]);

  console.log("Categories created");

  // ==================== BRANDS ====================
  const brands = await prisma.$transaction([
    prisma.brand.create({
      data: { name: "Rolex", slug: "rolex", description: "علامة تجارية سويسرية فاخرة متخصصة في الساعات", country: "سويسرا", website: "https://rolex.com", status: Status.ACTIVE, seoTitle: "ساعات رولكس", seoDesc: "تشكيلة ساعات رولكس الفاخرة" },
    }),
    prisma.brand.create({
      data: { name: "Omega", slug: "omega", description: "شركة سويسرية رائدة في صناعة الساعات الفاخرة", country: "سويسرا", website: "https://omegawatches.com", status: Status.ACTIVE, seoTitle: "ساعات أوميغا", seoDesc: "ساعات أوميغا السويسرية الفاخرة" },
    }),
    prisma.brand.create({
      data: { name: "TAG Heuer", slug: "tag-heuer", description: "ساعات رياضية فاخرة سويسرية", country: "سويسرا", website: "https://tagheuer.com", status: Status.ACTIVE },
    }),
    prisma.brand.create({
      data: { name: "Cartier", slug: "cartier", description: "دار فرنسية فاخرة للمجوهرات والساعات", country: "فرنسا", website: "https://cartier.com", status: Status.ACTIVE },
    }),
    prisma.brand.create({
      data: { name: "Patek Philippe", slug: "patek-philippe", description: "أرقى صانعي الساعات السويسرية", country: "سويسرا", website: "https://patek.com", status: Status.ACTIVE },
    }),
    prisma.brand.create({
      data: { name: "Audemars Piguet", slug: "audemars-piguet", description: "ساعات فاخرة سويسرية عريقة", country: "سويسرا", website: "https://audemarspiguet.com", status: Status.ACTIVE },
    }),
    prisma.brand.create({
      data: { name: "Tissot", slug: "tissot", description: "ساعات سويسرية بأسعار مناسبة", country: "سويسرا", website: "https://tissotwatches.com", status: Status.ACTIVE },
    }),
    prisma.brand.create({
      data: { name: "Apple", slug: "apple", description: "ساعات ذكية بتقنيات متطورة", country: "الولايات المتحدة", website: "https://apple.com/watch", status: Status.ACTIVE },
    }),
  ]);

  console.log("Brands created");

  // ==================== COLLECTIONS ====================
  const collections = await prisma.$transaction([
    prisma.collection.create({
      data: { nameAr: "مجموعة الصيف", nameEn: "Summer Collection", slug: "summer-collection", description: "أجمل الساعات لموسم الصيف", status: Status.ACTIVE, sortOrder: 1 },
    }),
    prisma.collection.create({
      data: { nameAr: "مجموعة الأعمال", nameEn: "Business Collection", slug: "business-collection", description: "ساعات أنيقة للمناسبات الرسمية", status: Status.ACTIVE, sortOrder: 2 },
    }),
    prisma.collection.create({
      data: { nameAr: "مجموعة الرياضة", nameEn: "Sports Collection", slug: "sports-collection", description: "ساعات رياضية متينة", status: Status.ACTIVE, sortOrder: 3 },
    }),
    prisma.collection.create({
      data: { nameAr: "المجموعة الكلاسيكية", nameEn: "Classic Collection", slug: "classic-collection", description: "ساعات كلاسيكية خالدة", status: Status.ACTIVE, sortOrder: 4 },
    }),
  ]);

  console.log("Collections created");

  // ==================== PRODUCTS ====================
  const productsData = [
    {
      sku: "RLX-SUB-001", nameAr: "رولكس سابمارينر", nameEn: "Rolex Submariner", slug: "rolex-submariner",
      shortDesc: "ساعة غوص أيقونية بتصميم كلاسيكي", fullDesc: "السابمارينر هي ساعة الغوص الأكثر شهرة في العالم. تتميز بمقاومة الماء حتى 300 متر وتصميم أنيق يناسب جميع المناسبات.",
      brandId: brands[0].id, categoryId: categories[0].id, collectionId: collections[2].id,
      price: 45000, compareAtPrice: 48000, salePrice: 45000, costPrice: 35000, stockQuantity: 8, lowStockThreshold: 3,
      weight: 150, length: 45, width: 45, height: 15, status: ProductStatus.ACTIVE, featured: true, bestSeller: true, newArrival: false,
      warrantyPeriod: 60, seoTitle: "رولكس سابمارينر - ساعة غوص فاخرة", seoDescription: "اشتري رولكس سابمارينر الأصلية بأفضل سعر",
      specs: { model: "Submariner Date", referenceNumber: "126610LN", movementType: MovementType.AUTOMATIC, caseMaterial: "أوستر ستيل", caseDiameter: 41, caseThickness: 12, dialColor: "أسود", strapMaterial: "أوستر ستيل", strapColor: "فضي", waterResistance: "300 متر", crystal: "ياقوت", powerReserve: "70 ساعة", functions: "تاريخ، غوص", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800", "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800"],
    },
    {
      sku: "RLX-DAY-002", nameAr: "رولكس داي ديت", nameEn: "Rolex Day-Date", slug: "rolex-day-date",
      shortDesc: "ساعة الرؤساء والقادة", fullDesc: "الداي ديت هي الساعة الوحيدة التي تعرض اليوم كاملاً بالإضافة إلى التاريخ. تُعرف باسم 'ساعة الرؤساء'.",
      brandId: brands[0].id, categoryId: categories[0].id, collectionId: collections[1].id,
      price: 125000, compareAtPrice: null, salePrice: null, costPrice: 95000, stockQuantity: 3, lowStockThreshold: 2,
      weight: 180, length: 40, width: 40, height: 12, status: ProductStatus.ACTIVE, featured: true, bestSeller: false, newArrival: false,
      warrantyPeriod: 60, seoTitle: "رولكس داي ديت - ساعة الرؤساء", seoDescription: "رولكس داي ديت الأصلية بذهب عيار 18",
      specs: { model: "Day-Date 40", referenceNumber: "228238", movementType: MovementType.AUTOMATIC, caseMaterial: "ذهب أصفر 18 قيراط", caseDiameter: 40, caseThickness: 12, dialColor: "ذهبي", strapMaterial: "ذهب أصفر", strapColor: "ذهبي", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "70 ساعة", functions: "يوم كامل، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1547996663-b8308d6e161c?w=800", "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800"],
    },
    {
      sku: "OMG-SEA-003", nameAr: "أوميغا سيماستر", nameEn: "Omega Seamaster", slug: "omega-seamaster",
      shortDesc: "ساعة غوص بأداء استثنائي", fullDesc: "السيماستر هي ساعة الغوص الرسمية لجيمس بوند. تجمع بين الأناقة والمتانة بشكل فريد.",
      brandId: brands[1].id, categoryId: categories[0].id, collectionId: collections[2].id,
      price: 28000, compareAtPrice: 32000, salePrice: 28000, costPrice: 21000, stockQuantity: 12, lowStockThreshold: 3,
      weight: 160, length: 42, width: 42, height: 13, status: ProductStatus.ACTIVE, featured: true, bestSeller: true, newArrival: false,
      warrantyPeriod: 60, seoTitle: "أوميغا سيماستر - ساعة جيمس بوند", seoDescription: "اشتري أوميغا سيماستر بأفضل سعر",
      specs: { model: "Seamaster Diver 300M", referenceNumber: "210.30.42.20.03.001", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 42, caseThickness: 13.6, dialColor: "أزرق", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "300 متر", crystal: "ياقوت مقاوم للخدش", powerReserve: "55 ساعة", functions: "غوص، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800"],
    },
    {
      sku: "TAG-CAR-004", nameAr: "تاغ هوير كاريرا", nameEn: "TAG Heuer Carrera", slug: "tag-heuer-carrera",
      shortDesc: "ساعة رياضية أنيقة للسباقات", fullDesc: "كاريرا هي ساعة السباقات الأيقونية من تاغ هوير. تتميز بتصميم رياضي أنيق وأداء دقيق.",
      brandId: brands[2].id, categoryId: categories[7].id, collectionId: collections[2].id,
      price: 18500, compareAtPrice: 21000, salePrice: 18500, costPrice: 13500, stockQuantity: 15, lowStockThreshold: 5,
      weight: 140, length: 44, width: 44, height: 14, status: ProductStatus.ACTIVE, featured: false, bestSeller: true, newArrival: false,
      warrantyPeriod: 24, seoTitle: "تاغ هوير كاريرا - ساعة السباقات", seoDescription: "تاغ هوير كاريرا بأفضل سعر",
      specs: { model: "Carrera Chronograph", referenceNumber: "CBN2A1B.BA0643", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 44, caseThickness: 14.3, dialColor: "أسود", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "80 ساعة", functions: "كرونوغراف، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"],
    },
    {
      sku: "CRT-BAL-005", nameAr: "كارتييه بالون بلو", nameEn: "Cartier Ballon Bleu", slug: "cartier-ballon-bleu",
      shortDesc: "ساعة نسائية أنيقة وراقية", fullDesc: "بالون بلو هي من أشهر تصاميم كارتييه. تتميز بك crown أزرق مميز وتصميم دائري أنيق.",
      brandId: brands[3].id, categoryId: categories[1].id, collectionId: collections[3].id,
      price: 32000, compareAtPrice: null, salePrice: null, costPrice: 24000, stockQuantity: 6, lowStockThreshold: 2,
      weight: 90, length: 33, width: 33, height: 10, status: ProductStatus.ACTIVE, featured: true, bestSeller: false, newArrival: true,
      warrantyPeriod: 24, seoTitle: "كارتييه بالون بلو - ساعة نسائية فاخرة", seoDescription: "ساعة كارتييه بالون بلو الأصلية",
      specs: { model: "Ballon Bleu de Cartier", referenceNumber: "W6920085", movementType: MovementType.QUARTZ, caseMaterial: "ستانلس ستيل", caseDiameter: 33, caseThickness: 9.96, dialColor: "فضي", strapMaterial: "جلد", strapColor: "أسود", waterResistance: "30 متر", crystal: "ياقوت", powerReserve: "N/A", functions: "تاريخ", gender: Gender.WOMEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", "https://images.unsplash.com/photo-1434056886845-dbd7e1a14eb8?w=800"],
    },
    {
      sku: "PPK-NAU-006", nameAr: "باتيك فيليب نوتيلوس", nameEn: "Patek Philippe Nautilus", slug: "patek-philippe-nautilus",
      shortDesc: "ساعة رياضية فاخرة بشكل مميز", fullDesc: "النوتيلوس هي من أشهر ساعات باتيك فيليب. تتميز بشكلها المستوحى من نوافذ السفن.",
      brandId: brands[4].id, categoryId: categories[2].id, collectionId: collections[2].id,
      price: 280000, compareAtPrice: 320000, salePrice: 280000, costPrice: 200000, stockQuantity: 2, lowStockThreshold: 1,
      weight: 170, length: 40.5, width: 40.5, height: 8.3, status: ProductStatus.ACTIVE, featured: true, bestSeller: false, newArrival: false,
      warrantyPeriod: 24, seoTitle: "باتيك فيليب نوتيلوس - ساعة نادرة", seoDescription: "باتيك فيليب نوتيلوس الأصلية",
      specs: { model: "Nautilus 5711/1A", referenceNumber: "5711/1A-010", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 40.5, caseThickness: 8.3, dialColor: "أزرق", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "120 متر", crystal: "ياقوت", powerReserve: "45 ساعة", functions: "تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800", "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800"],
    },
    {
      sku: "AP-ROY-007", nameAr: "أوديمار بيغيه رويال أوك", nameEn: "Audemars Piguet Royal Oak", slug: "audemars-piguet-royal-oak",
      shortDesc: "ساعة رياضية فاخرة بتصميم ثماني", fullDesc: "الرويال أوك غيّرت عالم الساعات الفاخرة عند إطلاقها عام 1972 بتصميمها المعدني الجريء.",
      brandId: brands[5].id, categoryId: categories[2].id, collectionId: collections[2].id,
      price: 195000, compareAtPrice: null, salePrice: null, costPrice: 145000, stockQuantity: 2, lowStockThreshold: 1,
      weight: 165, length: 41, width: 41, height: 10.4, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: true,
      warrantyPeriod: 24, seoTitle: "أوديمار بيغيه رويال أوك", seoDescription: "أوديمار بيغيه رويال أوك الأصلية",
      specs: { model: "Royal Oak Selfwinding", referenceNumber: "15500ST.OO.1220ST.01", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 41, caseThickness: 10.4, dialColor: "أزرق", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "50 متر", crystal: "ياقوت", powerReserve: "70 ساعة", functions: "تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800", "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800"],
    },
    {
      sku: "TIS-PRX-008", nameAr: "تيسوت PRX", nameEn: "Tissot PRX", slug: "tissot-prx",
      shortDesc: "ساعة رياضية أنيقة بسعر ممتاز", fullDesc: "PRX هي ساعة رياضية أنيقة تجمع بين التصميم الكلاسيكي والتقنيات الحديثة بسعر مناسب.",
      brandId: brands[6].id, categoryId: categories[0].id, collectionId: collections[3].id,
      price: 3200, compareAtPrice: 3800, salePrice: 3200, costPrice: 2200, stockQuantity: 25, lowStockThreshold: 5,
      weight: 130, length: 40, width: 40, height: 10.9, status: ProductStatus.ACTIVE, featured: false, bestSeller: true, newArrival: false,
      warrantyPeriod: 24, seoTitle: "تيسوت PRX - أفضل قيمة", seoDescription: "تيسوت PRX بأفضل سعر في السعودية",
      specs: { model: "PRX Powermatic 80", referenceNumber: "T137.407.11.041.00", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 40, caseThickness: 10.9, dialColor: "أزرق", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "80 ساعة", functions: "تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800"],
    },
    {
      sku: "APL-ULT-009", nameAr: "آبل واتش ألترا", nameEn: "Apple Watch Ultra", slug: "apple-watch-ultra",
      shortDesc: "ساعة ذكية للمغامرين والرياضيين", fullDesc: "آبل واتش ألترا هي أقوى ساعة ذكية من آبل. مصممة للرياضات المتطورة والمغامرات.",
      brandId: brands[7].id, categoryId: categories[6].id, collectionId: collections[2].id,
      price: 4200, compareAtPrice: null, salePrice: null, costPrice: 3000, stockQuantity: 30, lowStockThreshold: 5,
      weight: 61, length: 49, width: 44, height: 14.4, status: ProductStatus.ACTIVE, featured: false, bestSeller: true, newArrival: true,
      warrantyPeriod: 12, seoTitle: "آبل واتش ألترا - ساعة ذكية", seoDescription: "آبل واتش ألترا بأفضل سعر",
      specs: { model: "Apple Watch Ultra 2", referenceNumber: "MRG93", movementType: MovementType.SMART, caseMaterial: "تيتانيوم", caseDiameter: 49, caseThickness: 14.4, dialColor: "أسود", strapMaterial: "مطاط", strapColor: "برتقالي", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "36 ساعة", functions: "GPS، قلب، أكسجين، غوص", gender: Gender.UNISEX, countryOfManufacture: "الصين" },
      images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800", "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=800"],
    },
    {
      sku: "OMG-CON-010", nameAr: "أوميغا كونستليشن", nameEn: "Omega Constellation", slug: "omega-constellation",
      shortDesc: "ساعة نسائية أنيقة بتصميم نجمي", fullDesc: "كونستليشن هي ساعة نسائية أنيقة تتميز بتصميم النجوم الأربعة على الغطاء الخلفي.",
      brandId: brands[1].id, categoryId: categories[1].id, collectionId: collections[3].id,
      price: 22000, compareAtPrice: 25000, salePrice: 22000, costPrice: 16500, stockQuantity: 10, lowStockThreshold: 3,
      weight: 85, length: 29, width: 29, height: 9, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: true,
      warrantyPeriod: 60, seoTitle: "أوميغا كونستليشن نسائية", seoDescription: "أوميغا كونستليشن للسيدات",
      specs: { model: "Constellation 29mm", referenceNumber: "131.10.29.20.53.001", movementType: MovementType.QUARTZ, caseMaterial: "ستانلس ستيل", caseDiameter: 29, caseThickness: 9, dialColor: "أزرق داكن", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "50 متر", crystal: "ياقوت", powerReserve: "48 شهر", functions: "تاريخ", gender: Gender.WOMEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1434056886845-dbd7e1a14eb8?w=800", "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"],
    },
    {
      sku: "RLX-DJT-011", nameAr: "رولكس ديت جست", nameEn: "Rolex Datejust", slug: "rolex-datejust",
      shortDesc: "ساعة كلاسيكية متعددة الاستخدامات", fullDesc: "الديت جست هي الساعة الأكثر شهرة في العالم. تصميمها الكلاسيكي يناسب جميع المناسبات.",
      brandId: brands[0].id, categoryId: categories[0].id, collectionId: collections[3].id,
      price: 38000, compareAtPrice: null, salePrice: null, costPrice: 29000, stockQuantity: 7, lowStockThreshold: 3,
      weight: 140, length: 41, width: 41, height: 12, status: ProductStatus.ACTIVE, featured: false, bestSeller: true, newArrival: false,
      warrantyPeriod: 60, seoTitle: "رولكس ديت جست - الساعة الكلاسيكية", seoDescription: "رولكس ديت جست الأصلية",
      specs: { model: "Datejust 41", referenceNumber: "126334", movementType: MovementType.AUTOMATIC, caseMaterial: "أوستر ستيل", caseDiameter: 41, caseThickness: 12, dialColor: "أزرق", strapMaterial: "أوستر ستيل", strapColor: "فضي", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "70 ساعة", functions: "تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1547996663-b8308d6e161c?w=800", "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800"],
    },
    {
      sku: "TAG-AQU-012", nameAr: "تاغ هوير أكواريسر", nameEn: "TAG Heuer Aquaracer", slug: "tag-heuer-aquaracer",
      shortDesc: "ساعة غوص رياضية بمتانة عالية", fullDesc: "الأكواريسر هي ساعة الغوص من تاغ هوير. تتميز بمتانتها العالية وأدائها الممتاز تحت الماء.",
      brandId: brands[2].id, categoryId: categories[0].id, collectionId: collections[2].id,
      price: 14500, compareAtPrice: 16500, salePrice: 14500, costPrice: 10500, stockQuantity: 18, lowStockThreshold: 5,
      weight: 155, length: 43, width: 43, height: 12, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: true,
      warrantyPeriod: 24, seoTitle: "تاغ هوير أكواريسر - ساعة غوص", seoDescription: "تاغ هوير أكواريسر بأفضل سعر",
      specs: { model: "Aquaracer Professional 300", referenceNumber: "WBP201A.BA0632", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 43, caseThickness: 12, dialColor: "أخضر", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "300 متر", crystal: "ياقوت", powerReserve: "80 ساعة", functions: "غوص، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800", "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800"],
    },
    {
      sku: "TIS-LEL-013", nameAr: "تيسوت لو لوك", nameEn: "Tissot Le Locle", slug: "tissot-le-locle",
      shortDesc: "ساعة كلاسيكية سويسرية أصيلة", fullDesc: "لو لوك هي ساعة كلاسيكية تحمل اسم مسقط رأس تيسوت. تصميمها الأنيق يناسب المناسبات الرسمية.",
      brandId: brands[6].id, categoryId: categories[0].id, collectionId: collections[1].id,
      price: 2800, compareAtPrice: 3200, salePrice: 2800, costPrice: 1900, stockQuantity: 20, lowStockThreshold: 5,
      weight: 120, length: 39, width: 39, height: 10, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: false,
      warrantyPeriod: 24, seoTitle: "تيسوت لو لوك - ساعة كلاسيكية", seoDescription: "تيسوت لو لوك الأصلية",
      specs: { model: "Le Locle Powermatic 80", referenceNumber: "T006.407.11.033.00", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 39, caseThickness: 10, dialColor: "فضي", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "30 متر", crystal: "ياقوت", powerReserve: "80 ساعة", functions: "تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800"],
    },
    {
      sku: "APL-SER-014", nameAr: "آبل واتش سيريس 9", nameEn: "Apple Watch Series 9", slug: "apple-watch-series-9",
      shortDesc: "أذكى ساعة ذكية على الإطلاق", fullDesc: "سيريس 9 هي أحدث ساعة ذكية من آبل مع معالج S9 وإمكانية التحكم بالإيماءات.",
      brandId: brands[7].id, categoryId: categories[6].id, collectionId: collections[0].id,
      price: 1800, compareAtPrice: 2100, salePrice: 1800, costPrice: 1300, stockQuantity: 40, lowStockThreshold: 10,
      weight: 52, length: 45, width: 38, height: 10.7, status: ProductStatus.ACTIVE, featured: false, bestSeller: true, newArrival: true,
      warrantyPeriod: 12, seoTitle: "آبل واتش سيريس 9", seoDescription: "آبل واتش سيريس 9 بأفضل سعر",
      specs: { model: "Apple Watch Series 9", referenceNumber: "MRHQ3", movementType: MovementType.SMART, caseMaterial: "ألومنيوم", caseDiameter: 45, caseThickness: 10.7, dialColor: "أسود", strapMaterial: "مطاط", strapColor: "أسود", waterResistance: "50 متر", crystal: "ياقوت", powerReserve: "18 ساعة", functions: "GPS، قلب، أكسجين، حرارة", gender: Gender.UNISEX, countryOfManufacture: "الصين" },
      images: ["https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=800", "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800"],
    },
    {
      sku: "CRT-TAN-015", nameAr: "كارتييه تانك", nameEn: "Cartier Tank", slug: "cartier-tank",
      shortDesc: "ساعة مستطيلة أيقونية من كارتييه", fullDesc: "التانك هي من أشهر ساعات كارتييه. تصميمها المستطيل مستوحى من دبابات الحرب العالمية الأولى.",
      brandId: brands[3].id, categoryId: categories[1].id, collectionId: collections[3].id,
      price: 28000, compareAtPrice: null, salePrice: null, costPrice: 21000, stockQuantity: 5, lowStockThreshold: 2,
      weight: 75, length: 34.8, width: 27.4, height: 7, status: ProductStatus.ACTIVE, featured: true, bestSeller: false, newArrival: false,
      warrantyPeriod: 24, seoTitle: "كارتييه تانك - ساعة أيقونية", seoDescription: "كارتييه تانك الأصلية",
      specs: { model: "Tank Must", referenceNumber: "WSTA0051", movementType: MovementType.QUARTZ, caseMaterial: "ستانلس ستيل", caseDiameter: 34.8, caseThickness: 7, dialColor: "فضي", strapMaterial: "جلد", strapColor: "أسود", waterResistance: "30 متر", crystal: "ياقوت", powerReserve: "6 سنوات", functions: "N/A", gender: Gender.WOMEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1434056886845-dbd7e1a14eb8?w=800", "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"],
    },
    {
      sku: "RLX-GMT-016", nameAr: "رولكس GMT ماستر II", nameEn: "Rolex GMT-Master II", slug: "rolex-gmt-master-ii",
      shortDesc: "ساعة السفر بمنطقتين زمنيتين", fullDesc: "GMT ماستر II هي ساعة السفر المثالية. تعرض منطقتين زمنيتين بشكل واضح وأنيق.",
      brandId: brands[0].id, categoryId: categories[0].id, collectionId: collections[1].id,
      price: 52000, compareAtPrice: 58000, salePrice: 52000, costPrice: 40000, stockQuantity: 4, lowStockThreshold: 2,
      weight: 155, length: 40, width: 40, height: 12, status: ProductStatus.ACTIVE, featured: true, bestSeller: false, newArrival: true,
      warrantyPeriod: 60, seoTitle: "رولكس GMT ماستر II", seoDescription: "رولكس GMT ماستر II الأصلية",
      specs: { model: "GMT-Master II", referenceNumber: "126710BLNR", movementType: MovementType.AUTOMATIC, caseMaterial: "أوستر ستيل", caseDiameter: 40, caseThickness: 12, dialColor: "أسود", strapMaterial: "أوستر ستيل", strapColor: "فضي", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "70 ساعة", functions: "GMT، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800", "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800"],
    },
    {
      sku: "OMG-SPD-017", nameAr: "أوميغا سبيدماستر", nameEn: "Omega Speedmaster", slug: "omega-speedmaster",
      shortDesc: "ساعة القمر الأيقونية", fullDesc: "السبيدماستر هي الساعة الأولى التي وصلت إلى القمر. تُعرف باسم 'ساعة القمر'.",
      brandId: brands[1].id, categoryId: categories[7].id, collectionId: collections[2].id,
      price: 35000, compareAtPrice: null, salePrice: null, costPrice: 26000, stockQuantity: 6, lowStockThreshold: 2,
      weight: 145, length: 42, width: 42, height: 13.6, status: ProductStatus.ACTIVE, featured: true, bestSeller: false, newArrival: false,
      warrantyPeriod: 60, seoTitle: "أوميغا سبيدماستر - ساعة القمر", seoDescription: "أوميغا سبيدماستر الأصلية",
      specs: { model: "Speedmaster Moonwatch Professional", referenceNumber: "310.30.42.50.01.001", movementType: MovementType.MECHANICAL, caseMaterial: "ستانلس ستيل", caseDiameter: 42, caseThickness: 13.6, dialColor: "أسود", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "50 متر", crystal: "هيساليت", powerReserve: "50 ساعة", functions: "كرونوغراف، تاكيمتر", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800", "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800"],
    },
    {
      sku: "PPK-CAL-018", nameAr: "باتيك فيليب كالترافا", nameEn: "Patek Philippe Calatrava", slug: "patek-philippe-calatrava",
      shortDesc: "أرقى الساعات الكلاسيكية", fullDesc: "الكالترافا هي جوهر الأناقة الكلاسيكية. تصميمها البسيط يخفي تعقيداً هائلاً.",
      brandId: brands[4].id, categoryId: categories[2].id, collectionId: collections[3].id,
      price: 180000, compareAtPrice: 200000, salePrice: 180000, costPrice: 135000, stockQuantity: 2, lowStockThreshold: 1,
      weight: 130, length: 39, width: 39, height: 8.4, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: false,
      warrantyPeriod: 24, seoTitle: "باتيك فيليب كالترافا", seoDescription: "باتيك فيليب كالترافا الأصلية",
      specs: { model: "Calatrava 5196G", referenceNumber: "5196G-001", movementType: MovementType.MECHANICAL, caseMaterial: "ذهب أبيض 18 قيراط", caseDiameter: 39, caseThickness: 8.4, dialColor: "فضي", strapMaterial: "جلد", strapColor: "أسود", waterResistance: "30 متر", crystal: "ياقوت", powerReserve: "45 ساعة", functions: "N/A", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1547996663-b8308d6e161c?w=800", "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800"],
    },
    {
      sku: "AP-ROY-019", nameAr: "أوديمار بيغيه رويال أوك أوفشور", nameEn: "Audemars Piguet Royal Oak Offshore", slug: "audemars-piguet-royal-oak-offshore",
      shortDesc: "نسخة رياضية أكبر من الرويال أوك", fullDesc: "الرويال أوك أوفشور هي النسخة الرياضية الأكبر من الرويال أوك. أكثر جرأة وأكثر متانة.",
      brandId: brands[5].id, categoryId: categories[2].id, collectionId: collections[2].id,
      price: 220000, compareAtPrice: null, salePrice: null, costPrice: 165000, stockQuantity: 2, lowStockThreshold: 1,
      weight: 185, length: 44, width: 44, height: 14.4, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: true,
      warrantyPeriod: 24, seoTitle: "أوديمار بيغيه رويال أوك أوفشور", seoDescription: "رويال أوك أوفشور الأصلية",
      specs: { model: "Royal Oak Offshore Chronograph", referenceNumber: "26420SO.OO.A002CA.01", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 44, caseThickness: 14.4, dialColor: "أسود", strapMaterial: "مطاط", strapColor: "أسود", waterResistance: "100 متر", crystal: "ياقوت", powerReserve: "70 ساعة", functions: "كرونوغراف، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800"],
    },
    {
      sku: "TIS-SEAST-020", nameAr: "تيسوت سيلستار", nameEn: "Tissot Seastar", slug: "tissot-seastar",
      shortDesc: "ساعة غوص بسعر ممتاز", fullDesc: "السيلستار هي ساعة الغوص من تيسوت. تتميز بمقاومة الماء حتى 300 متر وبسعر منافس.",
      brandId: brands[6].id, categoryId: categories[0].id, collectionId: collections[2].id,
      price: 3500, compareAtPrice: 4200, salePrice: 3500, costPrice: 2400, stockQuantity: 22, lowStockThreshold: 5,
      weight: 160, length: 43, width: 43, height: 12.7, status: ProductStatus.ACTIVE, featured: false, bestSeller: false, newArrival: false,
      warrantyPeriod: 24, seoTitle: "تيسوت سيلستار - ساعة غوص", seoDescription: "تيسوت سيلستار بأفضل سعر",
      specs: { model: "Seastar 1000 Powermatic 80", referenceNumber: "T120.407.11.091.00", movementType: MovementType.AUTOMATIC, caseMaterial: "ستانلس ستيل", caseDiameter: 43, caseThickness: 12.7, dialColor: "أخضر", strapMaterial: "ستانلس ستيل", strapColor: "فضي", waterResistance: "300 متر", crystal: "ياقوت", powerReserve: "80 ساعة", functions: "غوص، تاريخ", gender: Gender.MEN, countryOfManufacture: "سويسرا" },
      images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800"],
    },
  ];

  for (const p of productsData) {
    const { specs, images, ...productData } = p;
    const product = await prisma.product.create({
      data: {
        ...productData,
        specifications: {
          create: specs,
        },
        images: {
          create: images.map((url: string, i: number) => ({
            url,
            alt: `${productData.nameAr} - صورة ${i + 1}`,
            isMain: i === 0,
            sortOrder: i,
          })),
        },
      },
    });

    await prisma.inventoryTransaction.create({
      data: {
        productId: product.id,
        userId: admin.id,
        previousQty: 0,
        change: productData.stockQuantity,
        newQty: productData.stockQuantity,
        reason: "Initial stock",
        type: InventoryType.STOCK_IN,
      },
    });
  }

  console.log("Products created");

  // ==================== SHIPPING METHODS ====================
  await prisma.shippingMethod.createMany({
    data: [
      { nameAr: "شحن قياسي", nameEn: "Standard Shipping", cost: 25, estimatedDays: "3-5 أيام", isFreeShipping: false, freeShippingThreshold: null, status: Status.ACTIVE, sortOrder: 1 },
      { nameAr: "شحن سريع", nameEn: "Express Shipping", cost: 60, estimatedDays: "1-2 يوم", isFreeShipping: false, freeShippingThreshold: null, status: Status.ACTIVE, sortOrder: 2 },
      { nameAr: "شحن مجاني", nameEn: "Free Shipping", cost: 0, estimatedDays: "5-7 أيام", isFreeShipping: true, freeShippingThreshold: 500, status: Status.ACTIVE, sortOrder: 3 },
    ],
  });

  console.log("Shipping methods created");

  // ==================== COUPONS ====================
  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", type: CouponType.PERCENTAGE, value: 10, minOrder: 200, maxDiscount: 100, usageLimit: 100, perCustomerLimit: 1, startDate: new Date("2024-01-01"), endDate: new Date("2025-12-31"), active: true },
      { code: "SAVE50", type: CouponType.FIXED_AMOUNT, value: 50, minOrder: 300, maxDiscount: null, usageLimit: 50, perCustomerLimit: 1, startDate: new Date("2024-01-01"), endDate: new Date("2025-12-31"), active: true },
      { code: "FREESHIP", type: CouponType.FREE_SHIPPING, value: 0, minOrder: 100, maxDiscount: null, usageLimit: 200, perCustomerLimit: 3, startDate: new Date("2024-01-01"), endDate: new Date("2025-12-31"), active: true },
      { code: "LUXURY15", type: CouponType.PERCENTAGE, value: 15, minOrder: 1000, maxDiscount: 500, usageLimit: 30, perCustomerLimit: 1, startDate: new Date("2024-01-01"), endDate: new Date("2025-12-31"), active: true },
    ],
  });

  console.log("Coupons created");

  // ==================== ORDERS ====================
  const shippingMethods = await prisma.shippingMethod.findMany();
  const allAddresses = await prisma.address.findMany();
  const allProducts = await prisma.product.findMany();

  const orderStatuses: OrderStatus[] = [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.DELIVERED];

  for (let i = 0; i < 8; i++) {
    const customer = i % 2 === 0 ? customer1 : customer2;
    const address = allAddresses[i % 2];
    const status = orderStatuses[i % orderStatuses.length];
    const shippingMethod = shippingMethods[i % shippingMethods.length];

    const orderProducts = allProducts.slice(i * 2, i * 2 + 2);
    let subtotal = 0;

    const orderItems = orderProducts.map((product) => {
      const qty = Math.floor(Math.random() * 2) + 1;
      const price = Number(product.price);
      subtotal += price * qty;
      return {
        productId: product.id,
        productName: product.nameAr,
        productSku: product.sku,
        productImage: null,
        quantity: qty,
        unitPrice: product.price,
        totalPrice: Number(product.price) * qty,
      };
    });

    const discount = i === 0 ? 50 : 0;
    const shippingCost = shippingMethod.cost;
    const tax = subtotal * 0.15;
    const total = subtotal - discount + Number(shippingCost) + tax;

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}-${i + 1}`,
        userId: customer.id,
        addressId: address.id,
        subtotal,
        discount,
        couponCode: i === 0 ? "SAVE50" : null,
        shippingCost,
        tax,
        total,
        status,
        paymentStatus: status === OrderStatus.DELIVERED ? PaymentStatus.PAID : PaymentStatus.PENDING,
        paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
        shippingMethodId: shippingMethod.id,
        customerNotes: i === 0 ? "يرجى التواصل قبل التوصيل" : null,
        confirmedAt: status !== OrderStatus.PENDING ? new Date(Date.now() - 86400000 * 5) : null,
        processingAt: status === OrderStatus.PROCESSING || status === OrderStatus.PACKED || status === OrderStatus.SHIPPED || status === OrderStatus.DELIVERED,
        packedAt: [OrderStatus.PACKED, OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(status) ? new Date(Date.now() - 86400000 * 3) : null,
        shippedAt: [OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(status) ? new Date(Date.now() - 86400000 * 2) : null,
        deliveredAt: status === OrderStatus.DELIVERED ? new Date(Date.now() - 86400000) : null,
        items: {
          create: orderItems,
        },
      },
    });

    if (status === OrderStatus.DELIVERED || status === OrderStatus.SHIPPED) {
      for (const item of orderItems) {
        const product = allProducts.find((p) => p.id === item.productId);
        if (product) {
          await prisma.product.update({
            where: { id: product.id },
            data: { stockQuantity: { decrement: item.quantity } },
          });
          await prisma.inventoryTransaction.create({
            data: {
              productId: product.id,
              userId: admin.id,
              previousQty: product.stockQuantity,
              change: -item.quantity,
              newQty: product.stockQuantity - item.quantity,
              reason: `Order ${order.orderNumber}`,
              type: InventoryType.SALE,
              orderId: order.id,
            },
          });
        }
      }
    }
  }

  console.log("Orders created");

  // ==================== REVIEWS ====================
  const reviews = [
    { userId: customer1.id, productId: allProducts[0].id, rating: 5, title: "أفضل ساعة غوص", comment: "ساعة رائعة بكل المقاييس. الجودة سويسرية أصيلة والتصميم كلاسيكي لا يُنسى. أنصح بها بشدة.", status: ReviewStatus.APPROVED },
    { userId: customer1.id, productId: allProducts[2].id, rating: 5, title: "ساعة جيمس بوند", comment: "السيماستر ساعة استثنائية. الأداء تحت الماء ممتاز والتصميم أنيق جداً.", status: ReviewStatus.APPROVED },
    { userId: customer2.id, productId: allProducts[0].id, rating: 4, title: "ساعة ممتازة", comment: "ساعة رائعة لكن السعر مرتفع قليلاً. بشكل عام جودة عالية.", status: ReviewStatus.APPROVED },
    { userId: customer2.id, productId: allProducts[7].id, rating: 5, title: "أفضل قيمة", comment: "تيسوت PRX هي أفضل ساعة بسعرها. حركة أوتوماتيكية بسعر ممتاز.", status: ReviewStatus.APPROVED },
    { userId: customer1.id, productId: allProducts[4].id, rating: 5, title: "هدية رائعة", comment: "اشتريتها كهدية لزوجتي وكانت مذهلة. التصميم أنيق والجودة عالية.", status: ReviewStatus.PENDING },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log("Reviews created");

  // ==================== NOTIFICATIONS ====================
  await prisma.notification.createMany({
    data: [
      { userId: admin.id, type: NotificationType.ORDER, title: "طلب جديد", message: "تم استلام طلب جديد", read: false },
      { userId: admin.id, type: NotificationType.INVENTORY, title: "مخزون منخفض", message: "مخزون رولكس سابمارينر منخفض (8 قطع)", read: false },
      { userId: customer1.id, type: NotificationType.ORDER, title: "تم تأكيد الطلب", message: "تم تأكيد طلبك بنجاح", read: true },
      { userId: customer1.id, type: NotificationType.SHIPPING, title: "تم الشحن", message: "تم شحن طلبك وهو في الطريق إليك", read: false },
    ],
  });

  console.log("Notifications created");

  // ==================== STORE SETTINGS ====================
  await prisma.storeSetting.createMany({
    data: [
      { key: "store", value: { name: "وقت الذهب", nameEn: "Gold Time", email: "info@goldtime.com", phone: "+966501234567", whatsapp: "+966501234567", address: "الرياض، المملكة العربية السعودية", currency: "SAR", tax: 15, shipping: "standard" } },
      { key: "social", value: { facebook: "https://facebook.com/goldtime", instagram: "https://instagram.com/goldtime", tiktok: "https://tiktok.com/@goldtime", youtube: "https://youtube.com/goldtime" } },
      { key: "seo", value: { siteTitle: "وقت الذهب - متجر ساعات فاخرة", metaDescription: "أفضل متجر ساعات فاخرة في المملكة العربية السعودية", keywords: "ساعات فاخرة، رولكس، أوميغا، ساعات سويسرية", ogImage: "/og-image.jpg" } },
    ],
  });

  console.log("Store settings created");

  console.log("Seed completed successfully!");
  console.log("Admin Login: admin@example.com / Admin123!");
  console.log("Customer Login: ahmed@example.com / Customer123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

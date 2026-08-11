# ⏱️ وقت الذهب - Luxury Watch E-Commerce

متجر إلكتروني متكامل متخصص في بيع الساعات الفاخرة، مبني بأحدث التقنيات وجاهز للإنتاج.

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Framework (App Router) |
| TypeScript | Language |
| Tailwind CSS | Styling |
| shadcn/ui | UI Components |
| Prisma | ORM |
| PostgreSQL | Database |
| JWT (jose) | Authentication |
| Zod | Validation |

## 📁 Project Structure

```
watch-store/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Demo data seed
├── src/
│   ├── app/
│   │   ├── (store)/       # Customer storefront pages
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── shop/
│   │   │   ├── product/[slug]/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── account/
│   │   │   ├── orders/
│   │   │   ├── wishlist/
│   │   │   ├── search/
│   │   │   ├── category/[slug]/
│   │   │   ├── brand/[slug]/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── (admin)/       # Admin dashboard pages
│   │   │   └── admin/
│   │   │       ├── page.tsx       # Dashboard
│   │   │       ├── products/
│   │   │       ├── orders/
│   │   │       ├── customers/
│   │   │       ├── inventory/
│   │   │       ├── reviews/
│   │   │       ├── coupons/
│   │   │       └── settings/
│   │   ├── api/           # API Routes
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── coupons/
│   │   │   └── search/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── store/         # Store components
│   │   └── admin/         # Admin components
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   ├── auth.ts        # Auth utilities
│   │   └── utils.ts       # Helpers
│   ├── actions/
│   │   └── cart.ts        # Cart server actions
│   └── hooks/
│       └── use-toast.ts
├── public/
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🛠️ Installation

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database (Neon, Supabase, Railway, or local)

### 2. Clone & Install

```bash
git clone <repo>
cd watch-store
npm install
```

### 3. Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/watchstore?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/watchstore?schema=public"

# Auth
AUTH_SECRET="your-super-secret-key-min-32-chars-long"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Optional: Email (Resend)
RESEND_API_KEY=""
FROM_EMAIL=""

# Optional: Stripe
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Demo Admin
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="Admin123!"
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed demo data
npx prisma db seed
```

### 5. Run Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 👤 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Super Admin | `admin@example.com` | `Admin123!` |
| Customer | `ahmed@example.com` | `Customer123!` |
| Customer | `khalid@example.com` | `Customer123!` |

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables from `.env`
4. Set build command:
   ```
   prisma generate && next build
   ```
5. Deploy!

## 🗄️ Database Providers

Compatible with any PostgreSQL provider:
- [Neon](https://neon.tech)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Vercel Postgres](https://vercel.com/storage/postgres)

## 📦 Features

### Customer Store
- ✅ Homepage with Hero, Featured, Best Sellers, New Arrivals
- ✅ Product catalog with filtering & sorting
- ✅ Product detail page with specs, reviews
- ✅ Shopping cart with quantity management
- ✅ Multi-step checkout (Cash on Delivery)
- ✅ Order tracking & history
- ✅ Wishlist
- ✅ Search
- ✅ RTL Arabic support
- ✅ Responsive design
- ✅ Dark mode

### Admin Dashboard
- ✅ Dashboard with stats & charts
- ✅ Product management
- ✅ Order management
- ✅ Customer management
- ✅ Inventory tracking
- ✅ Review moderation
- ✅ Coupon management
- ✅ Store settings

### Backend
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ PostgreSQL database with Prisma
- ✅ Server Actions for cart
- ✅ API Routes for checkout, search
- ✅ Inventory management
- ✅ Order lifecycle
- ✅ Zod validation

## 🔐 Security
- Password hashing with bcrypt
- JWT sessions with httpOnly cookies
- Server-side validation with Zod
- SQL injection protection via Prisma
- XSS protection via React
- CSRF protection

## 📄 License

MIT License - Free for personal and commercial use.

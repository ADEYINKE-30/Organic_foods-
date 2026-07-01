> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 01 — Project Overview

## Identity Table

| Field | Value |
|---|---|
| Project Name | FreshMart |
| Type | Full-Stack E-Commerce Platform |
| Frontend | React Router v7 (framework/SSR) + TypeScript + Tailwind CSS v4 |
| Backend | Express.js + TypeScript |
| Database | Supabase (PostgreSQL) + Drizzle ORM |
| Auth | JWT (access token 15min) + Refresh token (7 days) + bcrypt |
| Payments | Stripe (primary) + PayPal (secondary) |
| Email | Brevo REST API |
| Images | Cloudinary |
| Deployment | Render.com |
| Monorepo | pnpm workspaces |

## What This Project IS and IS NOT

### ✅ IS
- A single-vendor grocery e-commerce store
- A faithful conversion of the existing HTML design into React
- A secure, authenticated multi-user platform
- An admin-controlled system (prices, products, orders all admin-managed)

### ❌ IS NOT
- A marketplace (no multiple vendors)
- An AI content generator
- A mobile app
- A real-time chat system
- A crypto-payment processor

---

## Frontend Pages (from HTML template)

These are the pages that must be built, derived directly from the HTML template files:

| Page | Route | HTML Reference | Description |
|---|---|---|---|
| Home | `/` | `index.html` | Hero banner, category carousel, best sellers grid, banner ads, featured products carousel |
| Shop / Product Listing | `/products` | — | Filtered product grid with sidebar |
| Single Product | `/products/:slug` | — | Product image slider, details, reviews, related products |
| Category | `/category/:slug` | `category.html` | Products filtered by category |
| Cart | `/cart` | — | Cart items, coupon, totals |
| Checkout | `/checkout` | — | Address, payment, order summary |
| Account | `/account` | — | Profile, addresses, order history |
| Login | `/auth/login` | — | Email + password login form |
| Register | `/auth/register` | — | Registration form |
| Order History | `/orders` | — | User's past orders |
| Order Detail | `/orders/:id` | — | Single order status and items |
| Blog | `/blog` | — | Blog post listing |
| Blog Post | `/blog/:slug` | — | Single post |
| About | `/about` | — | About us page |
| Contact | `/contact` | — | Contact form |
| Thank You | `/thank-you` | — | Post-checkout confirmation |
| 404 | `*` | — | Error page |
| Admin Dashboard | `/admin/dashboard` | — | KPIs and charts |
| Admin Products | `/admin/products` | — | Product CRUD |
| Admin Orders | `/admin/orders` | — | Order management |
| Admin Users | `/admin/users` | — | User management |

---

## Home Page Sections (index.html breakdown)

The home page (`_index.tsx`) must render these sections in order:

1. **Hero Banner** — full-width background image (`banner-1.jpg`), headline "Organic Foods at your Doorsteps", two CTA buttons ("Start Shopping" / "Join Now"), stats row (14k+ Products, 50k+ Customers, 10+ Locations)
2. **Feature Cards** — 3 cards: "Fresh from farm" (bg-primary), "100% Organic" (bg-secondary), "Free delivery" (bg-danger)
3. **Category Carousel** — Swiper, 8 slides visible at 1500px+, circular thumbnail images, custom prev/next buttons (`.category-carousel-prev/next`), "View All" link
4. **Best Selling Products** — Bootstrap grid (`row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5`), 10 products, no carousel
5. **Banner Ads** — CSS grid layout (`.banner-blocks`): 1 large left block, 2 stacked right blocks — "Items on SALE" / "Combo offers" / "Discount Coupons"
6. **Featured Products Carousel** — Swiper, 5 slides visible at 1500px+, custom prev/next buttons (`.products-carousel-prev/next`), "View All" link

---

## API Endpoints (Full Contract)

### Auth — `/api/auth`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /register | Public | Create account. Body: `{email, password, firstName, lastName}` |
| POST | /login | Public | Login. Body: `{email, password}`. Returns `{accessToken, refreshToken, user}` |
| POST | /logout | JWT | Invalidate refresh token |
| POST | /refresh | Cookie | Exchange refresh token for new access token |
| POST | /forgot-password | Public | Send reset email via Brevo |
| POST | /reset-password | Public | Body: `{token, newPassword}` |
| POST | /verify-email | Public | Body: `{token}` |

### Products — `/api/products`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | Public | List products. Query: `?page&limit&category&search&minPrice&maxPrice&sort&organic&vegan` |
| GET | /:id | Public | Get single product with category + reviews |
| GET | /search | Public | Full-text search. Query: `?q=` |
| POST | / | Admin JWT | Create product. Body: multipart (image upload) |
| PATCH | /:id | Admin JWT | Update product fields |
| DELETE | /:id | Admin JWT | Soft delete product |

### Categories — `/api/categories`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | Public | All categories with product counts |
| GET | /:slug | Public | Category + its products |
| POST | / | Admin JWT | Create category |
| PATCH | /:id | Admin JWT | Update category |

### Cart — `/api/cart`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | JWT | Get authenticated user's cart |
| POST | /add | JWT | Add item. Body: `{productId, quantity}` |
| PATCH | /:itemId | JWT | Update quantity. Body: `{quantity}` |
| DELETE | /:itemId | JWT | Remove item |
| DELETE | /clear | JWT | Clear entire cart |
| POST | /coupon | JWT | Apply coupon. Body: `{code}` |
| DELETE | /coupon | JWT | Remove applied coupon |

### Orders — `/api/orders`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /create | JWT | Create order from cart. Body: `{shippingAddressId, paymentMethod}` |
| GET | / | JWT | User's own order history |
| GET | /:id | JWT | Single order detail (own only) |
| POST | /:id/cancel | JWT | Cancel order (pending/processing only) |
| GET | / | Admin JWT | All orders (admin route) |
| PATCH | /:id/status | Admin JWT | Update order status |

### Reviews — `/api/reviews`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /:productId | JWT | Submit review. Body: `{rating, comment}` |
| GET | /:productId | Public | Get product reviews (paginated) |
| PATCH | /:reviewId | JWT | Update own review |
| DELETE | /:reviewId | JWT | Delete own review |

### Wishlist — `/api/wishlist`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | JWT | Get user's wishlist |
| POST | /:productId | JWT | Add to wishlist |
| DELETE | /:productId | JWT | Remove from wishlist |

### Admin — `/api/admin`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /dashboard | Admin JWT | KPIs: total revenue, orders today, new users, low stock |
| GET | /users | Admin JWT | All users (paginated) |
| PATCH | /users/:id/role | Admin JWT | Change user role |
| POST | /coupons | Admin JWT | Create coupon |
| GET | /coupons | Admin JWT | List all coupons |
| PATCH | /coupons/:id | Admin JWT | Update coupon |

---

## API Response Envelope

All responses follow this format:

```typescript
// Success
{
  success: true,
  data: T,
  meta?: { page: number; limit: number; total: number; totalPages: number }
}

// Error
{
  success: false,
  error: {
    code: string,    // e.g. "PRODUCT_NOT_FOUND", "INVALID_COUPON"
    message: string, // human-readable
    details?: unknown // Zod errors etc.
  }
}
```

---

## Data Models (Full TypeScript Types)

```typescript
type UserRole = 'admin' | 'user';
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
type CouponType = 'percentage' | 'fixed';

interface User {
  id: string;             // UUID
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
}

interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  imageUrl: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;           // DECIMAL stored as string in DB, parsed to number in API
  comparePrice: number | null;
  categoryId: string;
  stockQuantity: number;
  sku: string;
  weight: number | null;
  nutritionalInfo: Record<string, unknown> | null;
  images: string[];        // Cloudinary URLs
  isOrganic: boolean;
  isGlutenFree: boolean;
  isVegan: boolean;
  ratingAvg: number;
  ratingCount: number;
  isDeleted: boolean;      // soft delete
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  addedAt: Date;
}

interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingAddressId: string;
  billingAddressId: string | null;
  paymentMethod: 'stripe' | 'paypal';
  paymentStatus: PaymentStatus;
  stripePaymentIntentId: string | null;
  paypalOrderId: string | null;
  trackingNumber: string | null;
  createdAt: Date;
  deliveredAt: Date | null;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;   // snapshot at time of order
  price: number;         // snapshot at time of order
  quantity: number;
  total: number;
}

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  images: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount: number | null;
  expiryDate: Date | null;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
}

interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  addedAt: Date;
}
```

---

## Business Rules

| Rule | ✅ Valid | ❌ Invalid |
|---|---|---|
| Order status | pending → processing → shipped → delivered | Skip states, go backwards |
| Order cancel | Only from `pending` or `processing` | Cancel `shipped` or `delivered` |
| Price changes | Admin panel only | Client request, automatic |
| Coupon discount | Max 50% of subtotal | Discount > 50% subtotal |
| Stock | Decrement on order create | Decrement on cart add |
| Product delete | Soft delete only (isDeleted=true) | Hard DELETE from DB |
| User data | Row-level access only | Access other users' orders/cart |
| Credit cards | Stripe token only | Store any PAN data |
| Admin access | role='admin' only | Any authenticated user |
| Email send | Brevo REST API only | nodemailer, sendgrid SDK |
| Images | Cloudinary upload only | Base64 in DB, local filesystem |

---

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-06-24 · Added Frontend Pages table and Home Page section breakdown from index.html analysis

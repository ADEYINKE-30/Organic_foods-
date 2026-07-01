> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 03 — Architecture

## Pattern: Layered Monorepo (Modular MVC)

```
freshmart/
├── apps/
│   ├── web/                    ← React Router v7 (SSR, framework mode)
│   │   ├── app/
│   │   │   ├── routes/         ← File-based routes (React Router v7 convention)
│   │   │   │   ├── _index.tsx              (Home — matches index.html)
│   │   │   │   ├── products._index.tsx     (Shop/Listing page)
│   │   │   │   ├── products.$slug.tsx      (Single Product detail)
│   │   │   │   ├── category.$slug.tsx      (Category page)
│   │   │   │   ├── cart.tsx                (Cart page)
│   │   │   │   ├── checkout.tsx            (Checkout page)
│   │   │   │   ├── account.tsx             (My Account)
│   │   │   │   ├── orders._index.tsx       (Order history)
│   │   │   │   ├── orders.$id.tsx          (Order detail)
│   │   │   │   ├── auth.login.tsx          (Login page)
│   │   │   │   ├── auth.register.tsx       (Register page)
│   │   │   │   ├── blog._index.tsx         (Blog listing)
│   │   │   │   ├── blog.$slug.tsx          (Single blog post)
│   │   │   │   ├── about.tsx               (About Us)
│   │   │   │   ├── contact.tsx             (Contact)
│   │   │   │   ├── thank-you.tsx           (Thank You / Order Success)
│   │   │   │   ├── $.tsx                   (404 catch-all)
│   │   │   │   └── admin/
│   │   │   │       ├── dashboard.tsx
│   │   │   │       ├── products._index.tsx
│   │   │   │       ├── products.new.tsx
│   │   │   │       ├── products.$id.edit.tsx
│   │   │   │       ├── orders._index.tsx
│   │   │   │       ├── orders.$id.tsx
│   │   │   │       └── users._index.tsx
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Header.tsx          ← matches HTML header exactly
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── CartOffcanvas.tsx   ← right-side cart drawer
│   │   │   │   │   └── NavOffcanvas.tsx    ← left-side category nav drawer
│   │   │   │   ├── product/
│   │   │   │   │   ├── ProductCard.tsx     ← reusable card with qty+cart+wishlist
│   │   │   │   │   ├── ProductGrid.tsx
│   │   │   │   │   └── ProductCarousel.tsx ← Swiper-based
│   │   │   │   ├── category/
│   │   │   │   │   └── CategoryCarousel.tsx ← Swiper-based
│   │   │   │   ├── ui/
│   │   │   │   │   ├── StarRating.tsx
│   │   │   │   │   ├── BannerAds.tsx
│   │   │   │   │   └── Preloader.tsx
│   │   │   │   └── icons/
│   │   │   │       └── SvgSprite.tsx       ← all inline SVG symbols
│   │   │   ├── lib/
│   │   │   │   ├── api.client.ts           ← axios instance with JWT interceptor
│   │   │   │   ├── auth.ts                 ← login/logout helpers
│   │   │   │   └── utils.ts
│   │   │   ├── store/
│   │   │   │   ├── cart.store.ts           ← Zustand cart state
│   │   │   │   └── auth.store.ts           ← Zustand auth tokens
│   │   │   └── root.tsx
│   │   ├── public/
│   │   │   ├── images/                     ← copied from template images/
│   │   │   └── template/                   ← ORIGINAL HTML files (READ ONLY)
│   │   └── react-router.config.ts
│   │
│   └── server/                 ← Express.js API
│       ├── src/
│       │   ├── index.ts        ← Server entry
│       │   ├── middleware/
│       │   │   ├── auth.ts     ← JWT verify middleware
│       │   │   ├── admin.ts    ← Role check middleware
│       │   │   ├── validate.ts ← Zod request validation
│       │   │   └── errorHandler.ts
│       │   ├── routes/
│       │   │   ├── auth.ts
│       │   │   ├── products.ts
│       │   │   ├── categories.ts
│       │   │   ├── cart.ts
│       │   │   ├── orders.ts
│       │   │   ├── reviews.ts
│       │   │   ├── wishlist.ts
│       │   │   └── admin.ts
│       │   ├── services/
│       │   │   ├── auth.service.ts
│       │   │   ├── product.service.ts
│       │   │   ├── cart.service.ts
│       │   │   ├── order.service.ts
│       │   │   ├── payment.service.ts
│       │   │   ├── email.service.ts   ← Brevo REST calls only
│       │   │   ├── image.service.ts   ← Cloudinary uploads
│       │   │   └── coupon.service.ts
│       │   └── config/
│       │       ├── db.ts       ← Drizzle client init
│       │       ├── cloudinary.ts
│       │       └── stripe.ts
│       └── tsconfig.json
│
├── packages/
│   ├── db/                     ← Drizzle schema + migrations (shared)
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   ├── users.ts
│   │   │   │   ├── products.ts
│   │   │   │   ├── categories.ts
│   │   │   │   ├── cart.ts
│   │   │   │   ├── orders.ts
│   │   │   │   ├── reviews.ts
│   │   │   │   ├── coupons.ts
│   │   │   │   ├── wishlist.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── migrations/
│   │   └── drizzle.config.ts
│   │
│   ├── types/                  ← Shared TypeScript interfaces
│   │   └── src/index.ts
│   │
│   └── validators/             ← Shared Zod schemas
│       └── src/
│           ├── auth.ts
│           ├── product.ts
│           ├── order.ts
│           └── index.ts
│
├── AGENTS.md
├── VISION.md
├── STATE.md
├── LOOP.md
├── package.json                ← pnpm workspace root
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## Request Lifecycle — Protected API Endpoint

Example: `POST /api/cart/add`

```
1. Request arrives at Express server
2. cors middleware — check origin against CORS_ORIGINS
3. helmet middleware — set security headers
4. express.json() — parse body
5. express-rate-limit — check rate limit per IP
6. authMiddleware (apps/server/src/middleware/auth.ts)
   a. Extract Bearer token from Authorization header
   b. jwt.verify(token, JWT_SECRET)
   c. Lookup user in DB via Drizzle — confirm exists and not deleted
   d. Attach req.user = { id, email, role }
   e. If invalid: return 401 { success: false, error: { code: 'UNAUTHORIZED' } }
7. validate(addToCartSchema) middleware
   a. Zod parse req.body against schema from packages/validators
   b. If invalid: return 422 with Zod error details
8. Route handler (apps/server/src/routes/cart.ts)
   a. Call cartService.addItem(req.user.id, body.productId, body.quantity)
9. Service layer (apps/server/src/services/cart.service.ts)
   a. Drizzle query — verify product exists and has stock
   b. Drizzle upsert — add or increment cart item
   c. Return updated cart
10. Route handler — return 200 { success: true, data: updatedCart }
11. errorHandler middleware catches any thrown errors
    a. Log with timestamp, userId, route
    b. Return appropriate HTTP status + error envelope
```

## Request Lifecycle — Order Creation (Complex Flow)

Example: `POST /api/orders/create`

```
1-7. Same as above (auth + validate)
8. orderService.createFromCart(userId, shippingAddressId, paymentMethod)
   a. Fetch cart items (Drizzle)
   b. Validate cart not empty
   c. Calculate subtotal, tax (8%), shipping cost
   d. Apply coupon if present (validate + calculate discount)
   e. Enforce: discount cannot exceed 50% of subtotal
   f. paymentService.createIntent(total, currency='usd') → Stripe PaymentIntent
   g. BEGIN TRANSACTION (Drizzle)
      - INSERT into orders
      - INSERT into order_items (with price snapshot)
      - UPDATE products SET stockQuantity -= quantity FOR EACH item
      - DELETE FROM cart_items WHERE userId
      - COMMIT
   h. emailService.sendOrderConfirmation(user, order) → Brevo REST API
   i. Return { order, clientSecret } (Stripe client secret for frontend)
```

---

## Critical Constants

```typescript
export const TAX_RATE = 0.08;                // 8% — never change without admin config
export const FREE_SHIPPING_THRESHOLD = 50;   // Orders above $50 get free shipping
export const STANDARD_SHIPPING_COST = 4.99;
export const MAX_COUPON_DISCOUNT_PERCENT = 0.5; // 50% max
export const JWT_ACCESS_EXPIRES = '15m';
export const JWT_REFRESH_EXPIRES = '7d';
export const MAX_CART_ITEM_QUANTITY = 99;
export const PRODUCTS_PER_PAGE = 12;
export const REVIEWS_PER_PAGE = 10;
export const BCRYPT_ROUNDS = 12;
```

---

## React Router v7 Framework Mode — Rules for this Project

React Router v7 in **framework mode** (formerly Remix) is SSR-first. These rules are non-negotiable:

### File-Based Routing Convention
```
routes/_index.tsx         → /
routes/products._index.tsx → /products
routes/products.$slug.tsx  → /products/:slug
routes/category.$slug.tsx  → /category/:slug
routes/auth.login.tsx      → /auth/login
routes/admin/dashboard.tsx → /admin/dashboard
```

### Every Route Has Three Possible Exports
```typescript
// 1. loader — runs SERVER-SIDE before render, fetches data
export async function loader({ request, params }: Route.LoaderArgs) {
  const data = await apiClient.get(`/products/${params.slug}`);
  return data;
}

// 2. action — runs SERVER-SIDE on form POST/PUT/DELETE
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  // handle mutation
}

// 3. default export — the React component
export default function ProductPage({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.product.name}</div>;
}
```

### Navigation — use <Link> and useNavigate, NOT <a href>
```typescript
// ✅ CORRECT
import { Link, useNavigate } from 'react-router';
<Link to="/products">Shop</Link>

// ❌ WRONG — hard page reload
<a href="/products">Shop</a>
```

### Form Submissions — use <Form> component, NOT fetch/axios in components
```typescript
// ✅ CORRECT — React Router Form (calls action automatically)
import { Form } from 'react-router';
<Form method="post" action="/cart/add">
  <input type="hidden" name="productId" value={product.id} />
  <button type="submit">Add to Cart</button>
</Form>

// ✅ ALSO CORRECT — useFetcher for non-navigating mutations (e.g. add to cart without page change)
import { useFetcher } from 'react-router';
const fetcher = useFetcher();
<fetcher.Form method="post" action="/api/cart/add">...</fetcher.Form>
```

### useLoaderData is deprecated in v7 — use loaderData prop
```typescript
// ❌ WRONG — v6 pattern
const data = useLoaderData();

// ✅ CORRECT — v7 pattern
export default function Page({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
}
```

### Type Safety with Route.* types
```typescript
// Each route auto-generates types from the loader return
import type { Route } from './+types/products._index';

export async function loader({}: Route.LoaderArgs) {
  return { products: [...] };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  // loaderData is fully typed here
}
```

### Meta — use meta export for SEO
```typescript
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.product.name} — FreshMart` },
    { name: 'description', content: data.product.description },
  ];
}
```

### Error Boundaries — use ErrorBoundary export
```typescript
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <div>Something went wrong: {error.message}</div>;
}
```

---

## HTML Design → React Component Mapping

This table maps every section from `index.html` to its React component counterpart. The React components MUST reproduce the Bootstrap 5 classes and structure exactly.

| HTML Section | React Component | Route |
|---|---|---|
| `<div class="preloader-wrapper">` | `components/ui/Preloader.tsx` | root.tsx |
| `<div id="offcanvasCart">` | `components/layout/CartOffcanvas.tsx` | root.tsx |
| `<div id="offcanvasNavbar">` | `components/layout/NavOffcanvas.tsx` | root.tsx |
| `<header>` | `components/layout/Header.tsx` | root.tsx |
| Hero section (banner-1.jpg) | `components/home/HeroBanner.tsx` | _index.tsx |
| Feature cards (fresh/organic/delivery) | `components/home/FeatureCards.tsx` | _index.tsx |
| `<section class="py-5 overflow-hidden">` (Category carousel) | `components/category/CategoryCarousel.tsx` | _index.tsx |
| `<section class="pb-5">` (Best selling grid) | `components/product/ProductGrid.tsx` | _index.tsx |
| `<section class="py-3">` (Banner ads) | `components/ui/BannerAds.tsx` | _index.tsx |
| `<section id="featured-products">` (Featured carousel) | `components/product/ProductCarousel.tsx` | _index.tsx |
| Individual product card | `components/product/ProductCard.tsx` | shared |
| SVG icon sprite | `components/icons/SvgSprite.tsx` | root.tsx |

---

## CSS / Styling Rules from the HTML Template

The template uses **Bootstrap 5.3** + custom CSS overrides in `style.css`. These CSS variables define the brand:

```css
--bs-primary: #6BB252        /* Green — primary buttons, badges, active states */
--bs-secondary: #364127      /* Dark green — secondary elements */
--bs-danger: #F95F09         /* Orange — sale/alert elements */
--bs-success: #a3be4c        /* Light green */
--bs-body-color: #747474     /* Body text */
--bs-body-line-height: 2     /* Wide line spacing */
--heading-font: "Inter", sans-serif
--bs-body-font-family: "Inter", sans-serif
```

**When building React components:**
- Keep Bootstrap 5 classes exactly as they appear in HTML
- Do NOT replace Bootstrap classes with Tailwind equivalents
- The custom `style.css` must be imported globally in `root.tsx`
- Google Fonts (Nunito + Open Sans → replaced by Inter per style.css) must be loaded in root

---

## Swiper.js Integration in React

The template uses Swiper.js v9. In React Router v7, integrate it as follows:

```typescript
// ✅ CORRECT — Install swiper package and use React components
// pnpm add swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Category carousel config (from script.js)
<Swiper
  modules={[Navigation]}
  slidesPerView={8}
  spaceBetween={30}
  navigation={{
    nextEl: '.category-carousel-next',
    prevEl: '.category-carousel-prev',
  }}
  breakpoints={{
    0: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    991: { slidesPerView: 5 },
    1500: { slidesPerView: 8 },
  }}
>
  {categories.map(cat => (
    <SwiperSlide key={cat.id}>...</SwiperSlide>
  ))}
</Swiper>

// Products carousel config (from script.js)
// slidesPerView: 5, breakpoints: 0→1, 768→3, 991→4, 1500→5
```

---

## Navigation Categories (from offcanvasNavbar)

The left-side navigation drawer contains exactly these categories with their icon IDs:

```typescript
export const NAV_CATEGORIES = [
  { slug: 'fruits-vegetables',  label: 'Fruits and vegetables',  icon: 'fruits' },
  { slug: 'dairy-eggs',         label: 'Dairy and Eggs',          icon: 'dairy' },
  { slug: 'meat-poultry',       label: 'Meat and Poultry',        icon: 'meat' },
  { slug: 'seafood',            label: 'Seafood',                 icon: 'seafood' },
  { slug: 'bakery-bread',       label: 'Bakery and Bread',        icon: 'bakery' },
  { slug: 'canned-goods',       label: 'Canned Goods',            icon: 'canned' },
  { slug: 'frozen-foods',       label: 'Frozen Foods',            icon: 'frozen' },
  { slug: 'pasta-rice',         label: 'Pasta and Rice',          icon: 'pasta' },
  { slug: 'breakfast-foods',    label: 'Breakfast Foods',         icon: 'breakfast' },
  { slug: 'snacks-chips',       label: 'Snacks and Chips',        icon: 'snacks' },
  { slug: 'beverages',          label: 'Beverages',               icon: 'beverages',
    children: [
      { slug: 'beverages/water', label: 'Water' },
      { slug: 'beverages/juice', label: 'Juice' },
      { slug: 'beverages/soda',  label: 'Soda' },
      { slug: 'beverages/tea',   label: 'Tea' },
    ]
  },
  { slug: 'spices-seasonings',  label: 'Spices and Seasonings',   icon: 'spices' },
  { slug: 'baby-food',          label: 'Baby Food and Formula',   icon: 'baby' },
  { slug: 'health-wellness',    label: 'Health and Wellness',     icon: 'health' },
  { slug: 'household-supplies', label: 'Household Supplies',      icon: 'household' },
  { slug: 'personal-care',      label: 'Personal Care',           icon: 'personal' },
  { slug: 'pet-food',           label: 'Pet Food and Supplies',   icon: 'pet' },
] as const;
```

---

## SVG Icon System

All icons are inline SVG symbols in the HTML. In React, render them as a hidden sprite in `root.tsx` and reference via `<use>`:

```typescript
// components/icons/SvgSprite.tsx — paste all <symbol> defs here, rendered once in root.tsx
// Usage anywhere in the app:
<svg width="24" height="24"><use href="#cart" /></svg>

// Note: use href (not xlink:href) in React — xlink:href is deprecated
// ❌ WRONG:  <use xlink:href="#cart" />
// ✅ CORRECT: <use href="#cart" />
```

Available icon IDs: `facebook`, `twitter`, `youtube`, `instagram`, `amazon`, `menu`, `link`, `arrow-right`, `category`, `calendar`, `heart`, `plus`, `minus`, `cart`, `check`, `trash`, `search`, `close`, `package`, `secure`, `quality`, `savings`, `offers`, `delivery`, `organic`, `fresh`, `star-full`, `star-half`, `user`, `wishlist`, `shopping-bag`, `fruits`, `dairy`, `meat`, `seafood`, `bakery`, `canned`, `frozen`, `pasta`, `breakfast`, `snacks`, `beverages`, `spices`, `baby`, `health`, `household`, `personal`, `pet`

---

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-06-24 · Updated with HTML template analysis — routes, components, CSS vars, Swiper config, categories, SVG icons

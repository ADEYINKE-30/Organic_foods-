> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 05 — Hallucination Traps

> These are the specific mistakes AI agents make on THIS project.
> Read this file at the start of every session. Every mistake encountered must be added here.

---

## Trap 1: Using nodemailer instead of Brevo REST API

```typescript
// ❌ WRONG
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({ service: 'gmail', ... });

// ✅ CORRECT
const response = await fetch('https://api.brevo.com/v3/smtp/email', {
  method: 'POST',
  headers: { 'api-key': process.env.BREVO_API_KEY!, 'Content-Type': 'application/json' },
  body: JSON.stringify({ sender: {...}, to: [...], subject: '...', htmlContent: '...' })
});
```
**Why wrong:** This project uses Brevo REST API exclusively. Nodemailer is not installed.

---

## Trap 2: Storing prices as floats instead of using DECIMAL in Drizzle

```typescript
// ❌ WRONG
price: real('price').notNull()  // floating point precision issues with money

// ✅ CORRECT
price: decimal('price', { precision: 10, scale: 2 }).notNull()
```
**Why wrong:** Float arithmetic causes $19.99 to become $19.990000000001 in totals.

---

## Trap 3: Not snapshotting price in order_items

```typescript
// ❌ WRONG — storing only productId reference
await db.insert(orderItems).values({ orderId, productId, quantity });

// ✅ CORRECT — snapshot price and name at time of order
await db.insert(orderItems).values({
  orderId,
  productId,
  productName: product.name,   // snapshot
  price: product.price,        // snapshot — never reference products.price later
  quantity,
  total: product.price * quantity
});
```
**Why wrong:** Product prices change. Historical orders must show the price paid.

---

## Trap 4: Decrementing stock on cart add instead of order create

```typescript
// ❌ WRONG — reducing stock when item added to cart
await db.update(products).set({ stockQuantity: sql`stock_quantity - ${qty}` })
  .where(eq(products.id, productId));  // TOO EARLY

// ✅ CORRECT — decrement stock only when order is confirmed/paid
// In orderService.createFromCart():
await db.update(products).set({ stockQuantity: sql`stock_quantity - ${qty}` })
  .where(eq(products.id, item.productId));  // INSIDE transaction, after payment
```
**Why wrong:** Cart abandonment would permanently reduce stock.

---

## Trap 5: Skipping the DB user lookup after JWT verify

```typescript
// ❌ WRONG — using JWT payload directly as req.user
const payload = jwt.verify(token, secret) as JWTPayload;
req.user = { id: payload.sub, role: payload.role }; // stale! user may be deleted or role changed

// ✅ CORRECT — always re-fetch user from DB
const payload = jwt.verify(token, secret) as JWTPayload;
const [user] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
if (!user) throw new AppError('USER_NOT_FOUND', 'User not found', 401);
req.user = user;
```
**Why wrong:** If an admin demotes a user mid-session, the old token would still grant admin access.

---

## Trap 6: Hard-deleting products instead of soft delete

```typescript
// ❌ WRONG
await db.delete(products).where(eq(products.id, id));

// ✅ CORRECT
await db.update(products)
  .set({ isDeleted: true, updatedAt: new Date() })
  .where(eq(products.id, id));
// Then always filter in queries:
.where(eq(products.isDeleted, false))
```
**Why wrong:** Order items reference products. Hard delete breaks order history.

---

## Trap 7: Not filtering isDeleted=false in product queries

```typescript
// ❌ WRONG — returns deleted products to users
const prods = await db.select().from(products);

// ✅ CORRECT
const prods = await db.select().from(products)
  .where(eq(products.isDeleted, false));
```
**Why wrong:** Soft-deleted products appear in listings and can be purchased.

---

## Trap 8: Using useEffect for data in React Router v7 framework mode

```typescript
// ❌ WRONG — useEffect pattern (React SPA pattern, not RR v7)
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.data));
  }, []);
}

// ✅ CORRECT — use loader (runs on server before render)
export async function loader({ request }: Route.LoaderArgs) {
  return await apiClient.get('/products');
}
export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  // loaderData already has products
}
```
**Why wrong:** React Router v7 in framework mode is SSR-first. Loaders run server-side.

---

## Trap 9: Allowing coupon discount to exceed 50% of subtotal

```typescript
// ❌ WRONG — applies any coupon value without limit check
const discount = coupon.type === 'percentage'
  ? subtotal * (coupon.value / 100)
  : coupon.value;

// ✅ CORRECT — enforce 50% cap
let discount = coupon.type === 'percentage'
  ? subtotal * (coupon.value / 100)
  : coupon.value;
const maxDiscount = subtotal * 0.5;
if (discount > maxDiscount) discount = maxDiscount;
```
**Why wrong:** Business rule violation — discount cannot exceed 50% of subtotal.

---

## Trap 10: Allowing order status to go backwards

```typescript
// ❌ WRONG — any status update accepted
await db.update(orders).set({ status: newStatus }).where(eq(orders.id, id));

// ✅ CORRECT — enforce state machine
const STATUS_ORDER = ['pending', 'processing', 'shipped', 'delivered'];
const currentIndex = STATUS_ORDER.indexOf(order.status);
const newIndex = STATUS_ORDER.indexOf(newStatus);
if (newIndex <= currentIndex) {
  throw new AppError('INVALID_STATUS_TRANSITION', 'Cannot move to previous status', 400);
}
```
**Why wrong:** Orders should only move forward in the pipeline.

---

## Trap 11: Applying Tailwind classes that don't exist in v4

**Context:** Tailwind v4 changed many utility names and dropped some.
- ❌ `bg-opacity-50` → ✅ `bg-black/50`
- ❌ `text-opacity-75` → ✅ `text-black/75`
- ❌ Import via `@tailwind base` in CSS → ✅ `@import "tailwindcss"` in CSS

Always check Tailwind v4 docs before using opacity or new utilities.

---

## Trap 12: Sending Stripe client_secret to wrong party

```typescript
// ❌ WRONG — logging or storing client secret server-side
console.log('Payment intent:', paymentIntent.client_secret);
await db.update(orders).set({ stripeSecret: paymentIntent.client_secret }); // NEVER

// ✅ CORRECT — send to frontend only, once, over HTTPS
res.json({ success: true, data: { clientSecret: paymentIntent.client_secret } });
// Frontend uses it to confirm payment, then discards it
```
**Why wrong:** client_secret allows payment confirmation. Never log or persist it.

---

## Trap 13: Importing from @freshmart/db inside apps/web

```typescript
// ❌ WRONG — frontend importing DB schema
// apps/web/app/routes/products._index.tsx
import { products } from '@freshmart/db'; // NEVER — DB on server only

// ✅ CORRECT — frontend calls API
export async function loader({ request }: Route.LoaderArgs) {
  return await apiClient.get('/products');
}
```
**Why wrong:** DB package has server-side Node.js dependencies that break in browser.

---

## Trap 14: Forgetting CORS on the Express server

```typescript
// ❌ WRONG — no CORS, frontend gets blocked
const app = express();
app.use(express.json());

// ✅ CORRECT
import cors from 'cors';
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:5173'],
  credentials: true,
}));
```
**Why wrong:** React Router v7 dev server (5173) → Express (3001) requires CORS.

---

## Trap 15: Changing the HTML design instead of matching it

**Rule:** The existing HTML template is the UI contract. When converting to React:
- ✅ Extract CSS classes from HTML and apply to JSX
- ✅ Match element hierarchy, spacing, colors exactly
- ❌ NEVER redesign, NEVER use different component libraries
- ❌ NEVER swap Bootstrap classes for Tailwind alternatives — this template uses Bootstrap 5

If the HTML uses Bootstrap 5 classes like `d-flex`, `btn-primary`, `rounded-1`, `text-center`, keep them exactly in JSX. Only apply Tailwind for NEW components not in the original HTML.

---

## Trap 16: Using xlink:href in React SVG instead of href

```tsx
// ❌ WRONG — xlink:href is deprecated and doesn't work in React
<use xlink:href="#cart" />

// ✅ CORRECT — use href attribute
<use href="#cart" />
```
**Why wrong:** React doesn't support the `xlink` namespace. All SVG `<use>` elements must use `href`.

---

## Trap 17: Using useLoaderData() instead of loaderData prop (React Router v7)

```typescript
// ❌ WRONG — v6 pattern, removed in v7 framework mode
import { useLoaderData } from 'react-router';
export default function Page() {
  const data = useLoaderData(); // WRONG in RR v7 framework mode
}

// ✅ CORRECT — v7 uses typed prop injection
import type { Route } from './+types/_index';
export default function Page({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData; // fully typed
}
```
**Why wrong:** React Router v7 framework mode injects loaderData as a typed prop, not via hook.

---

## Trap 18: Using <a href> instead of <Link to> for internal navigation

```tsx
// ❌ WRONG — causes full page reload, loses React state
<a href="/products">Shop</a>
<a href="/cart">Cart</a>

// ✅ CORRECT — client-side navigation
import { Link } from 'react-router';
<Link to="/products">Shop</Link>
<Link to="/cart">Cart</Link>
```
**Why wrong:** Hard `<a>` tags bypass React Router and cause full page reloads.

---

## Trap 19: Forgetting to import Bootstrap CSS in root.tsx

```typescript
// ❌ WRONG — Bootstrap classes won't render correctly
// root.tsx has no Bootstrap import

// ✅ CORRECT — root.tsx must import both Bootstrap and the custom style.css
// apps/web/app/root.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css'; // or the equivalent path
// Also load Bootstrap JS for offcanvas, dropdowns, collapse
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```
**Why wrong:** The entire template relies on Bootstrap 5.3. Without it, zero styling renders.

---

## Trap 20: Initialising Swiper with vanilla JS instead of swiper/react

```typescript
// ❌ WRONG — vanilla Swiper init won't work in SSR/React
// In a component:
new Swiper('.category-carousel', { slidesPerView: 8 }); // NEVER

// ✅ CORRECT — use Swiper React component
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

<Swiper modules={[Navigation]} slidesPerView={8} ...>
  {items.map(item => <SwiperSlide key={item.id}>...</SwiperSlide>)}
</Swiper>
```
**Why wrong:** Vanilla Swiper breaks SSR and React's render cycle. Use the official React bindings.

---

## Trap 21: Putting route actions/loaders in a separate file from the route component

```typescript
// ❌ WRONG — separating loader/action/component across files breaks RR v7 code splitting
// products.loader.ts + products.component.tsx + products.action.ts

// ✅ CORRECT — co-locate everything in the route file
// apps/web/app/routes/products._index.tsx
export async function loader({ request }: Route.LoaderArgs) { ... }
export async function action({ request }: Route.ActionArgs) { ... }
export default function ProductsPage({ loaderData }: Route.ComponentProps) { ... }
```
**Why wrong:** React Router v7 expects loader, action, and default export to all live in the same route file.

---

## Trap 22: Using react-router-dom instead of react-router in v7

```typescript
// ❌ WRONG — v7 framework mode uses 'react-router' not 'react-router-dom'
import { Link } from 'react-router-dom';
import { Form } from 'react-router-dom';

// ✅ CORRECT
import { Link, Form, useFetcher } from 'react-router';
```
**Why wrong:** React Router v7 merged the packages. `react-router-dom` is now just a re-export and may cause confusion.

---

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-06-24 · Added Traps 16–22: xlink:href, useLoaderData, <a> vs <Link>, Bootstrap import, Swiper vanilla, route co-location, react-router vs react-router-dom

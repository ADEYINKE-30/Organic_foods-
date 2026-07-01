> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 10 — React Router v7 Framework Mode Guide

> This file is the authoritative reference for how React Router v7 framework mode works in this project.
> Every frontend agent MUST read this before writing any route, component, or data-fetching code.

---

## What is React Router v7 Framework Mode?

React Router v7 in **framework mode** (formerly known as Remix) is a **full-stack SSR framework**. It is NOT a client-side router like React Router v6.

Key characteristics:
- Routes are **files** in `app/routes/` — the filename defines the URL
- Data is fetched **server-side** in `loader` functions before the component renders
- Mutations happen via **`action`** functions (triggered by `<Form>` or `useFetcher`)
- The app ships with **SSR by default** — pages render on the server first
- TypeScript types for each route are **auto-generated** in `app/routes/+types/`

---

## File-Based Routing

File names in `app/routes/` map directly to URLs using dot notation:

| File | URL |
|---|---|
| `_index.tsx` | `/` |
| `products._index.tsx` | `/products` |
| `products.$slug.tsx` | `/products/:slug` (dynamic) |
| `category.$slug.tsx` | `/category/:slug` |
| `auth.login.tsx` | `/auth/login` |
| `auth.register.tsx` | `/auth/register` |
| `cart.tsx` | `/cart` |
| `checkout.tsx` | `/checkout` |
| `orders._index.tsx` | `/orders` |
| `orders.$id.tsx` | `/orders/:id` |
| `admin/dashboard.tsx` | `/admin/dashboard` |
| `$.tsx` | Any unmatched path (404) |

**Rules:**
- `.` in filename = `/` in URL (nested path segment)
- `$` prefix = dynamic segment (like `:param`)
- `_index` = the index route of a parent path
- `_pathless` = layout route with no URL segment

---

## Route File Structure

Every route file can export these — all are optional except the default component:

```typescript
// apps/web/app/routes/products._index.tsx
import type { Route } from './+types/products._index';

// 1. META — page title and meta tags (SEO)
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: 'Shop — FreshMart' },
    { name: 'description', content: 'Browse fresh groceries' },
  ];
}

// 2. LOADER — runs server-side, fetches data before render
export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const category = url.searchParams.get('category') ?? '';
  
  const response = await fetch(`http://localhost:3001/api/products?page=${page}&category=${category}`);
  const data = await response.json();
  
  return { products: data.data, meta: data.meta };
  // Everything returned here becomes loaderData in the component
}

// 3. ACTION — runs server-side on form POST/PATCH/DELETE
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get('productId') as string;
  const quantity = Number(formData.get('quantity'));
  
  // call API or DB directly
  const response = await fetch('http://localhost:3001/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  
  return await response.json();
}

// 4. DEFAULT EXPORT — the React component (receives loaderData automatically)
export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products, meta } = loaderData;
  
  return (
    <div className="container-lg">
      {/* render products */}
    </div>
  );
}

// 5. ERROR BOUNDARY — shown when loader/action throws
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <div className="alert alert-danger">Failed to load products.</div>;
}
```

---

## The Loader — Server-Side Data Fetching

The loader is the ONLY correct way to fetch data for a route in React Router v7.

```typescript
// ✅ CORRECT
export async function loader({ request, params }: Route.LoaderArgs) {
  // params contains dynamic segments: params.slug, params.id
  const product = await getProductBySlug(params.slug);
  if (!product) throw new Response('Not Found', { status: 404 });
  return { product };
}

// ✅ CORRECT — throwing Response redirects
export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw redirect('/auth/login');
  return { user };
}

// ❌ WRONG — data fetching in component
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/products').then(...) }, []); // NEVER
}
```

### Accessing Loader Data in the Component

```typescript
// ✅ CORRECT — v7 injects loaderData as typed prop
export default function Page({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData; // TypeScript knows the shape
}

// ❌ WRONG — v6 hook, NOT available in v7 framework mode
const data = useLoaderData();
```

---

## The Action — Server-Side Mutations

Actions handle form submissions. They run on the server, not the browser.

```typescript
// apps/web/app/routes/auth.login.tsx
import { redirect } from 'react-router';
import type { Route } from './+types/auth.login';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    return { error: error.error.message }; // returned to component as actionData
  }
  
  const { data } = await response.json();
  // Set cookie/session, then redirect
  throw redirect('/');
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  return (
    <Form method="post">
      {actionData?.error && (
        <div className="alert alert-danger">{actionData.error}</div>
      )}
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </Form>
  );
}
```

---

## Forms — The Right Way

### `<Form>` — triggers action and navigates after
```typescript
import { Form } from 'react-router';

// Full form submission — navigates to the same route (or action route)
<Form method="post">
  <input name="email" />
  <button type="submit">Submit</button>
</Form>

// Submit to a different route's action
<Form method="post" action="/checkout">
  ...
</Form>
```

### `useFetcher` — triggers action WITHOUT navigation (for background mutations)
```typescript
import { useFetcher } from 'react-router';

// Perfect for "Add to Cart" — doesn't navigate away
function ProductCard({ product }) {
  const fetcher = useFetcher();
  const isAdding = fetcher.state === 'submitting';
  
  return (
    <fetcher.Form method="post" action="/cart/add">
      <input type="hidden" name="productId" value={product.id} />
      <input type="number" name="quantity" defaultValue={1} />
      <button type="submit" disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </fetcher.Form>
  );
}
```

---

## Navigation — `<Link>` and `useNavigate`

```typescript
import { Link, useNavigate } from 'react-router';

// Declarative link — like <a> but client-side
<Link to="/products">Shop Now</Link>
<Link to={`/products/${product.slug}`}>{product.name}</Link>
<Link to="/auth/login" className="btn btn-primary">Login</Link>

// Programmatic navigation — use sparingly
const navigate = useNavigate();
navigate('/orders');
navigate(-1); // go back
```

---

## Pending UI — How to Show Loading States

```typescript
import { useNavigation } from 'react-router';

function Header() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  
  return (
    <header>
      {isLoading && <div className="preloader-wrapper">...</div>}
    </header>
  );
}
```

---

## Route Layouts (Nested Routes)

Layouts wrap child routes without adding a URL segment:

```
apps/web/app/routes/
  _layout.tsx          ← wraps _index, products.*, etc.
  _index.tsx
  products._index.tsx
  admin/_layout.tsx    ← wraps all /admin/* routes
  admin/dashboard.tsx
```

```typescript
// _layout.tsx — the root layout
import { Outlet } from 'react-router';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* child routes render here */}
      </main>
      <Footer />
    </>
  );
}
```

---

## react-router.config.ts — Project Configuration

```typescript
// apps/web/react-router.config.ts
import type { Config } from '@react-router/dev/config';

export default {
  ssr: true, // server-side rendering enabled
} satisfies Config;
```

---

## root.tsx — The App Shell

The `root.tsx` is rendered for every request. It contains global imports and the app structure:

```typescript
// apps/web/app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';

// Global CSS imports — ORDER MATTERS
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'; // custom template CSS

// Bootstrap JS (for offcanvas, dropdowns, collapse)
// Note: import dynamically to avoid SSR issues
import { useEffect } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Bootstrap JS needs DOM — import client-side only
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* SVG icon sprite — hidden, referenced throughout app */}
        <SvgSprite />
        {/* Preloader */}
        <div className="preloader-wrapper"><div className="preloader"></div></div>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
```

---

## How to Access URL Parameters and Search Params

```typescript
// Dynamic segment: /products/:slug
export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug; // 'my-product-slug'
}

// Query string: /products?page=2&category=fruits
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const category = url.searchParams.get('category') ?? '';
}

// In component — read current URL
import { useSearchParams, useParams } from 'react-router';
const [searchParams, setSearchParams] = useSearchParams();
const params = useParams();
```

---

## Redirects from Loader/Action

```typescript
import { redirect } from 'react-router';

// In loader — redirect unauthenticated users
export async function loader({ request }: Route.LoaderArgs) {
  const user = await getSessionUser(request);
  if (!user) throw redirect('/auth/login');
  return { user };
}

// In action — redirect after successful form
export async function action({ request }: Route.ActionArgs) {
  await createOrder(request);
  throw redirect('/thank-you');
}
```

---

## Throwing HTTP Responses for Error Pages

```typescript
// Throw 404 from loader
if (!product) {
  throw new Response('Product not found', { status: 404 });
}

// Throw 403 from loader
if (user.role !== 'admin') {
  throw new Response('Forbidden', { status: 403 });
}
```

---

## Change Log
- 2026-06-24 · Kiro · Created from HTML template analysis — complete React Router v7 guide for this project

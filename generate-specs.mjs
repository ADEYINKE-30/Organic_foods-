/**
 * ============================================================
 * generate-specs.mjs
 * ============================================================
 * PROJECT:      FreshMart — Full-Stack E-Commerce Platform
 * DESCRIPTION:  Converts a static HTML/CSS grocery e-commerce
 *               template into a production-ready platform with
 *               auth, products, cart, checkout, orders, admin,
 *               reviews, wishlist, coupons, and notifications.
 * STATUS:       EXISTING (HTML frontend ready, converting now)
 * STACK:        React Router v7 (framework) · Express.js · TypeScript
 *               Drizzle ORM · Supabase (PostgreSQL) · Tailwind CSS v4
 *               Cloudinary · Brevo REST API · Paystack · PayPal · Render
 * ============================================================
 * WHAT THIS SCRIPT GENERATES:
 *
 *   .kb/                  ← Project knowledge base (Markdown)
 *     01-project-overview.md
 *     02-tech-stack.md
 *     03-architecture.md
 *     04-coding-standards.md
 *     05-hallucination-traps.md
 *     06-testing-strategy.md
 *     07-decisions-and-adr.md
 *     08-change-log.md
 *     09-known-issues.md
 *
 *   .rules/               ← AI agent guardrails
 *     01-core-protocol.mdc
 *     02-architecture-guards.mdc
 *     03-forbidden-patterns.mdc
 *     04-self-update-protocol.mdc
 *     05-security-and-secrets.mdc
 *
 *   .prompts/             ← Platform-specific agent templates
 *     claude-implementation.md
 *     cursor-bootstrap.md
 *     gemini-review.md
 *     codex-test-writer.md
 *
 *   AGENTS.md             ← Root agent instructions (Claude Code, Codex, Cursor)
 *   VISION.md             ← Project north star (loop anchor document)
 *   LOOP.md               ← Loop engineering configuration
 *   STATE.md              ← Agent state / progress tracker
 *
 *   .github/workflows/
 *     deploy.yml          ← CI/CD pipeline for Render
 *
 * HOW TO RUN:
 *   node generate-specs.mjs
 * ============================================================
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function write(filePath, content) {
  const fullPath = join(__dirname, filePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content.trimStart(), 'utf-8');
  console.log(`  ✅  ${filePath}`);
}

// ============================================================
// AGENTS.md — Root-level agent onboarding (auto-loaded by Claude Code, Codex, Cursor)
// ============================================================
write('AGENTS.md', `
# AGENTS.md — FreshMart E-Commerce Platform

> This file is auto-loaded by Claude Code, OpenAI Codex, Cursor, Aider, and Gemini CLI.
> Keep it SHORT. Put depth in .kb/ files and load them when needed.
> Critical rules early — agents lose the middle in long sessions.

## 🏪 Project Identity

**FreshMart** — A production e-commerce platform built on:
- **Frontend:** React Router v7 (framework mode) + TypeScript + Tailwind CSS v4
- **Backend:** Express.js + TypeScript
- **Database:** Supabase (PostgreSQL) + Drizzle ORM
- **Payments:** Paystack + PayPal
- **Email:** Brevo REST API (NOT Nodemailer, NOT SendGrid)
- **Images:** Cloudinary
- **Deployment:** Render.com

**HTML design is the source of truth for UI** — all React components MUST match the existing static design pixel-for-pixel.

## 📋 Mandatory First Steps (Every Session)

1. Read \`VISION.md\` — understand where the project is going
2. Read \`STATE.md\` — understand what is done, in progress, and next
3. Read \`.kb/01-project-overview.md\` — endpoints, data models, business rules
4. Read \`.kb/05-hallucination-traps.md\` — what NOT to do
5. Check \`.kb/09-known-issues.md\` — bugs and workarounds in effect
6. THEN and only then: begin the assigned task

## 🏗️ Architecture Summary

\`\`\`
apps/
  web/          ← React Router v7 (SSR, framework mode)
  server/       ← Express.js REST API
packages/
  db/           ← Drizzle schema + migrations (shared)
  types/        ← Shared TypeScript types
  validators/   ← Zod schemas (shared)
\`\`\`

## ⚡ Critical Rules (Never Violate)

- **NO** hardcoded product data — everything from DB
- **NO** storing credit card numbers — Paystack/PayPal tokens only
- **NO** auto-cancelling orders — requires user or admin action
- **NO** AI-generated product descriptions — must come from DB
- **NO** price changes without admin panel action
- **NO** accessing another user's data — enforce RLS in Supabase
- **ALWAYS** verify JWT before any protected route handler runs
- **ALWAYS** use Drizzle ORM — never raw SQL except in migrations
- **ALWAYS** use Brevo REST API for email — never import nodemailer
- **ALWAYS** use Zod for all input validation — never trust raw req.body
- **ALWAYS** match the existing HTML design — no creative UI changes
- **ALWAYS** update STATE.md and .kb/08-change-log.md after completing work

## 📁 Do Not Touch (Stable)

- \`.kb/07-decisions-and-adr.md\` — only append, never rewrite
- \`packages/db/migrations/\` — never delete migration files
- \`.github/workflows/deploy.yml\` — do not modify unless explicitly asked
- Existing HTML template files in \`apps/web/public/template/\`

## 🔄 After Every Task

1. Run \`pnpm typecheck && pnpm lint\` — fix all errors before committing
2. Update \`STATE.md\` — mark completed items, add next steps
3. Append to \`.kb/08-change-log.md\`
4. If a new trap was discovered, add it to \`.kb/05-hallucination-traps.md\`

## 📚 Deep Reading (Load When Needed)

| Topic | File |
|---|---|
| Full API contracts | \`.kb/01-project-overview.md\` |
| Tech stack details | \`.kb/02-tech-stack.md\` |
| Folder structure + request lifecycle | \`.kb/03-architecture.md\` |
| Code patterns with ✅/❌ examples | \`.kb/04-coding-standards.md\` |
| What NOT to do | \`.kb/05-hallucination-traps.md\` |
| Test cases per endpoint | \`.kb/06-testing-strategy.md\` |
| Why decisions were made | \`.kb/07-decisions-and-adr.md\` |
| Active bugs / workarounds | \`.kb/09-known-issues.md\` |
`);

// ============================================================
// VISION.md — Loop anchor document
// ============================================================
write('VISION.md', `
# VISION.md — FreshMart North Star

> This file is the anchor for every agent loop iteration.
> Every tick of the loop must be steering toward this vision.
> Do not modify without explicit human approval.

## 🎯 What We Are Building

A **production-ready grocery e-commerce platform** that:

1. **Preserves the existing HTML design** — users see the same beautiful UI, now powered by real data
2. **Authenticates users securely** — register, login, password reset, email verification
3. **Shows real products from a database** — categories, search, filters, pagination
4. **Persists shopping carts** — cart survives logout/login, works across devices
5. **Processes payments reliably** — Paystack for cards, PayPal as alternative
6. **Sends transactional emails** — order confirmations, shipping updates, password reset via Brevo
7. **Manages files via Cloudinary** — product images uploaded and served at scale
8. **Gives admins full control** — products, orders, users, coupons, analytics dashboard
9. **Deploys cleanly to Render** — both Express API and React Router SSR app

## ✅ Definition of Done (Project Complete When)

- [ ] All 8 HTML pages converted to React Router routes with real data
- [ ] User can register, verify email, log in, reset password
- [ ] Products loaded from Supabase, with category filter + search
- [ ] Cart persists across sessions (DB-backed for authenticated users)
- [ ] Checkout flow completes a Paystack payment end-to-end
- [ ] Order confirmation email sent via Brevo after purchase
- [ ] Admin can CRUD products, manage orders, view dashboard analytics
- [ ] All Drizzle migrations applied cleanly on Supabase
- [ ] TypeScript strict mode passes with zero errors
- [ ] Deployed to Render with environment variables set
- [ ] All critical API endpoints have integration tests passing

## 🚫 What We Are NOT Building

- No mobile app (web only)
- No AI-generated content
- No real-time chat
- No marketplace (single-vendor only)
- No cryptocurrency payments
- No inventory forecasting

## 📅 Phase Sequence

| Phase | Goal | Status |
|---|---|---|
| 1 | Architecture Setup (monorepo, DB schema, env config) | 🔲 Not Started |
| 2 | Backend Core (Auth API, Products API, Categories API) | 🔲 Not Started |
| 3 | Frontend Conversion (HTML → React Router components) | 🔲 Not Started |
| 4 | Shopping Experience (Cart, Checkout, Paystack, Orders) | 🔲 Not Started |
| 5 | Admin System (Dashboard, product/order/user management) | 🔲 Not Started |
| 6 | Advanced Features (Reviews, Wishlist, Coupons, Brevo emails) | 🔲 Not Started |
| 7 | Production Hardening (Tests, CI/CD, Render deploy) | 🔲 Not Started |
`);

// ============================================================
// STATE.md — Agent progress tracker (loop memory)
// ============================================================
write('STATE.md', `
# STATE.md — Agent Loop Progress Tracker

> Updated by agents after every loop iteration.
> This is the file-based memory of the loop — every new agent session reads this first.
> Format: ISO date · agent tool · what was done · what is next

## 📊 Current Status

**Active Phase:** Phase 1 — Architecture Setup
**Last Updated:** ${new Date().toISOString().split('T')[0]}
**Overall Progress:** 0 / 7 phases complete

## ✅ Completed Tasks
_(none yet — project just scaffolded)_

## 🔄 In Progress
- [ ] Monorepo structure setup (pnpm workspaces)
- [ ] Drizzle schema definition for all tables
- [ ] Supabase project connection + RLS policies
- [ ] Environment variable configuration

## 📋 Task Queue (Prioritized)

### Phase 1 — Architecture Setup
- [ ] Initialize pnpm monorepo with \`apps/web\`, \`apps/server\`, \`packages/db\`, \`packages/types\`, \`packages/validators\`
- [ ] Configure TypeScript strict mode across all packages
- [ ] Configure Tailwind CSS v4 in \`apps/web\`
- [ ] Write complete Drizzle schema (users, products, categories, cart_items, orders, order_items, reviews, coupons, wishlist, addresses)
- [ ] Set up Drizzle migrations and push to Supabase
- [ ] Configure all environment variables (.env.example)

### Phase 2 — Backend Core
- [ ] Express server setup with TypeScript, Zod middleware
- [ ] POST /api/auth/register
- [ ] POST /api/auth/login
- [ ] POST /api/auth/logout
- [ ] POST /api/auth/forgot-password
- [ ] POST /api/auth/reset-password
- [ ] POST /api/auth/verify-email
- [ ] GET  /api/products (pagination, filters)
- [ ] GET  /api/products/:id
- [ ] GET  /api/products/search
- [ ] GET  /api/categories
- [ ] Admin CRUD for products

### Phase 3 — Frontend Conversion
- [ ] React Router v7 routes setup
- [ ] Layout components (Header, Footer, Nav) matching HTML design
- [ ] Home page component
- [ ] Products listing page
- [ ] Product detail page
- [ ] Cart page
- [ ] Checkout page
- [ ] Account/profile page
- [ ] Login/Register pages
- [ ] Order history page

### Phase 4 — Shopping Experience
- [ ] Cart API + persistent cart logic
- [ ] Checkout flow UI
- [ ] Paystack integration (payment intent)
- [ ] PayPal integration
- [ ] Order creation after payment
- [ ] Order confirmation email via Brevo

### Phase 5 — Admin System
- [ ] Admin auth middleware
- [ ] Admin dashboard page
- [ ] Product management (CRUD UI)
- [ ] Order management UI
- [ ] User management UI
- [ ] Coupon management

### Phase 6 — Advanced Features
- [ ] Product reviews (submit, display, moderation)
- [ ] Wishlist (add, remove, list)
- [ ] Coupon redemption at checkout
- [ ] Shipping cost calculation
- [ ] Brevo email templates (welcome, order confirmation, shipping update)
- [ ] Cloudinary image upload for products

### Phase 7 — Production
- [ ] Vitest unit tests
- [ ] Supertest integration tests
- [ ] GitHub Actions CI pipeline
- [ ] Render deployment configuration
- [ ] Health check endpoint

## 🐛 Blockers
_(none currently)_

## 📝 Loop Notes
_(agents append observations here during loop iterations)_
`);

// ============================================================
// LOOP.md — Loop engineering configuration
// ============================================================
write('LOOP.md', `
# LOOP.md — Loop Engineering Configuration

> This file configures autonomous agent loop behavior for this project.
> Inspired by the Ralph Loop / Claude Code /goal patterns (2026).
> Read VISION.md and STATE.md before every iteration.

## 🔁 Loop Architecture

\`\`\`
Each Loop Iteration:
  1. Read VISION.md (anchor intent — what are we building?)
  2. Read STATE.md (where are we? what is next?)
  3. Pick ONE task from STATE.md task queue
  4. Implement it
  5. VALIDATE (typecheck + lint + relevant tests)
  6. Commit (if all validators green)
  7. Update STATE.md (mark done, add next)
  8. Append to .kb/08-change-log.md
  9. EXIT this iteration cleanly
\`\`\`

## ✅ Completion Criteria (Per Task)

A task is DONE only when ALL of the following are true:
- \`pnpm typecheck\` exits 0
- \`pnpm lint\` exits 0
- Relevant tests pass (\`pnpm test\`)
- STATE.md is updated
- Change log is updated
- Code matches the existing HTML design (for frontend tasks)

**Output the following when done:**
\`\`\`
<promise>TASK_COMPLETE: [task name]</promise>
\`\`\`

## 🛑 Stop Conditions

Stop and escalate to human when:
- Same error appears 3 iterations in a row (stuck loop)
- Drizzle migration would DROP or ALTER existing columns
- Payment integration behavior is ambiguous
- A design decision requires changing the HTML template
- TypeScript errors cannot be resolved without changing shared types

**Output when stopping:**
\`\`\`
<stop>ESCALATE: [reason] — waiting for human input</stop>
\`\`\`

## 💰 Budget Guard

- Max iterations per session: 30
- If iteration count hits 25, output a progress summary and ask for confirmation to continue
- Never delete files without outputting what will be deleted and waiting one iteration

## 🔀 Sub-Agent Roles (For Parallel Work)

| Role | Responsibility |
|---|---|
| Implementer | Writes code for the current task |
| Verifier | Runs typecheck, lint, tests and reports failures |
| Reviewer | Checks that UI matches HTML design |
| Logger | Updates STATE.md and change log |

> In single-agent mode: one agent plays all roles sequentially.

## 📁 Anchor Files (Load Every Iteration)

1. \`VISION.md\` — always
2. \`STATE.md\` — always
3. \`.kb/05-hallucination-traps.md\` — always
4. \`.kb/04-coding-standards.md\` — for implementation tasks
5. \`.kb/01-project-overview.md\` — for API/data tasks
`);

// ============================================================
// .kb/01-project-overview.md
// ============================================================
write('.kb/01-project-overview.md', `
> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

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
| Payments | Paystack (primary) + PayPal (secondary) |
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

## API Endpoints (Full Contract)

### Auth — \`/api/auth\`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /register | Public | Create account. Body: \`{email, password, firstName, lastName}\` |
| POST | /login | Public | Login. Body: \`{email, password}\`. Returns \`{accessToken, refreshToken, user}\` |
| POST | /logout | JWT | Invalidate refresh token |
| POST | /refresh | Cookie | Exchange refresh token for new access token |
| POST | /forgot-password | Public | Send reset email via Brevo |
| POST | /reset-password | Public | Body: \`{token, newPassword}\` |
| POST | /verify-email | Public | Body: \`{token}\` |

### Products — \`/api/products\`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | Public | List products. Query: \`?page&limit&category&search&minPrice&maxPrice&sort&organic&vegan\` |
| GET | /:id | Public | Get single product with category + reviews |
| GET | /search | Public | Full-text search. Query: \`?q=\` |
| POST | / | Admin JWT | Create product. Body: multipart (image upload) |
| PATCH | /:id | Admin JWT | Update product fields |
| DELETE | /:id | Admin JWT | Soft delete product |

### Categories — \`/api/categories\`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | Public | All categories with product counts |
| GET | /:slug | Public | Category + its products |
| POST | / | Admin JWT | Create category |
| PATCH | /:id | Admin JWT | Update category |

### Cart — \`/api/cart\`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | JWT | Get authenticated user's cart |
| POST | /add | JWT | Add item. Body: \`{productId, quantity}\` |
| PATCH | /:itemId | JWT | Update quantity. Body: \`{quantity}\` |
| DELETE | /:itemId | JWT | Remove item |
| DELETE | /clear | JWT | Clear entire cart |
| POST | /coupon | JWT | Apply coupon. Body: \`{code}\` |
| DELETE | /coupon | JWT | Remove applied coupon |

### Orders — \`/api/orders\`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /create | JWT | Create order from cart. Body: \`{shippingAddressId, paymentMethod}\` |
| GET | / | JWT | User's own order history |
| GET | /:id | JWT | Single order detail (own only) |
| POST | /:id/cancel | JWT | Cancel order (pending/processing only) |
| GET | / | Admin JWT | All orders (admin route) |
| PATCH | /:id/status | Admin JWT | Update order status |

### Reviews — \`/api/reviews\`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /:productId | JWT | Submit review. Body: \`{rating, comment}\` |
| GET | /:productId | Public | Get product reviews (paginated) |
| PATCH | /:reviewId | JWT | Update own review |
| DELETE | /:reviewId | JWT | Delete own review |

### Wishlist — \`/api/wishlist\`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | / | JWT | Get user's wishlist |
| POST | /:productId | JWT | Add to wishlist |
| DELETE | /:productId | JWT | Remove from wishlist |

### Admin — \`/api/admin\`

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

\`\`\`typescript
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
\`\`\`

---

## Data Models (Full TypeScript Types)

\`\`\`typescript
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
  paymentMethod: 'Paystack' | 'paypal';
  paymentStatus: PaymentStatus;
  PaystackPaymentIntentId: string | null;
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
\`\`\`

---

## Business Rules

| Rule | ✅ Valid | ❌ Invalid |
|---|---|---|
| Order status | pending → processing → shipped → delivered | Skip states, go backwards |
| Order cancel | Only from \`pending\` or \`processing\` | Cancel \`shipped\` or \`delivered\` |
| Price changes | Admin panel only | Client request, automatic |
| Coupon discount | Max 50% of subtotal | Discount > 50% subtotal |
| Stock | Decrement on order create | Decrement on cart add |
| Product delete | Soft delete only (isDeleted=true) | Hard DELETE from DB |
| User data | Row-level access only | Access other users' orders/cart |
| Credit cards | Paystack token only | Store any PAN data |
| Admin access | role='admin' only | Any authenticated user |
| Email send | Brevo REST API only | nodemailer, sendgrid SDK |
| Images | Cloudinary upload only | Base64 in DB, local filesystem |

---

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/02-tech-stack.md
// ============================================================
write('.kb/02-tech-stack.md', `
> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 02 — Tech Stack

## Runtime & Language

| Concern | Choice |
|---|---|
| Language | TypeScript 5.x (strict mode everywhere) |
| Runtime | Node.js 20+ (LTS) |
| Package Manager | pnpm (workspaces monorepo) |

## Frontend Packages

| Package | Version | Purpose |
|---|---|---|
| react-router | v7 (framework mode) | Routing + SSR framework |
| react | 19 | UI library |
| typescript | 5.x | Type safety |
| tailwindcss | v4 | Utility-first CSS |
| @tanstack/react-query | latest | Server state management |
| zustand | latest | Client state (cart, auth tokens) |
| zod | latest | Form validation (shared with server) |
| axios | latest | HTTP client (with interceptors for JWT) |

## Backend Packages

| Package | Version | Purpose |
|---|---|---|
| express | 5.x | HTTP server framework |
| typescript | 5.x | Type safety |
| drizzle-orm | latest | Type-safe ORM |
| drizzle-kit | latest | Schema migrations |
| @supabase/supabase-js | latest | Supabase client (auth helpers, storage) |
| bcrypt | latest | Password hashing |
| jsonwebtoken | latest | JWT sign/verify |
| zod | latest | Request body validation |
| Paystack | latest | Paystack payments SDK |
| @paypal/paypal-server-sdk | latest | PayPal payments |
| cloudinary | latest | Image upload SDK |
| multer | latest | Multipart form handling (before Cloudinary upload) |
| helmet | latest | HTTP security headers |
| cors | latest | CORS configuration |
| express-rate-limit | latest | Rate limiting |
| morgan | latest | HTTP request logging |
| dotenv | latest | Environment variable loading |

## Infrastructure

| Service | Purpose |
|---|---|
| Supabase | PostgreSQL database + Row Level Security |
| Render.com | Hosting (Express API + React Router SSR) |
| Cloudinary | Product image storage + CDN |
| Brevo | Transactional email (REST API, no SDK) |
| Paystack | Card payment processing |
| PayPal | Alternative payment method |

## Environment Variables (Required)

\`\`\`env
# Database
DATABASE_URL=postgresql://...          # Supabase connection string (pooler)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # Server-only, never expose to client

# Auth
JWT_SECRET=...                         # Min 64 chars, random
JWT_REFRESH_SECRET=...                 # Different from JWT_SECRET
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Payments
Paystack_SECRET_KEY=sk_live_...          # sk_test_ in development
Paystack_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_ENV=production                  # sandbox in development

# Email
BREVO_API_KEY=xkeysib-...              # From Brevo dashboard
BREVO_SENDER_EMAIL=noreply@freshmart.com
BREVO_SENDER_NAME=FreshMart

# Images
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# App
PORT=3001                              # Express server port
NODE_ENV=production
FRONTEND_URL=https://freshmart.onrender.com
CORS_ORIGINS=https://freshmart.onrender.com

# Feature flags
ENABLE_PAYPAL=true
\`\`\`

## NEVER ADD These Packages

| Package | Reason |
|---|---|
| mongoose | Using Drizzle ORM + PostgreSQL, not MongoDB |
| prisma | Using Drizzle ORM |
| @sendgrid/mail | Using Brevo REST API directly |
| nodemailer | Using Brevo REST API directly |
| bcryptjs | Use \`bcrypt\` (native bindings, faster) |
| class-validator | Using Zod |
| sequelize | Using Drizzle ORM |
| typeorm | Using Drizzle ORM |
| next | Using React Router v7 framework mode |
| passport | Using custom JWT middleware |
| express-session | Using stateless JWT |
| connect-mongo | No sessions |
| multer-storage-cloudinary | Use cloudinary SDK directly after multer temp |
| crypto-js | Use Node.js built-in \`crypto\` module |

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/03-architecture.md
// ============================================================
write('.kb/03-architecture.md', `
> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 03 — Architecture

## Pattern: Layered Monorepo (Modular MVC)

\`\`\`
freshmart/
├── apps/
│   ├── web/                    ← React Router v7 (SSR)
│   │   ├── app/
│   │   │   ├── routes/         ← File-based routes
│   │   │   │   ├── _index.tsx          (Home)
│   │   │   │   ├── products._index.tsx (Listing)
│   │   │   │   ├── products.$slug.tsx  (Detail)
│   │   │   │   ├── cart.tsx
│   │   │   │   ├── checkout.tsx
│   │   │   │   ├── account.tsx
│   │   │   │   ├── orders._index.tsx
│   │   │   │   ├── orders.$id.tsx
│   │   │   │   ├── auth.login.tsx
│   │   │   │   ├── auth.register.tsx
│   │   │   │   └── admin/
│   │   │   │       ├── dashboard.tsx
│   │   │   │       ├── products.tsx
│   │   │   │       └── orders.tsx
│   │   │   ├── components/     ← Shared UI (Header, Footer, ProductCard...)
│   │   │   ├── lib/            ← API client, auth hooks, utils
│   │   │   ├── store/          ← Zustand stores (cart, auth)
│   │   │   └── root.tsx
│   │   ├── public/
│   │   │   └── template/       ← ORIGINAL HTML files (READ ONLY — reference only)
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
│       │       └── Paystack.ts
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
\`\`\`

---

## Request Lifecycle — Protected API Endpoint

Example: \`POST /api/cart/add\`

\`\`\`
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
\`\`\`

## Request Lifecycle — Order Creation (Complex Flow)

Example: \`POST /api/orders/create\`

\`\`\`
1-7. Same as above (auth + validate)
8. orderService.createFromCart(userId, shippingAddressId, paymentMethod)
   a. Fetch cart items (Drizzle)
   b. Validate cart not empty
   c. Calculate subtotal, tax (8%), shipping cost
   d. Apply coupon if present (validate + calculate discount)
   e. Enforce: discount cannot exceed 50% of subtotal
   f. paymentService.createIntent(total, currency='usd') → Paystack PaymentIntent
   g. BEGIN TRANSACTION (Drizzle)
      - INSERT into orders
      - INSERT into order_items (with price snapshot)
      - UPDATE products SET stockQuantity -= quantity FOR EACH item
      - DELETE FROM cart_items WHERE userId
      - COMMIT
   h. emailService.sendOrderConfirmation(user, order) → Brevo REST API
   i. Return { order, clientSecret } (Paystack client secret for frontend)
\`\`\`

---

## Critical Constants

\`\`\`typescript
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
\`\`\`

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/04-coding-standards.md
// ============================================================
write('.kb/04-coding-standards.md', `
> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 04 — Coding Standards

## Layer Rules

| Layer | CAN | CANNOT |
|---|---|---|
| Route handler | Call services, return responses, use req/res | Business logic, direct DB queries |
| Service | Business logic, call Drizzle, call external APIs | Know about req/res, return HTTP status |
| Drizzle schema | Define tables, relations, types | Business logic |
| Middleware | Auth, validate, log | Database queries beyond user lookup |
| Frontend routes | Load data via loader, call API | Direct DB access |
| Frontend components | Render UI, call hooks | API calls directly (use hooks/queries) |

---

## Validation Pattern (Always Use This)

\`\`\`typescript
// ✅ CORRECT — Zod schema in packages/validators, middleware in route
// packages/validators/src/product.ts
import { z } from 'zod';
export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
  stockQuantity: z.number().int().min(0),
});

// apps/server/src/routes/products.ts
import { validate } from '../middleware/validate.js';
import { createProductSchema } from '@freshmart/validators';
router.post('/', adminMiddleware, validate(createProductSchema), async (req, res) => {
  const data = req.body; // already typed and validated
  const product = await productService.create(data);
  res.json({ success: true, data: product });
});

// ❌ WRONG — Manual validation, trusting req.body directly
router.post('/', async (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: 'Name required' });
  const product = await db.insert(products).values(req.body); // NEVER trust raw body
});
\`\`\`

---

## Error Handling Pattern

\`\`\`typescript
// ✅ CORRECT — Throw AppError in service, catch in errorHandler middleware
// apps/server/src/lib/errors.ts
export class AppError extends Error {
  constructor(public code: string, public message: string, public statusCode: number) {
    super(message);
  }
}

// In service:
if (!product) throw new AppError('PRODUCT_NOT_FOUND', 'Product not found', 404);

// In errorHandler middleware:
if (err instanceof AppError) {
  return res.status(err.statusCode).json({
    success: false,
    error: { code: err.code, message: err.message }
  });
}

// ❌ WRONG — try/catch in every route, inconsistent error format
router.get('/:id', async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'not found' }); // inconsistent
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong' }); // useless
  }
});
\`\`\`

---

## Drizzle Query Pattern

\`\`\`typescript
// ✅ CORRECT — Use Drizzle ORM with proper typing
import { db } from '../config/db.js';
import { products, categories } from '@freshmart/db';
import { eq, and, ilike } from 'drizzle-orm';

const result = await db
  .select()
  .from(products)
  .leftJoin(categories, eq(products.categoryId, categories.id))
  .where(and(
    eq(products.isDeleted, false),
    ilike(products.name, \`%\${search}%\`)
  ))
  .limit(12)
  .offset((page - 1) * 12);

// ❌ WRONG — Raw SQL string (bypasses type safety)
const result = await db.execute(\`SELECT * FROM products WHERE name LIKE '%\${search}%'\`);
// ALSO WRONG — SQL injection risk above
\`\`\`

---

## Authentication Pattern

\`\`\`typescript
// ✅ CORRECT — Verify JWT in middleware before route handler
// apps/server/src/middleware/auth.ts
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, error: { code: 'NO_TOKEN' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    const user = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
    if (!user[0]) return res.status(401).json({ success: false, error: { code: 'USER_NOT_FOUND' } });
    req.user = user[0];
    next();
  } catch {
    return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN' } });
  }
};

// ❌ WRONG — Skipping DB lookup after JWT verify
const payload = jwt.verify(token, secret);
req.user = payload; // WRONG: user might be deleted or role changed
next();
\`\`\`

---

## Email Pattern (Brevo REST API Only)

\`\`\`typescript
// ✅ CORRECT — Brevo REST API with fetch
// apps/server/src/services/email.service.ts
export async function sendOrderConfirmation(user: User, order: Order) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME },
      to: [{ email: user.email, name: \`\${user.firstName} \${user.lastName}\` }],
      subject: \`Order Confirmed — #\${order.orderNumber}\`,
      htmlContent: buildOrderConfirmationHtml(order),
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new AppError('EMAIL_FAILED', \`Brevo error: \${JSON.stringify(err)}\`, 500);
  }
}

// ❌ WRONG — Using nodemailer or any other email library
import nodemailer from 'nodemailer'; // FORBIDDEN in this project
\`\`\`

---

## Cloudinary Image Upload Pattern

\`\`\`typescript
// ✅ CORRECT — Upload via cloudinary SDK after multer temp storage
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export async function uploadProductImage(buffer: Buffer, productId: string) {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'freshmart/products', public_id: productId, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
}

// ❌ WRONG — Storing base64 image in database
product.imageData = req.body.imageBase64; // NEVER store images in DB
\`\`\`

---

## Frontend Data Loading Pattern (React Router v7)

\`\`\`typescript
// ✅ CORRECT — Use loader for server-side data
// apps/web/app/routes/products._index.tsx
import type { Route } from './+types/products._index';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const data = await apiClient.get(\`/products?page=\${page}\`);
  return { products: data.data, meta: data.meta };
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products, meta } = loaderData;
  // render...
}

// ❌ WRONG — useEffect for data fetching in React Router v7
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetch('/api/products').then(...) }, []); // WRONG pattern for RR v7
}
\`\`\`

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files | kebab-case | \`product.service.ts\` |
| Components | PascalCase | \`ProductCard.tsx\` |
| Functions | camelCase | \`createOrder()\` |
| DB tables | snake_case | \`order_items\` |
| Env vars | SCREAMING_SNAKE | \`Paystack_SECRET_KEY\` |
| Zod schemas | camelCase + Schema suffix | \`createProductSchema\` |
| Routes (Express) | kebab-case | \`/api/cart-items\` |
| Routes (React Router) | dot notation | \`products.$slug.tsx\` |

## HTTP Status Code Rules

| Situation | Status |
|---|---|
| Success with data | 200 |
| Resource created | 201 |
| No content (delete) | 204 |
| Validation error | 422 |
| Unauthorized (no token) | 401 |
| Forbidden (wrong role) | 403 |
| Not found | 404 |
| Conflict (duplicate email) | 409 |
| Server error | 500 |

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/05-hallucination-traps.md
// ============================================================
write('.kb/05-hallucination-traps.md', `
> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 05 — Hallucination Traps

> These are the specific mistakes AI agents make on THIS project.
> Read this file at the start of every session. Every mistake encountered must be added here.

---

## Trap 1: Using nodemailer instead of Brevo REST API

\`\`\`typescript
// ❌ WRONG
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({ service: 'gmail', ... });

// ✅ CORRECT
const response = await fetch('https://api.brevo.com/v3/smtp/email', {
  method: 'POST',
  headers: { 'api-key': process.env.BREVO_API_KEY!, 'Content-Type': 'application/json' },
  body: JSON.stringify({ sender: {...}, to: [...], subject: '...', htmlContent: '...' })
});
\`\`\`
**Why wrong:** This project uses Brevo REST API exclusively. Nodemailer is not installed.

---

## Trap 2: Storing prices as floats instead of using DECIMAL in Drizzle

\`\`\`typescript
// ❌ WRONG
price: real('price').notNull()  // floating point precision issues with money

// ✅ CORRECT
price: decimal('price', { precision: 10, scale: 2 }).notNull()
\`\`\`
**Why wrong:** Float arithmetic causes $19.99 to become $19.990000000001 in totals.

---

## Trap 3: Not snapshotting price in order_items

\`\`\`typescript
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
\`\`\`
**Why wrong:** Product prices change. Historical orders must show the price paid.

---

## Trap 4: Decrementing stock on cart add instead of order create

\`\`\`typescript
// ❌ WRONG — reducing stock when item added to cart
await db.update(products).set({ stockQuantity: sql\`stock_quantity - \${qty}\` })
  .where(eq(products.id, productId));  // TOO EARLY

// ✅ CORRECT — decrement stock only when order is confirmed/paid
// In orderService.createFromCart():
await db.update(products).set({ stockQuantity: sql\`stock_quantity - \${qty}\` })
  .where(eq(products.id, item.productId));  // INSIDE transaction, after payment
\`\`\`
**Why wrong:** Cart abandonment would permanently reduce stock.

---

## Trap 5: Skipping the DB user lookup after JWT verify

\`\`\`typescript
// ❌ WRONG — using JWT payload directly as req.user
const payload = jwt.verify(token, secret) as JWTPayload;
req.user = { id: payload.sub, role: payload.role }; // stale! user may be deleted or role changed

// ✅ CORRECT — always re-fetch user from DB
const payload = jwt.verify(token, secret) as JWTPayload;
const [user] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
if (!user) throw new AppError('USER_NOT_FOUND', 'User not found', 401);
req.user = user;
\`\`\`
**Why wrong:** If an admin demotes a user mid-session, the old token would still grant admin access.

---

## Trap 6: Hard-deleting products instead of soft delete

\`\`\`typescript
// ❌ WRONG
await db.delete(products).where(eq(products.id, id));

// ✅ CORRECT
await db.update(products)
  .set({ isDeleted: true, updatedAt: new Date() })
  .where(eq(products.id, id));
// Then always filter in queries:
.where(eq(products.isDeleted, false))
\`\`\`
**Why wrong:** Order items reference products. Hard delete breaks order history.

---

## Trap 7: Not filtering isDeleted=false in product queries

\`\`\`typescript
// ❌ WRONG — returns deleted products to users
const prods = await db.select().from(products);

// ✅ CORRECT
const prods = await db.select().from(products)
  .where(eq(products.isDeleted, false));
\`\`\`
**Why wrong:** Soft-deleted products appear in listings and can be purchased.

---

## Trap 8: Using useEffect for data in React Router v7 framework mode

\`\`\`typescript
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
\`\`\`
**Why wrong:** React Router v7 in framework mode is SSR-first. Loaders run server-side.

---

## Trap 9: Allowing coupon discount to exceed 50% of subtotal

\`\`\`typescript
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
\`\`\`
**Why wrong:** Business rule violation — discount cannot exceed 50% of subtotal.

---

## Trap 10: Allowing order status to go backwards

\`\`\`typescript
// ❌ WRONG — any status update accepted
await db.update(orders).set({ status: newStatus }).where(eq(orders.id, id));

// ✅ CORRECT — enforce state machine
const STATUS_ORDER = ['pending', 'processing', 'shipped', 'delivered'];
const currentIndex = STATUS_ORDER.indexOf(order.status);
const newIndex = STATUS_ORDER.indexOf(newStatus);
if (newIndex <= currentIndex) {
  throw new AppError('INVALID_STATUS_TRANSITION', 'Cannot move to previous status', 400);
}
\`\`\`
**Why wrong:** Orders should only move forward in the pipeline.

---

## Trap 11: Applying Tailwind classes that don't exist in v4

**Context:** Tailwind v4 changed many utility names and dropped some.
- ❌ \`bg-opacity-50\` → ✅ \`bg-black/50\`
- ❌ \`text-opacity-75\` → ✅ \`text-black/75\`
- ❌ Import via \`@tailwind base\` in CSS → ✅ \`@import "tailwindcss"\` in CSS

Always check Tailwind v4 docs before using opacity or new utilities.

---

## Trap 12: Sending Paystack client_secret to wrong party

\`\`\`typescript
// ❌ WRONG — logging or storing client secret server-side
console.log('Payment intent:', paymentIntent.client_secret);
await db.update(orders).set({ PaystackSecret: paymentIntent.client_secret }); // NEVER

// ✅ CORRECT — send to frontend only, once, over HTTPS
res.json({ success: true, data: { clientSecret: paymentIntent.client_secret } });
// Frontend uses it to confirm payment, then discards it
\`\`\`
**Why wrong:** client_secret allows payment confirmation. Never log or persist it.

---

## Trap 13: Importing from @freshmart/db inside apps/web

\`\`\`typescript
// ❌ WRONG — frontend importing DB schema
// apps/web/app/routes/products._index.tsx
import { products } from '@freshmart/db'; // NEVER — DB on server only

// ✅ CORRECT — frontend calls API
export async function loader({ request }: Route.LoaderArgs) {
  return await apiClient.get('/products');
}
\`\`\`
**Why wrong:** DB package has server-side Node.js dependencies that break in browser.

---

## Trap 14: Forgetting CORS on the Express server

\`\`\`typescript
// ❌ WRONG — no CORS, frontend gets blocked
const app = express();
app.use(express.json());

// ✅ CORRECT
import cors from 'cors';
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:5173'],
  credentials: true,
}));
\`\`\`
**Why wrong:** React Router v7 dev server (5173) → Express (3001) requires CORS.

---

## Trap 15: Changing the HTML design instead of matching it

**Rule:** The existing HTML template is the UI contract. When converting to React:
- ✅ Extract CSS classes from HTML and apply to JSX
- ✅ Match element hierarchy, spacing, colors exactly
- ❌ NEVER redesign, NEVER use different component libraries
- ❌ NEVER swap Bootstrap classes for Tailwind alternatives if Bootstrap is in the template

If the HTML uses Bootstrap 5, the React component uses the same Bootstrap classes.
Only apply Tailwind for NEW components not in the original HTML.

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/06-testing-strategy.md
// ============================================================
write('.kb/06-testing-strategy.md', `
> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 06 — Testing Strategy

## Test Layers

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | Services (isolated), validators, utilities |
| Integration | Vitest + Supertest | API endpoints against test DB |
| Type checking | tsc --noEmit | All packages |
| Lint | ESLint | All packages |

## Running Tests

\`\`\`bash
pnpm typecheck         # TypeScript across all packages
pnpm lint              # ESLint across all packages
pnpm test              # All tests
pnpm test:unit         # Unit tests only
pnpm test:integration  # Integration tests only
pnpm test:watch        # Watch mode during development
\`\`\`

## Test File Locations

\`\`\`
apps/server/src/
  routes/__tests__/
    auth.test.ts
    products.test.ts
    cart.test.ts
    orders.test.ts
  services/__tests__/
    order.service.test.ts
    coupon.service.test.ts
    email.service.test.ts
packages/validators/src/__tests__/
  auth.test.ts
  product.test.ts
\`\`\`

## Critical Test Cases (Must Pass Before Deploy)

### Auth Endpoints
- [ ] POST /auth/register — valid data creates user, returns 201
- [ ] POST /auth/register — duplicate email returns 409
- [ ] POST /auth/register — invalid email format returns 422
- [ ] POST /auth/register — password < 8 chars returns 422
- [ ] POST /auth/login — valid credentials return tokens
- [ ] POST /auth/login — wrong password returns 401
- [ ] POST /auth/login — nonexistent user returns 401
- [ ] POST /auth/forgot-password — valid email queues Brevo call
- [ ] POST /auth/reset-password — expired token returns 400
- [ ] Protected route — no token returns 401
- [ ] Protected route — expired token returns 401

### Product Endpoints
- [ ] GET /products — returns paginated list, excludes soft-deleted
- [ ] GET /products?category=X — filters by category
- [ ] GET /products?search=apple — full-text search works
- [ ] GET /products/:id — returns product with category
- [ ] GET /products/:id — nonexistent ID returns 404
- [ ] POST /products — admin creates product, returns 201
- [ ] POST /products — non-admin gets 403
- [ ] DELETE /products/:id — soft deletes (isDeleted=true)
- [ ] GET /products after soft delete — deleted item not in results

### Cart Endpoints
- [ ] POST /cart/add — adds item to cart
- [ ] POST /cart/add — out-of-stock product returns 400
- [ ] PATCH /cart/:itemId — updates quantity
- [ ] DELETE /cart/:itemId — removes item
- [ ] POST /cart/coupon — valid coupon applies discount
- [ ] POST /cart/coupon — expired coupon returns 400
- [ ] POST /cart/coupon — discount capped at 50% of subtotal

### Order Endpoints
- [ ] POST /orders/create — creates order, decrements stock, clears cart
- [ ] POST /orders/create — empty cart returns 400
- [ ] GET /orders — returns only authenticated user's orders
- [ ] GET /orders/:id — user cannot access other user's order (403)
- [ ] PATCH /orders/:id/status — admin can advance status
- [ ] PATCH /orders/:id/status — status regression returns 400
- [ ] POST /orders/:id/cancel — pending order can be cancelled
- [ ] POST /orders/:id/cancel — shipped order cannot be cancelled

### Business Rule Tests (orderService.test.ts)
- [ ] Coupon discount never exceeds 50% of subtotal
- [ ] Stock decrements only on order creation (not cart add)
- [ ] Price in order_items matches product price at order time (not current price)
- [ ] Order status machine: cannot skip states, cannot go backwards

## Mocking Templates

\`\`\`typescript
// Mock Brevo in email tests
vi.mock('../services/email.service.js', () => ({
  sendOrderConfirmation: vi.fn().mockResolvedValue(undefined),
  sendPasswordReset: vi.fn().mockResolvedValue(undefined),
}));

// Mock Paystack in payment tests
vi.mock('Paystack', () => ({
  default: vi.fn().mockImplementation(() => ({
    paymentIntents: {
      create: vi.fn().mockResolvedValue({ id: 'pi_test', client_secret: 'pi_test_secret' }),
    },
  })),
}));

// Mock Cloudinary in upload tests
vi.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: vi.fn().mockImplementation((opts, cb) => {
        cb(null, { secure_url: 'https://res.cloudinary.com/test/image.jpg' });
        return { end: vi.fn() };
      }),
    },
  },
}));
\`\`\`

## Definition of Done (Per Feature)

A feature is complete when:
- [ ] All endpoint tests pass
- [ ] Business rule tests pass
- [ ] TypeScript compiles with zero errors
- [ ] ESLint reports zero errors
- [ ] STATE.md updated
- [ ] Change log updated
- [ ] UI matches original HTML design (for frontend)

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/07-decisions-and-adr.md
// ============================================================
write('.kb/07-decisions-and-adr.md', `
> **Self-Update Protocol:** Append new ADRs. Never rewrite existing ones.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 07 — Architecture Decision Records

## ADR-001: React Router v7 Framework Mode (Not Next.js)

**Context:** Need SSR-capable React framework for the e-commerce frontend.
**Decision:** Use React Router v7 in framework mode (formerly Remix).
**Consequences:** File-based routing, server loaders, actions — no useEffect for data fetching.
**Alternatives Rejected:**
- Next.js: Team has React Router experience; heavier ecosystem
- SPA mode: SEO requirements for product pages

---

## ADR-002: Drizzle ORM (Not Prisma)

**Context:** Need type-safe ORM for PostgreSQL on Supabase.
**Decision:** Drizzle ORM — SQL-like API, no code generation step, runs in edge runtimes.
**Consequences:** Schema defined in TypeScript; migrations via drizzle-kit; no Prisma Client generation.
**Alternatives Rejected:**
- Prisma: Heavier binary, slower cold starts, less SQL-transparent
- Raw SQL: No type safety

---

## ADR-003: Brevo REST API (Not Nodemailer / SendGrid)

**Context:** Need transactional email for order confirmations and password reset.
**Decision:** Brevo REST API via native fetch — no SDK, no additional package.
**Consequences:** Email calls use fetch; no SMTP configuration needed; Brevo dashboard for templates.
**Alternatives Rejected:**
- Nodemailer: Requires SMTP config and credentials management
- SendGrid: Different pricing, same approach but more expensive

---

## ADR-004: pnpm Monorepo (Not Turborepo / Nx)

**Context:** Need shared types, validators, and DB schema between frontend and backend.
**Decision:** pnpm workspaces — simple, no extra tooling.
**Consequences:** Packages linked locally; shared code in \`packages/\`; single tsconfig.base.json.
**Alternatives Rejected:**
- Turborepo: Overkill for this project size
- Separate repos: Would duplicate types and validators

---

## ADR-005: Supabase Row Level Security

**Context:** Need to enforce that users can only access their own data.
**Decision:** Enable RLS on all user-data tables in Supabase, plus enforce in service layer.
**Consequences:** Two-layer security (Supabase RLS + app-level checks); slightly more setup.
**Alternatives Rejected:**
- App-level only: Single point of failure; DB queries could leak data in bugs

---

## ADR-006: Soft Delete for Products

**Context:** Products referenced in order history should not disappear.
**Decision:** Add \`is_deleted BOOLEAN DEFAULT FALSE\` to products; never hard DELETE.
**Consequences:** All product queries must include \`.where(eq(products.isDeleted, false))\`.
**Alternatives Rejected:**
- Hard delete: Breaks order history foreign key references
- Archive table: More complex migration and query logic

---

## ADR-007: JWT Access + Refresh Token Strategy

**Context:** Need authenticated sessions that are stateless but revocable.
**Decision:** Short-lived access token (15min JWT) + long-lived refresh token (7d, stored in httpOnly cookie).
**Consequences:** Refresh token stored in DB for revocation on logout; access token is stateless.
**Alternatives Rejected:**
- Sessions only: Not stateless, harder to scale
- Long-lived JWT: Cannot revoke without token blocklist complexity

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .kb/08-change-log.md
// ============================================================
write('.kb/08-change-log.md', `
> **Self-Update Protocol:** AI agents MUST append to this file after every task.
> Format: \`- YYYY-MM-DD · [Agent/Tool] · [What was done]\`
> Never delete entries. Append only.

# 08 — Change Log

## Audit Trail

- ${new Date().toISOString().split('T')[0]} · generate-specs.mjs · Initial scaffold — created all .kb/, .rules/, .prompts/, AGENTS.md, VISION.md, STATE.md, LOOP.md, deploy.yml
`);

// ============================================================
// .kb/09-known-issues.md
// ============================================================
write('.kb/09-known-issues.md', `
> **Self-Update Protocol:** AI agents MUST update this file when new issues are found or resolved.
> Append a dated bullet to the \`## Change Log\` section at the bottom.

# 09 — Known Issues & Workarounds

> Project is in initial scaffolding phase. Issues will be tracked here as they are discovered.

## Active Bugs

_(none yet)_

## Tech Debt

| Item | Description | Priority |
|---|---|---|
| HTML conversion | All frontend pages are still static HTML in \`apps/web/public/template/\` | High |
| No DB yet | Drizzle schema not yet written; no migrations applied | High |
| No auth yet | JWT auth middleware not yet implemented | High |

## Workarounds in Effect

_(none yet)_

## Do Not Touch (Stable Code)

- \`apps/web/public/template/\` — original HTML files. Reference only, do not modify.

## Change Log
- ${new Date().toISOString().split('T')[0]} · Scaffolded by generate-specs.mjs
`);

// ============================================================
// .rules/01-core-protocol.mdc
// ============================================================
write('.rules/01-core-protocol.mdc', `
---
description: Core protocol for all AI agents working on FreshMart
---

# Core Protocol

## Identity

You are an AI agent working on **FreshMart**, a production e-commerce platform.
The existing HTML design is the UI contract. All code must respect it.

## Non-Negotiable Rules

1. Never store credit card numbers — Paystack/PayPal tokens only
2. Never access another user's data — RLS + app-level enforcement
3. Never use nodemailer — Brevo REST API only
4. Never hard-delete products — soft delete with isDeleted=true
5. Never hardcode product data — everything from Supabase
6. Never skip JWT middleware on protected routes
7. Never trust raw req.body — always validate with Zod first
8. Never import @freshmart/db inside apps/web (frontend)
9. Never change the HTML design — match it exactly when converting to React
10. Never change prices programmatically — admin panel only

## Before Every Task

1. Read VISION.md
2. Read STATE.md — pick ONE task
3. Read .kb/05-hallucination-traps.md
4. Load relevant .kb/ files for the task type

## After Every Task

1. Run: pnpm typecheck && pnpm lint
2. Run: pnpm test (relevant tests)
3. Update STATE.md — mark task done, write next
4. Append to .kb/08-change-log.md
5. If new trap discovered — add to .kb/05-hallucination-traps.md
6. If stuck (same error 3x) — output <stop>ESCALATE</stop>
`);

// ============================================================
// .rules/02-architecture-guards.mdc
// ============================================================
write('.rules/02-architecture-guards.mdc', `
---
description: Architecture boundary rules for FreshMart
---

# Architecture Guards

## Layer Boundaries

| Layer | Files | Can Import | Cannot Import |
|---|---|---|---|
| DB Schema | packages/db/src/schema/*.ts | drizzle-orm | express, react, services |
| Validators | packages/validators/src/*.ts | zod, @freshmart/types | drizzle-orm, express |
| Middleware | apps/server/src/middleware/*.ts | @freshmart/validators, jsonwebtoken | services (only auth.ts for user lookup) |
| Services | apps/server/src/services/*.ts | @freshmart/db, @freshmart/types, external SDKs | express req/res |
| Routes | apps/server/src/routes/*.ts | services, middleware, @freshmart/validators | drizzle-orm directly |
| Frontend routes | apps/web/app/routes/*.tsx | @freshmart/types, @freshmart/validators | @freshmart/db, express |
| Frontend components | apps/web/app/components/*.tsx | react, @freshmart/types | anything from apps/server |

## Import Rules

\`\`\`typescript
// ✅ Route imports service (correct)
import { productService } from '../services/product.service.js';

// ✅ Service imports DB (correct)
import { db } from '../config/db.js';
import { products } from '@freshmart/db';

// ❌ Route imports DB directly (bypass service layer)
import { db } from '../config/db.js'; // in a route file — FORBIDDEN

// ❌ Frontend imports server code
import { productService } from '../../../apps/server/src/services/product.service.js'; // FORBIDDEN
\`\`\`

## Banned Patterns Per Layer

### Route handlers must NOT:
- Contain database queries
- Contain business logic (tax calculation, stock checks, coupon math)
- Return raw database rows (transform in service)

### Services must NOT:
- Import from \`express\`
- Reference \`req\` or \`res\`
- Return HTTP status codes

### Frontend must NOT:
- Import from \`@freshmart/db\`
- Call Paystack SDK directly (use backend API)
- Store JWT in localStorage (use httpOnly cookies for refresh, memory for access)
`);

// ============================================================
// .rules/03-forbidden-patterns.mdc
// ============================================================
write('.rules/03-forbidden-patterns.mdc', `
---
description: Anti-patterns forbidden in FreshMart codebase
---

# Forbidden Patterns

## FORBIDDEN: Raw SQL strings
\`\`\`typescript
// ❌
db.execute(\`SELECT * FROM products WHERE id = '\${id}'\`);
// ✅
db.select().from(products).where(eq(products.id, id));
\`\`\`

## FORBIDDEN: Trusting req.body without Zod
\`\`\`typescript
// ❌
const { email, password } = req.body;
// ✅
const { email, password } = loginSchema.parse(req.body);
\`\`\`

## FORBIDDEN: console.log in production code
\`\`\`typescript
// ❌
console.log('User logged in:', user);
// ✅ Use morgan for HTTP logs, structured logger for app events
logger.info({ userId: user.id, action: 'login' });
\`\`\`

## FORBIDDEN: Hardcoded credentials or secrets
\`\`\`typescript
// ❌
const Paystack = new Paystack('sk_live_actualkey123');
// ✅
const Paystack = new Paystack(process.env.Paystack_SECRET_KEY!);
\`\`\`

## FORBIDDEN: useEffect for primary data loading in React Router v7
\`\`\`typescript
// ❌ useEffect for data
useEffect(() => { fetch('/api/products').then(...) }, []);
// ✅ Use loader
export async function loader() { return await apiClient.get('/products'); }
\`\`\`

## FORBIDDEN: Hard deleting products
\`\`\`typescript
// ❌
await db.delete(products).where(eq(products.id, id));
// ✅
await db.update(products).set({ isDeleted: true }).where(eq(products.id, id));
\`\`\`

## FORBIDDEN: Not filtering soft-deleted products
\`\`\`typescript
// ❌
await db.select().from(products);
// ✅
await db.select().from(products).where(eq(products.isDeleted, false));
\`\`\`

## FORBIDDEN: Float type for money
\`\`\`typescript
// ❌ Drizzle schema
price: real('price')
// ✅
price: decimal('price', { precision: 10, scale: 2 })
\`\`\`
`);

// ============================================================
// .rules/04-self-update-protocol.mdc
// ============================================================
write('.rules/04-self-update-protocol.mdc', `
---
description: When and how agents must update .kb/ files
---

# Self-Update Protocol

## When to Update

| Event | Files to Update |
|---|---|
| Task completed | STATE.md, .kb/08-change-log.md |
| New bug or trap discovered | .kb/05-hallucination-traps.md, .kb/09-known-issues.md |
| New package added | .kb/02-tech-stack.md |
| New endpoint added | .kb/01-project-overview.md |
| Architecture changed | .kb/03-architecture.md, .kb/07-decisions-and-adr.md |
| New env var needed | .kb/02-tech-stack.md |
| Phase completed | VISION.md (update phase status), STATE.md |

## How to Update

\`\`\`
1. Complete the implementation task first
2. Run typecheck + lint + tests
3. THEN update docs — never update docs before code works
4. In STATE.md:
   - Move task from "In Progress" or "Task Queue" to "Completed Tasks"
   - Add new tasks if discovered
   - Update "Active Phase" if phase changed
5. In .kb/08-change-log.md:
   - Append: "- YYYY-MM-DD · [tool/agent] · [what was done]"
6. In .kb/05-hallucination-traps.md (if new trap):
   - Add numbered trap with ❌ wrong code, explanation, ✅ correct code
\`\`\`

## What NOT to Do

- Do not rewrite .kb/07-decisions-and-adr.md entries — append only
- Do not delete entries from .kb/08-change-log.md
- Do not mark a task done in STATE.md if tests are failing
- Do not update STATE.md inside the same commit as the feature (separate commit is fine)
`);

// ============================================================
// .rules/05-security-and-secrets.mdc
// ============================================================
write('.rules/05-security-and-secrets.mdc', `
---
description: Secret handling and security rules for FreshMart
---

# Security & Secrets

## Never Commit These

- .env files (any environment)
- JWT secrets
- Paystack secret keys
- Supabase service role key
- Brevo API key
- PayPal client secret
- Cloudinary API secret

## Environment Variable Rules

- All secrets via process.env — never hardcode
- .env.example contains key names only, no real values
- Server-only vars (SUPABASE_SERVICE_ROLE_KEY, Paystack_SECRET_KEY) never in apps/web
- Frontend only receives VITE_* prefixed public vars if needed

## Auth Security

- Passwords hashed with bcrypt, BCRYPT_ROUNDS=12 minimum
- Access tokens expire in 15 minutes
- Refresh tokens stored in httpOnly, Secure, SameSite=Strict cookies
- Refresh tokens stored in DB for revocation
- JWT_SECRET and JWT_REFRESH_SECRET must be different values, min 64 chars

## Payment Security

- Never log or store Paystack client_secret
- Never store any PAN (card number) data
- Paystack webhooks verified with Paystack_WEBHOOK_SECRET
- PayPal webhooks verified with PayPal SDK

## API Security

- Rate limiting on all auth endpoints (max 10 req/15min per IP)
- Helmet.js for HTTP security headers
- CORS restricted to CORS_ORIGINS env var
- All user-data queries enforce row-level ownership check
- Supabase RLS enabled on all tables with user data

## .gitignore Requirements

\`\`\`
.env
.env.local
.env.production
.env.*.local
node_modules/
dist/
.drizzle/
*.pem
\`\`\`
`);

// ============================================================
// .prompts/claude-implementation.md
// ============================================================
write('.prompts/claude-implementation.md', `
# Claude Implementation Prompt — FreshMart

## Role

You are a senior full-stack TypeScript engineer implementing features for FreshMart, a production e-commerce platform. You write production-quality code, not prototypes.

## Context Loading Order (Do This First)

1. Read \`VISION.md\`
2. Read \`STATE.md\` — identify the current task
3. Read \`.kb/05-hallucination-traps.md\` — internalize what NOT to do
4. Read \`.kb/04-coding-standards.md\` — internalize patterns
5. Read \`.kb/01-project-overview.md\` — for API/data work
6. Read \`.kb/03-architecture.md\` — for structure/file placement

## Task Format

When given a task:
1. State which file(s) you will create or modify
2. State which .kb/ files are relevant
3. Implement the code
4. Show the typecheck/lint/test commands to run
5. State what to update in STATE.md and change log

## Output Format

\`\`\`
## Files Changed
- apps/server/src/routes/cart.ts (modified)
- apps/server/src/services/cart.service.ts (created)

## Implementation
[code blocks]

## Validation
pnpm typecheck
pnpm lint
pnpm test apps/server/src/routes/__tests__/cart.test.ts

## STATE.md Update
Mark done: "POST /api/cart/add"
Add to queue: "PATCH /api/cart/:itemId"

## Change Log Entry
- YYYY-MM-DD · Claude · Implemented cart add endpoint with Zod validation and stock check
\`\`\`

## Constraints

- Match existing HTML design exactly for any frontend work
- Follow patterns in .kb/04-coding-standards.md exactly
- Never introduce packages not in .kb/02-tech-stack.md without discussion
- Never skip validation middleware
- Always use Brevo REST API for email (never nodemailer)
- Always soft-delete products (never hard delete)
- Always filter isDeleted=false in product queries
`);

// ============================================================
// .prompts/cursor-bootstrap.md
// ============================================================
write('.prompts/cursor-bootstrap.md', `
# Cursor Bootstrap Prompt — FreshMart

## What to Read First

Before writing a single line of code in Cursor, read these files in order:

1. \`AGENTS.md\` — project rules and stack
2. \`VISION.md\` — what we're building
3. \`STATE.md\` — where we are
4. \`.kb/05-hallucination-traps.md\` — what not to do
5. \`.kb/03-architecture.md\` — folder structure

## Bootstrap Order (Phase 1 — Start Here)

\`\`\`
Step 1: Create pnpm monorepo structure
  - package.json (root)
  - pnpm-workspace.yaml
  - tsconfig.base.json
  - apps/web/ (React Router v7)
  - apps/server/ (Express)
  - packages/db/
  - packages/types/
  - packages/validators/

Step 2: Write Drizzle schema (packages/db/src/schema/)
  - users.ts
  - products.ts
  - categories.ts
  - cart.ts
  - orders.ts
  - reviews.ts
  - coupons.ts
  - wishlist.ts

Step 3: Configure Drizzle + Supabase connection
  - drizzle.config.ts
  - apps/server/src/config/db.ts
  - Run: pnpm db:push

Step 4: Configure Express server
  - apps/server/src/index.ts
  - CORS, helmet, rate limit, morgan
  - errorHandler middleware

Step 5: Implement auth middleware
  - apps/server/src/middleware/auth.ts
  - apps/server/src/middleware/validate.ts
  - apps/server/src/middleware/admin.ts
\`\`\`

## File Creation Rules

- Always create files in the monorepo structure above
- Never create files in the root (except config files)
- Always add \`.js\` extension on imports in .ts files (Node ESM)
- Always export from \`index.ts\` in each package
`);

// ============================================================
// .prompts/gemini-review.md
// ============================================================
write('.prompts/gemini-review.md', `
# Gemini Code Review Checklist — FreshMart

## Role

You are a senior code reviewer for FreshMart. Review code for correctness, security, and adherence to project conventions. Output PASS / FAIL / PARTIAL per section.

## Review Checklist

### Layer Separation [PASS/FAIL]
- [ ] Route handlers only call services (no DB queries in routes)
- [ ] Services contain business logic (not routes)
- [ ] Frontend does not import from @freshmart/db or apps/server

### Business Rules [PASS/FAIL]
- [ ] Order status can only advance forward (pending→processing→shipped→delivered)
- [ ] Coupon discount capped at 50% of subtotal
- [ ] Stock decremented only on order create (not cart add)
- [ ] Products soft-deleted only (isDeleted=true, never hard DELETE)
- [ ] All product queries filter isDeleted=false

### Security [PASS/FAIL]
- [ ] All protected routes use authMiddleware before handler
- [ ] All inputs validated with Zod before use
- [ ] No secrets in code (all via process.env)
- [ ] No raw SQL string interpolation (SQL injection risk)
- [ ] Users can only access their own orders/cart/wishlist

### Stack Compliance [PASS/FAIL]
- [ ] No nodemailer (must use Brevo REST API via fetch)
- [ ] No hard-coded product data
- [ ] No float/real type for money fields (must be decimal)
- [ ] No bcryptjs (must use bcrypt)
- [ ] Drizzle ORM used (no raw queries except migrations)

### Frontend Pattern [PASS/FAIL]
- [ ] React Router v7 loaders used for data (not useEffect)
- [ ] UI matches original HTML design
- [ ] No Tailwind classes that don't exist in v4

## Output Format

\`\`\`
## Review Result

### Layer Separation: PASS
### Business Rules: FAIL
  - ❌ Line 47: Stock decremented in cart service, should be in order service
### Security: PASS
### Stack Compliance: PARTIAL
  - ⚠️ Line 12: nodemailer imported — must use Brevo REST API
### Frontend Pattern: PASS

## Overall: FAIL
## Blocking Issues: 2
## Warnings: 1
\`\`\`
`);

// ============================================================
// .prompts/codex-test-writer.md
// ============================================================
write('.prompts/codex-test-writer.md', `
# Codex Test Writer Prompt — FreshMart

## Role

You are a test engineer for FreshMart. Write Vitest + Supertest integration tests for Express API endpoints.

## What Tests to Write

For every endpoint:
1. Happy path (valid input, expected output)
2. Validation failure (invalid body → 422)
3. Auth failure (no token → 401, wrong role → 403)
4. Business rule violations (bad status transition, expired coupon, etc.)
5. Not found cases (nonexistent IDs → 404)

## Mocking Strategy

- Mock Brevo (email.service.ts) — never send real emails in tests
- Mock Paystack — never make real payment calls in tests
- Mock Cloudinary — never upload real images in tests
- Use a test Supabase database or in-memory SQLite for integration tests
- Seed test data in beforeEach, clean up in afterEach

## Assertion Rules

- Always assert response status code
- Always assert \`response.body.success\` is true/false
- Always assert \`response.body.error.code\` on error cases
- For creates: assert the created resource exists in DB (Drizzle query)
- For deletes: assert isDeleted=true (never assert record is gone)
- For order creation: assert stock was decremented, cart was cleared

## Test File Template

\`\`\`typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../index.js';
import { db } from '../../config/db.js';
import { users, products } from '@freshmart/db';

vi.mock('../../services/email.service.js', () => ({
  sendOrderConfirmation: vi.fn().mockResolvedValue(undefined),
}));

describe('POST /api/[resource]', () => {
  let authToken: string;
  let testUserId: string;

  beforeEach(async () => {
    // seed test user, get token
  });

  afterEach(async () => {
    // clean up test data
  });

  it('returns 201 with valid input', async () => {
    const res = await request(app)
      .post('/api/[resource]')
      .set('Authorization', \`Bearer \${authToken}\`)
      .send({ /* valid body */ });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
  });

  it('returns 422 with invalid input', async () => {
    const res = await request(app)
      .post('/api/[resource]')
      .set('Authorization', \`Bearer \${authToken}\`)
      .send({ /* invalid body */ });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('returns 401 without auth token', async () => {
    const res = await request(app).post('/api/[resource]').send({});
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('NO_TOKEN');
  });
});
\`\`\`
`);

// ============================================================
// .github/workflows/deploy.yml
// ============================================================
write('.github/workflows/deploy.yml', `
name: CI/CD — FreshMart

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '9'

jobs:
  # ─── Type Check ────────────────────────────────────────────
  typecheck:
    name: TypeScript
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: '\${{ env.PNPM_VERSION }}' }
      - uses: actions/setup-node@v4
        with: { node-version: '\${{ env.NODE_VERSION }}', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  # ─── Lint ──────────────────────────────────────────────────
  lint:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: '\${{ env.PNPM_VERSION }}' }
      - uses: actions/setup-node@v4
        with: { node-version: '\${{ env.NODE_VERSION }}', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  # ─── Architecture Guards ───────────────────────────────────
  architecture-guards:
    name: Architecture Guards
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: No nodemailer imports
        run: |
          if grep -r "from 'nodemailer'" apps/ packages/; then
            echo "❌ nodemailer found — use Brevo REST API only"
            exit 1
          fi

      - name: No hardcoded Paystack keys
        run: |
          if grep -rE "sk_(live|test)_[A-Za-z0-9]+" apps/ packages/; then
            echo "❌ Hardcoded Paystack key found"
            exit 1
          fi

      - name: No DB imports in frontend
        run: |
          if grep -r "@freshmart/db" apps/web/; then
            echo "❌ DB package imported in frontend — server only"
            exit 1
          fi

      - name: No raw SQL strings
        run: |
          if grep -rE "db\.execute\('" apps/server/; then
            echo "❌ Raw SQL string found — use Drizzle ORM methods"
            exit 1
          fi

      - name: No float type for money in schema
        run: |
          if grep -rE "real\(|float\(|doublePrecision\(" packages/db/src/schema/ | grep -i price; then
            echo "❌ Float type for money — use decimal({ precision: 10, scale: 2 })"
            exit 1
          fi

      - name: No hard delete of products
        run: |
          if grep -rn "db.delete(products)" apps/server/src/services/; then
            echo "❌ Hard delete of products found — use isDeleted=true soft delete"
            exit 1
          fi

  # ─── Unit Tests ────────────────────────────────────────────
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: [typecheck, lint]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: '\${{ env.PNPM_VERSION }}' }
      - uses: actions/setup-node@v4
        with: { node-version: '\${{ env.NODE_VERSION }}', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit

  # ─── Integration Tests ─────────────────────────────────────
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    needs: [typecheck, lint]
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: testpassword
          POSTGRES_DB: freshmart_test
        ports: ['5432:5432']
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5
    env:
      DATABASE_URL: postgresql://postgres:testpassword@localhost:5432/freshmart_test
      JWT_SECRET: test-secret-min-64-chars-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      JWT_REFRESH_SECRET: test-refresh-secret-min-64-chars-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      BREVO_API_KEY: test-key
      Paystack_SECRET_KEY: sk_test_placeholder
      CLOUDINARY_CLOUD_NAME: test
      CLOUDINARY_API_KEY: test
      CLOUDINARY_API_SECRET: test
      NODE_ENV: test
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: '\${{ env.PNPM_VERSION }}' }
      - uses: actions/setup-node@v4
        with: { node-version: '\${{ env.NODE_VERSION }}', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm db:push
      - run: pnpm test:integration

  # ─── Build ─────────────────────────────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests, architecture-guards]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: '\${{ env.PNPM_VERSION }}' }
      - uses: actions/setup-node@v4
        with: { node-version: '\${{ env.NODE_VERSION }}', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: |
            apps/web/build/
            apps/server/dist/

  # ─── Deploy to Render ──────────────────────────────────────
  deploy:
    name: Deploy to Render
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Trigger Render Deploy (API)
        run: |
          curl -X POST \${{ secrets.RENDER_DEPLOY_HOOK_SERVER }}
      - name: Trigger Render Deploy (Web)
        run: |
          curl -X POST \${{ secrets.RENDER_DEPLOY_HOOK_WEB }}

  # ─── Health Check ──────────────────────────────────────────
  healthcheck:
    name: Health Check
    runs-on: ubuntu-latest
    needs: [deploy]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Wait for deploy
        run: sleep 60
      - name: Check API health
        run: |
          STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \${{ secrets.API_URL }}/health)
          if [ "\$STATUS" != "200" ]; then
            echo "❌ Health check failed with status \$STATUS"
            exit 1
          fi
          echo "✅ API healthy"
      - name: Check Web health
        run: |
          STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \${{ secrets.WEB_URL }})
          if [ "\$STATUS" != "200" ]; then
            echo "❌ Web health check failed with status \$STATUS"
            exit 1
          fi
          echo "✅ Web healthy"
`);

// ============================================================
// Console banner
// ============================================================
console.log('\n');
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║          FreshMart — Spec Framework Generated ✅             ║');
console.log('╠══════════════════════════════════════════════════════════════╣');
console.log('║  FILES CREATED:                                              ║');
console.log('║                                                              ║');
console.log('║  Root Anchor Files (Loop Engineering)                        ║');
console.log('║    AGENTS.md           ← AI agent onboarding                ║');
console.log('║    VISION.md           ← Project north star (loop anchor)   ║');
console.log('║    STATE.md            ← Agent progress tracker (memory)    ║');
console.log('║    LOOP.md             ← Loop engineering config             ║');
console.log('║                                                              ║');
console.log('║  .kb/ (Knowledge Base)                                       ║');
console.log('║    01-project-overview.md  ← All endpoints + data models    ║');
console.log('║    02-tech-stack.md        ← All packages + env vars        ║');
console.log('║    03-architecture.md      ← Folder structure + lifecycles  ║');
console.log('║    04-coding-standards.md  ← Patterns with ✅/❌ examples   ║');
console.log('║    05-hallucination-traps.md ← 15 project-specific traps   ║');
console.log('║    06-testing-strategy.md  ← Test cases per endpoint        ║');
console.log('║    07-decisions-and-adr.md ← Why decisions were made        ║');
console.log('║    08-change-log.md        ← Audit trail                    ║');
console.log('║    09-known-issues.md      ← Bugs + workarounds             ║');
console.log('║                                                              ║');
console.log('║  .rules/ (AI Guardrails)                                     ║');
console.log('║    01-core-protocol.mdc    ← Non-negotiable rules           ║');
console.log('║    02-architecture-guards.mdc ← Layer boundaries            ║');
console.log('║    03-forbidden-patterns.mdc ← Anti-patterns                ║');
console.log('║    04-self-update-protocol.mdc ← When/how to update .kb    ║');
console.log('║    05-security-and-secrets.mdc ← Secret handling rules     ║');
console.log('║                                                              ║');
console.log('║  .prompts/ (Agent Templates)                                 ║');
console.log('║    claude-implementation.md                                  ║');
console.log('║    cursor-bootstrap.md                                       ║');
console.log('║    gemini-review.md                                          ║');
console.log('║    codex-test-writer.md                                      ║');
console.log('║                                                              ║');
console.log('║  .github/workflows/deploy.yml ← CI/CD for Render            ║');
console.log('╠══════════════════════════════════════════════════════════════╣');
console.log('║  NEXT STEPS:                                                 ║');
console.log('║                                                              ║');
console.log('║  1. git add . && git commit -m "chore: add spec framework"  ║');
console.log('║                                                              ║');
console.log('║  2. In Claude Code or Cursor, start with:                   ║');
console.log('║     "Read AGENTS.md, VISION.md, and STATE.md,               ║');
console.log('║      then implement the first task in the queue"            ║');
console.log('║                                                              ║');
console.log('║  3. For autonomous loop mode (Claude Code):                 ║');
console.log('║     /goal All tasks in Phase 1 of STATE.md are done,        ║');
console.log('║     typecheck and lint pass, STATE.md is updated            ║');
console.log('║                                                              ║');
console.log('║  4. Add RENDER_DEPLOY_HOOK_SERVER, RENDER_DEPLOY_HOOK_WEB, ║');
console.log('║     API_URL, WEB_URL to GitHub Secrets                      ║');
console.log('║                                                              ║');
console.log('║  5. Copy your HTML template files to:                       ║');
console.log('║     apps/web/public/template/  (read-only reference)        ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log('\n');

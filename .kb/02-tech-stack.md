> **Self-Update Protocol:** AI agents MUST update this file after every significant change.
> Append a dated bullet to the `## Change Log` section at the bottom.

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
| tailwindcss | v4 | Utility-first CSS (NEW components only — not for template conversion) |
| bootstrap | 5.3 | Template CSS framework — MUST be installed, template uses it exclusively |
| @tanstack/react-query | latest | Server state management |
| zustand | latest | Client state (cart, auth tokens) |
| zod | latest | Form validation (shared with server) |
| axios | latest | HTTP client (with interceptors for JWT) |
| swiper | 9.x | Product and category carousels (matches template Swiper v9 CDN) |

### Notes on Bootstrap vs Tailwind

- **Bootstrap 5.3** is the primary CSS framework for all HTML-converted components
- **Tailwind v4** is used only for new components with no HTML template equivalent (e.g. admin dashboard widgets)
- Do NOT mix them on the same component
- Install Bootstrap: `pnpm add bootstrap`
- Import in root.tsx: `import 'bootstrap/dist/css/bootstrap.min.css'` and `import 'bootstrap/dist/js/bootstrap.bundle.min.js'`
- The custom `style.css` from the template must also be imported in root.tsx after Bootstrap

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
| stripe | latest | Stripe payments SDK |
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
| Stripe | Card payment processing |
| PayPal | Alternative payment method |

## Environment Variables (Required)

```env
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
STRIPE_SECRET_KEY=sk_live_...          # sk_test_ in development
STRIPE_WEBHOOK_SECRET=whsec_...
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
```

## NEVER ADD These Packages

| Package | Reason |
|---|---|
| mongoose | Using Drizzle ORM + PostgreSQL, not MongoDB |
| prisma | Using Drizzle ORM |
| @sendgrid/mail | Using Brevo REST API directly |
| nodemailer | Using Brevo REST API directly |
| bcryptjs | Use `bcrypt` (native bindings, faster) |
| class-validator | Using Zod |
| sequelize | Using Drizzle ORM |
| typeorm | Using Drizzle ORM |
| next | Using React Router v7 framework mode |
| passport | Using custom JWT middleware |
| express-session | Using stateless JWT |
| connect-mongo | No sessions |
| multer-storage-cloudinary | Use cloudinary SDK directly after multer temp |
| crypto-js | Use Node.js built-in `crypto` module |
| react-bootstrap | Template uses plain Bootstrap 5 classes — no wrapper library needed |
| reactstrap | Same reason as react-bootstrap |
| styled-components | Template uses Bootstrap + style.css |
| emotion | Same as styled-components |

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-06-24 · Added Bootstrap 5.3 + Swiper 9 as required frontend packages; clarified Bootstrap vs Tailwind split

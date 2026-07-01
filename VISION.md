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
5. **Processes payments reliably** — Stripe for cards, PayPal as alternative
6. **Sends transactional emails** — order confirmations, shipping updates, password reset via Brevo
7. **Manages files via Cloudinary** — product images uploaded and served at scale
8. **Gives admins full control** — products, orders, users, coupons, analytics dashboard
9. **Deploys cleanly to Render** — both Express API and React Router SSR app

## ✅ Definition of Done (Project Complete When)

- [ ] All 8 HTML pages converted to React Router routes with real data
- [ ] User can register, verify email, log in, reset password
- [ ] Products loaded from Supabase, with category filter + search
- [ ] Cart persists across sessions (DB-backed for authenticated users)
- [ ] Checkout flow completes a Stripe payment end-to-end
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
| 4 | Shopping Experience (Cart, Checkout, Stripe, Orders) | 🔲 Not Started |
| 5 | Admin System (Dashboard, product/order/user management) | 🔲 Not Started |
| 6 | Advanced Features (Reviews, Wishlist, Coupons, Brevo emails) | 🔲 Not Started |
| 7 | Production Hardening (Tests, CI/CD, Render deploy) | 🔲 Not Started |

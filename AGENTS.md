# AGENTS.md — FreshMart E-Commerce Platform

> This file is auto-loaded by Claude Code, OpenAI Codex, Cursor, Aider, and Gemini CLI.
> Keep it SHORT. Put depth in .kb/ files and load them when needed.
> Critical rules early — agents lose the middle in long sessions.

## 🏪 Project Identity

**FreshMart** — A production e-commerce platform built on:
- **Frontend:** React Router v7 (framework mode) + TypeScript + Tailwind CSS v4
- **Backend:** Express.js + TypeScript
- **Database:** Supabase (PostgreSQL) + Drizzle ORM
- **Payments:** Stripe + PayPal
- **Email:** Brevo REST API (NOT Nodemailer, NOT SendGrid)
- **Images:** Cloudinary
- **Deployment:** Render.com

**HTML design is the source of truth for UI** — all React components MUST match the existing static design pixel-for-pixel.

## 📋 Mandatory First Steps (Every Session)

1. Read `VISION.md` — understand where the project is going
2. Read `STATE.md` — understand what is done, in progress, and next
3. Read `.kb/01-project-overview.md` — endpoints, data models, business rules
4. Read `.kb/05-hallucination-traps.md` — what NOT to do
5. Check `.kb/09-known-issues.md` — bugs and workarounds in effect
6. THEN and only then: begin the assigned task

## 🏗️ Architecture Summary

```
apps/
  web/          ← React Router v7 (SSR, framework mode)
  server/       ← Express.js REST API
packages/
  db/           ← Drizzle schema + migrations (shared)
  types/        ← Shared TypeScript types
  validators/   ← Zod schemas (shared)
```

## ⚡ Critical Rules (Never Violate)

- **NO** hardcoded product data — everything from DB
- **NO** storing credit card numbers — Stripe/PayPal tokens only
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

- `.kb/07-decisions-and-adr.md` — only append, never rewrite
- `packages/db/migrations/` — never delete migration files
- `.github/workflows/deploy.yml` — do not modify unless explicitly asked
- Existing HTML template files in `apps/web/public/template/`

## 🔄 After Every Task

1. Run `pnpm typecheck && pnpm lint` — fix all errors before committing
2. Update `STATE.md` — mark completed items, add next steps
3. Append to `.kb/08-change-log.md`
4. If a new trap was discovered, add it to `.kb/05-hallucination-traps.md`

## 📚 Deep Reading (Load When Needed)

| Topic | File |
|---|---|
| Full API contracts + frontend pages | `.kb/01-project-overview.md` |
| Tech stack details (Bootstrap + Swiper required) | `.kb/02-tech-stack.md` |
| Folder structure + request lifecycle + component map | `.kb/03-architecture.md` |
| Code patterns with ✅/❌ examples | `.kb/04-coding-standards.md` |
| What NOT to do (22 traps) | `.kb/05-hallucination-traps.md` |
| Test cases per endpoint | `.kb/06-testing-strategy.md` |
| Why decisions were made | `.kb/07-decisions-and-adr.md` |
| Active bugs / workarounds | `.kb/09-known-issues.md` |
| **React Router v7 complete guide** | **`.kb/10-react-router-v7-guide.md`** |

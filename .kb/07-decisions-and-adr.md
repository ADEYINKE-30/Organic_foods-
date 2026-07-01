> **Self-Update Protocol:** Append new ADRs. Never rewrite existing ones.
> Append a dated bullet to the `## Change Log` section at the bottom.

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
**Consequences:** Packages linked locally; shared code in `packages/`; single tsconfig.base.json.
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
**Decision:** Add `is_deleted BOOLEAN DEFAULT FALSE` to products; never hard DELETE.
**Consequences:** All product queries must include `.where(eq(products.isDeleted, false))`.
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
- 2026-06-24 · Scaffolded by generate-specs.mjs

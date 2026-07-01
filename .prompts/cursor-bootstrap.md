# Cursor Bootstrap Prompt — FreshMart

## What to Read First

Before writing a single line of code in Cursor, read these files in order:

1. `AGENTS.md` — project rules and stack
2. `VISION.md` — what we're building
3. `STATE.md` — where we are
4. `.kb/05-hallucination-traps.md` — what not to do
5. `.kb/03-architecture.md` — folder structure

## Bootstrap Order (Phase 1 — Start Here)

```
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
```

## File Creation Rules

- Always create files in the monorepo structure above
- Never create files in the root (except config files)
- Always add `.js` extension on imports in .ts files (Node ESM)
- Always export from `index.ts` in each package

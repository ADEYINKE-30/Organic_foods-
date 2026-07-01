> **Self-Update Protocol:** AI agents MUST update this file when new issues are found or resolved.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 09 — Known Issues & Workarounds

> Project is in initial scaffolding phase. Issues will be tracked here as they are discovered.

## Active Bugs

_(none yet)_

## Tech Debt

| Item | Description | Priority |
|---|---|---|
| HTML conversion | All frontend pages are still static HTML. Only `index.html` exists in the template root. Must be converted to React Router v7 routes | High |
| No DB yet | Drizzle schema not yet written; no migrations applied | High |
| No auth yet | JWT auth middleware not yet implemented | High |
| No monorepo yet | pnpm workspace with apps/web, apps/server, packages/ not yet initialized | High |
| Bootstrap not installed | Bootstrap 5.3 must be installed as npm package (not CDN) in apps/web | High |
| Swiper not installed | Swiper 9 must be installed as npm package (not CDN) in apps/web | High |
| Google Fonts CDN | Template loads fonts via CDN link tags; must be moved to root.tsx or @font-face in global CSS | Medium |
| Images not migrated | Product/category images from `images/` folder need to be copied to `apps/web/public/images/` | Medium |
| style.css not integrated | Custom `style.css` from template root must be imported in `apps/web/app/root.tsx` | High |

## Workarounds in Effect

_(none yet)_

## Do Not Touch (Stable Code)

- `apps/web/public/template/` — original HTML files. Reference only, do not modify.

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-06-24 · Updated tech debt to reflect actual template state — monorepo not yet init, Bootstrap/Swiper not installed, images not migrated

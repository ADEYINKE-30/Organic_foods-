> **Self-Update Protocol:** AI agents MUST update this file when new issues are found or resolved.
> Append a dated bullet to the `## Change Log` section at the bottom.

# 09 — Known Issues & Workarounds

> Project is in initial scaffolding phase. Issues will be tracked here as they are discovered.

## Active Bugs

_(none yet)_

## Tech Debt

| Item | Description | Priority |
|---|---|---|
| Images not migrated | ~~Product/category images need copying to apps/web/public/images~~ **Done 2026-07-08** | ~~Medium~~ Resolved |
| HTML conversion | Home page pixel-perfect. Other routes functional Tailwind layouts (not yet pixel-matched to each HTML template) | Medium |
| Bootstrap not installed | Intentionally removed — Tailwind v4 is primary CSS framework per Kiro spec | Resolved |
| style.css not integrated | Custom styles ported to `apps/web/app/index.css` via Tailwind @theme + @layer components | Resolved |

## Workarounds in Effect

_(none yet)_

## Do Not Touch (Stable Code)

- `apps/web/public/template/` — original HTML files. Reference only, do not modify.

## Change Log
- 2026-06-24 · Scaffolded by generate-specs.mjs
- 2026-07-08 · Swiper 9: use `import Swiper, { Navigation } from 'swiper'` — `swiper/modules` does not exist in v9
- 2026-06-24 · Updated tech debt to reflect actual template state — monorepo not yet init, Bootstrap/Swiper not installed, images not migrated

---
description:
alwaysApply: true
---

# Repository Guidelines

0. **Neon is managed by Vercel**
1. **Payload 3 idioms only.** Payload 3 is embedded in Next.js (App Router). Never use Payload 2 patterns
   (separate Express server, `payload.config.ts` outside a Next app, `getPayload` via `payload.init`).
   If unsure, consult `docs/payload/` (local docs folder) or https://payloadcms.com/llms.txt before writing code. You also have Payload skills available.
2. **Ground truth is extracted data, not your memory.** Design values come from `extraction/tokens/`,
   `extraction/css/`, and `extraction/screenshots/`. Never invent colors, fonts, spacing, or breakpoints.
3. **No silent URL changes.** The URL map (`migration/url-map.csv`) is authoritative. Every URL gets a
   status: `preserve`, `301`, or `retire` (deliberate 410). 301/410 entries ship in the same PR as the change.
4. **Small, verifiable slices.** One slice = one PR. Keep PRs reviewable (< ~400 lines of diff where possible).
5. **Commit conventions:** Conventional Commits. Reference the slice ID in the body, e.g. `Slice: P4-S3`.
6. **Never claim completion without running the slice's acceptance checks.** Paste command output in the PR.
7. **Secrets:** none in the repo. All secrets are Vercel environment variables (Production/Preview scoped)
   managed via the dashboard or `vercel env`; `.env.local` for local dev; `.env.example` documents every var.
8. **Context7 before code (the doc prehook).** Before writing or editing ANY Payload, Next.js, or Tailwind
   code, the agent MUST first query Context7 for current docs (`use library /payloadcms/payload`,
   `/vercel/next.js` as applicable). Enforced by hooks (P0-S5), not agent discretion. Rationale: Payload 3
   post-dates most training data.
9. **One database: Postgres (Neon).** This project uses `@payloadcms/db-postgres` only. Do not introduce
    a second adapter. Neon is managed by Vercel.
    - The Vercel-managed Neon project (`lively-voice-17562381`) has 3 branches: `main`,
      `preview/dev`, `preview/reskin`. All Vercel env pulls (`vercel env pull`) point at `main` only.
    - To target another branch locally use neonctl's native flow (the repo is linked via `.neon`):
      `neon checkout <branch>` (e.g. `neon checkout preview/reskin`) then `neon env pull`.
      `env pull` refreshes `DATABASE_URL`/`DATABASE_URL_UNPOOLED`/`NEON_*` in `.env` in place and
      preserves other lines. Never paste connection strings by hand — deleted/recreated branches
      leave stale endpoints that fail with `28P01 password authentication failed`.
    - Note: `neon env pull` does not update `POSTGRES_URL`; the Payload config prefers
      `DATABASE_URL`, so that is fine, but anything reading `POSTGRES_URL` directly still sees `main`.
10. **Blob** This holds all public data for Payload. It's hosted on Vercel.

## Project Structure & Module Organization

This is a TypeScript website built with Next.js App Router and Payload CMS. Application and CMS code lives in `src/`: routes in `src/app/`, content models in `src/collections/`, reusable page sections in `src/blocks/` and `src/heros/`, and shared UI in `src/components/`. Keep Payload hooks, access rules, plugins, and utilities in their matching `src/` directories. Static files belong in `public/`; database migrations belong in `src/migrations/`. Tests are split between `tests/int/` (Vitest) and `tests/e2e/` (Playwright).

## Build, Test, and Development Commands

- `pnpm install` installs dependencies (Node `>=24.15.0`; pnpm `10`).
- `pnpm dev` starts the local application at `http://localhost:3000`.
- `pnpm lint` runs ESLint; use `pnpm lint:fix` for safe automatic fixes.
- `pnpm test:int` runs integration tests in jsdom.
- `pnpm test:e2e` starts the app if needed and runs Chromium Playwright tests.
- `pnpm test` runs both suites; `pnpm build` generates Payload artifacts and builds Next.js.

Copy `.env.example` to `.env` before local development. Never commit credentials. Schema changes that need deployment should include a migration created with `pnpm payload migrate:create`.

## Coding Style & Naming Conventions

Use TypeScript and React components. Follow `.editorconfig`: two spaces, LF endings, UTF-8, and a final newline. Prettier uses single quotes, no semicolons, trailing commas, and 100-column lines. Run linting before submitting. Name React components in `PascalCase`; use `camelCase` for functions and variables. Use descriptive, co-located files rather than broad shared abstractions.

## Testing Guidelines

Name integration tests `*.int.spec.ts` under `tests/int/`; keep browser scenarios under `tests/e2e/`. Add or update the smallest relevant test for behavior changes. Ensure `pnpm lint` and the applicable test command pass before opening a pull request.

## Commit & Pull Request Guidelines

The existing history is minimal, so use concise imperative commit subjects, e.g. `Add homepage testimonial block`. Keep commits focused. Pull requests should state the behavior change, link the related issue when available, list validation performed, and include screenshots for visible UI changes. Call out migrations and required environment changes explicitly.

# Architecture Map

## Stack

- Next.js App Router + React + TypeScript; package manager: pnpm; host: Vercel
- Payload 3 embedded in Next via `@payloadcms/next` — not a separate Express server
- DB: Neon Postgres via `@payloadcms/db-vercel-postgres` in `src/payload.config.ts` (`push: false`; migrations only)
- Media: Vercel Blob (`@payloadcms/storage-vercel-blob`) for the `media` collection

## Layout

- `src/app/(frontend)/` — public site (`[slug]`, posts, search, preview, sitemaps)
- `src/app/(payload)/` — admin UI + REST/GraphQL API routes
- `src/collections/` — Pages, Posts, Media, Categories, Users
- `src/blocks/`, `src/heros/` — page sections and heroes (`RenderBlocks.tsx`)
- `src/Header/`, `src/Footer/` — globals
- `src/plugins/`, `src/hooks/`, `src/fields/`, `src/utilities/`, `src/migrations/`
- `tests/int/` (Vitest), `tests/e2e/` (Playwright)
- Entry: `src/payload.config.ts`; generated types: `src/payload-types.ts`

## Anti-assumptions

- Do not use Payload 2 patterns (separate server, `payload.init`, config outside the Next app)
- Do not invent a second DB adapter or Mongo — Neon Postgres only
- Do not invent design tokens/colors — use `extraction/` when present (may not exist yet)
- Do not invent URL changes — `migration/url-map.csv` is authoritative when present
- Prefer reading live `src/` over template memory; this started from the Payload website template and is being customized

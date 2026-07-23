# Repository Guidelines

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

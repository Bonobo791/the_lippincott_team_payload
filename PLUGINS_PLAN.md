# Payload plugin rollout

## Summary

Extend the existing Payload template’s Form Builder, SEO, Search, Nested Docs, and Redirects setup; add Import/Export, MCP, Better Editor, and Activity Log. Keep Payload’s built-in user auth, Vercel Blob, Neon PostgreSQL, and staff-wide admin access.

## Key changes

- Replace `@payloadcms/db-vercel-postgres` with `@payloadcms/db-postgres`, retaining `POSTGRES_URL` for Neon; keep Vercel Blob. Generate and register a production migration for all schema changes.
- Keep existing Form Builder and `FormBlock`; preserve stored submissions only—no Resend configuration or form email notifications.
- Add minimal draft-enabled `neighborhoods` and `testimonials` collections. Neighborhoods support nested community-guide trees; testimonials are CMS/import sources only, with no public archive or display block.
- Reconfigure Nested Docs for `pages` and `neighborhoods`, while preserving the existing nested Categories behavior. Add hierarchical page/neighborhood URL resolution, breadcrumbs, nested frontend routes, and canonical URL generation shared by SEO, search results, and reference redirects.
- Expand SEO metadata and previews to Pages, Posts, Neighborhoods, and Testimonials. Keep public URLs correct for root/nested pages, posts, and neighborhoods.
- Expand Search syncing and the search UI to Pages, Posts, and Neighborhoods. Search results must render collection-aware links rather than assuming every result is a post.
- Extend Redirects reference targets to routable public collections, preserve cache revalidation, and support nested destination URLs. Do not add an automated P5-S4 redirect-map seed.
- Add Import/Export with jobs enabled only for Pages, Posts, Neighborhoods, Testimonials, Forms, and Redirects. Exclude Users, Media binaries, form submissions, jobs, and audit records.
- Add MCP behind a required Vercel bearer-secret environment variable. Permit read-only access only to approved content collections plus Header/Footer globals; exclude Users, form submissions, audit data, jobs, and all mutations.
- Add Better Editor for block-editing live-preview iframe behavior, integrating with—not replacing—the existing Payload live preview configuration.
- Add Activity Log for editorial collection/global changes. Before installation, verify its current README/npm configuration, Payload 3.86 compatibility, retention behavior, and required environment/config options; pin the verified compatible release.
- Install all official Payload packages at one compatible synchronized version. Do not install Multi-Tenant, Better Auth, or Resend.

## Interfaces and configuration

- Add required environment validation/documentation for `MCP_BEARER_TOKEN`; requests without a valid bearer token receive no MCP access.
- Preserve existing `users` auth and the current rule that any authenticated staff user can administer editorial content.
- Regenerate Payload types/import map after plugin and collection changes; update generated migration registration.
- Preserve unrelated uncommitted changes in `.env.example`, `src/payload.config.ts`, and UI components.

## Test plan

- Run `pnpm lint`, `pnpm test:int`, `pnpm test:e2e`, and `pnpm build`.
- Add focused integration coverage for nested URLs/breadcrumbs, SEO URL generation, multi-collection search sync/results, redirect destinations, and import/export collection restrictions.
- Exercise form submission storage, Activity Log event creation, and Better Editor admin availability.
- Verify MCP: unauthenticated/wrong-token rejection; authenticated reads for allowed collections/globals; rejected Users and mutation attempts.
- Apply the generated migration to a Neon staging database before production deployment.

## Assumptions

- No existing-user migration is needed because Better Auth is excluded.
- Testimonials remain back-office content until a later display feature.
- No initial redirect map will be imported.
- Community plugin configuration is determined from its verified upstream documentation at implementation time, per the stated ground rule.

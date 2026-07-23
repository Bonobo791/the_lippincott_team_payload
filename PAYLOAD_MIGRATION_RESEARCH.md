# Payload migration prompt: verified remediation

## Verdict

The earlier advice to delete every `payload_migrations` row with `batch = -1`
and then run migrations was **not a safe general fix**.

In Payload v3.86.0, a development schema push adds (or refreshes) the marker
`{ name: 'dev', batch: -1 }`. `payload migrate` prompts whenever it finds any
row with `batch === -1`. If confirmed, it only ignores that row **in memory**
and attempts every migration that is not otherwise recorded; it does not
delete the marker. If declined or cancelled, it exits with status 0. Therefore
`payload migrate && pnpm build` can proceed to a successful build while no
migration was run.

Sources:

- [Payload v3.86.0 `pushDevSchema` source](https://github.com/payloadcms/payload/blob/v3.86.0/packages/drizzle/src/utilities/pushDevSchema.ts#L64-L82)
- [Payload v3.86.0 `migrate` source](https://github.com/payloadcms/payload/blob/v3.86.0/packages/drizzle/src/migrate.ts#L27-L53)

## What this repository means

The sole migration, `20260409_155721_initial`, is an initial-schema migration
with unconditional `CREATE TYPE` and `CREATE TABLE` statements. If the target
database is the one already modified by Payload push mode, confirming the
prompt—or deleting only the marker before running the command—will make
Payload try that initial migration. It should fail on an existing type/table;
it must not be run blindly.

This follows Payload's documented distinction: use push mode for a **local,
disposable development database**, do not mix it with migrations on that
database, and run committed migrations against production before the build.

- [Payload migration workflow for Postgres](https://payloadcms.com/docs/database/migrations#postgres-migrations)
- [Payload’s CI example: `payload migrate && pnpm build`](https://payloadcms.com/docs/database/migrations#when-to-run-migrations)

## Correct recovery path

First, take a database backup and inspect the target; do not assume that a
local `.env` and Vercel point to different Neon databases.

```sql
SELECT id, name, batch, created_at, updated_at
FROM payload_migrations
ORDER BY id;
```

Choose exactly one path after verifying the schema and data:

1. **Disposable/empty database:** replace or reset it, then run the committed
   initial migration. Payload documents `migrate:fresh` as dropping all
   entities and rerunning migrations, so it is only appropriate for a
   deliberately disposable database.
2. **Keep the existing push-created database and its data:** first verify that
   its schema matches `20260409_155721_initial`. Then deliberately *baseline*
   that exact migration as already applied and remove the dev-push marker in
   the same reviewed database change. This is a manual operational
   reconciliation, not a documented Payload CLI command; it must not be done
   without the schema check and backup.

After either path, run `pnpm payload migrate:status` and then `pnpm run ci`.
The migration step should finish without a prompt and report no pending
migrations before the build begins.

## Future workflow

Use a separate local/sandbox database for `pnpm dev` and keep Payload push
disabled there as well. This repository uses migrations only: after every
schema change, create, review, commit, and apply the migration locally before
starting the app. Use Preview as the proving ground before Production; both
databases are changed only by the CI migration step. This policy avoids the
dev-schema drift that caused the current incident.

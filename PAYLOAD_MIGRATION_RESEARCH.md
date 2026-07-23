# Payload migration prompt: Vercel-managed Neon remediation

## What the prompt means

Payload v3.86.0 records a development schema push as `{ name: 'dev', batch: -1 }`
in `payload_migrations`. When `payload migrate` sees that row, it prompts before
running migrations. In a non-interactive Vercel build, the prompt is cancelled
with exit code 0, so `payload migrate && pnpm build` continues without applying
any migrations.

The production schema may therefore be push-created while the committed initial
migration remains unrecorded. Preview Neon branches inherit the marker from their
parent, so redeploying Preview does not clear the prompt.

## Vercel configuration

In Vercel Storage, connect the managed Neon database to Development, Preview, and
Production. Enable **Neon: Create database branch for deployment** for Preview
only; leave Production unchecked. Enable **Resource must be active before
deployment**. Keep the project build command as `pnpm run ci`.

Create a dedicated Neon `dev` branch only after Production is baselined. Store its
connection string in the untracked `.env.local` as `DATABASE_URL`; never use a
Production- or Preview-scope URL locally.

## Production baseline

Do this once, manually, and only after a Production snapshot exists:

1. Create a Neon branch from Production as the restore point.
2. Compare Production's schema with the schema produced by
   `20260409_155721_initial` on a disposable database.
3. Inspect the migration state:

   ```sql
   SELECT id, name, batch, created_at, updated_at
   FROM payload_migrations
   ORDER BY id;
   ```

4. Continue only if the table contains the expected `dev` / `batch = -1` marker
   and no `20260409_155721_initial` record. In one reviewed transaction, replace
   the marker with the initial migration record:

   ```sql
   BEGIN;

   DELETE FROM payload_migrations
   WHERE name = 'dev' AND batch = -1;

   INSERT INTO payload_migrations (name, batch)
   VALUES ('20260409_155721_initial', 1);

   COMMIT;
   ```

If the schema or migration rows differ from those preconditions, stop and
investigate. Do not delete the marker by itself, run the initial migration against
an existing schema, or run `migrate:fresh` against a database with retained data.

5. Delete existing `preview/*` Neon branches so future Preview deployments clone
   the clean Production state. Create the local `dev` branch from that clean state.

## Verification and future changes

Run `pnpm payload migrate:status` against the baselined branch, then deploy. The
next Preview and Production logs must run migrations without the prompt and show
no pending initial migration.

For future schema changes, generate, review, and commit a migration. Test it in a
Preview deployment before merging to Production. The CI command uses a direct
connection for the migration step when `DATABASE_URL_UNPOOLED` or
`POSTGRES_URL_NON_POOLING` is available, then builds with the normal connection.

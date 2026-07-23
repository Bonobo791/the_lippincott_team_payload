import type { CollectionBeforeChangeHook } from 'payload'
import { slugify } from 'payload/shared'

/**
 * Guarantees a URL slug exists before save.
 * Live Preview and frontend routes both require `slug`; Payload's built-in
 * slugField can leave it null after autosave version thresholds / overrides.
 */
export const ensureSlug: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data

  const existing = typeof data.slug === 'string' ? data.slug.trim() : ''
  if (existing) return data

  const fromTitle = typeof data.title === 'string' ? data.title.trim() : ''
  if (!fromTitle) return data

  const slug = slugify(fromTitle)

  // #region agent log
  fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
    body: JSON.stringify({
      sessionId: '874f00',
      runId: 'post-fix',
      hypothesisId: 'G',
      location: 'hooks/ensureSlug.ts',
      message: 'Backfilled missing slug from title',
      data: { title: fromTitle, slug },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  return {
    ...data,
    slug,
  }
}

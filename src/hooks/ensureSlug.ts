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

  return {
    ...data,
    slug: slugify(fromTitle),
  }
}

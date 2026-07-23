import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  // #region agent log
  fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
    body: JSON.stringify({
      sessionId: '874f00',
      runId: 'pre-fix',
      hypothesisId: 'A-B',
      location: 'utilities/generatePreviewPath.ts',
      message: 'Generated preview path',
      data: {
        collection,
        slug,
        previewPath: `${collectionPrefixMap[collection]}/${encodedSlug}`,
        envServerURL: process.env.NEXT_PUBLIC_SERVER_URL || null,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  return url
}

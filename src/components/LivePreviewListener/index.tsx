'use client'
import { getClientSideURL } from '@/utilities/getURL'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const serverURL = getClientSideURL()

  // #region agent log
  useEffect(() => {
    const parentOrigin = typeof window !== 'undefined' ? window.location.origin : null
    fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
      body: JSON.stringify({
        sessionId: '874f00',
        runId: 'pre-fix',
        hypothesisId: 'A-B',
        location: 'LivePreviewListener/index.tsx:mount',
        message: 'LivePreviewListener mounted',
        data: {
          serverURL,
          windowOrigin: parentOrigin,
          href: typeof window !== 'undefined' ? window.location.href : null,
          envServerURL: process.env.NEXT_PUBLIC_SERVER_URL || null,
          originsMatch: serverURL === parentOrigin,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})

    const onMessage = (event: MessageEvent) => {
      const dataType =
        event.data && typeof event.data === 'object' ? (event.data as { type?: string }).type : null
      fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
        body: JSON.stringify({
          sessionId: '874f00',
          runId: 'pre-fix',
          hypothesisId: 'B-E',
          location: 'LivePreviewListener/index.tsx:message',
          message: 'postMessage received in preview iframe',
          data: {
            eventOrigin: event.origin,
            serverURL,
            originMatchesServerURL: event.origin === serverURL,
            dataType,
            isDocumentEvent: dataType === 'payload-document-event',
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [serverURL])
  // #endregion

  // #region agent log
  const refresh = useCallback(() => {
    fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
      body: JSON.stringify({
        sessionId: '874f00',
        runId: 'pre-fix',
        hypothesisId: 'C-E',
        location: 'LivePreviewListener/index.tsx:refresh',
        message: 'router.refresh invoked by Live Preview',
        data: { serverURL, href: typeof window !== 'undefined' ? window.location.href : null },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    router.refresh()
  }, [router, serverURL])
  // #endregion

  return <PayloadLivePreview refresh={refresh} serverURL={serverURL} />
}

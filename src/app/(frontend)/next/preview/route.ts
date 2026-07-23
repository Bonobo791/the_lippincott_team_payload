import type { PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    // #region agent log
    fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
      body: JSON.stringify({
        sessionId: '874f00',
        runId: 'pre-fix',
        hypothesisId: 'A',
        location: 'next/preview/route.ts:secret',
        message: 'Preview rejected: secret mismatch',
        data: { path, hasSecret: Boolean(previewSecret) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let authResult

  try {
    authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    // #region agent log
    fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
      body: JSON.stringify({
        sessionId: '874f00',
        runId: 'pre-fix',
        hypothesisId: 'A',
        location: 'next/preview/route.ts:auth-error',
        message: 'Preview auth threw',
        data: { path },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()
  // Keep current control-flow (authResult object is always truthy) so we observe
  // real runtime behavior; do not change auth gate until logs confirm.
  const user = authResult
  const actualUser = authResult && typeof authResult === 'object' && 'user' in authResult
    ? authResult.user
    : null

  // #region agent log
  fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
    body: JSON.stringify({
      sessionId: '874f00',
      runId: 'pre-fix',
      hypothesisId: 'A',
      location: 'next/preview/route.ts:auth-shape',
      message: 'Preview auth result shape',
      data: {
        path,
        authResultTruthy: Boolean(authResult),
        actualUserPresent: Boolean(actualUser),
        keys:
          authResult && typeof authResult === 'object' ? Object.keys(authResult as object) : null,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  if (!user) {
    draft.disable()
    // #region agent log
    fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
      body: JSON.stringify({
        sessionId: '874f00',
        runId: 'pre-fix',
        hypothesisId: 'A',
        location: 'next/preview/route.ts:no-user',
        message: 'Preview rejected: no authenticated user',
        data: { path },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable()

  // #region agent log
  fetch('http://127.0.0.1:7853/ingest/115c7133-2281-4207-b019-5c4451add4c3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '874f00' },
    body: JSON.stringify({
      sessionId: '874f00',
      runId: 'pre-fix',
      hypothesisId: 'A',
      location: 'next/preview/route.ts:enable',
      message: 'Draft mode enabled; redirecting to preview path',
      data: {
        path,
        actualUserPresent: Boolean(actualUser),
        envServerURL: process.env.NEXT_PUBLIC_SERVER_URL || null,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  redirect(path)
}

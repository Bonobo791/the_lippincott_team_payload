import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, publishedAt, title } = post

  return (
    <div className="relative flex min-h-[320px] items-end overflow-hidden text-white md:min-h-[380px]">
      {heroImage && typeof heroImage === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={heroImage} />
      )}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="container relative z-10 py-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight text-balance md:text-5xl">
            {title}
          </h1>
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="mt-4 block text-sm font-semibold uppercase tracking-wider text-white/70"
            >
              {formatDateTime(publishedAt)}
            </time>
          )}
        </div>
      </div>
    </div>
  )
}

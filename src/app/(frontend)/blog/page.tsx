import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatDateTime } from '@/utilities/formatDateTime'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      heroImage: true,
      publishedAt: true,
      meta: true,
    },
  })

  return (
    <>
      <section className="bg-zebra py-16">
        <div className="mx-auto max-w-site px-6 text-center">
          <h1 className="font-display text-4xl font-semibold text-balance md:text-5xl">Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Northwest Houston real estate insights, market updates, and expert guides.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post) => {
              const imageUrl =
                typeof post.heroImage === 'object' && post.heroImage?.url
                  ? getMediaUrl(post.heroImage.url, post.heroImage.updatedAt)
                  : ''
              return (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-xl"
                >
                  <Link href={`/blog/${post.slug}/`} className="block overflow-hidden">
                    {imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={typeof post.heroImage === 'object' ? post.heroImage?.alt || '' : ''}
                        loading="lazy"
                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="p-6">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs font-semibold uppercase tracking-wider text-ink-faint"
                      >
                        {formatDateTime(post.publishedAt)}
                      </time>
                    )}
                    <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="transition-colors group-hover:text-brand"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.meta?.description && (
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {post.meta.description}
                      </p>
                    )}
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="mt-4 inline-block font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand hover:text-brand-dark"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog',
    description:
      'Northwest Houston real estate insights — market updates, buying and selling guides from The Lippincott Team.',
  }
}

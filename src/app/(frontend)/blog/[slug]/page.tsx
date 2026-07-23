import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { ArrowLeft } from 'lucide-react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { CtaBandBlockComponent } from '@/blocks/CtaBand/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return (posts.docs as Array<{ id: number; slug?: string | null }>).map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function BlogPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/blog/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <>
      <article className="bg-white pb-20">
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}

        <PostHero post={post} />

        <div className="mx-auto mt-12 max-w-3xl px-6">
          <Link
            href="/blog/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="prose prose-lg max-w-none">
            <RichText data={post.content} enableGutter={false} />
          </div>
        </div>
      </article>

      <CtaBandBlockComponent
        blockType="ctaBand"
        headingLight="Ready to Start Your"
        headingBold="Home Journey?"
        subheading="Let’s discuss how we can help you achieve your real estate goals. Our team is ready to provide expert guidance and personalized service."
        primaryCta={{ label: 'Schedule a Consultation', url: '/contact/' }}
        secondaryCta={{ label: 'View Listings', url: '/contact/' }}
        showContact={false}
      />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

import Link from 'next/link'
import React from 'react'

import type { Community, CommunityGridBlock } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const CommunityGridBlockComponent: React.FC<CommunityGridBlock> = ({
  headingLight,
  headingBold,
  subheading,
  cardLabel,
  communities,
}) => {
  const items = (communities || []).filter(
    (c): c is Community => typeof c === 'object' && c !== null,
  )

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-site px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl">
            <span className="font-light">{headingLight} </span>
            <span className="font-bold">{headingBold}</span>
          </h2>
          {subheading && <p className="mt-4 leading-relaxed text-ink-soft">{subheading}</p>}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((community) => {
            const imageUrl =
              typeof community.image === 'object' && community.image?.url
                ? getMediaUrl(community.image.url, community.image.updatedAt)
                : ''
            return (
              <Link
                key={community.id}
                href={community.listingsUrl || '/contact/'}
                {...(community.listingsUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative block h-64 overflow-hidden rounded-2xl md:h-72"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={typeof community.image === 'object' ? community.image?.alt || '' : ''}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                    {community.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 transition-colors group-hover:text-white">
                    {cardLabel || 'View Listings'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

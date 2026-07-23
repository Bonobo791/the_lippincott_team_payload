import { KeyRound, Tag, Truck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { ServingSplitBlock } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const icons = { buy: KeyRound, sell: Tag, relocate: Truck } as const

export const ServingSplitBlockComponent: React.FC<ServingSplitBlock> = ({
  badge,
  heading,
  body,
  quickLinks,
  stats,
  image,
}) => {
  const imageUrl =
    typeof image === 'object' && image?.url ? getMediaUrl(image.url, image.updatedAt) : ''

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="text-center lg:text-left">
          <p className="inline-block rounded-full bg-brand-light px-5 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            {badge}
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-ink text-balance">
            {heading}
          </h2>
          <p className="mt-6 leading-relaxed text-ink-soft">{body}</p>

          {quickLinks && quickLinks.length > 0 && (
            <ul className="mt-8 flex justify-center gap-8 lg:justify-start">
              {quickLinks.map((link, i) => {
                const Icon = icons[link.icon]
                return (
                  <li key={i}>
                    <Link href={link.url} className="group flex flex-col items-center gap-3">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-brand-light">
                        <Icon className="h-6 w-6 text-brand" strokeWidth={1.75} />
                      </span>
                      <span className="text-sm font-semibold text-ink group-hover:text-brand">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          {stats && stats.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5">
                  <p className="font-display text-2xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-ink-soft">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={typeof image === 'object' ? image?.alt || '' : ''}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

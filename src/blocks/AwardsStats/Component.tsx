import { Home, Star, Trophy } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { AwardsStatsBlock } from '@/payload-types'

const statIcons = {
  home: Home,
  trophy: Trophy,
  star: Star,
} as const

export const AwardsStatsBlockComponent: React.FC<AwardsStatsBlock> = ({
  heading,
  leadBold,
  leadLinkLabel,
  leadLinkUrl,
  leadTail,
  intro,
  awards,
  ctaLabel,
  ctaUrl,
  stats,
}) => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-site gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-light text-balance md:text-[2.75rem] md:leading-tight">
            {heading}
          </h2>

          {(leadBold || leadLinkLabel) && (
            <p className="mt-6 leading-relaxed text-ink">
              <strong className="font-bold">
                {leadBold}{' '}
                {leadLinkLabel && leadLinkUrl && (
                  <>
                    <a
                      href={leadLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold italic text-brand underline decoration-brand/40 hover:decoration-brand"
                    >
                      {leadLinkLabel}
                    </a>{' '}
                  </>
                )}
                {leadTail}
              </strong>
            </p>
          )}
          {intro && <p className="mt-4 text-ink-soft">{intro}</p>}

          <dl className="mt-6 space-y-5">
            {(awards || []).map((award, i) => (
              <div key={i}>
                <dt className="font-bold text-ink">
                  {award.name}
                  {award.linkLabel && award.linkUrl && (
                    <>
                      {' ('}
                      <a
                        href={award.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold italic text-brand underline decoration-brand/40 hover:decoration-brand"
                      >
                        {award.linkLabel}
                      </a>
                      {')'}
                    </>
                  )}
                  :
                </dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                  {award.description}
                </dd>
              </div>
            ))}
          </dl>

          {ctaLabel && ctaUrl && (
            <Link
              href={ctaUrl}
              className="mt-8 inline-block font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand underline decoration-2 underline-offset-8 hover:text-brand-dark"
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
          {(stats || []).map((stat, i) => {
            const Icon = statIcons[stat.icon]
            return (
              <div
                key={i}
                className="flex-1 rounded-2xl bg-gray-50 px-6 py-10 text-center ring-1 ring-black/5"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                  <Icon className="h-7 w-7 text-brand" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-4xl font-bold text-ink">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-ink-soft">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

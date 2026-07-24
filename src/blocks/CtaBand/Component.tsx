import { Mail, Phone } from 'lucide-react'
import React from 'react'

import type { CtaBandBlock } from '@/payload-types'
import { CTAButton } from '@/components/CTAButton'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const CtaBandBlockComponent: React.FC<CtaBandBlock> = async ({
  headingLight,
  headingBold,
  subheading,
  primaryCta,
  secondaryCta,
  showContact,
}) => {
  const settings = showContact ? await getCachedGlobal('site-settings', 1)() : null

  return (
    <section className="bg-zebra py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-light leading-tight text-balance md:text-5xl">
          {headingLight} <span className="font-bold text-brand">{headingBold}</span>
        </h2>
        {subheading && <p className="mt-5 leading-relaxed text-ink-soft">{subheading}</p>}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton href={primaryCta.url}>{primaryCta.label}</CTAButton>
          <CTAButton href={secondaryCta.url} variant="dark">
            {secondaryCta.label}
          </CTAButton>
        </div>

        {settings && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a
              href={settings.phoneHref}
              className="flex items-center gap-2.5 font-display font-semibold text-ink hover:text-brand"
            >
              <Phone className="h-5 w-5 text-brand" />
              {settings.phone}
            </a>
            <span className="hidden h-6 w-px bg-black/15 sm:block" aria-hidden />
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2.5 font-display font-semibold text-ink hover:text-brand"
            >
              <Mail className="h-5 w-5 text-brand" />
              {settings.email}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

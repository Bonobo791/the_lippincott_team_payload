import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

/** Interior page hero — full-bleed image, dark overlay, centered title. */
export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden text-white md:min-h-[400px]">
      {media && typeof media === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={media} />
      )}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="container relative z-10 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          {richText && (
            <RichText
              className="font-display [&_h1]:text-4xl [&_h1]:font-medium [&_h1]:text-balance md:[&_h1]:text-6xl [&_p]:mt-4 [&_p]:text-lg [&_p]:text-white/85"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-8 flex justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

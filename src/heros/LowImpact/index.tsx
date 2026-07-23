import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

/** Simple centered title band over the zebra pattern. */
export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="bg-zebra py-16">
      <div className="container text-center">
        <div className="mx-auto max-w-3xl font-display [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:text-balance md:[&_h1]:text-5xl [&_p]:mt-4 [&_p]:text-lg [&_p]:text-ink-soft">
          {children || (richText && <RichText data={richText} enableGutter={false} />)}
        </div>
      </div>
    </div>
  )
}

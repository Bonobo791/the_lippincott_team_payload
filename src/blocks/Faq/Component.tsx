import React from 'react'

import type { FaqBlock } from '@/payload-types'
import { FaqAccordionClient } from './Component.client'

export const FaqBlockComponent: React.FC<FaqBlock> = ({ heading, intro, items }) => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl font-light text-balance">{heading}</h2>
        {intro && <p className="mt-4 leading-relaxed text-ink-soft">{intro}</p>}
        <FaqAccordionClient items={items || []} />
      </div>
    </section>
  )
}

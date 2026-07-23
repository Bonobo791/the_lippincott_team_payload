import React from 'react'

import type { InfoGridBlock } from '@/payload-types'

export const InfoGridBlockComponent: React.FC<InfoGridBlock> = ({ items }) => {
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto grid max-w-site gap-x-16 gap-y-12 px-6 md:grid-cols-2">
        {(items || []).map((item, i) => (
          <div key={item.id || i}>
            <div className="h-[3px] w-10 rounded bg-brand" aria-hidden />
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

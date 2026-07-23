import { Bell, LineChart, Search } from 'lucide-react'
import React from 'react'

import type { FeatureCardsBlock } from '@/payload-types'

const icons = { search: Search, chart: LineChart, bell: Bell } as const

export const FeatureCardsBlockComponent: React.FC<FeatureCardsBlock> = ({ cards }) => {
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto grid max-w-site gap-6 px-6 md:grid-cols-3">
        {(cards || []).map((card, i) => {
          const Icon = icons[card.icon]
          return (
            <div
              key={i}
              className="rounded-2xl bg-gray-50 p-10 text-center ring-1 ring-black/5 transition-shadow hover:shadow-lg"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                <Icon className="h-7 w-7 text-brand" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{card.body}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

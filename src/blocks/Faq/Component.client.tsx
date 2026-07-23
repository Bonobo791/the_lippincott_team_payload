'use client'

import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import type { FaqBlock } from '@/payload-types'

export const FaqAccordionClient: React.FC<{ items: NonNullable<FaqBlock['items']> }> = ({
  items,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={item.id || i}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-lg font-medium text-ink">
                <span className="mr-2 text-brand">{i + 1}.</span>
                {item.question}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="leading-relaxed text-ink-soft">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

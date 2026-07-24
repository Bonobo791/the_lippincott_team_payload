import { Star } from 'lucide-react'
import React from 'react'

import type { TrustBarBlock } from '@/payload-types'

const Stars: React.FC = () => (
  <div className="flex justify-center gap-0.5" aria-label="5 star rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
)

const SourceMark: React.FC<{ source: 'google' | 'har' }> = ({ source }) => {
  if (source === 'google') {
    return (
      <span className="font-display text-3xl font-medium tracking-tight" aria-label="Google">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    )
  }
  return (
    <span className="font-display text-3xl font-bold tracking-tight text-[#0073AE]" aria-label="HAR.com">
      HAR<span className="text-ink">.com</span>
    </span>
  )
}

export const TrustBarBlockComponent: React.FC<TrustBarBlock> = ({
  headingLight,
  headingBold,
  caption,
  ratings,
}) => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-site px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl">
          <span className="font-light">{headingLight} </span>
          <span className="font-bold">{headingBold}</span>
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-24">
          {(ratings || []).map((rating, i) => (
            <a
              key={i}
              href={rating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <SourceMark source={rating.source} />
              <div className="mt-2 transition-transform group-hover:scale-105">
                <Stars />
              </div>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {rating.score} Rating
              </p>
            </a>
          ))}
        </div>

        {caption && <p className="mx-auto mt-6 max-w-md text-sm italic text-ink-soft">{caption}</p>}
      </div>
    </section>
  )
}

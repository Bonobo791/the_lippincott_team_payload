import React from 'react'

import type { ReviewsCarouselBlock, Testimonial } from '@/payload-types'
import { CTAButton } from '@/components/CTAButton'
import { ReviewsCarouselClient } from './Component.client'

export const ReviewsCarouselBlockComponent: React.FC<ReviewsCarouselBlock> = ({
  heading,
  cta,
  testimonials,
}) => {
  const items = (testimonials || []).filter(
    (t): t is Testimonial => typeof t === 'object' && t !== null,
  )

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-site px-6">
        <div className="grid overflow-hidden rounded-3xl bg-black lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col items-center justify-center gap-7 p-10 text-center lg:p-14">
            <h2 className="font-display text-3xl font-light leading-snug text-white text-balance">
              {heading}
            </h2>
            <CTAButton href={cta.url} className="px-8 py-3 text-xs">
              {cta.label}
            </CTAButton>
          </div>

          <ReviewsCarouselClient testimonials={items} />
        </div>
      </div>
    </section>
  )
}

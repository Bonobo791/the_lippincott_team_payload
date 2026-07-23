'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

import type { Testimonial } from '@/payload-types'

export const ReviewsCarouselClient: React.FC<{ testimonials: Testimonial[] }> = ({
  testimonials,
}) => {
  const [index, setIndex] = useState(0)
  const count = testimonials.length

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count])

  useEffect(() => {
    if (count < 2) return
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
  }, [go, count])

  if (count === 0) return null
  const current = testimonials[index]

  return (
    <>
      <div className="relative m-4 flex items-center rounded-2xl bg-[#1A1A1A] p-10 lg:m-6 lg:p-16">
        {count > 1 && (
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/50 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <figure key={current.id} className="w-full text-center">
          <blockquote className="mx-auto max-w-xl text-lg italic leading-relaxed text-white/90">
            {current.quote}
          </blockquote>
          <figcaption className="mt-6">
            <p className="text-xs uppercase tracking-wider text-white/50">Feedback on</p>
            <p className="mt-1 text-sm font-medium text-white/80">{current.location}</p>
          </figcaption>
        </figure>

        {count > 1 && (
          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/50 transition-colors hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="col-span-full mt-5 flex justify-center gap-2 pb-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-brand' : 'w-2 bg-white/25'}`}
            />
          ))}
        </div>
      )}
    </>
  )
}

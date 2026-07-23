import { Play } from 'lucide-react'
import React from 'react'

import type { VideoTestimonialBlock } from '@/payload-types'
import { CTAButton } from '@/components/CTAButton'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoTestimonialBlockComponent: React.FC<VideoTestimonialBlock> = ({
  headingLight,
  headingBold,
  video,
  poster,
  cta,
}) => {
  const videoUrl =
    typeof video === 'object' && video?.url ? getMediaUrl(video.url, video.updatedAt) : ''
  const posterUrl =
    typeof poster === 'object' && poster?.url ? getMediaUrl(poster.url, poster.updatedAt) : ''

  return (
    <section className="bg-zebra py-20">
      <div className="mx-auto max-w-site px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl">
          <span className="font-light">{headingLight} </span>
          <span className="font-bold">{headingBold}</span>
        </h2>

        <div className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl shadow-2xl">
          {videoUrl ? (
            <video controls preload="none" poster={posterUrl || undefined} className="w-full">
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={posterUrl} alt="Client testimonial" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-xl">
                  <Play className="h-7 w-7 fill-current" />
                </span>
              </div>
            </div>
          )}
        </div>

        <CTAButton href={cta.url} className="mt-10">
          {cta.label}
        </CTAButton>
      </div>
    </section>
  )
}

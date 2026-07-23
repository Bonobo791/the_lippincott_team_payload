import { Play } from 'lucide-react'
import React from 'react'

import type { TrackRecordBlock } from '@/payload-types'
import { CTAButton } from '@/components/CTAButton'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const TrackRecordBlockComponent: React.FC<TrackRecordBlock> = ({
  headingLight,
  headingBold,
  body,
  cta,
  backgroundImage,
  video,
  poster,
}) => {
  const bgUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? getMediaUrl(backgroundImage.url, backgroundImage.updatedAt)
      : ''
  const videoUrl =
    typeof video === 'object' && video?.url ? getMediaUrl(video.url, video.updatedAt) : ''
  const posterUrl =
    typeof poster === 'object' && poster?.url ? getMediaUrl(poster.url, poster.updatedAt) : ''

  return (
    <section className="relative overflow-hidden">
      {bgUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bgUrl} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="relative mx-auto grid max-w-site items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h2 className="font-display text-4xl font-light leading-tight text-white text-balance md:text-5xl">
            {headingLight} <span className="font-normal">{headingBold}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/85 lg:mx-0">{body}</p>
          <CTAButton href={cta.url} className="mt-8">
            {cta.label}
          </CTAButton>
        </div>

        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl">
          {videoUrl ? (
            <video controls preload="none" poster={posterUrl || undefined} className="w-full">
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={posterUrl} alt="Team video" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand shadow-xl">
                  <Play className="h-7 w-7 fill-current" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

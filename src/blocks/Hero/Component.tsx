import React from 'react'

import type { HeroBlock } from '@/payload-types'
import { CTAButton } from '@/components/CTAButton'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const HeroBlockComponent: React.FC<HeroBlock> = ({
  badge,
  heading,
  backgroundVideo,
  backgroundImage,
  cta,
}) => {
  const videoUrl =
    typeof backgroundVideo === 'object' && backgroundVideo?.url
      ? getMediaUrl(backgroundVideo.url, backgroundVideo.updatedAt)
      : ''
  const imageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? getMediaUrl(backgroundImage.url, backgroundImage.updatedAt)
      : ''

  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden md:min-h-[620px]">
      {videoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={imageUrl || undefined}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={
              typeof backgroundImage === 'object' ? backgroundImage?.alt || '' : ''
            }
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      )}
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mx-auto inline-block rounded-full border border-white/60 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-white">
          {badge}
        </p>
        <h1 className="mt-8 font-display text-5xl font-light leading-[1.12] text-white text-balance md:text-6xl lg:text-7xl">
          {heading}
        </h1>
        <CTAButton href={cta.url} className="mt-10">
          {cta.label}
        </CTAButton>
      </div>
    </section>
  )
}

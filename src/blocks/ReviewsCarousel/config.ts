import type { Block } from 'payload'

import { ctaLink } from '@/fields/ctaLink'

export const ReviewsCarousel: Block = {
  slug: 'reviewsCarousel',
  interfaceName: 'ReviewsCarouselBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    ctaLink(),
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
    },
  ],
}

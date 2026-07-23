import type { Block } from 'payload'

import { ctaLink } from '@/fields/ctaLink'

export const VideoTestimonial: Block = {
  slug: 'videoTestimonial',
  interfaceName: 'VideoTestimonialBlock',
  fields: [
    { name: 'headingLight', type: 'text', required: true },
    { name: 'headingBold', type: 'text', required: true },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'MP4 testimonial video. The poster image is used until playback.',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ctaLink(),
  ],
}

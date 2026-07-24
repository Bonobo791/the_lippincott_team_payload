import type { Block } from 'payload'

import { ctaLink } from '@/fields/ctaLink'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Video Hero',
    plural: 'Video Heroes',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      required: true,
      defaultValue: '#1 Team in Northwest Houston',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional MP4. Falls back to the background image.',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    ctaLink(),
  ],
}

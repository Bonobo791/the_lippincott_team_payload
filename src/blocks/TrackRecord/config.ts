import type { Block } from 'payload'

import { ctaLink } from '@/fields/ctaLink'

export const TrackRecord: Block = {
  slug: 'trackRecord',
  interfaceName: 'TrackRecordBlock',
  fields: [
    { name: 'headingLight', type: 'text', required: true },
    { name: 'headingBold', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    ctaLink(),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

import type { Block } from 'payload'

import { ctaLink } from '@/fields/ctaLink'

export const CtaBand: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBandBlock',
  fields: [
    { name: 'headingLight', type: 'text', required: true },
    { name: 'headingBold', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    ctaLink('primaryCta'),
    ctaLink('secondaryCta'),
    {
      name: 'showContact',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show phone and email from Site Settings below the buttons',
      },
    },
  ],
}

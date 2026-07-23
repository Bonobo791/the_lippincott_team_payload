import type { Block } from 'payload'

export const TrustBar: Block = {
  slug: 'trustBar',
  interfaceName: 'TrustBarBlock',
  fields: [
    { name: 'headingLight', type: 'text', required: true },
    { name: 'headingBold', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'ratings',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'source',
          type: 'select',
          required: true,
          options: [
            { label: 'Google', value: 'google' },
            { label: 'HAR.com', value: 'har' },
          ],
        },
        { name: 'score', type: 'text', required: true, defaultValue: '4.9' },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

import type { Block } from 'payload'

export const ServingSplit: Block = {
  slug: 'servingSplit',
  interfaceName: 'ServingSplitBlock',
  fields: [
    { name: 'badge', type: 'text', required: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'quickLinks',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
            { label: 'Relocate', value: 'relocate' },
          ],
        },
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 3,
      admin: {
        description: 'Optional stat cards shown below the body (used on the About page)',
      },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

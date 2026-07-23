import type { Block } from 'payload'

export const InfoGrid: Block = {
  slug: 'infoGrid',
  interfaceName: 'InfoGridBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}

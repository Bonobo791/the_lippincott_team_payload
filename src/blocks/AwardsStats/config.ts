import type { Block } from 'payload'

export const AwardsStats: Block = {
  slug: 'awardsStats',
  interfaceName: 'AwardsStatsBlock',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'leadBold', type: 'text' },
    { name: 'leadLinkLabel', type: 'text' },
    { name: 'leadLinkUrl', type: 'text' },
    { name: 'leadTail', type: 'text' },
    { name: 'intro', type: 'text' },
    {
      name: 'awards',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'linkLabel', type: 'text' },
        { name: 'linkUrl', type: 'text' },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Home', value: 'home' },
            { label: 'Trophy', value: 'trophy' },
            { label: 'Star', value: 'star' },
          ],
        },
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

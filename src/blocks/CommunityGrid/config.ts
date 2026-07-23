import type { Block } from 'payload'

export const CommunityGrid: Block = {
  slug: 'communityGrid',
  interfaceName: 'CommunityGridBlock',
  fields: [
    { name: 'headingLight', type: 'text', required: true },
    { name: 'headingBold', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'cardLabel', type: 'text', defaultValue: 'View Listings' },
    {
      name: 'communities',
      type: 'relationship',
      relationTo: 'communities',
      hasMany: true,
      required: true,
    },
  ],
}

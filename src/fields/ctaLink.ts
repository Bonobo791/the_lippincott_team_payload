import type { Field } from 'payload'

/** Simple label + URL group used by block CTAs. */
export const ctaLink = (name = 'cta', required = true): Field => ({
  name,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      required,
    },
    {
      name: 'url',
      type: 'text',
      required,
    },
  ],
})

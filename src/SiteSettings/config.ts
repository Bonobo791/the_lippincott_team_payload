import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'The Lippincott Team',
    },
    {
      name: 'brokerage',
      type: 'text',
      defaultValue: 'eXp Realty',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneHref',
      type: 'text',
      required: true,
      admin: {
        description: 'tel: link, e.g. tel:7134941818',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'footerBlurb',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  versions: false,
}

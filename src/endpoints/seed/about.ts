import type { RequiredDataFromCollectionSlug } from 'payload'

type AboutArgs = {
  aboutHeroImageId: number
  teamPhotoId: number
}

const textNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

export const about = ({
  aboutHeroImageId,
  teamPhotoId,
}: AboutArgs): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'about',
  _status: 'published',
  title: 'About The Lippincott Team',
  hero: {
    type: 'highImpact',
    media: aboutHeroImageId,
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [textNode('About The Lippincott Team')],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              textNode(
                'Experience exceptional service and local expertise. We guide you home with confidence.',
              ),
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          url: '#agents',
          label: 'Meet The Team',
          appearance: 'default',
        },
      },
    ],
  },
  layout: [
    {
      blockType: 'agentGrid',
      eyebrow: 'Our Agents',
      heading: 'Dedicated to Finding You Your New Home',
      subheading:
        'Our team of experienced professionals is committed to providing you with the best real estate experience possible. We are here to help you every step of the way.',
    },
    {
      blockType: 'servingSplit',
      badge: 'Our Story',
      heading: 'A Proven Track Record in Northwest Houston',
      body: 'We are your friendly greater Northwest Houston realtor experts. Our full-service agency does the heavy lifting for our clients — whether it is finding the perfect home, or getting the most for their property, our clients know they are in good hands. With 1,463+ homes sold, over $400M in volume, and 750+ five-star reviews, The Lippincott Team has been recognized by the Houston Business Journal nine times and ranks #6 in sales volume across all of Texas with eXp Realty.',
      stats: [
        { value: '1,463+', label: 'Homes Sold' },
        { value: '$400M+', label: 'Volume Sold' },
        { value: '750+', label: '5-Star Reviews' },
      ],
      image: teamPhotoId,
    },
    {
      blockType: 'ctaBand',
      headingLight: 'Ready to Work With',
      headingBold: 'Our Team?',
      subheading:
        'Let’s discuss how we can help you achieve your real estate goals. Our agents are ready to provide expert guidance and personalized service.',
      primaryCta: { label: 'Schedule a Consultation', url: '/contact/' },
      secondaryCta: { label: 'View Listings', url: '/contact/' },
      showContact: false,
    },
  ],
  meta: {
    title: 'About The Lippincott Team',
    description:
      'Meet The Lippincott Team — award-winning Northwest Houston real estate experts with eXp Realty, dedicated to finding you your new home.',
  },
  publishedAt: new Date().toISOString(),
})

export const contact = ({
  heroImageId,
  formId,
}: {
  heroImageId: number
  formId: number
}): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'contact',
  _status: 'published',
  title: 'Contact Us',
  hero: {
    type: 'highImpact',
    media: heroImageId,
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [textNode('Contact The Lippincott Team')],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              textNode('Ready to make a move? Let’s talk about your real estate goals.'),
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockType: 'formBlock',
      form: formId,
      enableIntro: false,
    },
    {
      blockType: 'ctaBand',
      headingLight: 'Prefer to',
      headingBold: 'Reach Out Directly?',
      subheading: 'Call, text, or email — a member of our team will get back to you promptly.',
      primaryCta: { label: 'Call Us Now', url: 'tel:7134941818' },
      secondaryCta: { label: 'Meet The Team', url: '/about/' },
      showContact: true,
    },
  ],
  meta: {
    title: 'Contact Us',
    description:
      'Schedule a consultation with The Lippincott Team — award-winning Northwest Houston realtors serving Cypress, Tomball, Katy, and Bridgeland.',
  },
  publishedAt: new Date().toISOString(),
})

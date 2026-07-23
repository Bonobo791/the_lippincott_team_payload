import type { CollectionSlug, File, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { about, contact } from './about'
import { contactForm as contactFormData } from './contact-form'
import { home } from './home'
import { buildPosts } from './posts'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'agents',
  'communities',
  'testimonials',
]

// site-settings is excluded: it has required fields and is fully written below
const globals: GlobalSlug[] = ['header', 'footer']

/**
 * Media is fetched from the current site's public CDN/uploads URLs and
 * re-uploaded to the Media collection (Vercel Blob). Once the new site is
 * live, replace these with permanent URLs or upload the files directly
 * in the admin.
 */
const CDN =
  'https://cdn-ilelngl.nitrocdn.com/RwxNQMTiEyvpmazxmcwXDBfuqdZYPPcV/assets/images/optimized/rev-4eb8c4c/lippincottteam.com/wp-content/uploads/2026'

/** logical key → source URL + alt text */
const mediaManifest: Record<string, { url: string; alt: string }> = {
  logo: { url: `${CDN}/03/cropped-8f58bf3ee98690a8929d78b01dd18f74.webp`, alt: 'The Lippincott Team logo' },
  heroAerial: { url: `${CDN}/03/d577c91fd6e3ac6ab37e4f2b2ecc0b47.webp`, alt: 'Aerial view of a Northwest Houston neighborhood' },
  heroVideo: {
    url: 'https://lippincottteam.com/wp-content/uploads/2026/06/Lippincott-Hero-no-pool.mp4',
    alt: 'Aerial footage of Northwest Houston homes',
  },
  testimonialPoster: { url: `${CDN}/03/testimonial-poster.jpg`, alt: 'George and Deborah Edwards client testimonial' },
  teamVideoPoster: { url: `${CDN}/07/Screenshot_20260708_175655.png`, alt: 'Meet The Lippincott Team' },
  serving: { url: `${CDN}/03/043599e0d1f0d8ce3fd748a5f97231be.webp`, alt: 'Northwest Houston neighborhood street' },
  aboutHero: { url: `${CDN}/03/00e4371b5beb52b7eb6b68f5a6ffd94a.webp`, alt: 'Luxury Northwest Houston home at dusk' },
  team: { url: `${CDN}/03/SunburstPhotography_LippincottTeam_38-scaled.jpg`, alt: 'The Lippincott Team' },
  tomball: { url: `${CDN}/03/tomball-1.jpg`, alt: 'Welcome to Tomball sign' },
  cypress: { url: `${CDN}/03/cypress-scaled.jpg`, alt: 'Aerial view of Cypress, TX' },
  hockley: { url: `${CDN}/03/hockley-scaled.jpg`, alt: 'Hockley, TX countryside' },
  katy: { url: `${CDN}/03/Picture_for_Katy.jpg`, alt: 'City of Katy railroad park' },
  bridgeland: { url: `${CDN}/03/bridgeland.jpg`, alt: 'Bridgeland community' },
  towneLake: { url: `${CDN}/03/townelake.jpg`, alt: 'Towne Lake waterfront' },
  waller: { url: `${CDN}/04/townelake2.jpg`, alt: 'Waller, TX lakeside homes' },
  magnolia: { url: `${CDN}/03/magnolia.jpg`, alt: 'Welcome to Magnolia sign' },
  agentAmy: { url: `${CDN}/03/amy-lippincott.jpg`, alt: 'Amy Lippincott' },
  agentAimee: { url: `${CDN}/03/Aimee-Wiesner%E2%80%8B.jpg`, alt: 'Aimee Wiesner' },
  agentAshley: { url: `${CDN}/03/Ashley-Walters.jpg`, alt: 'Ashley Walters' },
  agentKatie: { url: `${CDN}/03/Katie-Tuley%E2%80%8B.jpg`, alt: 'Katie Tuley' },
  agentJennipher: { url: `${CDN}/03/Jennipher-Stringer%E2%80%8B.jpg`, alt: 'Jennipher Stringer' },
  agentJr: { url: `${CDN}/03/J-R-Satchel%E2%80%8B.jpg`, alt: 'J.R. Satchel' },
  blogMortgageRates: { url: `${CDN}/04/22569-mortgage-rate-projections.jpg`, alt: 'Mortgage rate projections' },
  blogQuestions: { url: `${CDN}/04/22570-3-questions-to-ask-before-buying-your-dream-home.jpg`, alt: 'Couple discussing buying a home' },
  blogWinter: { url: `${CDN}/04/22571-selling-in-the-winter-attracts-serious-buyers.jpg`, alt: 'Home for sale in winter' },
  blogMortgage: { url: `${CDN}/04/22572-getting-a-home-mortgage.jpg`, alt: 'Signing mortgage documents' },
}

const communitiesData = [
  { name: 'Tomball', slug: 'tomball', mediaKey: 'tomball' },
  { name: 'Cypress', slug: 'cypress', mediaKey: 'cypress' },
  { name: 'Hockley', slug: 'hockley', mediaKey: 'hockley' },
  { name: 'Katy', slug: 'katy', mediaKey: 'katy' },
  { name: 'Bridgeland', slug: 'bridgeland', mediaKey: 'bridgeland' },
  { name: 'Towne Lake', slug: 'towne-lake', mediaKey: 'towneLake' },
  { name: 'Waller', slug: 'waller', mediaKey: 'waller' },
  { name: 'Magnolia', slug: 'magnolia', mediaKey: 'magnolia' },
]

const agentsData = [
  { name: 'Amy Lippincott', role: 'Team Lead / Realtor', phone: '(832) 392-8818', order: 1, mediaKey: 'agentAmy' },
  { name: 'Aimee Wiesner', role: 'Director of Buying Ops / Realtor', phone: '(713) 806-1634', order: 2, mediaKey: 'agentAimee' },
  { name: 'Ashley Walters', role: 'Realtor', phone: '(216) 235-2420', order: 3, mediaKey: 'agentAshley' },
  { name: 'Katie Tuley', role: 'Realtor', phone: '(832) 555-0143', order: 4, mediaKey: 'agentKatie' },
  { name: 'Jennipher Stringer', role: 'Realtor', phone: '(281) 555-0177', order: 5, mediaKey: 'agentJennipher' },
  { name: 'J.R. Satchel', role: 'Realtor', phone: '(713) 555-0119', order: 6, mediaKey: 'agentJr' },
]

const testimonialsData = [
  {
    quote: 'Amiee was very helpful as well as knowledgable. We are so thankful that she was our realtor!',
    location: 'Maple Meadows Dr',
    source: 'google' as const,
  },
  {
    quote:
      'Amy’s team was wonderful in every way. Scott’s nickname is now St. Scott for how tactfully he dealt with difficult situations. All our expectations were exceeded.',
    location: 'Lismore Lake Dr',
    source: 'google' as const,
  },
  {
    quote:
      'From our first showing to closing day, the team communicated every step of the way. We always felt like their only client.',
    location: 'Bridgeland',
    source: 'har' as const,
  },
]

// Next.js revalidation errors are normal when seeding the database without a server running
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Uploading media from source URLs...`)

  const mediaIds: Record<string, number> = {}

  for (const [key, entry] of Object.entries(mediaManifest)) {
    const file = await fetchFileByURL(entry.url)
    const doc = await payload.create({
      collection: 'media',
      data: { alt: entry.alt },
      file,
    })
    mediaIds[key] = doc.id
  }

  payload.logger.info(`— Seeding testimonials, communities, and agents...`)

  const testimonialDocs = await Promise.all(
    testimonialsData.map((t) => payload.create({ collection: 'testimonials', data: t })),
  )

  const communityDocs = await Promise.all(
    communitiesData.map((c) =>
      payload.create({
        collection: 'communities',
        data: {
          name: c.name,
          slug: c.slug,
          image: mediaIds[c.mediaKey],
        },
      }),
    ),
  )

  await Promise.all(
    agentsData.map((a) =>
      payload.create({
        collection: 'agents',
        data: {
          name: a.name,
          role: a.role,
          phone: a.phone,
          order: a.order,
          photo: mediaIds[a.mediaKey],
        },
      }),
    ),
  )

  payload.logger.info(`— Seeding contact form...`)

  const contactFormDoc = await payload.create({
    collection: 'forms',
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: home({
      heroImageId: mediaIds.heroAerial,
      heroVideoId: mediaIds.heroVideo,
      testimonialPosterId: mediaIds.testimonialPoster,
      trackRecordBgId: mediaIds.heroAerial,
      teamVideoPosterId: mediaIds.teamVideoPoster,
      servingImageId: mediaIds.serving,
      testimonialIds: testimonialDocs.map((t) => t.id),
      communityIds: communityDocs.map((c) => c.id),
    }),
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: about({
      aboutHeroImageId: mediaIds.aboutHero,
      teamPhotoId: mediaIds.team,
    }),
  })

  await payload.create({
    collection: 'pages',
    context: { disableRevalidate: true },
    data: contact({
      heroImageId: mediaIds.heroAerial,
      formId: contactFormDoc.id,
    }),
  })

  payload.logger.info(`— Seeding posts...`)

  const posts = buildPosts({
    'mortgage-rate-projections': mediaIds.blogMortgageRates,
    '3-questions-before-buying': mediaIds.blogQuestions,
    'selling-in-the-winter': mediaIds.blogWinter,
    'getting-a-home-mortgage': mediaIds.blogMortgage,
  })

  for (const post of posts) {
    await payload.create({
      collection: 'posts',
      context: { disableRevalidate: true },
      data: post,
    })
  }

  payload.logger.info(`— Seeding globals...`)

  await payload.updateGlobal({
    slug: 'site-settings',
    context: { disableRevalidate: true },
    data: {
      siteName: 'The Lippincott Team',
      brokerage: 'eXp Realty',
      phone: '713-494-1818',
      phoneHref: 'tel:7134941818',
      email: 'amy@lippincottteam.com',
      logo: mediaIds.logo,
      footerBlurb:
        'The Lippincott Team is a top-rated real estate agency serving Northwest Houston, including areas like Cypress, Tomball, Katy, and Bridgeland. Partnered with eXp Realty, they provide buying, selling, rental, and relocation services backed by a proven track record. They have won the Houston Business Journal’s Residential Real Estate Award 9 times. They are recognized by eXp Realty as ranking #6 in sales volume in Texas.',
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      nav: [
        { label: 'Search', url: '/search' },
        {
          label: 'Northwest Houston Communities',
          url: '/#communities',
          children: [
            { label: 'Tomball', url: '/#communities' },
            { label: 'Cypress', url: '/#communities' },
            { label: 'Bridgeland', url: '/#communities' },
            { label: 'Towne Lake', url: '/#communities' },
            { label: 'Katy', url: '/#communities' },
          ],
        },
        {
          label: 'Northwest Houston Schools',
          url: '/#communities',
          children: [
            { label: 'Cy-Fair ISD', url: '/#communities' },
            { label: 'Tomball ISD', url: '/#communities' },
            { label: 'Katy ISD', url: '/#communities' },
          ],
        },
        { label: 'Buyers', url: '/contact/' },
        { label: 'Sellers', url: '/contact/' },
        { label: 'About', url: '/about/' },
        { label: 'Contact', url: '/contact/' },
        { label: 'Blog', url: '/blog/' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      columns: [
        {
          heading: 'For Buyers',
          links: [
            { label: 'Search Homes', url: '/search' },
            { label: 'Buyer Resources', url: '/contact/' },
            { label: 'Neighborhoods', url: '/#communities' },
          ],
        },
        {
          heading: 'For Sellers',
          links: [
            { label: 'Sell Your Home', url: '/contact/' },
            { label: 'Home Valuation', url: '/contact/' },
            { label: 'Seller Resources', url: '/contact/' },
          ],
        },
        {
          heading: 'Company',
          links: [
            { label: 'About Us', url: '/about/' },
            { label: 'Our Team', url: '/about/' },
            { label: 'Blog', url: '/blog/' },
            { label: 'Contact', url: '/contact/' },
          ],
        },
        {
          heading: 'Resources',
          links: [
            { label: 'Communities', url: '/#communities' },
            { label: 'FAQ', url: '/#faq' },
          ],
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}

const mimetypeFor = (path: string): string => {
  const ext = (path.split('.').pop() || '').toLowerCase()
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    mp4: 'video/mp4',
  }
  return map[ext] || 'application/octet-stream'
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: mimetypeFor(url),
    size: data.byteLength,
  }
}

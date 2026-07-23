import type { RequiredDataFromCollectionSlug } from 'payload'

const textNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const heading = (text: string) => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag: 'h2' as const,
  version: 1,
})

type Section = { heading?: string; paragraphs: string[] }

const lexical = (sections: Section[]) => ({
  root: {
    type: 'root',
    children: sections.flatMap((s) => [
      ...(s.heading ? [heading(s.heading)] : []),
      ...s.paragraphs.map(paragraph),
    ]),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

type PostSeed = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  sections: Section[]
}

const postSeeds: PostSeed[] = [
  {
    title: 'Mortgage Rate Projections: What Northwest Houston Buyers Should Know',
    slug: 'mortgage-rate-projections',
    excerpt:
      'Where are mortgage rates headed this year? Here’s what the latest projections mean for buyers in Cypress, Tomball, and the greater Northwest Houston market.',
    publishedAt: '2026-04-14T12:00:00.000Z',
    sections: [
      {
        paragraphs: [
          'If you’ve been waiting for the perfect moment to buy a home in Northwest Houston, mortgage rates are probably the biggest factor on your mind. While no one can predict rates with certainty, the major housing economists have released projections worth understanding before you plan your move.',
          'Most forecasts call for rates to ease gradually through the year rather than drop sharply overnight. That matters because even a modest decline improves your purchasing power — and in sought-after communities like Bridgeland and Towne Lake, well-priced homes still move quickly.',
        ],
      },
      {
        heading: 'What This Means for Buyers',
        paragraphs: [
          'Waiting for a dramatically lower rate can cost more than it saves. Home values in Northwest Houston have continued to appreciate, so a lower rate twelve months from now may be offset by a higher purchase price. Getting pre-approved now lets you lock in today’s price and refinance later if rates fall.',
          'Our team works with trusted local lenders who can model different rate scenarios against your budget, so you can make a decision based on numbers rather than headlines.',
        ],
      },
      {
        heading: 'The Bottom Line',
        paragraphs: [
          'The best time to buy is when the right home fits your life and your finances. Reach out to The Lippincott Team and we’ll help you build a strategy around today’s market — not yesterday’s news.',
        ],
      },
    ],
  },
  {
    title: '3 Questions to Ask Before Buying Your Dream Home',
    slug: '3-questions-before-buying',
    excerpt:
      'Before you fall in love with a listing, ask these three questions to make sure the home — and the neighborhood — truly fit your long-term plans.',
    publishedAt: '2026-04-07T12:00:00.000Z',
    sections: [
      {
        paragraphs: [
          'It’s easy to get swept up in granite countertops and backyard pools. But the buyers who are happiest five years later are the ones who asked the right questions before they ever wrote an offer.',
        ],
      },
      {
        heading: '1. How Long Do We Plan to Stay?',
        paragraphs: [
          'Your expected timeline shapes everything from the mortgage product you choose to the communities that make sense. A five-year plan and a fifteen-year plan point to very different homes — and very different school zones.',
        ],
      },
      {
        heading: '2. What Does the Commute Really Look Like?',
        paragraphs: [
          'Northwest Houston offers incredible value, but drive times to the Energy Corridor, Downtown, or the Medical Center vary widely by community. Test the route at rush hour before committing.',
        ],
      },
      {
        heading: '3. What Are the Total Monthly Costs?',
        paragraphs: [
          'Beyond principal and interest, factor in property taxes, HOA dues, MUD taxes (common in newer Texas communities), and insurance. We provide a full cost breakdown for every home our buyers seriously consider.',
        ],
      },
    ],
  },
  {
    title: 'Selling in the Winter Attracts Serious Buyers',
    slug: 'selling-in-the-winter',
    excerpt:
      'Fewer listings on the market means less competition for your home. Here’s why winter sellers in Northwest Houston often come out ahead.',
    publishedAt: '2026-03-24T12:00:00.000Z',
    sections: [
      {
        paragraphs: [
          'Conventional wisdom says to wait for spring to list your home. But conventional wisdom ignores a key advantage: the buyers who brave the colder months are the most motivated ones in the market.',
          'Relocation buyers, job transfers, and families with mid-year school deadlines don’t have the luxury of waiting for azalea season. When your home is one of fewer options available, it commands more attention per showing.',
        ],
      },
      {
        heading: 'Less Competition, More Leverage',
        paragraphs: [
          'Inventory in Cypress, Tomball, and Katy typically dips during the winter months. With fewer comparable listings, a well-priced, well-presented home stands out immediately — and sellers keep stronger negotiating positions on repairs and closing timelines.',
        ],
      },
      {
        heading: 'How We Position Winter Listings',
        paragraphs: [
          'Our marketing plan leans into professional photography, targeted social campaigns, and SEO-optimized exposure so your listing reaches serious buyers wherever they’re searching from. Talk to us about what your home could sell for this season.',
        ],
      },
    ],
  },
  {
    title: 'Getting a Home Mortgage: A Step-by-Step Guide for First-Time Buyers',
    slug: 'getting-a-home-mortgage',
    excerpt:
      'From pre-approval to clear-to-close, here’s the mortgage process explained in plain English for first-time buyers in the Houston area.',
    publishedAt: '2026-03-10T12:00:00.000Z',
    sections: [
      {
        paragraphs: [
          'For first-time buyers, the mortgage process can feel like a black box. It isn’t. Once you understand the sequence — and what lenders are actually looking for — each step becomes predictable.',
        ],
      },
      {
        heading: 'Step 1: Pre-Approval',
        paragraphs: [
          'A lender reviews your income, credit, assets, and debts to determine how much you can borrow. In competitive Northwest Houston neighborhoods, a strong pre-approval letter is essentially your ticket to having offers taken seriously.',
        ],
      },
      {
        heading: 'Step 2: Under Contract to Clear-to-Close',
        paragraphs: [
          'After your offer is accepted, the lender orders an appraisal, verifies documentation, and underwrites the loan. Respond to document requests quickly — most delays happen when buyers are slow to provide paperwork.',
          'Avoid opening new credit lines or making large purchases before closing. Even a new car payment can change your debt-to-income ratio and jeopardize approval.',
        ],
      },
      {
        heading: 'You Don’t Have to Navigate It Alone',
        paragraphs: [
          'Our agents explain each document, coordinate with your lender and title company, and keep you informed from contract to closing. Schedule a consultation and we’ll walk you through your first purchase step by step.',
        ],
      },
    ],
  },
]

export const buildPosts = (
  heroImageIds: Record<string, number>,
): RequiredDataFromCollectionSlug<'posts'>[] =>
  postSeeds.map((p) => ({
    slug: p.slug,
    _status: 'published',
    title: p.title,
    heroImage: heroImageIds[p.slug],
    content: lexical(p.sections),
    publishedAt: p.publishedAt,
    meta: {
      title: p.title,
      description: p.excerpt,
    },
  }))

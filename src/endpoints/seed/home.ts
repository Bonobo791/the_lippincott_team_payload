import type { RequiredDataFromCollectionSlug } from 'payload'

type HomeArgs = {
  heroImageId: number
  heroVideoId: number
  testimonialPosterId: number
  trackRecordBgId: number
  teamVideoPosterId: number
  servingImageId: number
  testimonialIds: number[]
  communityIds: number[]
}

export const home = ({
  heroImageId,
  heroVideoId,
  testimonialPosterId,
  trackRecordBgId,
  teamVideoPosterId,
  servingImageId,
  testimonialIds,
  communityIds,
}: HomeArgs): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'home',
  _status: 'published',
  title: 'Award Winning Northwest Houston Realtors',
  hero: {
    type: 'none',
  },
  layout: [
    {
      blockType: 'hero',
      badge: '#1 Team in Northwest Houston',
      heading: 'Award Winning Northwest Houston Realtors',
      backgroundVideo: heroVideoId,
      backgroundImage: heroImageId,
      cta: { label: 'Contact Us Now', url: '/contact/' },
    },
    {
      blockType: 'trustBar',
      headingLight: 'Trusted by',
      headingBold: '1,000+ Houston Families',
      caption: 'The Lippincott Team - 4.9 Star Rating on Google and HAR.com',
      ratings: [
        { source: 'google', score: '4.9', url: 'https://share.google/YgtG3P8QWrm67bpxO' },
        { source: 'har', score: '4.9', url: 'https://www.har.com/amy-lippincott/agent_alippi' },
      ],
    },
    {
      blockType: 'videoTestimonial',
      headingLight: 'Listen to Our',
      headingBold: 'Satisfied Clients',
      poster: testimonialPosterId,
      cta: { label: 'Let’s Get Started', url: '/contact/' },
    },
    {
      blockType: 'reviewsCarousel',
      heading: 'See What Our Clients Have to Say',
      cta: { label: 'See All Reviews', url: '/contact/' },
      testimonials: testimonialIds,
    },
    {
      blockType: 'awardsStats',
      heading: 'Why Choose The Lippincott Team?',
      leadBold: 'We’ve won the',
      leadLinkLabel: 'Houston Business Journal’s Residential Real Estate Awards',
      leadLinkUrl: 'https://www.facebook.com/realestatewithamy/',
      leadTail: '9 times.',
      intro: 'Here’s what else we’ve won:',
      awards: [
        {
          name: 'GHBA Prism Award',
          linkLabel: 'Realtor of the Year',
          linkUrl: 'https://www.woodlandsonline.com/npps/story.cfm?nppage=60014',
          description:
            'Issued by the Greater Houston Builders Association. Winning requires hitting specific thresholds for total homes sold and dollar volume, quantifiable impact on builder sales, community involvement, and leadership within local Realtor organizations.',
        },
        {
          name: 'Houston Business Journal Top 25 Residential Real Estate',
          description:
            'Issued by HBJ. Winning requires verified MLS and brokerage reporting data proving highest closed sales volume, highest closed transaction count, and consistent annual production.',
        },
        {
          name: 'eXp Icon Award',
          description:
            'Issued by eXp Realty. Winning requires meeting strict production minimums (either a cap plus $5,000 transaction fee, or $500,000 in Gross Commission Income and 10 closed transactions) alongside mandated corporate volunteering (teaching classes, mentoring agents, or serving on committees).',
        },
        {
          name: 'Top 6 by Sales Volume',
          description:
            'We’re recognized by eXp Realty as being #6 in sales volume in all of Texas!',
        },
        {
          name: 'Historical Top Producer Awards',
          description:
            'Issued by Better Homes and Gardens Real Estate, Keller Williams Platinum, and Howard Hughes Development based on top volume and unit sales.',
        },
      ],
      ctaLabel: 'Talk to Us About Selling',
      ctaUrl: '/contact/',
      stats: [
        { icon: 'home', value: '1,463+', label: 'Homes Sold' },
        { icon: 'trophy', value: '$400M+', label: 'Volume Sold' },
        { icon: 'star', value: '750+', label: '5-Star Reviews' },
      ],
    },
    {
      blockType: 'trackRecord',
      headingLight: 'Work With a Team With a',
      headingBold: 'Proven Track Record',
      body: 'We are your friendly greater Northwest Houston realtor experts. Our full-service agency does the heavy lifting for our clients. Whether it is finding the perfect home, or getting the most for their property, our clients know they are in good hands.',
      cta: { label: 'Learn More About The Team', url: '/about/' },
      backgroundImage: trackRecordBgId,
      poster: teamVideoPosterId,
    },
    {
      blockType: 'communityGrid',
      headingLight: 'Browse by',
      headingBold: 'Community',
      subheading:
        'Discover the perfect property that fits your lifestyle from our diverse portfolio of options.',
      cardLabel: 'View Listings',
      communities: communityIds,
    },
    {
      blockType: 'servingSplit',
      badge: 'Serving Northwest Houston',
      heading: 'We’re Award-winning Northwest Houston Realtors',
      body: 'Welcome to TheLippincottTeam.com, the official site of leading Northwest Houston realtors serving Cypress, Tomball, and nearby neighborhoods. We provide up-to-date real estate information, expert marketing services, and local resources to make your next home purchase or sale simple and successful.',
      quickLinks: [
        { icon: 'buy', label: 'Buy', url: '/contact/' },
        { icon: 'sell', label: 'Sell', url: '/contact/' },
        { icon: 'relocate', label: 'Relocate', url: '/contact/' },
      ],
      image: servingImageId,
    },
    {
      blockType: 'featureCards',
      cards: [
        {
          icon: 'search',
          title: 'Explore Homes',
          body: 'Find your next home in Northwest Houston using our advanced MLS-connected real estate search. View interactive maps, real-time listings, and verified properties across Cypress, Fairfield, Towne Lake, and Bridgeland.',
        },
        {
          icon: 'chart',
          title: 'Market Insights',
          body: 'Use our detailed Northwest Houston Community Guide to compare neighborhoods, schools, and lifestyle features. Stay updated on market trends, sales activity, and home values in every area.',
        },
        {
          icon: 'bell',
          title: 'Get Alerts',
          body: 'Register for a free account to receive instant MLS alerts on new homes for sale in Northwest Houston, TX. Save favorite properties, track market changes, and access expert realty services anytime.',
        },
      ],
    },
    {
      blockType: 'faq',
      heading: 'Why Work With The Lippincott Team?',
      intro:
        'Our real estate team combines deep expertise with a client-first approach. We are licensed agents with hundreds of five-star reviews, local business partnerships, and proven results across Texas.',
      items: [
        {
          question: 'What Areas Does The Lippincott Team Serve?',
          answer:
            'The Lippincott Team serves buyers, sellers, and homeowners across the broader local market, helping clients navigate residential real estate with clear guidance, market insight, and hands-on support from start to finish.',
        },
        {
          question: 'Why Choose Our Northwest Houston Realtors?',
          answer:
            'Nine Houston Business Journal Residential Real Estate Awards, an eXp Icon Award, and a #6 ranking in Texas sales volume reflect one thing: consistent, verified results for our clients year after year.',
        },
        {
          question: 'What Types of Properties Do You Handle?',
          answer:
            'From first homes and master-planned communities to new construction and luxury listings, our full-service team handles residential properties across every price point in Northwest Houston.',
        },
        {
          question: 'Do You Help With Builders and New Homes?',
          answer:
            'Yes. As GHBA Prism Award winners, we work directly with Greater Houston builders and can guide you through lot selection, contracts, inspections, and closing on new construction.',
        },
        {
          question: 'What’s the First Step in the Buying Process?',
          answer:
            'Schedule a consultation. We’ll discuss your goals, timeline, and budget, connect you with trusted lenders for pre-approval, and build a search strategy around the communities that fit your life.',
        },
      ],
    },
    {
      blockType: 'infoGrid',
      items: [
        {
          title: 'Selling Your Home in Northwest Houston',
          body: 'Our marketing plan combines professional photography, social media campaigns, and SEO-optimized online exposure. Every property benefits from detailed pricing analysis and realty services that attract serious buyers. The Lippincott Team uses advanced Northwest Houston realty strategies to deliver faster sales and superior results.',
        },
        {
          title: 'First-Time Buyers & Relocation',
          body: 'We take pride in helping new clients navigate their first purchase. Our agents explain each document, coordinate inspections, and ensure you feel informed from contract to closing. Whether you’re relocating from New York, California, or anywhere in the state, our Northwest Houston realtors will make the transition smooth.',
        },
        {
          title: 'Why Northwest Houston?',
          body: 'Cypress offers top-rated schools, strong community bonds, and a variety of homes in safe, master-planned neighborhoods. Proximity to Houston, scenic parks, and local retail make Northwest Houston TX one of the fastest-growing real estate markets in Texas.',
        },
        {
          title: 'Stay Updated',
          body: 'Subscribe to our newsletter or follow us for realtor.com-linked updates. We’ll help you track Northwest Houston listings, open houses, and property highlights that match your criteria. Never miss a great home opportunity.',
        },
      ],
    },
    {
      blockType: 'ctaBand',
      headingLight: 'Ready to Start Your',
      headingBold: 'Home Journey?',
      subheading:
        'Let’s discuss how we can help you achieve your real estate goals. Our team is ready to provide expert guidance and personalized service.',
      primaryCta: { label: 'Schedule a Consultation', url: '/contact/' },
      secondaryCta: { label: 'View Listings', url: '/contact/' },
      showContact: true,
    },
  ],
  meta: {
    title: 'Award Winning Northwest Houston Realtors',
    description:
      'The Lippincott Team is an award-winning real estate agency serving Cypress, Tomball, Katy, Bridgeland and greater Northwest Houston.',
  },
  publishedAt: new Date().toISOString(),
})

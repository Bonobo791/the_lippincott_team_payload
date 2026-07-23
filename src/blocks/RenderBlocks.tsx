import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AgentGridBlockComponent } from '@/blocks/AgentGrid/Component'
import { AwardsStatsBlockComponent } from '@/blocks/AwardsStats/Component'
import { CommunityGridBlockComponent } from '@/blocks/CommunityGrid/Component'
import { CtaBandBlockComponent } from '@/blocks/CtaBand/Component'
import { FaqBlockComponent } from '@/blocks/Faq/Component'
import { FeatureCardsBlockComponent } from '@/blocks/FeatureCards/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBlockComponent } from '@/blocks/Hero/Component'
import { InfoGridBlockComponent } from '@/blocks/InfoGrid/Component'
import { ReviewsCarouselBlockComponent } from '@/blocks/ReviewsCarousel/Component'
import { ServingSplitBlockComponent } from '@/blocks/ServingSplit/Component'
import { TrackRecordBlockComponent } from '@/blocks/TrackRecord/Component'
import { TrustBarBlockComponent } from '@/blocks/TrustBar/Component'
import { VideoTestimonialBlockComponent } from '@/blocks/VideoTestimonial/Component'

const blockComponents = {
  agentGrid: AgentGridBlockComponent,
  awardsStats: AwardsStatsBlockComponent,
  communityGrid: CommunityGridBlockComponent,
  ctaBand: CtaBandBlockComponent,
  faq: FaqBlockComponent,
  featureCards: FeatureCardsBlockComponent,
  formBlock: FormBlock,
  hero: HeroBlockComponent,
  infoGrid: InfoGridBlockComponent,
  reviewsCarousel: ReviewsCarouselBlockComponent,
  servingSplit: ServingSplitBlockComponent,
  trackRecord: TrackRecordBlockComponent,
  trustBar: TrustBarBlockComponent,
  videoTestimonial: VideoTestimonialBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                /* @ts-expect-error there may be some mismatch between the expected types here */
                <Block key={index} {...block} />
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

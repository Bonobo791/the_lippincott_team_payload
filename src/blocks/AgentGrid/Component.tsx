import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import type { Agent, AgentGridBlock } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const AgentGridBlockComponent: React.FC<AgentGridBlock> = async ({
  eyebrow,
  heading,
  subheading,
  agents: selectedAgents,
}) => {
  let agents = (selectedAgents || []).filter((a): a is Agent => typeof a === 'object' && a !== null)

  // No explicit selection → show all agents, sorted by their Order field
  if (agents.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'agents',
      limit: 24,
      sort: 'order',
      depth: 1,
    })
    agents = result.docs
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-site px-6">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink text-balance">
            {heading}
          </h2>
          {subheading && <p className="mt-4 leading-relaxed text-ink-soft">{subheading}</p>}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const photoUrl =
              typeof agent.photo === 'object' && agent.photo?.url
                ? getMediaUrl(agent.photo.url, agent.photo.updatedAt)
                : ''
            return (
              <article
                key={agent.id}
                className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={agent.name}
                  loading="lazy"
                  className="h-80 w-full object-cover object-top"
                />
                <div className="p-6 text-center">
                  <h3 className="font-display text-lg font-semibold text-ink">{agent.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{agent.role}</p>
                  {agent.phone && (
                    <a
                      href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`}
                      className="mt-2 block text-sm font-medium text-ink hover:text-brand"
                    >
                      {agent.phone}
                    </a>
                  )}
                  <Link
                    href="/contact/"
                    className="mt-3 inline-block font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand hover:text-brand-dark"
                  >
                    View Profile
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

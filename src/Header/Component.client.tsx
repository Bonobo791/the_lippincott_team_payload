'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import type { Header, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type NavItem = NonNullable<Header['nav']>[number]

type HeaderClientProps = {
  nav: Header['nav']
  settings: SiteSetting
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ nav, settings }) => {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const logoUrl =
    typeof settings.logo === 'object' && settings.logo?.url
      ? getMediaUrl(settings.logo.url, settings.logo.updatedAt)
      : ''

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand text-white">
        <div className="mx-auto flex max-w-site items-center justify-end px-6 py-2">
          <a
            href={settings.phoneHref}
            className="font-display text-sm font-semibold tracking-wider hover:underline"
          >
            {settings.phone}
          </a>
        </div>
      </div>

      {/* Main header over light zebra pattern */}
      <header className="bg-zebra relative">
        <div className="mx-auto flex max-w-site items-center justify-between gap-8 px-6 py-5">
          <Link href="/" aria-label={settings.siteName} className="shrink-0">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={`${settings.siteName} logo`}
                className="h-20 w-20 rounded-full md:h-24 md:w-24"
              />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand font-display text-4xl font-bold text-white md:h-24 md:w-24">
                {settings.siteName?.charAt(0) || 'L'}
              </span>
            )}
          </Link>

          <nav aria-label="Main navigation" className="hidden xl:block">
            <ul className="flex items-center gap-4">
              {(nav || []).map((item: NavItem, i: number) => (
                <li key={item.id || i} className="group relative flex items-center gap-4">
                  {i > 0 && (
                    <span className="text-ink-faint" aria-hidden>
                      |
                    </span>
                  )}
                  <Link
                    href={item.url}
                    className="flex items-center gap-1 font-display text-[13px] font-medium uppercase tracking-wider text-ink/80 transition-colors hover:text-brand"
                  >
                    {item.label}
                    {item.children && item.children.length > 0 && (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <ul className="invisible absolute left-0 top-full z-50 min-w-56 rounded-xl bg-white py-3 opacity-0 shadow-xl ring-1 ring-black/5 transition-all group-hover:visible group-hover:opacity-100">
                      {item.children.map((child, j) => (
                        <li key={child.id || j}>
                          <Link
                            href={child.url}
                            className="block px-5 py-2 text-sm text-ink-soft hover:bg-brand-light hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile */}
          <div className="xl:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="rounded-lg p-2 text-ink hover:bg-black/5"
            >
              {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="absolute inset-x-0 top-full z-50 border-t border-black/5 bg-white shadow-xl xl:hidden">
            <ul className="max-h-[70vh] overflow-y-auto px-6 py-4">
              {(nav || []).map((item: NavItem, i: number) => (
                <li key={item.id || i} className="border-b border-black/5 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.url}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-sm font-medium uppercase tracking-wider text-ink/80"
                    >
                      {item.label}
                    </Link>
                    {item.children && item.children.length > 0 && (
                      <button
                        aria-label={`Expand ${item.label}`}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="p-2"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && expanded === item.label && (
                    <ul className="pb-2 pl-4">
                      {item.children.map((child, j) => (
                        <li key={child.id || j}>
                          <Link
                            href={child.url}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-ink-soft"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={settings.phoneHref}
                  className="block rounded-full bg-brand py-3 text-center font-display text-sm font-semibold uppercase tracking-widest text-white"
                >
                  Call {settings.phone}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}

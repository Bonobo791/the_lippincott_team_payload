import Link from 'next/link'
import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export async function Footer() {
  const [footerData, settings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  const logoUrl =
    typeof settings.logo === 'object' && settings.logo?.url
      ? getMediaUrl(settings.logo.url, settings.logo.updatedAt)
      : ''

  return (
    <footer>
      {/* Zebra divider */}
      <div className="bg-zebra-strip h-14 w-full" aria-hidden />

      <div className="bg-black text-gray-400">
        <div className="mx-auto grid max-w-site gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="" className="h-11 w-11 rounded-full" />
              ) : (
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-white">
                  {settings.siteName?.charAt(0) || 'L'}
                </span>
              )}
              <div>
                <p className="font-display font-semibold text-white">{settings.siteName}</p>
                {settings.brokerage && <p className="text-xs">{settings.brokerage}</p>}
              </div>
            </div>
            {settings.footerBlurb && (
              <p className="mt-5 text-sm leading-relaxed">{settings.footerBlurb}</p>
            )}
            <p className="mt-4 text-sm">
              Contact us at{' '}
              <a href={`mailto:${settings.email}`} className="text-white hover:text-brand">
                {settings.email}
              </a>
            </p>
          </div>

          {(footerData.columns || []).map((col, i) => (
            <nav key={col.id || i} aria-label={col.heading}>
              <h3 className="font-display text-base font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {(col.links || []).map((link, j) => (
                  <li key={link.id || j}>
                    <Link href={link.url} className="text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-4 px-6 py-6 text-xs sm:flex-row">
            <p>
              © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Mulish, Poppins } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mulish',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(poppins.variable, mulish.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link
          href="https://cdn-ilelngl.nitrocdn.com/RwxNQMTiEyvpmazxmcwXDBfuqdZYPPcV/assets/images/optimized/rev-4eb8c4c/lippincottteam.com/wp-content/uploads/2026/03/cropped-8f58bf3ee98690a8929d78b01dd18f74.webp"
          rel="icon"
          type="image/webp"
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Award Winning Northwest Houston Realtors | The Lippincott Team',
    template: '%s | The Lippincott Team',
  },
  description:
    'The Lippincott Team is an award-winning real estate agency serving Cypress, Tomball, Katy, Bridgeland and greater Northwest Houston. 9x Houston Business Journal Residential Real Estate Award winners.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}

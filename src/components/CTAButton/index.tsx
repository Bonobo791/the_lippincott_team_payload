import Link from 'next/link'
import React from 'react'

type CTAButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'dark' | 'outline-light'
  className?: string
}

/** Pill CTA button matching the site's red/dark button system. */
export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  children,
  variant = 'primary',
  className = '',
}) => {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/25',
    dark: 'bg-navy text-white hover:bg-ink shadow-lg shadow-black/20',
    'outline-light': 'border border-white/70 text-white hover:bg-white hover:text-ink',
  }[variant]

  return (
    <Link
      href={href}
      className={`inline-block rounded-full px-10 py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  )
}

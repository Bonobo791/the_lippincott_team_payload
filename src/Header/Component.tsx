import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'

export async function Header() {
  const [headerData, settings] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  return <HeaderClient nav={headerData.nav} settings={settings} />
}

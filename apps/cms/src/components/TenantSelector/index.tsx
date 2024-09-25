import { cookies as getCookies } from 'next/headers'
import { tenantCookieName } from '@zapal/shared/cookies'

import { TenantSelector } from './index.client'

export const TenantSelectorRSC = () => {
  const cookies = getCookies()

  return <TenantSelector initialCookie={cookies.get(tenantCookieName)?.value} />
}

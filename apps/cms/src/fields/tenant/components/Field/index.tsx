import { Payload } from 'payload'

import { cookies as getCookies, headers as getHeaders } from 'next/headers'

import { TenantFieldComponentClient } from './index.client'
import { UserRole } from '@zapal/shared/types'
import { tenantCookieName } from '@zapal/shared/cookies'

export const TenantFieldComponent: React.FC<{
  path: string
  payload: Payload
  readOnly: boolean
}> = async (args) => {
  const cookies = await getCookies()
  const headers = await getHeaders()

  const { user } = await args.payload.auth({ headers })

  if (user && ((Array.isArray(user.tenants) && user.tenants.length > 1) || user?.roles?.includes(UserRole.Root)))
    return (
      <TenantFieldComponentClient
        initialValue={cookies.get(tenantCookieName)?.value || undefined}
        path={args.path}
        readOnly={args.readOnly}
      />
    )

  return null
}

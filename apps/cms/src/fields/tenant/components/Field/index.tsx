import { cookies as getCookies, headers as getHeaders } from 'next/headers'
import { Payload } from 'payload'

import { tenantCookieName } from '@zapal/shared/cookies'
import { UserRole } from '@zapal/shared/types'

import { TenantFieldComponentClient } from './index.client'

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

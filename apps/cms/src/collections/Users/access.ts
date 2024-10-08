import { Access, parseCookies } from 'payload'

import { tenantCookieName } from '@zapal/shared/cookies'

import { isRootUser } from '@cms/access'
import { User } from '@cms/types/generated-types'
import { getTenantAdminTenantAccessIds } from '@cms/utils/getTenantAccessIds'

export const createAccess: Access<User> = ({ req: { user }, data }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  const adminTenantIds = getTenantAdminTenantAccessIds(user)

  if (adminTenantIds.length && data?.tenants?.length)
    return data.tenants.every(({ tenant }) => adminTenantIds.includes(typeof tenant === 'object' ? tenant.id : tenant))

  return false
}

export const readAccess: Access<User> = ({ req: { user, headers } }) => {
  if (!user) return false

  const cookies = parseCookies(headers)
  const isRoot = isRootUser(user)
  const selectedTenant = Number(cookies.get(tenantCookieName))

  const selfAccessConstraint = { id: { equals: user.id } } as const

  if (selectedTenant) {
    const tenantIds = getTenantAdminTenantAccessIds(user)
    const hasTenantAccess = tenantIds.some((id) => id === selectedTenant)

    if (isRoot || hasTenantAccess) return { or: [{ 'tenants.tenant': { equals: selectedTenant } }, selfAccessConstraint] }
  }

  if (isRoot) return true

  const tenantIds = getTenantAdminTenantAccessIds(user)

  return { or: [{ 'tenants.tenant': { in: tenantIds } }, selfAccessConstraint] }
}

export const updateAndDeleteAccess: Access<User> = ({ req: { user }, data }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  const adminTenantIds = getTenantAdminTenantAccessIds(user)

  if (adminTenantIds.length && data?.tenants?.length)
    return data.tenants.every(({ tenant }) => adminTenantIds.includes(typeof tenant === 'object' ? tenant.id : tenant))

  return false
}

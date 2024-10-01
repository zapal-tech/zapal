import type { Access } from 'payload'

import { parseCookies } from 'payload'

import { isRootUser } from '@cms/access'
import { getTenantAccessIds } from '@cms/utils/getTenantAccessIds'
import { UserTenantRole } from '@zapal/shared/types'
import { tenantCookieName } from '@zapal/shared/cookies'

export const filterByTenantRead: Access = ({ req: { headers, user } }) => {
  const cookies = parseCookies(headers)
  const isRoot = isRootUser(user)
  const selectedTenant = Number(cookies.get(tenantCookieName))

  const tenantAccessIDs = getTenantAccessIds(user)

  // First check for manually selected tenant from cookies
  if (selectedTenant) {
    // If it's a super admin,
    // give them read access to only pages for that tenant
    if (isRoot)
      return {
        tenant: {
          equals: selectedTenant,
        },
      }

    const hasTenantAccess = tenantAccessIDs.some((id) => id === selectedTenant)

    // If NOT super admin,
    // give them access only if they have access to tenant ID set in cookie
    if (hasTenantAccess)
      return {
        tenant: {
          equals: selectedTenant,
        },
      }
  }

  // If no manually selected tenant,
  // but it is a super admin, give access to all
  if (isRoot) return true

  // If not super admin,
  // but has access to tenants,
  // give access to only their own tenants
  if (tenantAccessIDs.length)
    return {
      tenant: {
        in: tenantAccessIDs,
      },
    }

  // Deny access to all others
  return false
}

export const canMutatePage: Access = ({ req: { headers, user } }) => {
  const isRoot = isRootUser(user)

  if (!user) return false

  // super admins can mutate pages for any tenant
  if (isRoot) return true

  const cookies = parseCookies(headers)
  const selectedTenant = cookies.get(tenantCookieName)

  // tenant admins can add/delete/update pages they have access to
  return (
    user?.tenants?.reduce((hasAccess: boolean, accessRow) => {
      if (hasAccess) return true

      if (
        accessRow &&
        (typeof accessRow.tenant === 'object' ? accessRow.tenant.id : accessRow.tenant).toString() === selectedTenant &&
        accessRow.roles?.includes(UserTenantRole.Admin)
      )
        return true

      return hasAccess
    }, false) || false
  )
}

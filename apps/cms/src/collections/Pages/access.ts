import { parseCookies, Where, type Access } from 'payload'

import { tenantCookieName } from '@zapal/shared/cookies'
import { UserTenantRole } from '@zapal/shared/types'

import { isRootUser } from '@cms/access'
import { getTenantAccessIds } from '@cms/utils/getTenantAccessIds'

export const filterByTenantRead: Access = ({ req: { headers, user } }) => {
  const cookies = parseCookies(headers)
  const isRoot = isRootUser(user)
  const selectedTenant = Number(cookies.get(tenantCookieName))

  const tenantAccessIDs = getTenantAccessIds(user)

  // First check for manually selected tenant from cookies
  if (selectedTenant) {
    // If it's a root user,
    // give them read access to only pages for that tenant
    if (isRoot)
      return {
        tenant: {
          equals: selectedTenant,
        },
      }

    const hasTenantAccess = tenantAccessIDs.some((id) => id === selectedTenant)

    // If NOT root user,
    // give them access only if they have access to tenant ID set in cookie
    if (hasTenantAccess)
      return {
        tenant: {
          equals: selectedTenant,
        },
      }
  }

  // If no manually selected tenant,
  // but it is a root user, give access to all
  if (isRoot) return true

  // If not root user,
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

export const rootUsersAndTenantAdmins: Access = ({ req: { headers, user } }) => {
  const isRoot = isRootUser(user)

  if (!user) return false

  // root users can mutate pages for any tenant
  if (isRoot) return true

  const cookies = parseCookies(headers)
  const selectedTenant = Number(cookies.get(tenantCookieName))

  // tenant admins can add/delete/update pages they have access to
  return (
    user?.tenants?.reduce((hasAccess: boolean, accessRow) => {
      if (hasAccess) return true

      if (
        accessRow &&
        (typeof accessRow.tenant === 'object' ? accessRow.tenant.id : accessRow.tenant) === selectedTenant &&
        accessRow.roles?.includes(UserTenantRole.Admin)
      )
        return true

      return hasAccess
    }, false) || false
  )
}

export const externalReadAccess: Access = ({ req: { user, headers } }) => {
  const cookies = parseCookies(headers)
  const isRoot = isRootUser(user)
  const selectedTenant = Number(cookies.get(tenantCookieName))
  const tenantAccessIDs = getTenantAccessIds(user)

  const publicPageConstraint: Where = { 'tenant.public': { equals: true } }

  // First check for manually selected tenant from cookies
  if (selectedTenant) {
    // If it's a root user, give them read access to only pages for that tenant
    if (isRoot)
      return {
        or: [publicPageConstraint, { tenant: { equals: selectedTenant } }],
      }

    const hasTenantAccess = tenantAccessIDs.some((id) => id === selectedTenant)

    // If NOT root user,
    // give them access only if they have access to tenant ID set in cookie
    if (hasTenantAccess)
      return {
        or: [publicPageConstraint, { tenant: { equals: selectedTenant } }],
      }
  }

  // If no manually selected tenant, but it is a root user give access to all
  if (isRoot) return true

  // If not root user, but has access to tenants, give access to only their own tenants
  if (tenantAccessIDs.length) {
    return {
      or: [publicPageConstraint, { tenant: { in: tenantAccessIDs } }],
    }
  }

  // Allow access to public pages
  return publicPageConstraint
}

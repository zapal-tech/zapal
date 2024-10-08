import { Access } from 'payload'

import { isRootUser } from '@cms/access'
import { getTenantAccessIds, getTenantAdminTenantAccessIds } from '@cms/utils/getTenantAccessIds'

export const tenantAdmins: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  const tenantIds = getTenantAdminTenantAccessIds(user)

  return { id: { in: tenantIds } }
}

export const tenantMembers: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  const tenantIds = getTenantAccessIds(user)

  return { id: { in: tenantIds } }
}

export const tenantMembersOrPublicTenant: Access = ({ req: { user } }) => {
  if (isRootUser(user)) return true

  const tenantIds = getTenantAccessIds(user)
  const publicConstraint = { public: { equals: true } } as const

  return {
    or: [publicConstraint, { id: { in: tenantIds } }],
  }
}

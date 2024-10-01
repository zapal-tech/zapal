import { FieldAccess } from 'payload'

import { isRootUser } from '@cms/access'
import { getTenantAccessIds } from '@cms/utils/getTenantAccessIds'

export const tenantFieldUpdate: FieldAccess = ({ req: { user } }) => {
  const tenantIds = getTenantAccessIds(user)

  return Boolean(isRootUser(user) || tenantIds.length > 0)
}

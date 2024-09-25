import { getTenantAccessIds } from '@cms/utils/getTenantAccessIds'
import { FieldHook } from 'payload'

export const autofillTenant: FieldHook = ({ req: { user }, value }) => {
  // If there is no value,
  // and the user only has one tenant,
  // return that tenant ID as the value

  if (!value) {
    const tenantIds = getTenantAccessIds(user)

    if (!tenantIds.length) return tenantIds[0]
  }

  return value
}

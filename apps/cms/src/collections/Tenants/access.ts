import { isRootUser } from '@cms/access'
import { Access } from 'payload'

export const tenantAdmins: Access = ({ req: { user } }) => {
  if (isRootUser(user)) return true

  return {
    id: {
      in:
        user?.tenants
          ?.map(({ tenant, roles }) => (roles.includes('admin') ? (typeof tenant === 'string' ? tenant : tenant.id) : null)) // eslint-disable-line function-paren-newline
          .filter(Boolean) || [],
    },
  }
}

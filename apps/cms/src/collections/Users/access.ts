import { FieldAccess, User as AuthUser, Access, PayloadRequest } from 'payload'

import { Collection, UserRole, UserTenantRole } from '@cms/types'
import { User } from '@cms/types/generated-types'
import { checkUserRoles, isRootUser } from '@cms/access'

type UserTenantRoles = NonNullable<Required<User>['tenants']>[0]['roles']
type UserTenant = NonNullable<Required<User>['tenants']>[0]['tenant']

export const checkTenantRoles = (
  allRoles: UserTenantRoles = [],
  user?: User | AuthUser | null,
  tenant?: UserTenant | null,
): boolean => {
  if (!tenant) return false

  const id = typeof tenant === 'object' && tenant ? tenant.id : tenant

  return allRoles.some((role) =>
    (user as User | null | undefined)?.tenants?.some(({ tenant: userTenant, roles }) => {
      const tenantId = typeof userTenant === 'object' ? userTenant.id : userTenant

      return tenantId === id && roles?.includes(role)
    }),
  )
}

export const tenantAdmins: FieldAccess<User> = ({ req: { user }, doc }) =>
  Boolean(
    checkUserRoles([UserRole.Root], user) ||
      doc?.tenants?.some(({ tenant }) => {
        const id = typeof tenant === 'object' && tenant ? tenant.id : tenant

        return checkTenantRoles(['admin'], user, id)
      }),
  )

export const tenantAdminsAndSelf: Access<User> = async ({ req: { user } }) => {
  if (!user) return false

  const isRoot = isRootUser(user)

  // allow root users through only if they have not scoped their user via `lastSignedInTenant`
  if (isRoot && !user?.lastSignedInTenant) return true

  // allow users to read themselves and any users within the tenants they are admins of
  return {
    id: { equals: user.id },
    or: [
      {
        'tenants.tenant': {
          in: (
            (isRoot
              ? [
                  typeof user?.lastSignedInTenant === 'object' && user.lastSignedInTenant
                    ? user.lastSignedInTenant.id
                    : user?.lastSignedInTenant,
                ]
              : user?.tenants?.map(({ tenant, roles }) =>
                  roles.includes(UserTenantRole.Admin) ? (typeof tenant === 'object' ? tenant.id : tenant) : null,
                )) || []
          ).filter(Boolean),
        },
      },
    ],
  }
}

export const isRootUserOrTenantAdmin = async ({ req, req: { user, payload } }: { req: PayloadRequest }): Promise<boolean> => {
  if (isRootUser(user)) return true

  const host = req.headers.get('host')

  payload.logger.info(`Finding tenant with host: "${host}"`)

  // read `req.headers.get('host')`, lookup the tenant by `domain` to ensure it exists, and check if the user is an admin of that tenant
  const foundTenants = await payload.find({
    collection: Collection.Tenants,
    where: {
      domain: { equals: host },
    },
    depth: 0,
    limit: 1,
    req,
  })

  // if this tenant does not exist, deny access
  if (!foundTenants.totalDocs) {
    payload.logger.info(`No tenant found for "${host}" host, denying access`)

    return false
  }

  payload.logger.info(`Found tenant: "${foundTenants.docs?.[0]?.name}", checking if user is an tenant admin`)

  // finally check if the user is an admin of this tenant
  const tenantWithUser = user?.tenants?.find(
    ({ tenant: userTenant }) => (typeof userTenant === 'object' ? userTenant?.id : userTenant) === foundTenants.docs[0]?.id,
  )

  if (tenantWithUser?.roles?.some((role) => role === 'admin')) {
    payload.logger.info(`User is an admin of "${foundTenants.docs[0]?.name}", allowing access`)

    return true
  }

  payload.logger.info(`User is not an admin of "${foundTenants.docs[0]?.name}", denying access`)

  return false
}

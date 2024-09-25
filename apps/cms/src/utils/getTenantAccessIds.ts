import { UserTenantRole } from '@cms/types'
import type { User } from '@cms/types/generated-types'

export const getTenantAccessIds = (user: User | null): number[] => {
  if (!user) return []

  return (
    user?.tenants?.reduce((acc: number[], { tenant }) => {
      if (tenant) acc.push(typeof tenant === 'object' ? tenant.id : tenant)

      return acc
    }, []) || []
  )
}

export const getTenantAdminTenantAccessIds = (user: User | null): number[] => {
  if (!user) return []

  return (
    user?.tenants?.reduce((acc: number[], { roles, tenant }) => {
      if (roles.includes(UserTenantRole.Admin) && tenant) acc.push(typeof tenant === 'object' && tenant ? tenant.id : tenant)

      return acc
    }, []) || []
  )
}

import { User } from '@cms/types/generated-types'
import { UserRole } from '@zapal/shared/types'
import { Access, User as AuthUser, FieldAccess } from 'payload'

export const isRootUser = (user?: User | AuthUser | null): boolean => checkUserRoles([UserRole.Root], user)

export const checkUserRoles = (allRoles: User['roles'] = [], user?: User | AuthUser | null): boolean => {
  if (!user) return false

  return allRoles.some((role) => (user as User)?.roles?.some((individualRole) => individualRole === role))
}

export const anyone: Access = () => true

export const rootUsers: Access = ({ req: { user } }) => isRootUser(user)

// Fields

export const rootUsersFieldAccess: FieldAccess = ({ req: { user } }) => checkUserRoles([UserRole.Root], user)

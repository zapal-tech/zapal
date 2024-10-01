import { FieldHook } from 'payload'

import { Collection, UserRole } from '@zapal/shared/types'
import { User } from '@cms/types/generated-types'

// ensure the first user created is a root user
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, append `root` to the roles array
// access control is already handled by this fields `access` property
// it ensures that only admins can create and update the `roles` field
export const ensureFirstUserIsRoot: FieldHook<User> = async ({ operation, req: { payload }, value = [] }) => {
  if (operation !== 'create') return value

  const users = await payload.find({ collection: Collection.Users, depth: 0, limit: 1 })

  if (!users.totalDocs && !(value || []).includes(UserRole.Root)) return [...(value || []), UserRole.Root]
}

export const virtualFullName: FieldHook<User, User['fullName'], User> = ({ siblingData }) =>
  `${siblingData?.firstName}${siblingData?.lastName ? ` ${siblingData.lastName}` : ''}`

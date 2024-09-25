import { CollectionAfterChangeHook, CollectionAfterLoginHook, FieldHook } from 'payload'

import { Collection, UserRole } from '@cms/types'
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

export const signInAfterCreate: CollectionAfterChangeHook = async ({ doc, req, req: { payload, json }, operation }) => {
  if (operation !== 'create' || req.user) return doc

  try {
    const { email, password } = await json?.()

    if (email && password) {
      const { user, token } = await payload.login({
        collection: Collection.Users,
        data: { email, password },
        req,
      })

      return { ...doc, token, user }
    }
  } catch (error) {
    payload.logger.error('Sign in after create error', error)
  }
}

export const virtualFullName: FieldHook<User, User['fullName'], User> = ({ siblingData }) =>
  `${siblingData?.firstName}${siblingData?.lastName ? ` ${siblingData.lastName}` : ''}`

export const recordLastSignedInTenant: CollectionAfterLoginHook<User> = async ({ req: { payload, headers }, req, user }) => {
  try {
    const host = headers.get('host')

    const tenant = (
      await payload.find({
        collection: Collection.Tenants,
        depth: 0,
        limit: 1,
        where: { domain: { equals: host } },
      })
    ).docs[0]

    await payload.update({
      id: user.id,
      collection: Collection.Users,
      data: {
        lastSignedInTenant: tenant?.id || null,
      },
      req,
      overrideLock: true,
    })
  } catch (err: unknown) {
    payload.logger.error({
      err,
      msg: `Error recording last signed in tenant for user ${user.id}`,
    })
  }

  return user
}

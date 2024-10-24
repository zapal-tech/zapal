import { FieldHook, ValidationError } from 'payload'

import { Collection, UserRole } from '@zapal/shared/types'

import { getTenantAccessIds } from '@cms/utils/getTenantAccessIds'

export const ensureUniqueSlug: FieldHook = async ({
  data,
  originalDoc,
  req: {
    payload,
    user,
    i18n: { t },
  },
  value,
}) => {
  const incomingParentId = data?.parent && typeof data?.parent === 'object' ? data.parent.id : data?.parent
  const currentParentId =
    originalDoc?.parent && typeof originalDoc?.parent === 'object' ? originalDoc.parent.id : originalDoc?.parent

  const incomingTenantId = data?.tenant && typeof data?.tenant === 'object' ? data.tenant.id : data?.tenant
  const currentTenantId =
    originalDoc?.tenant && typeof originalDoc?.tenant === 'object' ? originalDoc.tenant.id : originalDoc?.tenant

  if (originalDoc.slug === value && incomingParentId === currentParentId && incomingTenantId === currentTenantId) return value

  const tenantIdToMatch = incomingTenantId || currentTenantId
  const parentIdToMatch = (data?.parent && typeof data.parent === 'object' ? data.parent.id : data?.parent) || null

  const foundDuplicatePages = await payload.find({
    collection: Collection.Pages,
    where: {
      and: [{ tenant: { equals: tenantIdToMatch } }, { slug: { equals: value } }, { parent: { equals: parentIdToMatch } }],
    },
  })

  if (foundDuplicatePages.docs.length && user) {
    const tenantIds = getTenantAccessIds(user)

    // if the user is an admin or has access to more than 1 tenant
    // provide a more specific error message
    if (user.roles?.includes(UserRole.Root) || tenantIds.length) {
      const attemptedTenantChange = await payload.findByID({
        id: tenantIdToMatch,
        collection: Collection.Tenants,
      })

      throw new ValidationError({
        errors: [
          {
            field: 'slug',
            // @ts-expect-error - custom validation error translation
            message: t('validation:slugWithParent.uniqueWithTenantDetails', {
              slug: value,
              tenant: attemptedTenantChange.name,
            }),
          },
        ],
      })
    }

    throw new ValidationError({
      errors: [
        {
          field: 'slug',
          // @ts-expect-error - custom validation error translation
          message: t('validation:slugWithParent.unique', {
            slug: value,
          }),
        },
      ],
    })
  }

  return value
}

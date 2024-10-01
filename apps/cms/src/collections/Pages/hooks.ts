import type { FieldHook } from 'payload'

import { ValidationError } from 'payload'

import { getTenantAccessIds } from '@cms/utils/getTenantAccessIds'
import { Collection, UserRole } from '@zapal/shared/types'

export const ensureUniqueSlug: FieldHook = async ({ data, originalDoc, req: { payload, user }, value }) => {
  // if value is unchanged, skip validation
  if (originalDoc.slug === value) return value

  const incomingTenantId = typeof data?.tenant === 'object' ? data.tenant.id : data?.tenant
  const currentTenantId = typeof originalDoc?.tenant === 'object' ? originalDoc.tenant.id : originalDoc?.tenant
  const tenantIdToMatch = incomingTenantId || currentTenantId

  const foundDuplicatePages = await payload.find({
    collection: Collection.Pages,
    where: {
      and: [{ tenant: { equals: tenantIdToMatch } }, { slug: { equals: value } }],
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
            message: `The "${attemptedTenantChange.name}" tenant already has a page with the slug "${value}". Slugs must be unique per tenant.`,
          },
        ],
      })
    }

    throw new ValidationError({
      errors: [
        {
          field: 'slug',
          message: `A page with the slug ${value} already exists. Slug must be unique per tenant.`,
        },
      ],
    })
  }

  return value
}

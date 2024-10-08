import { createParentField } from '@payloadcms/plugin-nested-docs'
import type { CollectionConfig } from 'payload'

import { Collection } from '@zapal/shared/types'

import { slug, tenant, title } from '@cms/fields'
import { Page, Tenant } from '@cms/types/generated-types'
import { isAdminPanel } from '@cms/utils/isAdminPanel'

import { externalReadAccess, filterByTenantRead, rootUsersAndTenantAdmins } from './access'
import { ensureUniqueSlug } from './hooks'

export const Pages: CollectionConfig = {
  slug: Collection.Pages,
  access: {
    create: rootUsersAndTenantAdmins,
    delete: rootUsersAndTenantAdmins,
    read: (args) => {
      // when viewing pages inside the admin panel
      // restrict access to the ones your user has access to
      if (isAdminPanel(args.req)) return filterByTenantRead(args)
      // return filterByTenantRead(args)

      // // when viewing pages from outside the admin panel
      // // you should be able to see your tenants and public tenants
      return externalReadAccess(args)
      // return false
    },
    update: rootUsersAndTenantAdmins,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'createdAt', 'updatedAt'],
  },
  fields: [
    title(),
    slug({
      defaultValue: 'home',
      hooks: {
        beforeValidate: [ensureUniqueSlug],
      },
      index: true,
    }),
    tenant(),
    createParentField(Collection.Pages, {
      label: {
        en: 'Parent page',
        uk: "Батьківська сторінка (об'єкт)",
      },
      filterOptions: ({ siblingData }) =>
        ((siblingData as Page).tenant as Tenant)
          ? {
              tenant: {
                equals:
                  typeof (siblingData as Page).tenant === 'object'
                    ? ((siblingData as any).tenant as Tenant).id
                    : (siblingData as Page).tenant,
              },
            }
          : false,
    }),
  ],
}

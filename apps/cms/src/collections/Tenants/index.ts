import { CollectionConfig } from 'payload'

import { Collection } from '@zapal/shared/types'

import { rootUsers } from '@cms/access'
import { slug } from '@cms/fields'

import { tenantAdmins, tenantMembersOrPublicTenant } from './access'

export const Tenants: CollectionConfig = {
  slug: Collection.Tenants,
  access: {
    create: rootUsers,
    read: tenantMembersOrPublicTenant,
    update: tenantAdmins,
    delete: rootUsers,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'public'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Name',
        uk: 'Назва',
      },
      required: true,
      unique: true,
    },
    slug({
      required: true,
      unique: true,
      admin: {
        components: {
          Description: {
            path: '@cms/collections/Tenants/fields/TenantUrlPreview',
            exportName: 'TenantUrlPreview',
          },
        },
      },
    }),
    {
      name: 'public',
      type: 'checkbox',
      label: {
        en: 'Public',
        uk: 'Публічний',
      },
      admin: {
        description: {
          en: 'If checked, logging in is not required.',
          uk: 'Якщо відмічено, вхід не потрібен.',
        },
        position: 'sidebar',
      },
      defaultValue: false,
      index: true,
    },
  ],
}

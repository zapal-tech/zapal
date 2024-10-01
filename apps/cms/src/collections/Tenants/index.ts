import { Collection } from '@zapal/shared/types'
import { CollectionConfig } from 'payload'

import { tenantAdmins, tenantMembersOrPublicTenant } from './access'
import { virtualFullName } from './hooks'
import { rootUsers } from '@cms/access'

export const Tenants: CollectionConfig = {
  slug: Collection.Tenants,
  access: {
    create: rootUsers,
    read: tenantMembersOrPublicTenant,
    update: tenantAdmins,
    delete: rootUsers,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['name', 'domain', 'public'],
  },
  fields: [
    {
      name: 'fullName',
      label: {
        en: 'Full name',
        uk: 'Повна назва',
      },
      virtual: true,
      type: 'text',
      hooks: {
        afterRead: [virtualFullName],
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      label: {
        en: 'Name',
        uk: 'Назва',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      label: {
        en: 'Domain',
        uk: 'Домен',
      },
      type: 'text',
      required: true,
      index: true,
    },
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

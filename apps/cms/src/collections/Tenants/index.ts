import { Collection } from '@cms/types'
import { CollectionConfig } from 'payload'

import { tenantAdmins } from './access'

export const Tenants: CollectionConfig = {
  slug: Collection.Tenants,
  access: {
    //   create: rootUsers,
    read: tenantAdmins,
    update: tenantAdmins,
    //   delete: rootUsers,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
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
  ],
}

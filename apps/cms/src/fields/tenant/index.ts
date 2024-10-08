import { deepMerge, SingleRelationshipField } from 'payload'

import { Collection } from '@zapal/shared/types'

import { isRootUser } from '@cms/access'

import { tenantFieldUpdate } from './access'
import { autofillTenant } from './hooks'

export const tenant = (data?: Omit<SingleRelationshipField, 'name' | 'hasMany' | 'relationTo'>): SingleRelationshipField =>
  deepMerge<SingleRelationshipField>(
    {
      name: 'tenant',
      type: 'relationship',
      access: {
        read: () => true,
        update: (args) => {
          if (isRootUser(args.req.user)) return true

          return tenantFieldUpdate(args)
        },
      },
      admin: {
        components: {
          Field: '@cms/fields/tenant/components/Field#TenantFieldComponent',
        },
        position: 'sidebar',
      },
      hasMany: false,
      hooks: {
        beforeValidate: [autofillTenant],
      },
      index: true,
      relationTo: Collection.Tenants,
      required: true,
    },
    (data || {}) as unknown as SingleRelationshipField,
  )

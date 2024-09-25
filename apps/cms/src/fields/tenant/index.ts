import { Field } from 'payload'

import { isRootUser } from '@cms/access'
import { Collection } from '@cms/types'

import { autofillTenant } from './hooks'
import { tenantFieldUpdate } from './access'

export const tenantField: Field = {
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
}

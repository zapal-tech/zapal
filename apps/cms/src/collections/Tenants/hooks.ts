import { FieldHook } from 'payload'

import { Tenant } from '@cms/types/generated-types'

export const virtualFullName: FieldHook<Tenant, Tenant['name'], Tenant> = ({ siblingData }) =>
  `${siblingData?.name} (${siblingData?.domain})`

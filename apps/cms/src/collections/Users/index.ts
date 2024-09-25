import { CollectionConfig } from 'payload'

import { AdminPanelGroup, Collection, CollectionLabel, UserRole, UserTenantRole } from '@cms/types'

import { isNotDev } from '@cms/utils/env'

import { ensureFirstUserIsRoot, recordLastSignedInTenant, signInAfterCreate, virtualFullName } from './hooks'
// import { welcomeEmail } from './hooks/welcomeEmail'

import { isRootUserOrTenantAdmin, tenantAdmins, tenantAdminsAndSelf } from './access'
import { rootUserFieldAccess } from '@cms/access'

export const Users: CollectionConfig = {
  slug: Collection.Users,
  labels: CollectionLabel.Users,
  auth: {
    lockTime: 60 * 60,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 24 * 7,
    cookies: {
      sameSite: 'Strict',
      secure: isNotDev,
      domain: process.env.NEXT_PUBLIC_CMS_COOKIES_DOMAIN,
    },
  },
  admin: {
    group: AdminPanelGroup.General,
    defaultColumns: ['fullName', 'email', 'roles'],
    useAsTitle: 'fullName',
  },
  access: {
    read: tenantAdminsAndSelf,
    //// create: anyone,
    update: tenantAdminsAndSelf,
    delete: tenantAdminsAndSelf,
    admin: isRootUserOrTenantAdmin,
  },
  hooks: {
    afterChange: [signInAfterCreate],
    afterLogin: [recordLastSignedInTenant],
  },
  timestamps: true,
  fields: [
    {
      name: 'fullName',
      label: {
        en: 'Full Name',
        uk: 'Повне ім’я',
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
      type: 'row',
      fields: [
        {
          label: {
            en: 'First Name',
            uk: "Ім'я",
          },
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          label: {
            en: 'Last Name',
            uk: 'Прізвище',
          },
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'roles',
      label: {
        en: 'Roles',
        uk: 'Ролі',
      },
      type: 'select',
      hasMany: true,
      required: true,
      access: {
        create: rootUserFieldAccess,
        update: rootUserFieldAccess,
        read: rootUserFieldAccess,
      },
      defaultValue: [UserRole.User],
      options: [
        {
          label: {
            en: 'Root admin',
            uk: 'Головний адміністратор',
          },
          value: UserRole.Root,
        },
        {
          label: {
            en: 'User',
            uk: 'Користувач',
          },
          value: UserRole.User,
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsRoot],
      },
    },
    {
      name: 'tenants',
      type: 'array',
      label: {
        en: 'Tenants',
        uk: 'Тенанти',
      },
      access: {
        create: tenantAdmins,
        update: tenantAdmins,
        read: tenantAdmins,
      },
      fields: [
        {
          name: 'tenant',
          label: {
            en: 'Tenant',
            uk: 'Тенант',
          },
          type: 'relationship',
          relationTo: Collection.Tenants,
          required: true,
        },
        {
          name: 'roles',
          label: {
            en: 'Roles',
            uk: 'Ролі',
          },
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            {
              label: {
                en: 'Admin',
                uk: 'Адміністратор',
              },
              value: UserTenantRole.Admin,
            },
            {
              label: {
                en: 'Content manager',
                uk: 'Менеджер контенту',
              },
              value: UserTenantRole.ContentManager,
            },
          ],
        },
      ],
    },
    {
      name: 'lastSignedInTenant',
      label: {
        en: 'Last signed in Tenant',
        uk: 'Востаннє увійшов в тенант',
      },
      type: 'relationship',
      relationTo: Collection.Tenants,
      index: true,
      access: {
        create: () => false,
        read: tenantAdmins,
        update: rootUserFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

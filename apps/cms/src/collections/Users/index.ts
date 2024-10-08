import { CollectionConfig } from 'payload'

import { AdminPanelGroup, Collection, CollectionLabel, UserRole, UserTenantRole } from '@zapal/shared/types'

import { rootUsersFieldAccess } from '@cms/access'
import { isNotDev } from '@cms/utils/env'

// import { welcomeEmail } from './hooks/welcomeEmail'

import { createAccess, readAccess, updateAndDeleteAccess } from './access'
import { ensureFirstUserIsRoot, virtualFullName } from './hooks'

export const Users: CollectionConfig = {
  slug: Collection.Users,
  labels: CollectionLabel.Users,
  auth: {
    lockTime: 60 * 60,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 24 * 7,
    cookies: {
      sameSite: 'Lax',
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
    read: readAccess,
    create: createAccess,
    update: updateAndDeleteAccess,
    delete: updateAndDeleteAccess,
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
        create: rootUsersFieldAccess,
        update: rootUsersFieldAccess,
        read: rootUsersFieldAccess,
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
      saveToJWT: true,
      label: {
        en: 'Tenants',
        uk: 'Тенанти',
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
          saveToJWT: true,
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
          defaultValue: [UserTenantRole.Viewer],
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
            {
              label: {
                en: 'Viewer',
                uk: 'Глядач',
              },
              value: UserTenantRole.Viewer,
            },
          ],
        },
      ],
    },
  ],
}

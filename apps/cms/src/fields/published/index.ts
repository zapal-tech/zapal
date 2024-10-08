import { Field } from 'payload'

import { Collection } from '@zapal/shared/types'

import { rootUsersFieldAccess } from '@cms/access'

import { lastPublishedByBeforeChange, publishedAtBeforeChange, publishedByBeforeChange } from './hooks'

export const publishedAt = (): Field => ({
  admin: {
    date: {
      pickerAppearance: 'dayOnly',
    },
    position: 'sidebar',
  },
  hooks: {
    beforeChange: [publishedAtBeforeChange],
  },
  label: {
    en: 'Published at',
    uk: 'Опубліковано',
  },
  name: 'publishedAt',
  type: 'date',
})

export const publishedBy = (): Field => ({
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  label: {
    en: 'Published By',
    uk: 'Вперше опубліковано користувачем',
  },
  hooks: {
    beforeChange: [publishedByBeforeChange],
  },
  name: 'publishedBy',
  relationTo: Collection.Users,
  type: 'relationship',
})

export const lastPublishedBy = (): Field => ({
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  label: {
    en: 'Last Published By',
    uk: 'Востаннє опубліковано користувачем',
  },
  access: {
    read: rootUsersFieldAccess,
  },
  hooks: {
    beforeChange: [lastPublishedByBeforeChange],
  },
  name: 'lastPublishedBy',
  relationTo: Collection.Users,
  type: 'relationship',
})

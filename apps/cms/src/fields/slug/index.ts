import { deepMerge, Field } from 'payload'

import { formatSlug } from './hooks'

type Slug = (data?: Partial<Field>, fieldToUseForAutoGeneration?: string) => Field

export const slug: Slug = (data = {}, fieldToUseForAutoGeneration = 'title') =>
  deepMerge<Field, Partial<Field>>(
    {
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUseForAutoGeneration)],
      },
      index: true,
      label: {
        en: 'URL Slug',
        uk: 'Частка URL',
      },
      name: 'slug',
      type: 'text',
    },
    data,
  )

import { deepMerge, Field, TextField } from 'payload'

export const title = (data: Partial<Omit<TextField, 'type'>> = {}): Field =>
  deepMerge<TextField, Partial<TextField>>(
    {
      label: {
        en: 'Title',
        uk: 'Заголовок',
      },
      name: 'title',
      required: true,
      localized: true,
      type: 'text',
    },
    data as unknown as Partial<TextField>,
  )

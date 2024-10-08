import { GlobalConfig } from 'payload'

import { Global } from '@zapal/shared/types'

import { link } from '@cms/fields'

export const Home: GlobalConfig = {
  slug: Global.Home,
  fields: [
    {
      type: 'array',
      name: 'grid',
      labels: {
        plural: {
          en: 'Grid',
          uk: 'Сітка',
        },
        singular: {
          en: 'Grid item (link)',
          uk: 'Клітинка сітки (посилання)',
        },
      },
      fields: [link()],
    },
  ],
}

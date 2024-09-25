import { Collection, Global } from '@cms/types'

import { Locale } from '@zapal/shared/i18n'

type CollectionLabel = Record<'singular' | 'plural', Record<Locale, string> | string>
type GlobalLabel = Record<Locale, string> | string

export const CollectionLabel: Record<keyof typeof Collection | 'Redirects', CollectionLabel> = {
  Users: {
    plural: {
      en: 'Users',
      uk: 'Користувачі',
    },
    singular: {
      en: 'User',
      uk: 'Користувач',
    },
  },

  Tenants: {
    plural: {
      en: 'Tenants',
      uk: 'Тенанти',
    },
    singular: {
      en: 'Tenant',
      uk: 'Тенант',
    },
  },

  Pages: {
    plural: {
      en: 'Pages',
      uk: 'Сторінки',
    },
    singular: {
      en: 'Page',
      uk: 'Сторінка',
    },
  },

  Media: {
    singular: {
      en: 'Media',
      uk: 'Медіа',
    },
    plural: {
      en: 'Media Library',
      uk: 'Медіа бібліотека',
    },
  },

  OpenGraphImages: {
    singular: {
      en: 'Open Graph image',
      uk: 'Open Graph зображення',
    },
    plural: {
      en: 'Open Graph images',
      uk: 'Open Graph зображення',
    },
  },

  Redirects: {
    plural: {
      en: 'Redirects',
      uk: 'Редиректи',
    },
    singular: {
      en: 'Redirect',
      uk: 'Редирект',
    },
  },

  Categories: {
    plural: {
      en: 'Categories',
      uk: 'Категорії',
    },
    singular: {
      en: 'Category',
      uk: 'Категорія',
    },
  },
} as const

export const GlobalLabel: Record<keyof typeof Global, GlobalLabel> = {
  Home: {
    en: 'Home',
    uk: 'Головна',
  },

  Header: {
    en: 'Header',
    uk: 'Хедер',
  },

  Footer: {
    en: 'Footer',
    uk: 'Футер',
  },

  Settings: {
    en: 'Settings',
    uk: 'Налаштування',
  },
}

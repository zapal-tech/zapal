import { Locale as CMSLocale } from 'payload'

import { Locale } from '@zapal/shared/i18n'

export enum Namespace {
  Validation = 'validation',
}

export const cmsLocales: CMSLocale[] = [
  {
    code: Locale.Ukrainian,
    rtl: false,
    label: {
      en: 'Ukrainian',
      uk: 'Українська',
    },
  },
  {
    code: Locale.English,
    rtl: false,
    label: {
      en: 'English',
      uk: 'Англійська',
    },
  },
]

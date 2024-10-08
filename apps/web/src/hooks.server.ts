import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { i18n } from '$lib/i18n'

const preloadFonts: Handle = ({ event, resolve }) =>
  resolve(event, {
    preload: ({ type }) => type === 'font' || type === 'js' || type === 'css',
  })

const i18nHandle: Handle = i18n.handle({ langPlaceholder: '%i18n.lang%', textDirectionPlaceholder: '%i18n.dir%' })

export const handle = sequence(preloadFonts, i18nHandle)

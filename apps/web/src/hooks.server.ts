import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { locales } from '@zapal/shared/i18n'
import { getAbsolutePath, splitPath } from '@zapal/shared/utils'

import { PUBLIC_DOMAIN, PUBLIC_GLOBAL_DOMAIN } from '$env/static/public'
import { routeToAppHostnameMap } from '$lib/apps'
import { i18n } from '$lib/i18n'

const preloadFonts: Handle = ({ event, resolve }) =>
  resolve(event, {
    preload: ({ type }) => type === 'font' || type === 'js' || type === 'css',
  })

const redirectToAppHost: Handle = ({ event, resolve }) => {
  const [localeOrApp, app, ...path] = splitPath(event.url.pathname)

  const isLocaleValid = (locales as string[]).includes(localeOrApp || '')
  const isAppValid = !!(app && routeToAppHostnameMap[app])
  const isLocaleAppValid = !!(localeOrApp && routeToAppHostnameMap[localeOrApp])

  if ([PUBLIC_DOMAIN, PUBLIC_GLOBAL_DOMAIN].includes(event.url.hostname) && ((isLocaleValid && isAppValid) || isLocaleAppValid)) {
    event.url.hostname = routeToAppHostnameMap[isAppValid ? app : localeOrApp || ''] || ''
    event.url.pathname = isAppValid ? getAbsolutePath([localeOrApp || '', ...path]) : getAbsolutePath([app || '', ...path])

    return new Response(undefined, {
      status: 301,
      headers: {
        location: event.url.toString(),
      },
    })
  }

  return resolve(event)
}

const redirectToWww: Handle = ({ event, resolve }) => {
  if (event.url.hostname !== PUBLIC_DOMAIN) return resolve(event)

  event.url.hostname = PUBLIC_GLOBAL_DOMAIN

  return new Response(undefined, {
    status: 301,
    headers: {
      location: event.url.toString(),
    },
  })
}

const i18nHandle: Handle = i18n.handle({ langPlaceholder: '%i18n.lang%', textDirectionPlaceholder: '%i18n.dir%' })

export const handle = sequence(redirectToAppHost, redirectToWww, preloadFonts, i18nHandle)

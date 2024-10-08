import type { Handle } from '@sveltejs/kit'
import type { CookieSerializeOptions } from 'cookie'
import { get, writable } from 'svelte/store'

import { previewCookieName } from '@zapal/shared/cookies'

import { dev } from '$app/environment'

export { default as PreviewBanner } from './PreviewBanner.svelte'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace App {
    interface Locals {
      isPreview: boolean
      exitPreviewQueryParam: string
    }
  }
}

interface PreviewModeConfig {
  previewSecret: string
  cookieName?: string
  cookieOptions?: CookieSerializeOptions
  exitPreviewQueryParam?: string
  secretTokenQueryParam?: string
}

export default function previewMode(configOverrides?: PreviewModeConfig): Handle {
  const config = {
    previewSecret: 'secret',
    cookieName: previewCookieName,
    exitPreviewQueryParam: 'exit-preview',
    secretTokenQueryParam: 'secret',
    ...configOverrides,
    cookieOptions: {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: !dev,
      ...configOverrides?.cookieOptions,
    },
  } satisfies PreviewModeConfig

  return function ({ event, resolve }) {
    event.locals.exitPreviewQueryParam = config.exitPreviewQueryParam

    const is_exit = event.url.searchParams.has(config.exitPreviewQueryParam)
    const secret_matches = event.url.searchParams.get(config.secretTokenQueryParam) === config.previewSecret
    const has_preview_cookie = event.cookies.get(config.cookieName) === 'true'

    if (is_exit) {
      setPreview(false)

      // remove exit-preview query param from url
      event.url.searchParams.delete(config.exitPreviewQueryParam)

      // redirect to url without secret (but keep any other query params)
      return new Response(null, {
        status: 302,
        headers: {
          location: event.url.pathname + event.url.search,
          'Set-Cookie': event.cookies.serialize(config.cookieName, 'false', config.cookieOptions),
        },
      })
    }

    if (has_preview_cookie || secret_matches || isPreview()) {
      setPreview(true)

      event.setHeaders({ 'Cache-Control': 'no-store' })
      event.locals.isPreview = true

      if (secret_matches) {
        event.cookies.set(config.cookieName, 'true', config.cookieOptions)

        // remove secret query param from url
        event.url.searchParams.delete(config.secretTokenQueryParam)

        // redirect to url without secret (but keep any other query params)
        return new Response(null, {
          status: 302,
          headers: {
            location: event.url.pathname + event.url.search,
            'Set-Cookie': event.cookies.serialize(config.cookieName, 'true', config.cookieOptions),
          },
        })
      }
    }

    return resolve(event)
  }
}

const store = writable(false)

export const setPreview = store.set
export const isPreview = () => get(store)

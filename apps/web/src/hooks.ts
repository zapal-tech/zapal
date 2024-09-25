import type { Handle, Reroute } from '@sveltejs/kit'
import {
  PUBLIC_DOMAIN,
  PUBLIC_GLOBAL_DOMAIN,
  PUBLIC_TECH_DOMAIN,
  PUBLIC_DESIGN_DOMAIN,
  PUBLIC_BLOG_DOMAIN,
} from '$env/static/public'
import { i18n } from '$lib/i18n'

export const reroute: Reroute = ({ url, ...props }) => {
  const rerouted = i18n.reroute()({ url, ...props })

  if (url.hostname === PUBLIC_GLOBAL_DOMAIN) return `/www${rerouted}`
  if (url.hostname === PUBLIC_TECH_DOMAIN) return `/tech${rerouted}`
  if (url.hostname === PUBLIC_DESIGN_DOMAIN) return `/design${rerouted}`
  if (url.hostname === PUBLIC_BLOG_DOMAIN) return `/blog${rerouted}`
}

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.hostname === PUBLIC_DOMAIN && event.request.method === 'GET')
    return new Response(null, {
      status: 308,
      headers: {
        location: `${event.url.protocol}//${PUBLIC_GLOBAL_DOMAIN}${event.url.port ? `:${event.url.port}` : ''}${event.url.pathname}`,
      },
    })

  return resolve(event)
}

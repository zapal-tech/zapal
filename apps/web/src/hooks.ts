import type { Handle, Reroute } from '@sveltejs/kit'
import { PUBLIC_DOMAIN, PUBLIC_GLOBAL_DOMAIN } from '$env/static/public'
import { hostnameRoutesMap } from '$lib/hostname'
import { i18n } from '$lib/i18n'

export const reroute: Reroute = ({ url, ...props }) => {
  const rerouted = i18n.reroute()({ url, ...props })

  if (url.hostname in hostnameRoutesMap && hostnameRoutesMap[url.hostname])
    return `/${hostnameRoutesMap[url.hostname]}${rerouted}`

  return rerouted
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

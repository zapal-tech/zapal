import type { Reroute } from '@sveltejs/kit'

import { appHostnameToRouteMap } from '$lib/apps'
import { i18n } from '$lib/i18n'

export const reroute: Reroute = (event) => {
  if (event.url.hostname in appHostnameToRouteMap)
    event.url.pathname = `/${appHostnameToRouteMap[event.url.hostname]}` + event.url.pathname

  return i18n.reroute()(event)
}

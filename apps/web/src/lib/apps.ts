import { PUBLIC_BLOG_DOMAIN, PUBLIC_ESTIMATE_DOMAIN } from '$env/static/public'

export const appHostnameToRouteMap: Record<string, string> = {
  [PUBLIC_BLOG_DOMAIN]: 'blog',
  [PUBLIC_ESTIMATE_DOMAIN]: 'estimate',
}

export const routeToAppHostnameMap: Record<string, string> = Object.fromEntries(
  Object.entries(appHostnameToRouteMap).map(([host, route]) => [route, host]),
)

import { PUBLIC_GLOBAL_DOMAIN, PUBLIC_TECH_DOMAIN, PUBLIC_DESIGN_DOMAIN, PUBLIC_BLOG_DOMAIN } from '$env/static/public'

export const hostnameRoutesMap: Record<string, string> = {
  [PUBLIC_GLOBAL_DOMAIN]: 'www',
  [PUBLIC_TECH_DOMAIN]: 'tech',
  [PUBLIC_DESIGN_DOMAIN]: 'design',
  [PUBLIC_BLOG_DOMAIN]: 'blog',
}

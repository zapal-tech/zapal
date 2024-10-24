import { splitPath } from '@zapal/shared/utils'

export const match = (path: string) => {
  const [tenant, ...pages] = splitPath(path)

  if (tenant === 'global') return false
  if (tenant && pages.length === 1 && pages[0] === 'home') return false

  return true
}

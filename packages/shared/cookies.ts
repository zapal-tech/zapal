export const cookiesName = 'zapal' as const

export const tokenSuffix = '-token' as const // DO NOT EDIT
export const tokenCookieName = `${cookiesName}${tokenSuffix}` as const

export const tenantSuffix = '-tenant' as const // DO NOT EDIT
export const tenantCookieName = `${cookiesName}${tenantSuffix}` as const

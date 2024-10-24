export const getLastFromArray = <T>(elements: T[]): T => elements[elements.length - 1]
export const getAbsolutePath = (pages: string[]) => `/${pages.join('/')}`
export const splitPath = (path: string) => path.split('/').filter(Boolean)

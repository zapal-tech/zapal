enum Environment {
  Development = 'development',
  Production = 'production',
}

export const isDev = process.env.NODE_ENV === Environment.Development
export const isNotDev = process.env.NODE_ENV !== Environment.Development
export const isProd = process.env.NODE_ENV === Environment.Production
export const isNotProd = process.env.NODE_ENV !== Environment.Production

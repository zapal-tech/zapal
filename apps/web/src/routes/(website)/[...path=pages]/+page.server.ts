import { Collection } from '@zapal/shared/types'
import { getAbsolutePath, getLastFromArray, splitPath } from '@zapal/shared/utils'

import { getLocalApiInstance, initializeLocalApi } from '$lib/server/local-api'

export const load = async ({ params }) => {
  const path = splitPath(params.path)

  await initializeLocalApi()

  const localApi = await getLocalApiInstance()

  const [tenant, ...pages] = path

  const tenantData = (
    await localApi.find({
      collection: Collection.Tenants,
      where: { slug: { equals: tenant } },
      depth: 0,
    })
  ).docs?.[0]

  const isTenantExists = !!tenantData

  const page = (
    await localApi.find({
      collection: Collection.Pages,
      where: {
        slug: { equals: pages.length ? getLastFromArray(path) : isTenantExists ? 'home' : tenant },
        'breadcrumbs.url': { equals: getAbsolutePath(isTenantExists ? (pages.length ? pages : ['home']) : path) },
        'tenant.slug': { equals: isTenantExists ? tenant : 'global' },
      },
    })
  ).docs?.[0]

  return { title: page?.title, tenant: tenantData ? tenantData.name : null, page }
}

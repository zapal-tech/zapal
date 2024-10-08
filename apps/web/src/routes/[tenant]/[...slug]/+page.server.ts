import { Collection } from '@zapal/shared/types'

import { getLocalApiInstance, initializeLocalApi } from '$lib/server/local-api'

export const load = async ({ params: { tenant, slug } }) => {
  await initializeLocalApi()

  const localApi = await getLocalApiInstance()

  const pages = await localApi.find({
    collection: Collection.Pages,
    where: {
      slug: { equals: slug },
      'tenant.slug': { equals: tenant },
    },
  })

  return { title: pages.docs?.[0]?.title }
}

import { Collection } from '@zapal/shared/types'

import { getLocalApiInstance, initializeLocalApi } from '$lib/server/local-api'

export const load = async ({ params: { tenant } }) => {
  await initializeLocalApi()

  const localApi = await getLocalApiInstance()

  const page = (
    await localApi.find({
      collection: Collection.Pages,
      where: { slug: { equals: 'home' }, 'tenant.slug': { equals: tenant } },
    })
  ).docs[0]

  return page
}

import { initializeLocalApi, getLocalApiInstance } from '$lib/server/local-api'
import { Collection } from '@zapal/shared/types'
import { hostnameRoutesMap } from '$lib/hostname'

export async function load({ params: { tenant, slug } }) {
  await initializeLocalApi()

  const localApi = await getLocalApiInstance()

  const pages = await localApi.find({
    collection: Collection.Pages,
    where: {
      slug: { equals: slug },
      'tenant.domain': { equals: Object.entries(hostnameRoutesMap).find(([, value]) => value === tenant)?.[0] },
    },
  })

  return { title: pages.docs?.[0]?.title }
}

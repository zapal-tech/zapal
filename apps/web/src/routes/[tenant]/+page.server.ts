import { initializeLocalApi, getLocalApiInstance } from '$lib/server/local-api'
import { Collection } from '@zapal/shared/types'

export async function load() {
  await initializeLocalApi()
  const localApi = await getLocalApiInstance()

  const user = await localApi.findByID({
    collection: Collection.Users,
    id: 1,
  })

  return { msg: 'welcome', user }
}

// payload-client.ts
import { getPayload, type Payload } from 'payload'

let localApiInstance: Payload

export async function initializeLocalApi() {
  const config = import('@cms-config').then((m) => m.default)

  localApiInstance = await getPayload({ config })
}

export async function getLocalApiInstance() {
  if (!localApiInstance) throw new Error('Payload has not been initialized. Call initializePayload first.')

  return localApiInstance
}

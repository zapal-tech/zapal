import { getPayload } from 'payload'
import config from '../../apps/cms/payload.config'

export const getLocalApi = async () => await getPayload({ disableOnInit: true, config })

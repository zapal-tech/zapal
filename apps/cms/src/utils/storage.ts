import { CollectionConfig, ImageSize } from 'payload'

import { isDev } from '@cms/utils/env'

type GenerateFileURL = (args: {
  collection: CollectionConfig
  filename: string
  prefix?: string
  size?: ImageSize
}) => Promise<string> | string

export const generatePublicFileURL: GenerateFileURL = ({ prefix, filename }) =>
  `${process.env.NEXT_PUBLIC_CDN_URL}/${isDev ? `${process.env.S3_BUCKET_NAME}/` : ''}${(prefix ? `${prefix}/` : '') + filename}`

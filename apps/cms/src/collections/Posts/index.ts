import { CollectionConfig } from 'payload'

import { Collection } from '@zapal/shared/types'

import { slug, title } from '@cms/fields'

export const Posts: CollectionConfig = {
  slug: Collection.Posts,
  fields: [title(), slug()],
}

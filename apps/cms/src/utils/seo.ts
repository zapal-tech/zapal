import { GenerateTitle } from '@payloadcms/plugin-seo/types'

import { appName } from '@zapal/shared/app'
import { Collection } from '@zapal/shared/types'

import { Page } from '@cms/types/generated-types'

export const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  const suffix = appName
  const separator = ' | '
  let title = 'title' in doc ? doc.title : null

  if (typeof title === 'string' && title) return `${title}${separator}${suffix}`

  return suffix
}

import type { FieldHook } from 'payload'
import transliterateUkrainianToEnglish from 'ua-en-translit'

import { cyrillicRegEx } from '@zapal/shared/regex'

const formatTextToUrlSlug = (val: string): string =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()
    .trim()

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      let generatedValue = value

      if (cyrillicRegEx.test(value)) generatedValue = transliterateUkrainianToEnglish(value)

      return formatTextToUrlSlug(generatedValue)
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') return formatTextToUrlSlug(fallbackData)
    }

    return value
  }

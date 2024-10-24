'use client'

import { useFormFields } from '@payloadcms/ui'
import type { FieldDescriptionClientComponent } from 'payload'
import { useMemo } from 'react'

import { formatTextToUrlSlug } from '@cms/fields/slug/hooks'

const map: Record<string, string> = {
  blog: `https://${process.env.NEXT_PUBLIC_BLOG_DOMAIN}/[locale]/[...pages]`,
  global: `https://${process.env.NEXT_PUBLIC_GLOBAL_DOMAIN}/[locale]/[...pages]`,
}

export const TenantUrlPreview: FieldDescriptionClientComponent = ({ field }) => {
  const value = useFormFields(([state]) => state[field._path || 'slug']?.value as string | undefined | null)

  const formattedValue = useMemo(() => formatTextToUrlSlug(value || ''), [value])
  const url = useMemo(() => {
    if (!formattedValue) return ''
    if (formattedValue in map && typeof map[formattedValue] === 'string') return map[formattedValue]

    return `https://${process.env.NEXT_PUBLIC_GLOBAL_DOMAIN}/[locale]/${formattedValue}/[...pages]`
  }, [formattedValue])

  return url && typeof url === 'string' ? <div className="field-description">{url}</div> : null
}

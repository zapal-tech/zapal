import { GroupField, TextField } from 'payload'

import { Collection } from '@zapal/shared/types'

import { Page } from '@cms/types/generated-types'

export enum LinkType {
  Internal = 'internal',
  Custom = 'custom',
}

export type LinkAppearance = 'primary' | 'secondary' | 'cta' | 'default'

export type LinkAppearanceOption = {
  label: string | Record<string, string>
  value: LinkAppearance
}

export type LinkOverrides = Omit<Partial<TextField>, 'type'>

export type LinkField = (
  options?: {
    appearances?: LinkAppearance[] | false
    disableLabel?: boolean
    localizeLabel?: boolean
  } & LinkOverrides,
) => GroupField

export type LinkData = {
  appearance?: LinkAppearance
  newTab?: boolean
  noFollow?: boolean
  label?: string | null
  doc?: {
    relationTo: Collection | string
    value: Page | number
  } | null
  type?: LinkType | string
  url?: string | null
}

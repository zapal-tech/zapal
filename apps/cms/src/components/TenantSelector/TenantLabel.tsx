'use client'

import { getTranslation } from '@payloadcms/translations'

import { ChevronIcon, useTranslation } from '@payloadcms/ui'
import { OptionObject } from 'payload'

const baseClass = 'localizer-button'

type TenantLabelProps = {
  option?: OptionObject
}

export const TenantLabel: React.FC<TenantLabelProps> = ({ option }) => {
  const { i18n, t } = useTranslation()

  // @ts-expect-error - Custom translation property
  const label = t('general:tenant')

  return (
    <div aria-label={label} className={baseClass}>
      <div className={`${baseClass}__label`}>{`${label}:`}&nbsp;</div>
      <div className={`${baseClass}__current`}>
        <span className={`${baseClass}__current-label`}>{option ? getTranslation(option.label, i18n) : ''}</span>

        <ChevronIcon className={`${baseClass}__chevron`} size="small" />
      </div>
    </div>
  )
}

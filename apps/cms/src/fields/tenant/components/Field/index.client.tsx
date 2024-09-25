'use client'

import { Collection } from '@cms/types'
import { RelationshipField, useField } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

type Props = {
  initialValue?: string
  path: string
  readOnly: boolean
}

export const TenantFieldComponentClient: React.FC<Props> = ({ initialValue, path, readOnly }) => {
  const { formInitializing, setValue, value } = useField({ path })
  const hasSetInitialValue = useRef(false)

  useEffect(() => {
    if (!hasSetInitialValue.current && !formInitializing && initialValue && !value) {
      setValue(Number(initialValue))

      hasSetInitialValue.current = true
    }
  }, [initialValue, setValue, formInitializing, value])

  return (
    <RelationshipField
      field={{
        name: path,
        _path: path,
        type: 'relationship',
        label: {
          en: 'Tenant',
          uk: 'Тенант',
        },
        relationTo: Collection.Tenants,
        required: true,
      }}
      readOnly={readOnly}
    />
  )
}
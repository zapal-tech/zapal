'use client'

import { getTranslation } from '@payloadcms/translations'
import { Popup, PopupList, useAuth, useTranslation } from '@payloadcms/ui'
import { Option } from '@payloadcms/ui/elements/ReactSelect'
import { OptionObject } from 'payload'
import * as qs from 'qs-esm'
import { useCallback, useEffect, useState } from 'react'

import { tenantCookieName } from '@zapal/shared/cookies'
import { UserRole } from '@zapal/shared/types'

import { Tenant, User } from '@cms/types/generated-types'
import { getTenantAdminTenantAccessIds } from '@cms/utils/getTenantAccessIds'

import './index.scss'

import { TenantLabel } from './TenantLabel'

export const TenantSelector = ({ initialCookie }: { initialCookie?: string }) => {
  const { user } = useAuth<User>()
  const { i18n } = useTranslation()

  const [options, setOptions] = useState<OptionObject[]>([])

  const isRootUser = user?.roles?.includes(UserRole.Root)
  const tenantIds =
    user?.tenants?.map(({ tenant }) => {
      if (tenant) {
        if (typeof tenant === 'object') return tenant.id

        return tenant
      }
    }) || []

  function setCookie(name: string, value?: string) {
    const expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  const handleChange = useCallback((option: Option | Option[]) => {
    if (!option) {
      setCookie(tenantCookieName, undefined)

      window.location.reload()
    } else if ('value' in option) {
      setCookie(tenantCookieName, option.value as string)

      window.location.reload()
    }
  }, [])

  useEffect(() => {
    const fetchTenants = async () => {
      const adminOfTenants = getTenantAdminTenantAccessIds(user ?? null)

      const queryString = qs.stringify(
        {
          depth: 0,
          limit: 100,
          sort: 'name',
          where: {
            id: { in: adminOfTenants },
          },
        },
        { addQueryPrefix: true },
      )

      const res = await fetch(`/api/tenants${queryString}`, { credentials: 'include' }).then((res) => res.json())

      const optionsToSet = res.docs.map((doc: Tenant) => ({ label: doc.name, value: doc.id }))

      if (optionsToSet.length === 1) setCookie(tenantCookieName, optionsToSet[0].value)

      setOptions(optionsToSet)
    }

    if (user) void fetchTenants()
  }, [user])

  if ((isRootUser || tenantIds.length > 1) && options.length > 1)
    return (
      <Popup
        button={<TenantLabel option={options.find((option) => option.value.toString() === initialCookie)} />}
        size="large"
        horizontalAlign="right"
        showScrollbar
        render={({ close }) => (
          <PopupList.ButtonGroup>
            {options.map((option) => (
              <PopupList.Button
                key={option.value}
                active={option.value.toString() === initialCookie}
                onClick={() => {
                  handleChange(option)
                  close?.()
                }}
              >
                {getTranslation(option.label, i18n)}
              </PopupList.Button>
            ))}
          </PopupList.ButtonGroup>
        )}
      />
    )

  return null
}

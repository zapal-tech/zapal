import {
  MetaDescriptionComponent as MetaDescriptionComponent_4,
  MetaImageComponent as MetaImageComponent_5,
  MetaTitleComponent as MetaTitleComponent_3,
  OverviewComponent as OverviewComponent_2,
  PreviewComponent as PreviewComponent_6,
} from '@payloadcms/plugin-seo/client'

import { TenantUrlPreview as TenantUrlPreview_0 } from '@cms/collections/Tenants/fields/TenantUrlPreview'
import { Logo as Logo_8 } from '@cms/components/Logo'
import { NavLogo as NavLogo_7 } from '@cms/components/NavLogo'
import { TenantSelectorRSC as TenantSelectorRSC_9 } from '@cms/components/TenantSelector'
import { TenantFieldComponent as TenantFieldComponent_1 } from '@cms/fields/tenant/components/Field'

export const importMap = {
  '@cms/collections/Tenants/fields/TenantUrlPreview#TenantUrlPreview': TenantUrlPreview_0,
  '@cms/fields/tenant/components/Field#TenantFieldComponent': TenantFieldComponent_1,
  '@payloadcms/plugin-seo/client#OverviewComponent': OverviewComponent_2,
  '@payloadcms/plugin-seo/client#MetaTitleComponent': MetaTitleComponent_3,
  '@payloadcms/plugin-seo/client#MetaDescriptionComponent': MetaDescriptionComponent_4,
  '@payloadcms/plugin-seo/client#MetaImageComponent': MetaImageComponent_5,
  '@payloadcms/plugin-seo/client#PreviewComponent': PreviewComponent_6,
  '@cms/components/NavLogo#NavLogo': NavLogo_7,
  '@cms/components/Logo#Logo': Logo_8,
  '@cms/components/TenantSelector#TenantSelectorRSC': TenantSelectorRSC_9,
}

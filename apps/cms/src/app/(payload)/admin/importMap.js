import {
  MetaDescriptionComponent,
  MetaImageComponent,
  MetaTitleComponent,
  OverviewComponent,
  PreviewComponent,
} from '@payloadcms/plugin-seo/client'

import { Logo as Logo_2 } from '@cms/components/Logo'
import { NavLogo as NavLogo_1 } from '@cms/components/NavLogo'
import { TenantSelectorRSC as TenantSelectorRSC_3 } from '@cms/components/TenantSelector'
import { TenantFieldComponent as TenantFieldComponent_0 } from '@cms/fields/tenant/components/Field'

export const importMap = {
  '@cms/fields/tenant/components/Field#TenantFieldComponent': TenantFieldComponent_0,
  '@cms/components/NavLogo#NavLogo': NavLogo_1,
  '@cms/components/Logo#Logo': Logo_2,
  '@cms/components/TenantSelector#TenantSelectorRSC': TenantSelectorRSC_3,
  '@payloadcms/plugin-seo/client#PreviewComponent': PreviewComponent,
  '@payloadcms/plugin-seo/client#MetaImageComponent': MetaImageComponent,
  '@payloadcms/plugin-seo/client#MetaDescriptionComponent': MetaDescriptionComponent,
  '@payloadcms/plugin-seo/client#MetaTitleComponent': MetaTitleComponent,
  '@payloadcms/plugin-seo/client#OverviewComponent': OverviewComponent,
}

import { defaultPrettierConfig } from '@zapal/dx/prettier'

import cmsConfig from './apps/cms/.prettierrc.js'
import webConfig from './apps/web/.prettierrc.js'

/** @type {import('prettier').Config} */
export default {
  ...defaultPrettierConfig,
  overrides: [
    {
      files: 'apps/web/**/*',
      options: webConfig,
    },
    {
      files: 'apps/cms/**/*',
      options: cmsConfig,
    },
  ],
}

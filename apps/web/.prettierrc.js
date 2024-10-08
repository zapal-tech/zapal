import { sveltePrettierConfig } from '@zapal/dx/prettier'

export default {
  ...sveltePrettierConfig,
  importOrderTypeScriptVersion: '5.6.2',
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(@zapal)(?!/shared)(/.*)$',
    '',
    '^(@zapal/shared)(/.*)?$',
    '',
    '^(@cms|@cms-config)(/.*)?$',
    '',
    '^(\\$app|\\$env|\\$lib|\\$service-worker)(/.*)?$',
    '',
    '^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
}

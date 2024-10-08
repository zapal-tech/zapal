const en = {
  general: {
    tenant: 'Tenant',
    payloadSettings: 'Zapal CMS Settings',
  },
  validation: {
    slugWithParent: {
      info: 'URL slug must be unique per tenant and parent combination, change the URL slug or parent.',
      unique: 'A page with the URL slug "{{slug}}" and the current parent combination already exists. $t(page.slugInfo)',
      uniqueWithTenantDetails:
        'The "{{tenant}}" tenant already has a page with the URL slug "{{slug}}" and the current parent combination. $t(page.slugInfo)',
    },
  },
}

export default en

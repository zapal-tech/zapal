const uk = {
  general: {
    tenant: 'Тенант',
    payloadSettings: 'Налаштування Zapal CMS',
    loading: 'Завантаження',
  },
  validation: {
    slugWithParent: {
      info: "Частка URL має бути унікальною для кожної комбінації тенанта та батьківського об'єкта, змініть частку URL або батьківський об'єкт.",
      unique:
        'Сторінка з комбінацією частки URL "{{slug}}" та поточним батьківським об\'єктом вже існує. $t(slugWithParent.info)',
      uniqueWithTenantDetails:
        'Тенант "{{tenant}}" вже має сторінку з комбінацією частки URL "{{slug}}" та поточним батьківським об\'єктом. $t(slugWithParent.info)',
    },
  },
}

export default uk

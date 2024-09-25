export enum Locale {
  English = 'en',
  Ukrainian = 'uk',
}

export const defaultLocale = Locale.Ukrainian

export const locales = (Object.values(Locale) as Array<Locale>).map((locale) => locale)

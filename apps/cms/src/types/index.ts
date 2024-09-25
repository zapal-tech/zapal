import { Locale } from '@zapal/shared/i18n'

export enum UserRole {
  Root = 'root',
  User = 'user',
}

export enum UserTenantRole {
  Admin = 'admin',
  ContentManager = 'content-manager',
}

// TS Enum values must be of string or number type
export const AdminPanelGroup: Record<'General' | 'Media' | 'Content', Record<Locale, string>> = {
  General: {
    en: 'General',
    uk: 'Загальне',
  },
  Media: {
    en: 'Media',
    uk: 'Медіа',
  },
  Content: {
    en: 'Content',
    uk: 'Контент',
  },
} as const

export enum HeroType {
  None = 'none',
  FullscreenSlider = 'fullscreenSlider',
  Slider = 'slider',
  Fullscreen = 'fullscreen',
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export enum Collection {
  Categories = 'categories',
  Users = 'users',
  Tenants = 'tenants',
  Pages = 'pages',
  Media = 'media',
  OpenGraphImages = 'open-graph-images',
}

export enum Global {
  Settings = 'settings',
  Header = 'header',
  Home = 'home',
  Footer = 'footer',
}

export * from './labels'

import path from 'path'
import { fileURLToPath } from 'url'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
// import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig, Config } from 'payload'
import { en } from 'payload/i18n/en'
import { uk } from 'payload/i18n/uk'
import sharp from 'sharp'

import { appName } from '@zapal/shared/app'
import { cookiesName } from '@zapal/shared/cookies'
import { cmsSenderEmail, cmsSenderName } from '@zapal/shared/email'
import { defaultLocale } from '@zapal/shared/i18n'
import { AdminPanelGroup, Collection, CollectionLabel, Global, UserRole } from '@zapal/shared/types'

import { OpenGraphImages } from '@cms/collections/OpenGraphImages'
import { Pages } from '@cms/collections/Pages'
import { Posts } from '@cms/collections/Posts'
import { Tenants } from '@cms/collections/Tenants'
import { Users } from '@cms/collections/Users'
import { getDefaultEditor } from '@cms/editor'
import { Home } from '@cms/globals/Home'
import { cmsLocales } from '@cms/i18n'
import enTranslation from '@cms/locales/en'
import ukTranslation from '@cms/locales/uk'
import { Page, Tenant } from '@cms/types/generated-types'
import { isDev } from '@cms/utils/env'
import { generateTitle } from '@cms/utils/seo'
import { generatePublicFileURL } from '@cms/utils/storage'

if (!process.env.CMS_SECRET) {
  const envConfig = (await import('dotenv')).config({ path: ['../../.env', '../../.env.local'] })

  Object.entries(envConfig.parsed || {}).map(
    ([key, value]) => (process.env[key.startsWith('PUBLIC_') ? `NEXT_${key}` : key] = value),
  )
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const email = process.env.USER_EMAIL || 'hello@zapal.tech'
const password = process.env.USER_PASSWORD || 'zapal'

const emailAdapter =
  isDev && process.env.SMTP_HOST && process.env.SMTP_PORT
    ? (await import('@payloadcms/email-nodemailer')).nodemailerAdapter({
        defaultFromAddress: cmsSenderEmail,
        defaultFromName: cmsSenderName,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false,
        },
      })
    : (await import('@zapal/payload-email-sendgrid')).sendGridAdapter({
        defaultFromAddress: cmsSenderEmail,
        defaultFromName: cmsSenderName,
        apiKey: process.env.SENDGRID_API_KEY || '',
      })

const dbAdapter = sqliteAdapter({
  client: {
    url: process.env.DATABASE_URL || '',
    authToken: isDev ? undefined : process.env.DATABASE_AUTH_TOKEN,
  },
  // prodMigrations:
  migrationDir: path.resolve(dirname, 'src', 'migrations'),
})

const payloadConfig: Config = {
  serverURL: isDev ? undefined : process.env.NEXT_PUBLIC_CMS_URL || '',
  secret: process.env.CMS_SECRET || '',
  routes: {
    admin: '/',
  },
  admin: {
    user: Collection.Users,
    components: {
      actions: ['@cms/components/TenantSelector#TenantSelectorRSC'],
      graphics: {
        Logo: {
          path: '@cms/components/Logo#Logo',
        },
        Icon: {
          path: '@cms/components/NavLogo#NavLogo',
        },
      },
    },
    dateFormat: 'dd.MM.yyyy HH:mm:ss',
    meta: {
      icons: [
        {
          type: 'image/x-icon',
          rel: 'icon',
          url: '/favicon.svg',
        },
      ],
      openGraph: {
        siteName: appName,
      },
      description: 'Zapal CMS | Internal CMS for Zapal company websites',
      keywords: 'Zapal, CMS, Content Management System',
      titleSuffix: ` | ${appName} CMS`,
    },
    autoLogin: isDev
      ? {
          email,
          password,
          prefillOnly: true,
        }
      : false,
  },
  collections: [
    //   Media,
    OpenGraphImages,
    Users,
    Tenants,
    Pages,
    Posts,
  ],
  globals: [Home],
  cookiePrefix: cookiesName,
  cors: [process.env.NEXT_PUBLIC_CMS_URL].filter(Boolean) as string[],
  csrf: [process.env.NEXT_PUBLIC_CMS_URL].filter(Boolean) as string[],
  db: dbAdapter,
  editor: getDefaultEditor(),
  email: emailAdapter,
  i18n: {
    supportedLanguages: { en, uk },
    translations: {
      en: enTranslation,
      uk: ukTranslation,
    },
  },
  localization: {
    defaultLocale,
    fallback: false,
    locales: cmsLocales,
  },
  plugins: [
    s3Storage({
      bucket: process.env.S3_BUCKET_NAME || '',
      config: {
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
      collections: {
        [Collection.Media]: {
          generateFileURL: generatePublicFileURL,
          prefix: 'public/media',
        },
        [Collection.OpenGraphImages]: {
          generateFileURL: generatePublicFileURL,
          prefix: 'public/open-graph-images',
        },
      },
    }),
    redirectsPlugin({
      collections: [Collection.Pages, Collection.Posts],
      overrides: {
        labels: CollectionLabel.Redirects,
        admin: {
          group: AdminPanelGroup.General,
        },
      },
      redirectTypes: ['307', '308'],
    }),
    nestedDocsPlugin({
      collections: [Collection.Pages],
      generateLabel: (_, currentDoc) => currentDoc.title as string,
      generateURL: (docs) =>
        docs.reduce(
          (url, doc, idx) =>
            `${idx || typeof (doc as unknown as Page).tenant !== 'object' ? '' : `/${(doc.tenant as unknown as Tenant).slug}`}${url}/${(doc as unknown as Page).slug}`,
          '',
        ),
    }),
    // formBuilder({
    //   fields: {
    //     checkbox,
    //     country: false,
    //     email,
    //     message: false,
    //     number,
    //     payment: false,
    //     select,
    //     state: false,
    //     text,
    //     textarea,
    //   },
    //   formOverrides: {
    //     fields: [richTextHTMLConvertedField('confirmationMessage')],
    //   },
    // }),
    seoPlugin({
      globals: [Global.Home],
      collections: [Collection.Pages, Collection.Posts],
      generateTitle,
      uploadsCollection: Collection.OpenGraphImages,
    }),
  ],
  async onInit(payload) {
    if (isDev) {
      const existingUsers = await payload.find({ collection: Collection.Users, limit: 1 })

      if (existingUsers.docs.length === 0) {
        await payload.create({
          collection: Collection.Users,
          data: {
            email,
            password,
            firstName: 'Zapal',
            lastName: 'Tech',
            roles: [UserRole.Root],
            tenants: [],
          },
        })
      }
    }
  },
  telemetry: false,
  typescript: { outputFile: path.resolve(dirname, 'src', 'types', 'generated-types.ts') },
  sharp,
}

export default buildConfig(payloadConfig)

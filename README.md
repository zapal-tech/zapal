# Zapal

This is an official Zapal company internal open source libraries and apps.

## What's inside?

This repo includes the following packages/apps:

- `cms`: a [Payload CMS](https://www.payloadcms.com/) based application for managing content for our websites using multi-tenancy
- `web`: a [SvelteKit](https://kit.svelte.dev/) based application for subdomain multi-tenancy based
  [Zapal](https://www.zapal.tech) websites
- `@zapal/shared`: an internal shared library for shared code between apps/packages in this repo
- `@zapal/svelte-ui`: a Svelte component library used for Zapal consistent UI on all our websites
- `@zapal/cms-local-client`: a local client for the `cms` app to be used in the `web` app for fetching content

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd zapal
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd zapal
sudo sh ./scripts/set-hosts.sh
```

Then, open the repository in your favorite code editor using devcontainer, and run the following command:

```
pnpm dev
```

Use the following URLs to access the apps: `http://{www,tech,design,blog,estimate}.zapal.local:3000` for the `web` app
`http://cms.zapal.local:3001` for the `cms` app

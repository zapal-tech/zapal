import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from '@unocss/svelte-scoped/preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    UnoCSS({
      classPrefix: 'zpl-',
    }),
  ],

  kit: {
    adapter: adapter(),
  },

  vitePlugin: {
    inspector: {
      showToggleButton: 'always',
    },
  },
}

export default config

import { sveltekit } from '@sveltejs/kit/vite'
import UnoCSS from '@unocss/svelte-scoped/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    UnoCSS({
      classPrefix: 'zapal-',
      onlyGlobal: true,
      injectReset: '@unocss/reset/tailwind.css',
    }),
    sveltekit(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})

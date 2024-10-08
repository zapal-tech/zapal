import { paraglide } from '@inlang/paraglide-sveltekit/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }), sveltekit(), tailwindcss()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})

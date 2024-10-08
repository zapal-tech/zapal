import type { LayoutServerLoad } from './$types'

export const prerender = true

export const load: LayoutServerLoad = ({ depends }) => {
  // This tells SvelteKit to re-run this load function when the language changes
  depends('paraglide:lang')
}

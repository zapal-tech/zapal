<script lang="ts">
  import { page } from '$app/stores'

  import { isPreview } from './'

  let exitHref: string

  $: {
    const url = new URL($page.url)
    url.searchParams.set($page.data.exitPreviewQueryParam, 'true')
    exitHref = url.toString()
  }
</script>

{#if isPreview()}
  <div class="flex gap-2 text-2xl p-1 bg-gray-dark/95 hover:bg-gray-dark transition z-50 fixed top-4 right-4" role="dialog">
    <span>[Preview Mode]</span>
    <a rel="external" href={exitHref}>Click here to exit.</a>
  </div>
{/if}

<style>
</style>

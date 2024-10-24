<script lang="ts">
  import { appName } from '@zapal/shared/app'

  export let data
</script>

<svelte:head>
  <title>{`${data.title} - ${appName}${data.tenant ? ` ${data.tenant}` : ''}`}</title>
</svelte:head>

<h1 class="text-4xl font-semibold">{data.title}</h1>

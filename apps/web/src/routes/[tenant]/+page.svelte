<script lang="ts">
  import { page } from '$app/stores'
  import { languageTag } from '$lib/paraglide/runtime'

  const tenant = $page.params.tenant

  export let data
</script>

<h3>{languageTag()}</h3>

<h1>{tenant}: {data.title}</h1>

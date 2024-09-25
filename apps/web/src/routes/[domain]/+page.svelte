<script lang="ts">
  import { page } from '$app/stores'
  import * as m from '$lib/paraglide/messages'
  import { languageTag } from '$lib/paraglide/runtime'

  const host = $page.params.domain
</script>

<h1>{host}</h1>
<h2>{m.test()}</h2>
<h3>{languageTag()}</h3>

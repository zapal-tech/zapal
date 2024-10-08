<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  const links: Record<string, string>[] = [
    {
      text: m.welcome_tech(),
      href: '/tech',
      class: 'col-span-1',
    },
    {
      text: m.welcome_design(),
      href: '/design',
      class: 'col-span-1',
    },
    {
      text: m.welcome_estimate(),
      href: '/estimate',
      class: 'col-span-2',
    },
  ]
</script>

<div class="w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-dark">
  {#each links as link}
    <a href={link.href} class={`grid place-items-center bg-black text-2xl ${link.class}`}>{link.text}</a>
  {/each}
</div>

<script lang="ts">
  import { appName } from '@zapal/shared/app'

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
      class: 'col-span-1 md:col-span-2',
    },
  ]
</script>

<svelte:head>
  <title>{appName}</title>
</svelte:head>

<div class="wrapper w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-px">
  {#each links as link}
    <a
      href={link.href}
      class={`grid place-items-center bg-black text-4xl ${link.class} focus-visible:outline-2 -outline-offset-2 outline-orange duration-100 transition-[outline]`}
      >{link.text}</a
    >
  {/each}
</div>

<style>
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  .wrapper {
    background: linear-gradient(
      to bottom right,
      var(--color-gray-dark) 22.5%,
      var(--color-orange),
      var(--color-red),
      var(--color-gray-dark) 77.5%
    );
    background-size: 500% 500%;
    animation: gradient 10s ease infinite forwards;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte'

  let button: HTMLButtonElement | undefined = $state()

  let mouseXPercentage = $state(-1000)
  let mouseYPercentage = $state(-1000)

  // Here we will track position of the element, mouse position in viewport, and on the element in percents to update the hover circle position
  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (!button) return

    const { left, top, width, height } = button.getBoundingClientRect()

    const x = clientX - left
    const y = clientY - top

    const xPercent = Math.round((x / width) * 100 * 10) / 10
    const yPercent = Math.round((y / height) * 100 * 10) / 10

    if (xPercent !== mouseXPercentage || yPercent !== mouseYPercentage) {
      mouseXPercentage = xPercent
      mouseYPercentage = yPercent
    }
  }

  onMount(() => {
    window?.addEventListener('mousemove', handleMouseMove)

    return () => window?.removeEventListener('mousemove', handleMouseMove)
  })

  const { children } = $props()
</script>

<button
  bind:this={button}
  style={`--mouse-x:${mouseXPercentage}%;--mouse-y:${mouseYPercentage}%`}
  class="rounded-none bg-transparent border-0 p-0 m-0 cursor-pointer"
>
  <div class="relative size-full px-3 py-1 box-border">
    <!-- Mask image is a hover circle -->
    <div
      style="mask-image: radial-gradient(circle at var(--mouse-x, -1000%) var(--mouse-y, -1000%), #000 15%, transparent 60%)"
      class="absolute -left-8 -right-8 -top-8 -bottom-8"
    >
      <!-- Top line -->
      <div
        aria-hidden="true"
        style="filter: blur(0.7rem); transform: scaleY(0.001)"
        class="absolute bg-white pointer-events-none select-none h-1000px left-8 right-8 top-8 origin-top"
      ></div>

      <!-- Bottom line -->
      <div
        aria-hidden="true"
        style="filter: blur(0.7rem); transform: scaleY(0.001)"
        class="absolute bg-white pointer-events-none select-none h-1000px left-8 right-8 bottom-8 origin-bottom"
      ></div>

      <!-- Left line -->
      <div
        aria-hidden="true"
        style="filter: blur(0.7rem); transform: scaleX(0.001)"
        class="absolute bg-white pointer-events-none select-none w-1000px top-8 bottom-8 right-8 origin-right"
      ></div>

      <!-- Right line -->
      <div
        aria-hidden="true"
        style="filter: blur(0.7rem); transform: scaleX(0.001)"
        class="absolute bg-white pointer-events-none select-none w-1000px top-8 bottom-8 left-8 origin-left"
      ></div>
      <!-- background: radial-gradient(circle at center, hsla(0, 0%, 100%, .4), hsla(0, 0%, 100%, .2), hsla(0, 0%, 100%, 0)) -->
    </div>

    <span class="text-lg text-white uppercase">
      {@render children()}
    </span>
  </div>
</button>

<script context='module'>
  export async function load({ page }) {

    const { slug } = page.params

    const component = await import(`../../_content/blog/tips/${slug}/index.md`)

    return {
      props: {
        page: component.default,
        metadata: component.metadata
      }
    }
  }
</script>

<script>
  export let page
</script>

<svelte:component this={page} />

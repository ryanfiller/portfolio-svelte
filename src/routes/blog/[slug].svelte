<script context='module'>
  export async function preload(page) {

    const { slug } = page.params

    const component = await import(`./_content/${slug}/index.md`)

    const series = await this.fetch(`/blog/series.json`)
      .then(response => response.json())
      .then(allSeries => allSeries.find(series => {
        const postSlugs = series.posts.map(series => series.slug.replace('/blog/', ''))
        if (postSlugs.includes(slug)) {
          return series
        }
      }))

    return {
      page: component.default,
      metadata: component.metadata,
      series: series
    }
  }
</script>

<script>
  export let page
  export let series
  import { setContext } from 'svelte'
  setContext('series', series)
</script>

<svelte:component this={page} />
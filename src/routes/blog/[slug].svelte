<script context='module'>
  export async function load({ page, fetch }) {

    const { slug } = page.params
    if (slug === 'rss.xml') return

    const component = await import(`../_content/blog/${slug}/index.md`)

    const series = await fetch(`/blog/series.json`)
      .then(response => response.json())
      .then(allSeries => allSeries.find(series => {
        const postSlugs = series.posts.map(series => series.slug.replace('/blog/', ''))
        if (postSlugs.includes(slug)) {
          return series
        }
      }))
      .catch(error => console.error(error))

    return {
      props: {
        page: component.default,
        metadata: component.metadata,
        series: series
      }
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

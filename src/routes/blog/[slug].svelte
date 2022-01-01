<script context='module'>
  export async function load({ page, fetch }) {

    const { slug } = page.params

    if (slug === 'rss.xml') return
    if (slug.match(/\.json$/)) return

    const component = await import(`../_content/blog/${slug}/index.md`)

    // TODO more data fetching should work this way
    const toc = await fetch(`/blog/${slug}.json`)
      .then(response => response.json())
      .then(response => response.toc)
      .catch(error => console.error(error))

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
        series: series,
        toc: toc
      }
    }
  }
</script>

<script>
  export let page
  export let series
  export let toc
  import { setContext } from 'svelte'
  setContext('series', series)
</script>

<svelte:component
  this={page}
  {toc}
/>

<script context='module'>
  export async function load({ page, fetch }) {
		const posts = await fetch(`/blog.json`)
      .then(response => response.json())
      .then(posts => posts.filter(post => !post.series).slice(0, 3))
      .catch(error => console.log(page.path, error))
		
		const series = await fetch(`/blog/series.json`)
      .then(response => response.json())
      .then(series => series.slice(0, 3))
      .catch(error => console.log(page.path, error))

		const tips = await fetch(`/blog/tips.json`)
      .then(response => response.json())
      .then(series => series.slice(0, 3))
      .catch(error => console.log(page.path, error))

		return {
      props: {
        posts,
        series,
        tips
      }
    }
	}
</script>

<script>
  export let posts
  export let series
  export let tips
	
  import { site, forms } from '../config'
	import Page from '../layouts/page.svelte'
  import List from  '../components/content/list.svelte'
  import PostPreview from '../components/blog/post-preview.svelte'
  import SeriesPreview from '../components/blog/series-preview.svelte'
  import ContactForm from '../components/misc/contact-form.svelte'
</script>

<style>
  /* TODO remove this */
  .temp-bio {
    /* include readable */
    max-width: var(--readableMax);
    margin: 0 auto;
    padding: var(--padding);
    margin-bottom: var(--padding);

    & p {
      margin: 1em 0;
      line-height: 1.5;
    }

    & img {
      float: right;
      margin-left: 1em;
      width: 100px;
    }
  }
</style>

<Page hideBanner>
  <section class='temp-bio'>
    <img  
      src={`${site.headshot}?nf_resize=fit&w=100`}
      alt={site.author}
    />
    <h1>{site.description}</h1>
    <p>
      {site.about}
    </p>
  </section>

  <List
    title='Recent Posts'
    content={posts}
    component={PostPreview}
    link={{
      url: '/blog',
      text: 'See More'
    }}
  />

  {#if series.length}
    <List
      title='Recent Series'
      content={series}
      component={[SeriesPreview, { hidePosts: true }]}
      link={{
        url: '/blog/series',
        text: 'See More'
      }}
    />
  {/if}

  <!-- TODO this should use its own preview and not borrow frop PostPreview -->
  {#if tips.length}
    <List
      title='Recent Tips'
      content={tips}
      component={PostPreview}
      link={{
        url: '/blog/tips',
        text: 'See More'
      }}
    />
  {/if}

  <ContactForm {...forms.contact} />
</Page>

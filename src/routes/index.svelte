<script context='module'>
  import { sortNewestToOldest } from '$helpers'
  export async function load({ page, fetch }) {
    let posts
		posts = await fetch(`/blog.json`)
      .then(response => response.json())
      .catch(error => console.error(page.path, error))

    let tips
		tips = await fetch(`/blog/tips.json`)
      .then(response => response.json())
      .then(tips => tips.slice(0, 3))
      .catch(error => console.error(page.path, error))

    let series
    series = await fetch(`/blog/series.json`)
      .then(response => response.json())
      .catch(error => console.error(page.path, error))

    const blog = 
      posts.filter(post => !post.series)
      .slice(0, 3)

    const updated = [...posts, ...tips]
      // get only the ones that have been updated
      .filter(post => {
        // don't overlap with series
        return Array.isArray(post.meta.date)
      })
      .map(post => ({
        ...post,
        meta: {
          ...post.meta,
          date: post.meta.date[post.meta.date.length - 1]
        }
      }))
      .sort((a, b) => sortNewestToOldest(a, b))
      .slice(0, 3)

		return {
      props: {
        blog,
        series,
        tips,
        updated
      }
    }
	}
</script>

<script>
  export let blog
  export let series
  export let tips
  export let updated
	
  import { site, forms } from '$site-config'
	import Page from '../layouts/page.svelte'
  import Snippet from '$components/content/snippet.svelte'
  import Form from '$components/misc/form.svelte'
</script>

<style global>
  [data-segment='homepage'] #content {
    display: grid;
    padding: var(--padding);
    gap: calc(5 * var(--padding));
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto);
    grid-template-areas:
      "bio"
      "blog"
      "series"
      "tips"
      "updated"
      "form";
      
    & .bio { grid-area: bio; }
    & .form { grid-area: form; }
    & .blog { grid-area: blog; }
    & .series { grid-area: series; }
    & .tips { grid-area: tips; }
    & .updated { grid-area: updated; }

    @media (--largeWidth) {
      gap: var(--padding) calc(2 * var(--padding));
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        ". blog"
        ". series"
        ". tips"
        ". updated";

      & .bio,
      & .form {
        left: var(--padding);
        width: calc(50% - (2 * var(--padding)));
        position: fixed;
      }

      & .bio {
        bottom: calc(60% + (0.5 * var(--padding)));
      } 

      & .form {
        top: calc(40% + (0.5 * var(--padding)));
      } 
    }

    @media (--extraWidth) {
      grid-template-columns: var(--readableMin) 1fr 1fr;
      grid-template-rows: auto auto auto auto;
      grid-template-areas:
        ". blog series"
        "bio blog series"
        "form tips updated"
        ".  tips updated";

      & .bio,
      & .form {
        align-self: center;
        position: static;
        width: 100%;
      }
    }

    & .bio {
      & p {
        max-width: (var(--readableWidth));
        margin: 1em 0;
        line-height: 1.5;
      }

      & img {
        float: right;
        margin-left: 1em;
        width: 100px;
      }
    }
  }

</style>

<Page hideBanner>
  <section class='bio'>
    <img  
      src={`${site.headshot}?nf_resize=fit&w=100`}
      alt={site.author}
    />
    <h1>{site.description}</h1>
    <p>
      {site.about}
    </p>
  </section>

  <section class='list blog'>
    <h2>Blog Posts</h2>

    {#each blog as content}
      <Snippet content={content} h={3} />
    {/each}
  </section>

  <section class='list series'>
    <h2>Series</h2>

    {#each series as content}
      <Snippet content={content} h={3} />
    {/each}
  </section>

  <section class='list tips'>
    <h2>Short Tips</h2>

    {#each tips as content}
      <Snippet content={content} h={3} />
    {/each}
  </section>

  <section class='list updated'>
    <h2>Recently Updated</h2>

    {#each updated as content}
      <Snippet content={content} h={3} />
    {/each}
  </section>

  <Form {...forms.contact} />
</Page>

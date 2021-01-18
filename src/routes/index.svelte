<script context='module'>
	export function preload({ params, query }) {
		return this.fetch(`/blog.json`)
		.then(response => response.json())
		.then(posts => {
      return { posts }
    })
	}
</script>

<script>
  export let posts
	
  import { meta, forms } from '../config'
	import Page from '../layouts/page.svelte'
	import Posts from '../components/posts.svelte'
	import Form from '../components/form.svelte'
</script>

<style global type='text/scss'>

  @import '../styles/functions.scss';

	/* TODO remove this */
	.temp-bio,
	form#contact {
		@include readable();
		margin-bottom: var(--padding);
	}

  .temp-bio {
    div {
      line-height: 1.5;
    }
  
    p {
      margin: 1em 0;
    }
  
    img {
      float: right;
      margin: 0 0 1em 1em;
      width: 200px;
    }
  }
</style>

<Page hideBanner>

  <section class='temp-bio'>
    <div>
      <h1>{meta.description}</h1>
      <p>
        {meta.about}
      </p>
    </div>
    <!-- <img  
      src={meta.headshot}
      alt={meta.author}
    /> -->
    <img  
      src='/images/site-assets/headshot_2017.jpg'
      alt={meta.author}
    />
  </section>

  <Posts {posts} />

  <Form {...forms.contact} />
</Page>
<script context='module'>
  export async function load({ page }) {
    const subsection = page.params.section
		return { props: { subsection } }
	}
</script>

<script>
  export let subsection

	import Page from '../../layouts/page.svelte'
	import Banner from '../../components/layout/banner.svelte'

	import Colors from './_examples/colors.svelte'
	import Components from './_examples/components.md'
	import Markdown from './_examples/markdown.md'
	import Media from './_examples/media.md'

  const components = {
    colors: Colors,
    // typography: '',
    markdown: Markdown,
    media: Media,
    components: Components
  }

  function createLink(subsection) {
    if (typeof window === 'undefined') return `#${subsection}`
    return `/styles/${subsection}`
  }

  $: renderedSections = subsection
    ? Object.keys(components).filter(section => section === subsection)
    : Object.keys(components)
</script>

<style>
  /* styles that apply to section & subsection */
  :global(#site[data-segment^='styles']) {
    & :global(#site-header) {
      height: min-content;
      min-height: 0;
      /* TODO make different speed variants eventually */
      transition: calc(2 * var(--transitionSpeed));
    }

    & :global(#page-banner) {
      align-items: baseline;
    }
  }

  /* styles that apply ONLY to section */
  :global(#site[data-segment='styles']) {
    & :global(#site-header) {
      min-height: 100vh;
    }
  }

  ul {
    list-style: none;
    align-self: baseline;
    margin: 0;
    padding: 0;
    text-align: right;

    & a {
      display: inline-block;
      color: white;
      text-decoration: none;
      font-size: 1.25em;
      padding: 0.5rem;
    }
  }

  h2 {
    font-size: 4rem;
    max-width: var(--readableMax);
    margin: 1rem auto;
    padding: var(--padding) calc(2 * var(--padding));

    & a,
    & a:hover {
      display: inline-block;
      color: var(--colorText);
    }
  }

  section:not(:last-child) {
    margin-bottom: 10rem;
  }
</style>

<!-- https://unsplash.com/photos/kn-UmDZQDjM -->

<Page segment={subsection ? `styles ${subsection}` : 'styles'}>
  <svelte:fragment slot='banner'>
    <Banner
      segment='styles'
      title='Style Guide'
      banner={{
        src: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80',
        alt: 'botanical illustrations of squids',
        attribution: "Les Mollusques: Decrits Et Figures D'Apres La Classification"
      }}
    >
      <ul>
        {#each Object.keys(components) as section}
          <li>
            <a
              href={createLink(section)}
              class='flip-arrow'
            >
              {section}
            </a>
          </li>
        {/each}
      </ul>
    </Banner>
  </svelte:fragment>


  {#each renderedSections as section }
    <section id={`${section}`}>
      <h2 class='readable'>
        <a
          href={createLink(section)}
          sveltekit:noscroll
        >
          {section}
        </a>
      </h2>
      <svelte:component this={components[section]} />
    </section>
  {/each}
</Page>

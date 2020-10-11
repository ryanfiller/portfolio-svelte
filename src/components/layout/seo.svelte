<script>
  export let segment
  import { meta } from '../../site-config.js'
  import { markdown } from '../../stores.js'
  import { capitalize } from '../../helpers'
  
  $: pageTitle = $markdown.title && `${$markdown.title} | ${meta.title}` || segment && `${capitalize(segment)} | ${meta.title}` || meta.title
  $: description = $markdown.meta && $markdown.meta.excerpt || meta.about
  $: keywords = () => {
    const keywords = []

    if ($markdown.meta && $markdown.meta.categories) {
      $markdown.meta.categories.map(category => keywords.push(category))
    }

    if ($markdown.meta && $markdown.meta.tags) {
      $markdown.meta.tags.map(tag => keywords.push(tag))
    }

    return keywords.join(', ')
  }
</script>

<!-- svelte-ignore component-name-lowercase -->
<!-- stupid -->

<svelte:head>
  <title>{pageTitle}</title>
  <meta name='author' content={meta.author}>
  <meta name='description' content={description}>
  <meta name='keywords' content={keywords() || ''}>
  <link rel='sitemap' type='application/xml' href='/sitemap.xml'>
</svelte:head>


  <!-- TODO - social SEO work
  facebook
  
    property: 'og:title',
    content: frontmatter.title
  
    property: 'og:description',
    content: metaDescription
  
    property: 'og:type',
    content: 'website'
  twitter 
  
    name: 'twitter:card',
    content: 'summary'
  
    name: 'twitter:creator',
    content: siteMetadata.author
  
    name: 'twitter:title',
    content: frontmatter.title
  
    name: 'twitter:description',
    content: metaDescriptio -->
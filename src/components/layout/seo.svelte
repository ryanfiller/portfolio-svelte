<script>
  export let segment

  import { stores } from '@sapper/app'
  const { page } = stores()
  
  import { meta } from '../../site-config.js'
  import { markdown } from '../../stores.js'
  import { capitalize, objectToParams, paramsToObject } from '../../helpers'

  const local = process.env.NODE_ENV === 'development'
  const siteUrl = local ? `http://${$page.host}` : `https://${$page.host}`
  
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

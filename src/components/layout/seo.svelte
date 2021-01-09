<script>
  export let segment

  import { stores } from '@sapper/app'
  const { page } = stores()
  
  import { markdown } from '../../stores.js'
  import { meta } from '../../config.js'
  import { colors } from '../../styles.js'
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
  <script 
		async
		src='//gc.zgo.at/count.js'
		data-goatcounter='https://ryanfiller.goatcounter.com/count'
	></script>
  
  <title>{pageTitle}</title>
  <meta name='author' content={meta.author}>
  <meta name='description' content={description}>
  <meta name='keywords' content={keywords() || ''}>
  <link rel='sitemap' type='application/xml' href='/sitemap.xml'>
  <meta name='theme-color' content={colors.primary}>
  <meta name='theme-color' content={colors.primary}>

  <!-- webmention stuff -->
  <link rel='webmention' href='https://webmention.io/www.ryanfiller.com/webmention' />
  <link rel='pingback' href='https://webmention.io/www.ryanfiller.com/xmlrpc' />
  <!-- https://webmention.io/api/mentions.html?token=nseQFcsLWSvq0TOTOuSVkQ -->
  <!-- https://webmention.io/api/mentions.atom?token=nseQFcsLWSvq0TOTOuSVkQ -->
  <!-- nseQFcsLWSvq0TOTOuSVkQ -->

  <!-- webmonetization stuff -->
  <meta name='monetization' content='$ilp.uphold.com/grFqX3z4EBqj'>

  <meta name='theme-color' content={colors.primary}>
</svelte:head>

<!-- webmention.io stuff -->
<a style='display: none' href={`mailto:${meta.email}`} rel='me'>{meta.email}</a>

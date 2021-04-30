<script>
  export let title = ''
  export let series = ''
  export let meta = {}
  export let banner = {}

  import { getContext } from 'svelte'
  import { stores } from '@sapper/app'
  const { page } = stores()

  const segment = getContext('segment')
  const local = process.env.NODE_ENV === 'development'
  const host = local ? `http://${$page.host}` : `https://${$page.host}`
  
  import { site } from '../../config.js'
  import { capitalize, objectToParams, paramsToObject, slugify } from '../../helpers'

  const pageTitle = () => {
    if (title) {
      return `${title} | ${site.title}`
    } else if (!title && segment !== 'homepage') {
      return `${capitalize(segment)} | ${site.title}`
    } else {
      return site.title
    }
  }

  const description = () => meta.excerpt || site.about

  const keywords = () => {
    let keywords = []

    if (meta.categories || meta.tags) {
      if (meta.categories) {
        meta.categories.map(category => keywords.push(category))
      }

      if (meta.tags) {
        meta.tags.map(tag => keywords.push(tag))
      }    
    } else {
      keywords = site.keywords
    }

    return keywords.join(', ')
  }

  const pageUrl = `${site.siteUrl}${$page.path}`

  let imageParams = {}
  let socialImageUrl = ''
  $: if (!!banner){
    imageParams = objectToParams({
      title: title,
      series: series,
      excerpt: meta.excerpt || '',
      categories: meta.categories ? meta.categories.join(',') : '',
      tags: meta.tags ? meta.tags.join(',') : '',
      imageSrc: banner.src ? banner.src : '',
      imageCredit: banner.attribution ? banner.attribution : '',
      url: pageUrl.replace('https://www.', '')
    })
    local && console.log('imageFunctionUrl', `${host}/.netlify/functions/generate-image?${imageParams}`)
    socialImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD}/image/upload/social-images/${slugify(title)}.png`
  }
</script>

<!-- svelte-ignore component-name-lowercase -->
<!-- stupid -->

<svelte:head>
  <title>{pageTitle()}</title>
  <meta name='author' content={site.author}>
  <meta name='description' content={description()}>
  <meta name='keywords' content={keywords()}>

  <link rel='alternate' type='application/rss+xml' title='ryanblog' href={`${site.siteUrl}${site.rss}`} >

  <!-- for twitter -->
  <meta name='twitter:site' content={site.siteUrl} />
  <meta name='twitter:creator' content={site.twitter} />
  <meta name='twitter:url' content={pageUrl} />
  <meta name='twitter:title' content={$$props.title} />
  <meta name='twitter:description' content={description()} />
  {#if !!banner.src}
    <meta name='twitter:card' content='summary_large_image' />  
    <meta name='twitter:image' content={socialImageUrl} />
    <meta name='twitter:image:alt' content={banner.alt} />
  {:else}
    <!-- <meta name=”twitter:card” content=”summary” />  -->
    <!-- <meta name='twitter:image' content={logo??} /> -->
    <!-- <meta name='twitter:image:alt' content={'???'} /> -->
  {/if}

  <!-- for opengraph -->
  <meta property='og:locale' content='en_US' />
  <meta property='og:site_name' content={site.title} />
  <meta property='og:title' content={$$props.title} />
  <meta property='og:description' content={description()} />
  <meta property='og:url' content={pageUrl} />
  {#if !!banner.src}
    <meta property='og:type' content='article' />
    <meta property='og:image' content={socialImageUrl} />
    <meta property='og:image:alt' content={banner.alt} />
    <meta property='og:image:height' content='630' />
    <meta property='og:image:width' content='1200' />
  {:else}
    <meta property='og:type' content='website' />
  {/if}
</svelte:head>

<!-- webmention.io stuff -->
<a style='display: none' href={`mailto:${site.email}`} rel='me'>{site.email}</a>
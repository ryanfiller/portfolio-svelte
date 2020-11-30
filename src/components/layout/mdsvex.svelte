<script>
  import { onMount, onDestroy } from 'svelte'

  import { markdown } from '../../stores.js'
  onMount(() => markdown.set({...$$props}))
  onDestroy(() => markdown.set({})) // make sure no data excapes its own page

  import Markdown from './markdown.svelte'


  // TODO move all this seo stuff somewhere better...
  import { stores } from '@sapper/app'
  const { page } = stores()
  import { meta } from '../../site-config.js'
  import { capitalize, objectToParams, slugify } from '../../helpers'

  const local = process.env.NODE_ENV === 'development'
  const siteUrl = local ? `http://${$page.host}` : `https://${$page.host}`
  const pageUrl = `${meta.siteUrl}${$page.path}`

  let imageParams = {}
  let socialImageUrl = ''
  $: if ($$props.meta){
    imageParams = objectToParams({
      title: $$props.title,
      excerpt: $$props.meta.excerpt || '',
      categories: $$props.meta.categories ? $$props.meta.categories.join(',') : '',
      tags: $$props.meta.tags ? $$props.meta.tags.join(',') : '',
      imageSrc: $$props.banner && $$props.banner.src ? $$props.banner.src : '',
      imageCredit: $$props.banner && $$props.banner.attribution ? $$props.banner.attribution : '',
      url: pageUrl.replace('https://www.', '')
    })
    // socialImageUrl = `${siteUrl}/.netlify/functions/generate-image?${imageParams}`
    socialImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD}/image/upload/social-images/${slugify($$props.title)}.png`

    if (process.env.NODE_ENV === 'development') {
      console.log(`${siteUrl}/.netlify/functions/generate-image?${imageParams}`)
    }
  }

</script>

<!-- svelte-ignore component-name-lowercase -->
<!-- TODO when you move these write tests for these -->
<svelte:head>
  {#if !!$$props}
    <!-- for twitter -->
    <meta name='twitter:site' content={meta.siteUrl} />
    <meta name='twitter:creator' content={meta.author} />
    <meta name='twitter:url' content={pageUrl} />
    <meta name='twitter:card' content='summary_large_image' />  
    <meta name='twitter:title' content={$$props.title} />
    <meta name='twitter:description' content={$$props.meta && $$props.meta.excerpt ? $$props.meta.excerpt : ''} />
    <meta name='twitter:image' content={socialImageUrl} />
    <meta name='twitter:image:alt' content={$$props.banner && $$props.banner.alt ? $$props.banner.alt : ''} />

    <!-- for opengraph -->
    <meta property='og:type' content='article' />
    <meta property='og:locale' content='en_US' />
    <meta property='og:site_name' content={meta.title} />
    <meta property='og:title' content={$$props.title} />
    <meta property='og:description' content={$$props.meta && $$props.meta.excerpt ? $$props.meta.excerpt : ''} />
    <meta property='og:url' content={pageUrl} />
    <meta property='og:image' content={socialImageUrl} />
    <meta property='og:image:alt' content={$$props.banner && $$props.banner.alt ? $$props.banner.alt : ''} />
    <meta property='og:image:height' content='630' />
    <meta property='og:image:width' content='1200' />
  {/if}
</svelte:head>

<!-- scss/global cannont be used in the style tag in this component -->

<Markdown>
  <slot />
</Markdown>
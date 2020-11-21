<script>
  import { meta } from '../site-config.js' 
  import { paramsToObject } from '../helpers'

  import { stores } from '@sapper/app'
  const { page } = stores()

  $: ({
    title = '',
    excerpt = '',
    imageSrc = '',
    imageCredit = '',
    url = ''
  } = paramsToObject($page.query))

</script>

<style>
  #wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--colorDark);
  }

  #preview {
    --space: 2rem;
    /* TODO needs to be an og tag in the <head> for this */
    height: 630px;
    width: 1200px;
    background: var(--colorPrimary);
    color: var(--colorLight);
    position: relative;
    font-family: var(--font);
  }

  #preview > :not(img) {
    position: relative;
    z-index: 2;
  }

  main {
    font-size: 1.25rem;
    height: calc(100% - (2 * var(--space)));
    width: calc(100% - (2 * var(--space)));
    margin: var(--space);
    padding: var(--space);
    border: var(--border);
    border-color: currentColor;
    display: grid;
    gap: var(--space);;
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-columns: 3fr 2fr;
    grid-template-areas: "title   title      "
                         "excerpt excerpt    "
                         ".       .          " 
                         "author  attribution"
                         "url     attribution";
  }

  h1 {
    margin: 0;
    font-size: 6.5em;
    grid-area: title;
  }

  p {
    grid-area: excerpt;
    font-size: 3.5em;
    line-height: 1.25;
  }

  .author {
    grid-area: author;
    display: block;
    font-size: 3em;
  }

  .url {
    grid-area: url;
    display: block;
    font-size: 2em;
  }

  .attribution {
    grid-area: attribution;
    font-size: 1em;
    text-align: right;
    align-self: end;
    margin: 0;
  }

  .attribution span {
    display: block;
  }

  img {
    position: absolute;
    z-index: 1;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;

    filter: grayscale(100%);
    opacity: .5;
    mix-blend-mode: overlay;
    margin: 0;
  }

  figcaption {
    display: block;
    font-size: calc(.5 * var(--space));
    padding: calc(.25 * var(--space)) var(--space);
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: .75;
  }
</style>

<div id='wrapper'>
  <div id='preview'>
    <main class='content'>
      <h1>{title}</h1>

      <!-- <p>{excerpt}</p> -->

      <span class='author'>{meta.author}</span>
      <span class='url'>{url}</span>

      {#if imageSrc && imageCredit}
        <p class='attribution'>
          <span>Image Credit:</span>
          <span>{imageCredit}</span>
        </p>
      {/if}
    </main>

  {#if imageSrc}
    <img
      src={imageSrc}
      alt=''
    />
  {/if}

  </div>
</div>

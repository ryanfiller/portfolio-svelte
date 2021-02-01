<script>
  import { meta } from '../config.js' 
  import { paramsToObject } from '../helpers'
  import TagList from '../components/content/tag-list.svelte'

  import { stores } from '@sapper/app'
  const { page } = stores()

  $: ({
    title = '',
    series = '',
    excerpt = '',
    categories = '',
    tags = '',
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
    background: var(--colorBlack);
  }

  #preview {
    --space: 2rem;
    height: 630px;
    width: 1200px;
    background: var(--colorPrimary);
    color: var(--colorWhite);
    position: relative;
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
    grid-template-rows: 1fr auto auto 1fr auto auto auto;
    grid-template-columns: 3fr 2fr 1fr;
    grid-template-areas: ".       .            ." 
                        "title   title        ."
                         "tags    tags         ."
                         "url     url          url"
                         ".       .            ." 
                         ".       attribution  attribution"
                         "author  attribution  attribution";
  }

  h1 {
    margin: 0;
    font-size: 6.5em;
    grid-area: title;
  }

  h1 .series {
    font-size: .5em;
    display: block;
  }

  .tag-list {
    grid-area: tags;
    font-size: 2em;
  }

  .url {
    grid-area: url;
    display: block;
    font-size: 2em;
  }

  /* p {
    grid-area: excerpt;
    font-size: 3.5em;
    line-height: 1.25;
  } */

  .author {
    grid-area: author;
    display: block;
    font-size: 3em;
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
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    object-fit: cover;
    object-position: center center;

    filter: grayscale(100%);
    opacity: .5;
    mix-blend-mode: overlay;
    margin: 0;
  }
</style>

<div id='wrapper'>
  <div id='preview'>
    <main class='content'>
      <h1>
        {#if series}
          <span class='series'>
            {series}:
          </span>
        {/if}
        {title}
      </h1>

      {#if categories || tags}
        <div class='tag-list'>
          <TagList
            categories={categories.split(',')}
            tags={tags.split(',')}
          />
        </div>
      {/if}

      <span class='url'>{url}</span>

      <!-- <p>{excerpt}</p> -->

      <span class='author'>{meta.author}</span>

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

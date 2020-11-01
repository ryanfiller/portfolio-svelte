<script>
  export let images
  
  import { onMount } from 'svelte'
  import { slugify } from '../../../helpers'

  let searchParams
  let openImage = ''

  onMount(() => {
    searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('lightbox')) {
      openImage = searchParams.get('lightbox')
    }
  })

  const openModal = event => {
    event.preventDefault()
    event.stopPropagation()
    openImage = event.target.id
    searchParams.set('lightbox', openImage)
    history.pushState({}, null, `${window.location}?${searchParams.toString()}`)
  }

  const closeModal = event => {
    if (searchParams.has('lightbox')) {
      searchParams.delete('lightbox')
      openImage = ''
      history.pushState({}, null, `${window.location.toString().split('?')[0]}`)
    }
  }
</script>

<!-- TODO this entire idea needs to get rewritten and tested -->

<style global>

  .photo-grid {
    clear: both;
    display: grid;
    gap: var(--padding);
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: auto;
    margin-top: var(--verticalSpacing);
    margin-bottom: var(--verticalSpacing);
    /* this sucks... */
    width: calc(100vw - (3 * var(--padding)));
    margin-left: min(0px, calc(-1 * ((100vw - var(--readableMax)) - var(--padding))  / 2));
    margin-right: min(0px, calc(-1 * ((100vw - var(--readableMax)) - var(--padding))  / 2));
  }

  .photo-grid button {
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  /* TODO abstract this */
  .photo-grid figure.active,
  .photo-grid figure > button:hover,
  .photo-grid figure > button:focus {
    outline: .25rem solid var(--colorHighlight);
  }

  .photo-grid img,
  .photo-grid figure {
    margin: 0;
  }

  .photo-grid img {
    /* for some reason this is making the event bubbling weird */
    pointer-events: none;
  }

  /* TODO abstract close button class */
  .photo-grid figcaption button {
    position: absolute;
    top: var(--padding);
    right: var(--padding);
    height: var(--tapableSize);
    width: var(--tapableSize);
    border-radius: 50%;
    border: none;
    pointer-events: initial;
    cursor: pointer;
  }

  .photo-grid figcaption button span {
    opacity: 0;
    position: absolute;
  }
  .photo-grid figcaption button::before,
  .photo-grid figcaption button::after {
    content: '';
    display: block;
    height: .25em;
    width: 1em;
    background: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .photo-grid figcaption button::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .photo-grid figcaption button::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .photo-grid figcaption {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    z-index: 1000;
    color: var(--colorLight);
    /* display: flex; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .photo-grid figure.active figcaption {
    display: flex;
  }

  .photo-grid figcaption::before {
    content: '';
    display: block;
    margin: var(--padding);
    width: calc(100%  - (2 * var(--padding)));
    flex: 1;
    max-height: 75vh;
    background-image: var(--image);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .photo-grid figcaption header {
    max-width: var(--readableMax);
    font-size: 1.75em;
    margin-bottom: 1rem;
  }

  .photo-grid figcaption p {
    font-size: 1.25em;
    max-width: var(--readableMax);
    pointer-events: initial;
  }

  .photo-grid figcaption::after {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    background: var(--colorDark);
    opacity: .66;
    z-index: -1;
  }


</style>

<svelte:window on:keydown={event => {
  if (event.keyCode === 27) { // escape key
    closeModal()
  }
}}/>

<section class='photo-grid'>
  <noscript>Sorry... you need JavaScript on to expand these thumbnails</noscript>
  {#each images as image}
    <figure
      class:active="{openImage === `${slugify(image.title)}`}"
      style="--image: url({image.src})"
    >
      <button
        id={`${slugify(image.title)}`}
        on:click={openModal}
      >
        <img
          alt={image.alt}
          title={image.title}
          src={image.src}
        />
      </button>
      <figcaption>
        {#if image.title}
          <header>{image.title}</header>
        {/if}
        {#if image.caption}
          <p>{image.caption}</p>
        {/if}
        <button on:click={closeModal}><span>close</span></button>
      </figcaption>
    </figure>
  {/each}
</section>
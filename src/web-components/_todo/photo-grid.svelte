<script>
  export let images
  
  import { onMount } from 'svelte'
  import { slugify } from '$helpers'

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
    openImage = event.currentTarget.id
    searchParams.set('lightbox', openImage)
    history.pushState({}, null, `${window.location}?${searchParams.toString()}`)
  }

  const closeModal = () => {
    if (searchParams.has('lightbox')) {
      searchParams.delete('lightbox')
      openImage = ''
      history.pushState({}, null, `${window.location.toString().split('?')[0]}`)
    }
  }
</script>

<!-- TODO this entire idea needs to get rewritten and tested -->

<style>
  .photo-grid {
    clear: both;
    display: grid;
    gap: var(--padding);
    padding: var(--padding);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: auto;
    justify-content: center;
    align-items: center;

    /* TODO this should be a utility class */
    --width: calc(100vw - (1 * var(--padding)));

    width: var(--width);
    position: relative;
    left: 50%;
    margin-left: calc(-1 * var(--width) / 2);
  }

  .photo-grid button {
    display: block;
    border: 0;
    padding: 0;
    margin: 0 auto;
    cursor: pointer;
  }

  /* TODO abstract this */
  .photo-grid figure.active,
  .photo-grid figure > button:hover,
  .photo-grid figure > button:focus {
    outline: 0.25rem solid var(--colorHighlight);
  }

  [data-no-js] .photo-grid button:hover,
  [data-no-js] .photo-grid button:focus {
    cursor: initial;
  }

  .photo-grid img,
  .photo-grid figure {
    margin: 0 !important;
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
    height: 0.25em;
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
    color: var(--colorWhite);
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
    width: calc(100% - (2 * var(--padding)));
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
    background: var(--colorBlack);
    opacity: 0.75;
    mix-blend-mode: multiply;
    z-index: -1;
  }
</style>

<svelte:window on:keydown={event => {
  if (event.keyCode === 27) { // escape key
    closeModal()
  }
}}/>

<section class='photo-grid'>
  {#each images as image}
    <figure
      class:active="{openImage === `${slugify(image.title)}`}"
      style="--image: url({image.src});"
    >
      <button
        id={`${slugify(image.title)}`}
        on:click={openModal}
        aria-haspopup='true'
        aria-expanded={openImage === `${slugify(image.title)}`}
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
        <button
          on:click={closeModal}
          aria-label='Close'
        >
          <span>close</span>
        </button>
      </figcaption>
    </figure>
  {/each}
</section>

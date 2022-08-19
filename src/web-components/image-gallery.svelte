<svelte:options tag={null} />

<script>
  import slugify from '../helpers/slugify.js'

  export let title = ''
  export let id = slugify(title)
  export let size = 'medium'
  let component

  import { onMount } from 'svelte'
  import focusTrap from '../actions/focus-trap.js'

  let isSvelteComponent
  let images
  let activeImage = null
  onMount(() => {
    isSvelteComponent = Object.keys(component).includes('__svelte_meta')

    if (isSvelteComponent) {
      images = [...component.getElementsByClassName('grid')[0].children]
    } else {
      // shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
      setTimeout(() => {
        id = id || slugify(title)
        component.id = id
        // have to copy the filter to be able to use it here, but don't do it multiple times
        if (!component.getElementsByClassName('svg-filters').length) {
          component.append(document.getElementsByClassName('svg-filters')[0].cloneNode(true))
        }
        images = component.getElementsByClassName('grid')[0].getElementsByTagName('slot')[0].assignedElements()
      })
    }

    images && images.forEach(image => {
      image.tabIndex = 0
      image.addEventListener('click', (event) => setActiveImage(image, event))
      image.addEventListener('keydown', (event) => setActiveImage(image, event))
    })
  })

  function setActiveImage(image, event) {
    // handle keyboard stuff
    if (event && event.code) {
      // prevent the spacebar from scrolling the page
      if (['Space'].includes(event.code)) event.preventDefault()
      if (!['Space', 'Enter'].includes(event.code)) return
    }

    activeImage = image
    // careful... you are mutating the original image here
    activeImage.tabIndex = -1
    activeImage.classList.add('gallery-active-image')
    const dialog = component.getElementsByTagName('dialog')[0]
    if (!dialog.open) dialog.showModal()
  }

  function close() {
    if (activeImage) {
      component.getElementsByTagName('dialog')[0].close()
      // make sure to reset these
      activeImage.tabIndex = 0
      activeImage.classList.remove('gallery-active-image')
      activeImage = null
    }
  }

  function navigate(direction, event) {
    // prevent the arrow keys from scrolling the page
    event.preventDefault()

    const total = images.length
    const current = images.indexOf(activeImage)
    // make sure to reset these
    activeImage.tabIndex = 0
    activeImage.classList.remove('gallery-active-image')
    
    const next = current + direction
    if (next === total) {``
      setActiveImage(images[0])
    } else if (next < 0) {
      setActiveImage(images[total - 1])
    } else {
      setActiveImage(images[next])
    }
  }
</script>

<!-- TODO - should this respond to writing mode? -->
<svelte:window on:keydown={event => {
  activeImage && event.key === 'Escape' ? close() : null
  activeImage && event.key === 'ArrowLeft' ? navigate(-1, event) : null
  activeImage && event.key === 'ArrowUp' ? navigate(-1, event) : null
  activeImage && event.key === 'ArrowRight' ? navigate(1, event) : null
  activeImage && event.key === 'ArrowDown' ? navigate(1, event) : null
}}/>

<style>
  :global([data-no-js]) {
    & .image-gallery .grid,
    & :global(rf-image-gallery) {
      /* !important to make sure this is readable with no javascript */
      --imageSize: calc(var(--largeSize) / 3) !important;
    }
  }

  /* grid for all the images */
  .image-gallery .grid,
  :global(rf-image-gallery::part(grid)),
  :global([data-no-js]) :global(rf-image-gallery) {
    display: grid;
    gap: var(--padding);
    grid-template-columns: repeat(auto-fit, minmax(min(var(--imageSize), 100%), 1fr));
    grid-template-rows: auto;
    justify-content: center;
    align-items: start;
  }

  /* make all the images the same size in the grid */
  .image-gallery,
  :global(rf-image-gallery) {
    & :global {
      & :where(figure),
      & :where(img) {
        display: block;
        inline-size: 100%;
        margin: 0;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        position: relative;
        inset-block-start: 0;
        transition: var(--transitionSpeed);
      }

      & :where(figure):hover,
      & :where(figure):focus,
      & :where(img):hover,
      & :where(img):focus {
        inset-block-start: calc(-0.5 * var(--padding));
      }

      & :where(figure):hover img,
      & :where(figure):focus img {
        inset-block-start: 0;
      }
    }
  }

  .image-gallery dialog :global(figure):hover,
  .image-gallery dialog :global(figure):focus,
  .image-gallery dialog :global(img):hover,
  .image-gallery dialog :global(img):focus {
    inset-block-start: 0;
  }

  /* handle the images/elements when an image is active */
  .image-gallery dialog,
  :is(*::part(dialog)) {
    --buttonSize: calc(8 * var(--pixelSize));
    --imageBlockSize: calc(100vmin - (5 * var(--padding)));
    --imageInlineSize: calc(100vmin - (4 * var(--padding)) - (2 * var(--buttonSize)));

    &:empty {
      pointer-events: none;
    }

    box-sizing: border-box;
    border: none;
    background-color: transparent;
    block-size: 100%;
    inline-size: 100%;
    display: grid;
    padding: calc(0.5 * var(--padding));
    grid-template-columns: 1fr fit-content(var(--imageInlineSize)) 1fr;
    grid-template-rows: 1fr fit-content(calc(var(--imageBlockSize))) 1fr;
    grid-template-areas:
      ". .     . "
      ". image . "
      ". .     . ";
    align-items: center;
    color: var(--colorText);

    /* :global is making this difficult, just put these styles twice */
    & :is(img) {
      filter: var(--imgFilter);
    }

    & :is(img, figure) {
      grid-area: image;
      aspect-ratio: unset;
      object-fit: unset;
      max-block-size: var(--imageBlockSize);
      max-inline-size: var(--imageInlineSize);
      block-size: auto;
      inline-size: auto;
      margin: 0;
      text-align: center;
      background-color:var(--colorBackground);
      display: grid;
      grid-template-columns: fit-content(100%);
      grid-template-rows: 1fr auto;

      & :is(img) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        max-block-size: 100% !important;
        margin-inline: auto;
      }

      & :is(figcaption) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        display: block;
        max-inline-size: calc((2 * var(--padding) + var(--readableMax)));
        margin-inline: auto;
        color: var(--colorText);
        padding: var(--padding);
      }
    }

    & :global(img) {
      filter: var(--imgFilter);
    }
  
    & :global(img),
    & :global(figure) {
      grid-area: image;
      aspect-ratio: unset;
      object-fit: unset;
      max-block-size: var(--imageBlockSize);
      max-inline-size: var(--imageInlineSize);
      height: auto;
      width: auto;
      margin: 0;
      text-align: center;
      background-color:var(--colorBackground);
      display: grid;
      grid-template-columns: fit-content(100%);
      grid-template-rows: 1fr auto;

      & :global(img) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        max-block-size: 100% !important;
        margin-inline: auto;
      }

      & :global(figcaption) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        display: block;
        max-inline-size: calc((2 * var(--padding) + var(--readableMax)));
        margin-inline: auto;
        color: var(--colorText);
        padding: var(--padding);
      }
    }
  }

  /* make the images look clickalbe when there is JS */
  :global(body:not([data-no-js])) {
    & .image-gallery,
    & :global(rf-image-gallery) {
      & :global {
        & figure,
        & img {
          cursor: pointer;
        }

        & figcaption {
          display: none;
        }

        & dialog  {
          & figcaption {
            display: block;
          } 
        }
      }
    }
  }

  button {
    cursor: pointer;
    block-size: var(--buttonSize);
    inline-size: var(--buttonSize);
    padding: 0;
    border: none;
    color: var(--colorText);
    position: relative;
    background-color: var(--colorBackground);
    grid-area: image;
    outline: calc(0.5 * var(--pixelSize)) solid var(--colorText);

    &::after {
      content: '';
      display: block;
      position: absolute;
      color: var(--colorText);
      inset-block-start: calc(1.5 * var(--pixelSize));
      inset-inline-end: calc(1.5 * var(--pixelSize));
      inset-block-end: calc(1.5 * var(--pixelSize));
      inset-inline-start: calc(1.5 * var(--pixelSize));
    }

    &[title='previous'] {
      transform: rotate(var(--writingModeRotation)) scale(200%) scale(-1);
      justify-self: start;
      inset-inline-start: calc(-0.5 * var(--buttonSize));
    }
    
    &[title='next'] {
      transform: rotate(var(--writingModeRotation)) scale(200%);
      justify-self: end;
      inset-inline-end: calc(-0.5 * var(--buttonSize));
    }

    &[title='previous'],
    &[title='next'] {
      &::after {
        background: var(--pixelArrow);
        transition: 0ms; /* trick the animation into only playing in one direction */
      }
  
      &:hover::after,
      &:focus::after {
        background: var(--pixelArrowHover);
        transition: var(--transitionSpeedIcons);
      }
    }

    &[title='close'] {
      transform: scale(200%);
      align-self: start;
      justify-self: end;
      inset-block-start: calc(-0.5 * var(--buttonSize));
      inset-inline-end: calc(-0.5 * var(--buttonSize));

      &::after {
        background: var(--pixelX);
      }

      &:hover::after,
      &:focus::after {
        background: var(--pixelXHover);
        transition: var(--transitionSpeedIcons);
      }
    }
  }
</style>

<section
  class='image-gallery'
  bind:this={component}
  id={id}
>
  <dialog
    part='dialog'
    use:focusTrap={!!activeImage}
  >
    {#if activeImage}
      {@html activeImage.outerHTML}
      <button
        title='previous'
        on:click={(event) => navigate(-1, event)}
      />
      <button
        title='next'
        on:click={(event) => navigate(1, event)}
      />
      <button
        type='button'
        title='close'
        on:click={close}
      />
    {/if}
  </dialog>

  <div
    class='grid'
    part='grid'
    style={`--imageSize: calc(var(--${size}Size) / 3);`}
  >
    <slot />
  </div>
</section>

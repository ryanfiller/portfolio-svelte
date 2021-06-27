<script>
  export let show = true
  export let close = null
  export let title = 'hey!'

  import { slugify } from '../../helpers'
  const id = `${slugify(title)}`
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .note {
    position: relative;
    --buttonSize: 3rem;
    margin-top: var(--verticalSpacing);
    margin-bottom: var(--verticalSpacing);

    input[type='checkbox'],
    input[type='checkbox']:not(:checked) ~ label,
    input[type='checkbox']:not(:checked) ~ aside {
      display: none;
    }

    label {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      height: var(--buttonSize);
      width: var(--buttonSize);
      z-index: 5;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: var(--transitionSpeed);
      color: var(--colorWhite);

      &:hover,
      &:focus {
        transform: rotate(90deg);
      }
    }

    div[role='note'] {
      position: relative;
    }
  
    div[role='note']::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
      color: var(--colorHighlight);
      background: var(--pixelBorder);
    }
  
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--colorHighlight);
      min-height: var(--buttonSize);
  
      border-top-right-radius: var(--pixelBorderRadius);
      border-top-left-radius: var(--pixelBorderRadius);
      overflow: hidden;

      color: var(--colorWhite);
      font-size: 1.5em;
      @include readable();
      padding-right: calc(var(--buttonSize) + var(--padding));
    }
    
    .content {
      background-color: var(--colorWhite);
      color: var(--colorBlack);
      padding: var(--padding);
      @include readable();
      border-bottom-right-radius: var(--pixelBorderRadius);
      border-bottom-left-radius: var(--pixelBorderRadius);
      overflow: hidden;
    }
  }
</style>

{#if show}
  <section
    class='note'
    tabindex='-1'
  >
    {#if close}
      <input
        type='checkbox'
        id={`${id}-note`}
        checked={show}
        tabindex='-1'
      >
        <label
        class='x'
        tabindex='0'
        for={`${id}-note`}
        on:click={close}
        on:keydown={event => { if (event.key === "Enter") { close() }} }
      >
        <span class='screenreader'>show note</span>
      </label>
    {/if}

    <div role='note'>
      <header id={`${id}-title`}>
        <strong class='title'>
          {title}
        </strong>
      </header>
  
      <div
        class='content'
        id={`${id}-content`}
      >
        <slot />
      </div>
    </div>
  </section>
{/if}

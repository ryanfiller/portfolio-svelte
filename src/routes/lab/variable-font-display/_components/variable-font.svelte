<style type='text/scss'>
  @import '../../../../styles/functions.scss';

  .variable-font {
    margin: var(--padding) 0;

    &__link {
      font-size: .75em;
      text-transform: uppercase;
      text-decoration:none;
      letter-spacing: .125em;
      display: block;
      padding: var(--padding) 1em;
      background-color: var(--colorPrimary);
      color: var(--colorWhite);
      line-height: 1;
      transition: background-color var(--transitionSpeed);

      &:hover {
        background-color: var(--colorActive);
      }
    }

    &__options {
      margin: 0 var(--padding);
      padding: var(--padding);
    }

    label {
      text-transform: lowercase;
      margin-right: 1em;
    }


    &__slider {
      display: flex;
      align-items: center;

      input {
        width: 100%;

        // // TODO need to make inputs components
        // &::-webkit-slider-runnable-track,
        // &::-moz-range-track {
        //   height: 100%;
        //   background: var(--textColor);
        //   border-radius: 50%;
        // }
      }
    }

    &__checkbox {
      input {
        margin: 0;
      }
    }

    &__select {
      display: flex;

      select {
        flex: 1;
      }
    }

    &__code {
      padding: var(--padding);
      display: flex;
      align-items: center;
      margin: 0;
      left: unset;
      width: 100%;

      *::after {
        display: none;
      }
    }

    &__example {

      label {
        @include visuallyHide;
      }
      
      textarea {
        padding: var(--padding);
        resize: vertical;
        width: 100%;
        border: 0;
        font-size: 2em;
        line-height: 1.25;
        height: 4em;
        color: currentColor;
        background: transparent;
      }
    }

    @include medium {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        "link example example"
        "link options code";

      &__link {
        grid-area: link;
        writing-mode: sideways-lr;
        // well this feels weird...
        text-align: right;
      }

      &__options {
        grid-area: options;
      }

      &__example {
        grid-area: example;
      }
      
      &__code {
        grid-area: code;
        margin-top: 1rem;
      }
    }
  }
</style>

<script>
  import { slugify } from '../../../../helpers'

  export let url = ''
  export let name = ''
  export let options = {}

  let text = 'the five boxing wizards jump quickly'
  let capitalization = 'none'
  let italic = false

  const styleOptions = Object.entries(options).map(option => {
    const [name, [min, max]] = option
    const range = max - min;
    return ({
      name: name,
      min: min,
      max: max,
      value: min >= 0 ? min : max,
      step: range === 1 ? .5 : 1,
    })
  })

  const handleStyleOptionChange = (event, index) => {
    styleOptions[index].value = event.target.value
  }

  $: fontStyles = styleOptions.map(option => {
    return `'${option.name}' ${option.value}`
  }).join(', ')

  const makeId = string => `${slugify(name)}-${string}`
</script>


<section class='variable-font'>
  <a
    target="_blank"
    rel="noopener noreferrer"
    class='variable-font__link'
    href={url}
  >
    {name}
  </a>

  <fieldset class='variable-font__options'>
    <legend>Options:</legend>

    {#each Object.values(styleOptions) as variable, index}
      <div class='variable-font__slider'>
        <label for={makeId(`${variable.name}-slider`)}>
          {variable.name}
        </label>
        <input
          type='range'
          id={makeId(`${variable.name}-slider`)}
          {...styleOptions[index]}
          on:change={event => handleStyleOptionChange(event, index)}
        />
      </div>
    {/each}

    <div class='variable-font__checkbox'>
      <label for={makeId('italic')}>italic</label>
      <input
        type='checkbox'
        id={makeId('italic')}
        bind:checked={italic}
      />
    </div>

    <div class='variable-font__select'>
      <label for={makeId('capitalization')}>text-transform</label>
      <select
        id={makeId('capitalization')}
        bind:value={capitalization}
      >
        <option value='none'>none</option>
        <option value='capitalize'>capitalize</option>
        <option value='uppercase'>uppercase</option>
        <option value='lowercase'>lowercase</option>
      </select> 
    </div>
    
  </fieldset>

  <div class='variable-font__example'>
    <label for={makeId('example-text')}>text example</label>
    <textarea
      id={makeId('example-text')}
      class='variable-font__example'
      wrap='hard'
      bind:value={text}
      style="
        font-family: {name};
        font-variation-settings: {fontStyles};
        text-transform: {capitalization};
        font-style: {italic ? 'italic' : ''};
      "
    />
  </div>

  <pre class='variable-font__code'>
    <code>
font-family: "{name}";
font-variation-settings: {
  JSON.stringify(fontStyles)
  .replace(/"/g, '', )
  .replace(/'/g, '"', )
  .replace(/ "/g, '\n  "', )
  .replace(/"/, '\n  "', )
};
{#if capitalization !== 'none'}
  text-transform: "{capitalization}";
{:else}
  {` `}
{/if}
{#if italic}
  font-style: "italic";
{:else}
  {` `}
{/if}
    </code>
  </pre>
</section>

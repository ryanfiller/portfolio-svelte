<style>
  .variable-font {
    margin: var(--padding) 0;

    & a {
      font-size: 0.75em;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 0.125em;
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

    & fieldset {
      padding: var(--padding);
      margin-top: -1rem;
    }

    & label {
      text-transform: lowercase;
      margin-right: 1em;
    }

    & .slider {
      display: flex;
      align-items: center;

      & input {
        width: 100%;
      }
    }

    & .checkbox {
      & input {
        margin: 0;
      }
    }

    & .select {
      display: flex;
      align-items: center;
      white-space: nowrap;

      & select {
        flex: 1;
      }
    }

    & .code {
      padding: var(--padding);
      display: flex;
      align-items: center;
      margin: 0;
      left: unset;
      width: 100%;

      & *::after {
        display: none;
      }
    }

    & .example {
      & textarea {
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

    @media (--mediumWidth) {
      display: grid;
      gap: 1rem;
      grid-template-columns: auto 1fr 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        "link example example"
        "link options code";

      & a {
        grid-area: link;
        writing-mode: sideways-lr;
        text-align: right;
      }

      & fieldset {
        grid-area: options;
      }

      & .example {
        grid-area: example;
      }

      & .code {
        grid-area: code;
      }
    }
  }
</style>

<script>
  import { slugify } from '$helpers'

  export let url = ''
  export let name = ''
  export let options = {}

  let text = 'the five boxing wizards jump quickly'
  let capitalization = 'none'
  let italic = false

  const styleOptions = Object.entries(options).map(option => {
    const [name, [min, max]] = option
    const range = max - min
    const middle = (max + min) / 2
    return ({
      name,
      min,
      max,
      value: min >= 0 ? middle : max,
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
    href={url}
  >
    {name}
  </a>

  <fieldset>
    <legend>Options:</legend>

    {#each Object.values(styleOptions) as variable, index}
      <div class='slider'>
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

    <div class='checkbox'>
      <label for={makeId('italic')}>italic</label>
      <input
        type='checkbox'
        id={makeId('italic')}
        bind:checked={italic}
      />
    </div>

    <div class='select'>
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

  <div class='example'>
    <label
      class='screenreader'
      for={makeId('example-text')}>
      text example
    </label>
    <textarea
      id={makeId('example-text')}
      class='example'
      wrap='hard'
      bind:value={text}
      style="
        font-family: {name};
        font-variation-settings: {fontStyles};
        text-transform: {capitalization};
        font-style: {italic ? 'italic' : ''};"
    />
  </div>

  <pre class='code'>
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
{/if}
{#if italic}
  font-style: "italic";
{/if}
    </code>
  </pre>
</section>

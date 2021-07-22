<script>
  import { writable, derived } from 'svelte/store'
  import move from 'array-move'
  import { colors, themes } from '../../../styles/config.js'
  import { capitalize } from '../../../helpers'

  import { Tabs, Tab } from '../../../components/misc/tabs'

  // lol wtf, this is why people hate javascript...
  const deepCopy = object => JSON.parse(JSON.stringify(object))

  const themeColors = [
    'transparent',
    ...Object.keys(colors).map(color => `color${capitalize(color)}`),
  ]

  const gradientTypes = [
    'linear-gradient',
    'radial-gradient',
    'conic-gradient',
    'repeating-linear-gradient',
    'repeating-radial-gradient'
  ]

  const blendModes = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
  ]

  const repeatOptions = [
    'no-repeat',
    'repeat'
  ]

  const circleSizes = [
    'farthest-corner',
    'closest-corner',
    'farthest-side',
    'closest-side'
  ]

  const defaultLayer = {
    type: 'linear-gradient',
    size: ['100', '100'],
    position: ['50', '50'],
    linearDegrees: '0',
    circleSize: circleSizes[0],
    conicAngle: '0',
    colors: [
      {
        value: themeColors[2],
        position: '25'
      },
      {
        value: themeColors[1],
        position: '75'
      },
    ]
  }

  const defaultColor = {
    value: 'transparent',
    position: '25'
  }

  const defaultGradient = {
    blendMode: blendModes[0],
    repeat: repeatOptions[0],
    layers: [ deepCopy(defaultLayer) ]
  }

  const gradient = writable(deepCopy(defaultGradient))

  const buildCss = gradient => {
    const { type, colors, position, size } = gradient
    let extra = ''
    if (gradient.linearDegrees && (type === 'linear-gradient' || type === 'repeating-linear-gradient')) {
      extra = `${gradient.linearDegrees}deg, `
    }
    if (gradient.circleSize && (type === 'radial-gradient' || type === 'repeating-radial-gradient')) {
      extra = `${gradient.circleSize}, `
    }
    if (gradient.conicAngle && (type === 'conic-gradient')) {
      extra = `from ${gradient.conicAngle}deg, `
    }

    return `${type}(${extra}${colors.map(color => {
      return `${color.value === 'transparent' ? 'transparent' : `var(--${color.value})`} ${color.position}%`
    }).join(', ')}) ${position[0]}% ${position[1]}% / ${size[0]}% ${size[1]}%`
  }

  const css = derived(gradient, ($gradient) => $gradient.layers.map(gradient => buildCss(gradient)))

  const addLayer = () => $gradient.layers = [deepCopy(defaultLayer), ...$gradient.layers]
  const removeLayer = layerIndex => () => $gradient.layers = $gradient.layers.filter((_, i) => i !== layerIndex)
  const moveLayer = (layerIndex, direction) => () => $gradient.layers = move($gradient.layers, layerIndex, layerIndex + direction)

  const addColor = (layerIndex) => () => $gradient.layers[layerIndex].colors = [...$gradient.layers[layerIndex].colors, deepCopy(defaultColor)]
  const removeColor = (layerIndex, colorIndex) => () => $gradient.layers[layerIndex].colors = $gradient.layers[layerIndex].colors.filter((_, i) => i !== colorIndex)
  const moveColor = (layerIndex, colorIndex, direction) => () => $gradient.layers[layerIndex].colors = move($gradient.layers[layerIndex].colors, colorIndex, colorIndex + direction)

  const reset = () => gradient.set(deepCopy(defaultGradient))

  if (typeof(window) != 'undefined') {
    // TODO implement 'svelte-local-storage-store'
    const storedGradient = localStorage.getItem('gradient-machine')
    if (storedGradient) {
      gradient.set(JSON.parse(storedGradient))
    } 
    gradient.subscribe(data => localStorage.setItem('gradient-machine', JSON.stringify(data)))
  }

</script>

<svelte:head>
  {@html `
    <${'style'}>
      :root {
        --gradientMachine: ${$css.join(', ')};
        --gradientMachineBlendMode: ${$gradient.blendMode};
        --gradientMachineRepeat: ${$gradient.repeat};
      }
      #site-header::after {
        content: '';
        display: block;
        grid-row: -1 / 1;
        grid-column: -1 / 1;
        height: 100%;
        width: 100%;
        position: relative;
        z-index: 0;
        opacity: 0.5;
        background: var(--gradientMachine);
        background-blend-mode: var(--gradientMachineBlendMode);
        background-repeat: var(--gradientMachineRepeat);
        mix-blend-mode: overlay;
      }
    </${'style'}>
  `}
</svelte:head>

<style>
  .gradient {
    overflow: hidden;
    resize: both;
    width: 100%;
    max-width: calc(var(--readableMax) - (2 * var(--padding)));
    height: 100vh;
    max-height: calc(var(--readableMax) - (2 * var(--padding)));
    aspect-ratio: 1 / 1;
    margin: auto;
    background: var(--gradientMachine);
    background-blend-mode: var(--gradientMachineBlendMode);
    background-repeat: var(--gradientMachineRepeat);
  }

  .edit {
    padding: var(--padding) 0;
  }

  .row {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: calc(0.5 * var(--padding));
  }

  .row > *:not(:last-child) {
    margin-right: var(--padding);
  }

  .edit-global {
    justify-content: space-between;
  }

  .edit-global .row {
    margin: 0;
  }

  .edit-gradient {
    display: flex;
    align-items: start;
  }

  .edit-gradient__left {
    margin-right: var(--padding);
  }

  .edit-gradient__left > * {
    width: 100%;
    margin-bottom: calc(0.5 * var(--padding));
  }

  .edit-gradient__right {
    flex: 1;
  }

  .gradient-preview {
    height: 3em;
    width: 3em;
  }

  summary {
    margin-bottom: calc(0.5 * var(--padding));
  }

  summary button,
  .actions button {
    padding: 0.125em 0.25em;
    margin-left: 0;
    margin-right: calc(0.5 * var(--padding));
    min-width: 1.5em;
    float: right;
  }

  summary button:last-child,
  .actions button:last-child {
    margin-right: 0;
  }

  .actions {
    display: inline-flex;
    float: right;
  }

  fieldset {
    padding: calc(0.5 * var(--padding));
  }

  label span {
    display: block;
  }

  input,
  select {
    width: 100%;
  }

  .color-preview {
    height: 1.5em;
    width: 1.5em;
  }

  .edit-color label {
    display: flex;
    align-items: center;
  }

  .edit-color span {
    display: inline-block;
    margin-right: calc(0.5 * var(--padding));
  }

  .edit-color label:last-child,
  .edit-color input[type='range'] {
    flex: 1;
  }

  pre {
    padding: var(--padding);
  }

  .json textarea {
    height: 100%;
    width: 100%;
    background-color: transparent;
    color: currentColor;
    border: none;
    resize: none;
  }
</style>

<div class='gradient'></div>

<div class='edit needs-js'>
  <div class='row edit-global'>
    <div class='row'>
      <label>
        <span>blend</span>
        <select bind:value={$gradient.blendMode}>
          {#each blendModes as mode}
            <option value={mode}>{mode}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>repeat</span>
        <select bind:value={$gradient.repeat}>
          {#each repeatOptions as repeat}
            <option value={repeat}>{repeat}</option>
          {/each}
        </select>
      </label>
    </div>

    <div class='actions'>
      <button on:click={reset}>reset</button>
      <button on:click={addLayer}>add layer</button>
    </div>
  </div>

{#each $gradient.layers as layer, layerIndex}
    <fieldset class='edit-gradient'>
      <div class='edit-gradient__left'>
        <div class='gradient-preview' style={`background: ${buildCss(layer)}`}></div>
      </div>

      <div class='edit-gradient__right'>
        <details open>
          <summary>
            <span>Options</span>
            <div class='actions'>
              <button on:click={moveLayer(layerIndex, -1)} title='move layer up'>↑</button>
              <button on:click={removeLayer(layerIndex)} title='remove layer'>X</button>
              <button on:click={moveLayer(layerIndex, 1)} title='move layer down'>↓</button>
            </div>
          </summary>

          <div class='row'>
            <label>
              <span>type:</span>
              <select bind:value={$gradient.layers[layerIndex].type}>
                {#each gradientTypes as type}
                  <option value={type}>{type}</option>
                {/each}
              </select>
            </label>

            {#if $gradient.layers[layerIndex].type === 'linear-gradient' || $gradient.layers[layerIndex].type === 'repeating-linear-gradient'}
              <label>
                <span>degrees:</span>
                <input type='number' bind:value={$gradient.layers[layerIndex].linearDegrees} />
              </label>
            {/if}

            {#if $gradient.layers[layerIndex].type === 'radial-gradient' || $gradient.layers[layerIndex].type === 'repeating-radial-gradient'}
              <label>
                <span>size:</span>
                <select bind:value={$gradient.layers[layerIndex].circleSize}>
                  {#each circleSizes as size}
                    <option value={size}>{size}</option>
                  {/each}
                </select>
              </label>
            {/if}

            {#if $gradient.layers[layerIndex].type === 'conic-gradient'}
              <label>
                <span>angle:</span>
                <input type='number' bind:value={$gradient.layers[layerIndex].conicAngle} />
              </label>
            {/if}
          </div>

          <div class='row'>
            <label>
              <span>width % :</span>
              <input type='number' bind:value={$gradient.layers[layerIndex].size[0]} min='0' />
            </label>
            <label>
              <span>height % :</span>
              <input type='number' bind:value={$gradient.layers[layerIndex].size[1]} min='0' />
            </label>

            <label>
              <span>position x % :</span>
              <input type='number' bind:value={$gradient.layers[layerIndex].position[0]} />
            </label>
            <label>
              <span>position y % :</span>
              <input type='number' bind:value={$gradient.layers[layerIndex].position[1]} />
            </label>
          </div>
        </details> 

        <details open>
          <summary>
            <span>Colors</span>
            <button on:click={addColor(layerIndex)}>add color</button>
          </summary>

          <fieldset class='edit-color'>
            {#each $gradient.layers[layerIndex].colors as color, colorIndex}
              <div class='row'>
                <div class='color-preview' style={`background-color: var(--${color.value})`}></div>
                <label>
                  <span>color:</span>
                  <select bind:value={$gradient.layers[layerIndex].colors[colorIndex].value}>
                  <optgroup label='static'>
                    {#each themeColors as option}
                      <option value={option}>{option}</option>
                    {/each}
                  </optgroup>
                  <optgroup label='dynamic'>
                    {#each Object.keys(themes.light).map(color => `color${capitalize(color)}`) as option}
                      <option value={option}>{option}</option>
                    {/each}
                  </optgroup>
                  </select>
                </label>

                <label>
                  <span>position % :</span>
                  <input type='range' bind:value={$gradient.layers[layerIndex].colors[colorIndex].position} min='-100' max='100' steps='400' />
                </label>

                <div class='actions'>
                  <button on:click={moveColor(layerIndex, colorIndex, -1)} title='move color up'>↑</button>
                  <button on:click={removeColor(layerIndex, colorIndex)} title='remove color'>X</button>
                  <button on:click={moveColor(layerIndex, colorIndex, 1)} title='move color down'>↓</button>
                </div>
              </div>
            {/each}
          </fieldset>
        </details> 
      </div>
    </fieldset>
  {/each}  
</div>

<Tabs name='gradient-code'>
    <Tab title='CSS'>
      <pre class='css'><code>
background-image: {$css.join(',\n                  ')};
background-image: {$gradient.repeat}
{#if $gradient.blendMode !== 'normal'}background-blend-mode: {$gradient.blendMode}{/if}
      </code></pre>
    </Tab>
    <Tab title='JSON'>
      <pre class='json'>
<textarea
  rows={($gradient.layers.length * 10) + 1}
  value={JSON.stringify($gradient, null, '  ')}
  on:input={event => $gradient = event.target.value ? JSON.parse(event.target.value) : {}}
/>
      </pre>
    </Tab>
</Tabs>

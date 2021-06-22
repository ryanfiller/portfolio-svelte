<style global lang='scss'>
  @import '../../../../styles/functions.scss';
  
  .color-stepper {
    display: flex;
    align-items: flex-start;

    .input, .output {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .input {
      position: sticky;
      top: var(--padding);
      margin-right: var(--padding);

      & > * {
        margin-bottom: 1em;
      }

      textarea {
        width: 100%;
        max-height: 75vh;
        overflow: auto;
        resize: vertical;
      }

      label {
        span {
          display: block;
        }

        input {
          width: 100%;
        }
      }
    }

    .output {
      pre {
        --width: 100%;
        margin: 0;
        top: initial;
        right: initial;
        left: initial;
        bottom: initial;

        span {
          display: inline-block;
          padding-left: 1.5em;
          position: relative;

          &::before {
            content: '';
            display: block;
            position: absolute;
            height: 1.25em;
            width: 1.25em;
            left: 0;
            background: var(--swatch);
            border-radius: 50%;
          }

          &.original::before {
            border-radius: 0;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          }

          &.transparency::before {
            border-radius: 0;
            clip-path: polygon(0 0, 100% 0, 50% 100%);
          }
        }
      }
    }

    button {
      position: sticky;
      bottom: 0;
      border-bottom: var(--padding) solid var(--colorBackground);
    }

    #hidden-code {
      @include visuallyHide;
    }
  }
</style>

<script>
  import { onMount } from 'svelte'
  import { colors } from '../../../../styles.js'
  import { capitalize, getCustomProperty } from '../../../../helpers'
  import { hexToHSL, HSLToHex } from './color-functions.js'

  const formatColors = colorObject => {
    return Object.entries(colorObject).map(([color, value]) => {
      return `--${color}: ${value};`
    }).join('\n')
  }
  
  // let input = Object.entries(colors).map(([color, value]) => `--${color}: ${value};`).join('\n')
  // set initial values
  let input = formatColors(colors)

  // sync with actual css variables
  onMount(() => {
    const browserColors = {}
    Object.keys(colors).map(color => {
      browserColors[`${color}`] = getCustomProperty(`color${capitalize(color)}`)
    })
    input = formatColors(browserColors)
  })

  let transparencyVariants = 0
  let colorVariants = 5

  let prefix = 'color'
  let lightLabel = 'L'
  let darkLabel = 'D'
  let transparencyLabel = 'A'

  function cssToObject(css) {
    const regex = new RegExp(/--(.*): #([a-fA-F0-9]{3}){1,2};/)
    const colors = {}
    let error
    css.split('\n').forEach(color => {
      if (!color.match(regex)) {
        error = new Error ('bad css!')
      } else {
        const [ name, value ] = color.replace(';', '').split(': ')
        colors[name] = value
      }
    })
    if (error) return error
    return colors
  }

  function spanify(color, value, classname = '') {
    const name = color.replace('--', '') // just in case
    if (prefix) {
      return `<span class='${classname}' style='--swatch: ${value}'>--${prefix}${capitalize(name)}: ${value};</span>`
    } else {
      return `<span class='${classname}' style='--swatch: ${value}'>--${name}: ${value};</span>`
    }
  }

  function intToHex(integer) {
    let number = integer.toString(16)
    if( (number.length % 2) > 0 ) { number = '0' + number }
    return number
  }

  function colorize(cssColors, transparencyVariants, colorVariants, prefix, lightLabel, darkLabel, transparencyLabel) {
    let colorObject
    try {
      colorObject = cssToObject(cssColors)
    } catch (error) {
      return error
    }

    return Object.entries(colorObject).map(([color, value]) => {
      const colors = []
      colors.push(spanify(color, value, 'original'))

      if (!!colorVariants) {
        const light = [], dark = []
        for (let i = 1; i <= colorVariants; i++) {
          const steps = 100 / (colorVariants + 1)
          const percent = 100 - Math.round(steps * i)
          const hsl = hexToHSL(value)
          const [h, s, l] = hsl.replace(/hsl\(|\)|\%/g, '').split(',')
          const lightL = parseFloat(l) + percent
          const darkL = parseFloat(l) - percent
          if (lightL <= 100) {
            light.push(spanify(`${color}${lightLabel}${percent}`, `${HSLToHex(h, s, lightL)}`))
          }
          if (darkL >= 0 ) {
            dark.push(spanify(`${color}${darkLabel}${percent}`, `${HSLToHex(h, s, darkL)}`))
          }
        }
        colors.unshift(...light)
        colors.push(...dark.reverse())
      }

      if (!!transparencyVariants) {
        for (let i = 1; i <= transparencyVariants; i++) {
          const steps = 100 / (transparencyVariants + 1)
          const percent = 100 - Math.round(steps * i)
          colors.push(spanify(`${color}${transparencyLabel}${percent}`, `${value}${intToHex(percent)}`, 'transparency'))
        } 
      }

      return `/* ${color.replace('--', '')} */\n${colors.join('\n')}\n\n`
    }).join('')
  }

  const stripHtmlTags = string => string.replace(/(<span().*?>|<\/span>)/g, '')

  $: copyButtonText = 'copy styles'
  function copyText(event) {
    event.preventDefault()
    if (document !== 'undefined') {
      var code = document.getElementById('hidden-code').getElementsByTagName('textarea')[0]
      code.focus()
      code.select()
      document.execCommand('copy')
      copyButtonText = 'copied!'
      setTimeout(() => { copyButtonText = 'copy styles' }, 2000);
    }
  }

  $: output = colorize(input, transparencyVariants, colorVariants, prefix, lightLabel, darkLabel, transparencyLabel)
</script>

<div class='needs-js color-stepper'>
  <section class='input'>
    <label>
      <span>prefix</span>
      <input
        type='text'
        id='variable-prefix'
        bind:value={prefix}
      />
    </label>
    <label>
      <span>light label</span>
      <input
        type='text'
        id='light-prefix'
        bind:value={lightLabel}
      />
    </label>
    <label>
      <span>dark label</span>
      <input
        type='text'
        id='dark-prefix'
        bind:value={darkLabel}
      />
    </label>
    <label>
      <span>transparency label</span>
      <input
        type='text'
        id='transparency-prefix'
        bind:value={transparencyLabel}
      />
    </label>
    <label>
      <span>CSS variables (hex format)</span>
      <textarea
        name='colors'
        id='colors'
        spellcheck='false'
        rows={input.split('\n').length + 3}
        bind:value={input}
      />
    </label>
    <label>
      <span># transparency variants: {transparencyVariants}</span>
      <input
        type='range'
        id='transparency-variants'
        min='0'
        max='20'
        bind:value={transparencyVariants}
      />
    </label>
    <label>
      <span># color variants: {colorVariants}</span>
      <input
        type='range'
        id='color-variants'
        min='0'
        max='20'
        bind:value={colorVariants}
      />
    </label>
  </section>

  <section class='output'>
    <pre>
      <code>
        {@html output}
      </code>
    </pre>
    {#if typeof document !== 'undefined'}
      <button on:click={event => copyText(event)}>
        {copyButtonText}
      </button>
      <label id='hidden-code'>
        hidden text for copy field
        <textarea  value={stripHtmlTags(output)} />
      </label>
    {/if}
  </section>
</div>

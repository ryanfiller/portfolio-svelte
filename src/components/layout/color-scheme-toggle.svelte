<script>
  import { onMount } from 'svelte'
  import { colorScheme } from '../../stores'
  import { capitalize, getCustomProperty, setCustomProperty } from '../../helpers'
  import Icon from '../../../static/images/site-assets/icons/sun-moon.svg'

  const LS_KEY = 'user-color-scheme'
  const DOM_ATTR = `data-${LS_KEY}`
  const CSS_PROP = LS_KEY

  const getOpposite = (mode = 'dark') => mode === 'dark' ? 'light' : 'dark'

  // need to explicitly pass quite a few things here so that SSR will understand this function correctly
  const setPreference = (window, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP, newPreference) => {
    if (window) {
      const preference = newPreference || window.localStorage.getItem(LS_KEY)
      if (preference) {
        document.documentElement.setAttribute(DOM_ATTR, preference)
        setCustomProperty(CSS_PROP, preference)
        window.localStorage.setItem(LS_KEY, preference)
      }
    }
  }

  let currentColorScheme
  let toggleColorScheme
  let toggleText
  onMount(() => {
    currentColorScheme = getCustomProperty(CSS_PROP)
    $colorScheme = currentColorScheme
    toggleText = getOpposite(currentColorScheme)
    
    toggleColorScheme = event => {
      event.preventDefault()

      let existingUserPrefernece = window.localStorage.getItem(LS_KEY);
      if (existingUserPrefernece === null) {
        existingUserPrefernece = getOpposite(currentColorScheme)
      } else {
        existingUserPrefernece = getOpposite(existingUserPrefernece)
      }

      setPreference(window, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP, existingUserPrefernece)
      $colorScheme = existingUserPrefernece
      toggleText = getOpposite(existingUserPrefernece)
    }
  })
</script>

<svelte:head>
  {@html `
    <script>
      const existingUserPrefernece = window.localStorage.getItem('${LS_KEY}')
      const setPreference = ${setPreference.toString()}
      const setCustomProperty = ${setCustomProperty.toString()}
      setPreference(window, setCustomProperty, '${LS_KEY}', '${DOM_ATTR}', '${CSS_PROP}', existingUserPrefernece)
    </script>
  `}
</svelte:head>

<style global type='text/scss'>
  @media (prefers-color-scheme: dark) {
    :root {
      --user-color-scheme: 'dark';
    }
  }

  .color-scheme-toggle-button {
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    color: currentColor;

    &:hover {
      background-color: transparent;
    }

    svg {
      // height: var(--tapableSize);
      height: 25px;
      // width: var(--tapableSize);
      width: 25px;
      transform: rotate(-90deg);

      * {
        transform-origin: center center;
        transition: var(--transitionSpeed);
      }

      #main-shape,
      #sun-rays {
        fill: currentColor;
        stroke-width: 0;
      }

      #sun-rays {
        transform: scale(0);

        line {
          stroke: currentColor;
          stroke-width: 0;
        }
      }

      &.light {
        #main-shape {
          transform: scale(1.25);
        }

        #moon-mask {
          transform: translate(-35%, 35%);
        }
      }

      &.dark {
        #main-shape {
          transform: scale(.75);
        }

        #sun-rays {
          transform: scale(1);

          line {
            stroke-width: 10;
          }
        }
      }
    }
  }

</style>

<button
  class='needs-js color-scheme-toggle-button'
  on:click={toggleColorScheme}
  title={`toggle ${toggleText} mode`}
>
  <Icon class={toggleText} />
</button>

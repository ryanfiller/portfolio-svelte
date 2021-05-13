<script>
  import { onMount } from 'svelte'
  import { colorScheme } from '../../stores'
  import { getCustomProperty, setCustomProperty } from '../../helpers'
  import Icon from '../../../static/images/site-assets/icons/sun-moon.svg'

  const LS_KEY = 'user-color-scheme'
  const DOM_ATTR = `data-${LS_KEY}`
  const CSS_PROP = LS_KEY

  const getOpposite = mode => mode === 'dark' ? 'light' : 'dark'

  // need to explicitly pass quite a few things here so that SSR will understand this function correctly
  const setPreference = (newPreference, getCustomProperty, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP) => {
    if (window) {
      if (newPreference) {
        document.documentElement.setAttribute(DOM_ATTR, newPreference)
        setCustomProperty(CSS_PROP, newPreference)
        window.localStorage.setItem(LS_KEY, newPreference)
      } else {
        const OS = getCustomProperty(CSS_PROP)
        document.documentElement.setAttribute(DOM_ATTR, OS)
        setCustomProperty(CSS_PROP, OS)
      }
    }
  }

  let currentColorScheme
  let toggleColorScheme
  onMount(() => {
    currentColorScheme = getCustomProperty(CSS_PROP)
    $colorScheme = currentColorScheme
    
    toggleColorScheme = event => {
      event.preventDefault()

      const currentPreference = window.localStorage.getItem(LS_KEY) || currentColorScheme
      const newPreference = getOpposite(currentPreference)

      setPreference(newPreference, getCustomProperty, setCustomProperty, LS_KEY, DOM_ATTR, CSS_PROP)
      $colorScheme = newPreference
    }
  })
</script>

<svelte:head>
  {@html `
    <style>
      :root {
        --${CSS_PROP}: 'light';
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --${CSS_PROP}: 'dark';
        }
      }
    </style>

    <script>
      var existingUserPreference = window.localStorage.getItem('${LS_KEY}');
      var setPreference = ${setPreference.toString()};
      var getCustomProperty = ${getCustomProperty.toString()};
      var setCustomProperty = ${setCustomProperty.toString()};
      setPreference(existingUserPreference, getCustomProperty, setCustomProperty, '${LS_KEY}', '${DOM_ATTR}', '${CSS_PROP}');
    </script>
  `}
</svelte:head>

<style global type='text/scss'>

  .color-scheme-toggle-button {
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    color: currentColor;

    &:hover,
    &:focus {
      background-color: transparent;
    }

    svg {
      height: 1.5em;
      /* height: var(--tapableSize); */
      width: 1.5em;
      /* width: var(--tapableSize); */
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
    }
  }

  [style*='light'] .color-scheme-toggle-button {
    #main-shape {
      transform: scale(1.25);
    }

    #moon-mask {
      transform: translate(-35%, 35%);
    }
  }

  [style*='dark'] .color-scheme-toggle-button {
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

</style>

<button
  class='needs-js color-scheme-toggle-button'
  on:click={toggleColorScheme}
  title={`toggle ${getOpposite($colorScheme)} mode`}
>
  <Icon />
</button>

<script>
  import { onMount } from 'svelte'
  import { colorScheme } from '$lib/stores/theme.js'
  import { getCustomProperty, setCustomProperty } from '$lib/helpers'
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
    <${'style'}>
      :root {
        --${CSS_PROP}: 'light';
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --${CSS_PROP}: 'dark';
        }
      }
    </${'style'}>

    <${'script'}>
      var existingUserPreference = window.localStorage.getItem('${LS_KEY}');
      var setPreference = ${setPreference.toString()};
      var getCustomProperty = ${getCustomProperty.toString()};
      var setCustomProperty = ${setCustomProperty.toString()};
      setPreference(existingUserPreference, getCustomProperty, setCustomProperty, '${LS_KEY}', '${DOM_ATTR}', '${CSS_PROP}');
    </${'script'}>
  `}
</svelte:head>

<style>
  /* freakin yikes at all the :global() going on here... */
  button {
    /* specificity to override display: none; */
    display: block !important;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    color: currentColor;

    &:hover,
    &:focus {
      background-color: transparent;
    }

    & :global(svg) {
      /* height: var(--tapableSize); */
      height: 1.5em;
      /* width: var(--tapableSize); */
      width: 1.5em;
      transform: rotate(-90deg);

      & :global(*) {
        transform-origin: center center;
        transition: var(--transitionSpeed);
      }

      & :global(#main-shape),
      & :global(#sun-rays) {
        fill: currentColor;
        stroke-width: 0;
      }

      & :global(#sun-rays) {
        transform: scale(0);

        & :global(line) {
          stroke: currentColor;
          stroke-width: 0;
        }
      }
    }
  }

  :global([style*='light']) button {
    & :global(#main-shape) {
      transform: scale(1.25);
    }

    & :global(#moon-mask) {
      transform: translate(-35%, 35%);
    }
  }

  :global([style*='dark']) button {
    & :global(#main-shape) {
      transform: scale(0.75);
    }

    & :global(#sun-rays) {
      transform: scale(1);

      & :global(line) {
        stroke-width: 10;
      }
    }
  }

</style>

<button
  style='display: none;' 
  class='needs-js color-scheme-toggle'
  on:click={toggleColorScheme}
  title={`toggle ${getOpposite($colorScheme)} mode`}
>
  <Icon />
</button>

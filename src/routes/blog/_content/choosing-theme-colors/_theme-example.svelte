<script>
  let theme

  import { onMount } from 'svelte'
  import Toggle from '../../../../components/inputs/toggle.svelte'

  onMount(() => {
    theme = document.getElementsByTagName('html')[0].dataset.userColorScheme
  })

  const toggleTheme = () => theme === 'light' ? theme = 'dark' : theme = 'light'
</script>

<style global type='text/scss'>
  .theme-example {
    --white: #ffffff;
    --black: #000000;
    --purple: #663399;
    --gray1: #f6f6f6;
    --gray2: #d2d2d2;
    --gray3: #8a8a8a;
    --gray4: #3a3a3a;
    --text: var(--black);
    --background: var(--white);

    [data-user-color-scheme="light"] &,
    &.theme-example--light:is(section) { // specificity!
      --text: var(--black);
      --background: var(--white);
    }

    [data-user-color-scheme="dark"] &,
    &.theme-example--dark:is(section) { // specificity!
      --text: var(--white);
      --background: var(--black);
    }
    
    background: var(--background);
    transition: var(--transitionSpeed);
    padding: var(--padding);

    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 1.25em;
    position: relative;
    z-index: 1;

    p {
      text-align: center;
      width: calc(50% - .5 * var(--padding));
      line-height: 1.25;
      margin-bottom: var(--padding);

      & + p {
        margin-left: var(--padding);
      }
    }

    span {
      transition: calc(2 * var(--transitionSpeed));
      display: block;
    }
  }
</style>

<figure class='needs-js' data-align='right'>
  <section class={`theme-example theme-example--${theme}`}>
    <p>
      <span style='color: var(--text);'>The</span>
      <span style='color: var(--text);'>five</span>
      <span style='color: var(--text);'>boxing</span>
      <span style='color: var(--text);'>wizards</span>
      <span style='color: var(--text);'>jump.</span>
      <span style='color: var(--text);'>quickly.</span>
    </p>
    <p>
      <span style='color: var(--text);'>How</span>
      <span style='color: var(--purple);'>vexingly</span>
      <span style='color: var(--gray1);'>quick</span>
      <span style='color: var(--gray2);'>daft</span>
      <span style='color: var(--gray3);'>zebras</span>
      <span style='color: var(--gray4);'>jump.</span>
    </p>
    
    <Toggle
      name='dark-theme-toggle'
      title='toggle color scheme'
      checked={theme === 'dark'}
      toggle={toggleTheme}
    />
  </section>

  <figcaption>
    Gatsby brand colors showing only switching black and white values
  </figcaption>
</figure>  
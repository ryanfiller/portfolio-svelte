<script>
  export let title
  export let link = {}
  export let content
  export let component

  let componentProps = {}
  if (Array.isArray(component)) {
    componentProps = component[1]
    component = component[0]
  }

  const h = title ? '3' : '2'
</script>

<style>
  section.content-list {
    /* include readable */
    max-width: var(--readableMax);
    margin: 0 auto;
    padding: var(--padding);
    clear: both;
    line-height: 1.5;

    & h2 {
      margin: 0;
      font-size: 3.25rem;
      border-bottom: var(--borderWidth) solid currentColor;
    }

    & ul {
      margin: 0 0 2em 0;
      padding: 0;
      font-size: 1.5rem;
      list-style: none;

      & li {
        margin-top: calc(2 * var(--varSpacing)) 0;
      }
    }
  }

</style>

<section class='content-list'>
  {#if title}
    <h2 class='title'>{title}</h2>
  {/if}
  <ul>
    {#each content as item}
      <li>
        <svelte:component this={component} {h} {...componentProps} {...item} />
      </li>
    {/each}
  </ul>
  {#if link.url && link.text}
    <a class='button' href={link.url}>
      {link.text} »
    </a>
  {/if}
</section>
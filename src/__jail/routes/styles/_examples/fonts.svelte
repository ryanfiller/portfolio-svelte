<script>
  import Markdown from '$components/layout/markdown.svelte'

  const css = Object.values(import.meta.globEager('/src/styles/font-face.css'))[0].default
  const fonts = css.split('@font-face').filter(css => css.includes('font-family'))
  const fontFamilies = [...new Set(fonts.map(font => font.match(/font-family: '(.*)';/)[1]))]
  const characters = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~']
  const codeLigatures = ['&&', '||', '=>', '==', '!=', '<=', '>=', '!!', '?.']
</script>

<style>
  div {
    & * {
      font-family: inherit !important;
    }

    &:not(:last-child) {
      margin-bottom: calc(2 * var(--padding));
    }
  }

  h3 {
    font-size: 5rem !important;
  }

  ol {
    --size: 1.5em;
    --gap: 0.05em;

    font-size: var(--size);
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--size));
  }

  li {
    border: var(--gap) solid currentColor;
    list-style: none;
    text-align: center;
    background-color: var(--colorBackground);
    margin: calc(-0.5 * var(--gap)) !important;
  }
</style>

<Markdown>
  {#each fontFamilies as font}
    <div style={`font-family: "${font}";`}>
      <h3>{font}</h3>

      <ol>
        {#if font === 'Fira Code'}
          {#each codeLigatures as ligature}
            <li>{ligature}</li>
          {/each}
        {/if}
        {#each characters as character}
          <li>{character}</li>
        {/each}
      </ol>
    </div>
  {/each}
</Markdown>
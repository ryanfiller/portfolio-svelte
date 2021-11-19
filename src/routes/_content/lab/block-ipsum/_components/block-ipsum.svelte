<script>
  import blockIpsum from 'block-ipsum/dist/index.mjs' // ???

  const blocks = [ '█', '▉', '▋', '▍', '▎', '▏', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '░', '▒', '▓' ]

  let length = 3
  let type = 'paragraphs'
  let character = blocks[0]
  let result = ''

  $: result = blockIpsum({ length: length, type: type, character: character })

  let copyText = 'copy'

  function copy() {
    if (typeof window !== 'undefined') {
      var result = document.getElementById('result')
      result.focus()
      result.select()
      document.execCommand('copy')
      copyText = 'copied!'
      setTimeout(() => { copyText = 'copy' }, 2000);
    }
  }
</script>

<fieldset class='options'>
  <legend>options: </legend>

  <label for='length'>
    <span>length: </span>
    <input
      name='length'
      id='length'
      type='number'
      min='1'
      bind:value={length}
    />
  </label>

  <label for='type'>
    <span>type: </span>
    <select
      name='type'
      id='type'
      bind:value={type}
    >
      <option>
        paragraphs
      </option>
      <option>
        sentences
      </option>
      <option>
        words
      </option>
    </select>
  </label>

  <label for='character'>
    <span>character: </span>
    <select
      name='character'
      id='character'
      bind:value={character}
    >
      {#each blocks as block}
        <option>
          {block}
        </option>
      {/each}
    </select>
  </label>

</fieldset>

<fieldset class='result'>
  <legend>result: </legend>

  <textarea
    name='result'
    id='result'
    value={result}
    on:keydown={event => event.preventDefault()}
  />

  <button on:click={copy}>
    {copyText}
  </button>
  
</fieldset>


<style>
  label {
    display: flex;
    flex-direction: column;
  }

  fieldset {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    padding: calc(1 * var(--padding));
    gap: var(--padding);

    /* TODO the whole site REALLY needs some better form styles... */
    & + fieldset {
      margin-top: var(--padding);
    }

    & > label {
      flex: 1;
    }

    & textarea {
      height: 33vh;
      line-height: 1.5;
    }

    & > button {
      width: 100%;
    }
  }
</style>

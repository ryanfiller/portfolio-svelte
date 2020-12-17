<!-- TODO - figure out where to put `svelte-ignore css-unused-selector` in this file -->

<style global>
  .diff-table .diff {
    font-size: .75em;
    font-weight: bold;
    margin-top: .25em;
    margin-right: .25em;
  }

  .diff-table .diff--increase {
    color: var(--colorHighlight);
  }

  .diff-table .diff--decrease {
    color: var(--colorActive);
  }
</style>

<script>
  export let data
  import tables from './data.js'

  const {
    caption,
    data: tableData
  } = tables[data]

  const scoreTitles = [
    'First Meaningful Paint',
    'Time to Interaction',
    'Max Potential First Input Delay'
  ]

  const headers = Object.keys(tableData)
  const rows = Object.values(tableData)

  const getDiff = (score, compare) => {
    const diff = ((score - compare) / compare) * 100
    if (diff > 0) {
      return `<span class='diff diff--increase'>(+${diff.toFixed(2)}%)</span>`
    } else if (diff < 0) {
      return `<span class='diff diff--decrease'>(${diff.toFixed(2)}%)</span>`
    } else {
      return ``
    }
  }
</script>

<table class='diff-table'>
  {#if !!caption}
    <caption>{caption}</caption>
  {/if}
  <tbody>
    <tr>
      <th></th>
      {#each headers as title}
        <th>
          {title}
        </th>
      {/each}
    </tr>

    {#each scoreTitles as title, rowIndex}
      <tr>
        <td>{title}</td>
        {#each rows as row, columnIndex}
          <td align='right'>
            {#if row.diff}
              {@html getDiff(row.scores[rowIndex], row.diff.scores[rowIndex])}
            {/if}
            <span>{row.scores[rowIndex].toFixed(2)}s</span>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table> 
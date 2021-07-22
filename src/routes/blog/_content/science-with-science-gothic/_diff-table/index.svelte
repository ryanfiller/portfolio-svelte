<style>
  .table span {
    font-size: 0.75em;
    font-weight: bold;
    margin-top: 0.25em;
    margin-right: 0.25em;
  }

  .table :global(.increase) {
    color: var(--colorHighlight);
  }

  .table :global(.decrease) {
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
      return `<span class='diff increase'>(+${diff.toFixed(2)}%)</span>`
    } else if (diff < 0) {
      return `<span class='diff decrease'>(${diff.toFixed(2)}%)</span>`
    } else {
      return ``
    }
  }
</script>

<table class='table'>
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
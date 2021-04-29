import visit from 'unist-util-visit'

function transformer(ast) {
  visit(ast, 'code', visitor)

  function visitor(node) {
    const { lang, meta, value} = node

    let style = ''
    if (meta) {
      const lines = meta
        .replace(/{/g, '')
        .replace(/}/g, '')
        .replace(/, /g, ',')
        .split(',')
        .map(line => {
          if (line.match(/-/g)) {
            const [ start, end ] = line.split('-')
            return [ start - 1, end ]
          } else {
            return [line - 1, line]
          }
        })

      const gradient = lines.map((line, index) => {
        const [ start, end ] = line
        const last = lines.length - 1
        const next = index === last ? last : lines[index + 1][0]

        return [
          `transparent 0`,
          `transparent calc(1em * var(--line-height) * ${start})`,
          `var(--line-highlight-color) calc(1em * var(--line-height) * ${start})`,
          `var(--line-highlight-color) calc(1em * var(--line-height) * ${end})`,
          `transparent calc(1em * var(--line-height) * ${end})`,
          `transparent calc(1em * var(--line-height) * ${next})`,
        ].join(', ')
      })

      style = `--line-highlight: linear-gradient(${gradient.join(', ')});`
    }

    // for some reason this dies HARD if the default hProperties are here
    if (node.data && node.data.hProperties) {
      node.data.hProperties = {
        'data-language': !lang ? null : lang,
        style: !style ?  null : style
      }
    }
  }
}

function links() {
  return transformer
}

export default links

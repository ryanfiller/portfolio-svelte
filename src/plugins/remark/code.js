import visit from 'unist-util-visit'

// https://github.com/pngwn/MDsveX/blob/d0b8d4e824b9cbfef9343e2c73aeb6d2005df805/packages/mdsvex/src/transformers/index.ts#L573
const escapeSvelte = (string) => (
  string.replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' }[c]))
    .replace(/\\([trn])/g, '&#92;$1')
)

function transformer(ast) {
  visit(ast, 'code', visitor)

  function visitor(node) {
    const { lang, meta, value } = node

    let style = ''
    // get strings between '{' and '}'
    const linesRegex = new RegExp(/{.*}/)

    let filename = ''
    // get string before ' ', and only to the first ' ', unless it contains '{'
    const fileRegex = new RegExp(/.*?[^( | {)]*/)

    if (meta) {
      if (meta.match(linesRegex)) {
        const lines = meta
          .match(linesRegex)[0]
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

      if (meta.match(fileRegex)) {
        filename = meta.match(fileRegex)[0].trim()
      }
    }

    // for some reason this dies HARD if the default hProperties are here
    if (node.data && node.data.hProperties) {
      node.data.hProperties = {
        'data-language': !lang ? null : lang,
        'data-filename': !filename ? null : filename,
        style: !style ?  null : style
      }
    }

    node.value = value
  }
}

function links() {
  return transformer
}

export default links

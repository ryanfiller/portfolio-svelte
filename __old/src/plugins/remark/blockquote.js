import visit from 'unist-util-visit'

function transformer(ast) {
  visit(ast, 'blockquote', visitor)

  function visitor(node) {

    const breakIndex = node.children.findIndex(child => child.type === 'thematicBreak')
    const hasCite = breakIndex !== -1

    if (hasCite) {
      const quote = node.children.slice(0, breakIndex)
      const cite = node.children.slice(-1)

      node.children = [
        ...quote,
        {
          type: 'cite', // this doesn't actually matter, but it fails without it
          children: cite[0].children,
          data: {
            hName: 'cite'
          }
        }
      ]
    }
  }
}

function blockquote() {
  return transformer
}

export default blockquote
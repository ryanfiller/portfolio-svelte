const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')
const { slugify } = require('../../src/helpers')

function transformer(ast) {
  visit(ast, 'heading', visitor)

  function visitor(node) {
    const data = node.data || (node.data = {})
    const props = data.hProperties || (data.hProperties = {})
    // `toString` is here to catch something like '## `code` heading' or something
    const slugId = props.id ? slugify(props.id) : slugify(toString(node))

    data.id = slugId
    props.id = slugId

    // save the original children
    const originalChildren = [...node.children]

    node.children = [{
      type: 'link',
      url: `#${slugId}`,
      children: [...originalChildren]
    }]
  }
}

function headings() {
  return transformer
}

module.exports = headings
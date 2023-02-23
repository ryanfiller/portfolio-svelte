// this is mostly just https://github.com/stefanprobst/remark-extract-toc/blob/main/src/index.js
// but for some reason its trying to require something and ESM is blowing up

// import { toString } from 'hast-util-to-string'
import visit from 'unist-util-visit'

import slugify from '../../helpers/slugify.js'

function transformer(tree, vfile) {
  const headings = []

  visit(tree, 'element', visitor)

  vfile.toc = createTree(headings)

  function visitor(node) {
    if (node.tagName.match(/h[1-6]/)) {
      const content = node.children[0].value
      const level = node.tagName.match(/h([1-6])/)[1]
      headings.push({
        level: parseInt(level),
        // TODO this needs to use something like `toString` incase there's some html in here
        content: content,
        hash: `#${slugify(content)}`
      })
    }
  }

  function createTree(headings) {
    const root = { level: 0, children: [] }
    const parents = []
    let previous = root

    headings.forEach((heading) => {
      if (heading.level > previous.level) {
        if (previous.children === undefined) {
          previous.children = []
        }
        parents.push(previous)
      } else if (heading.level < previous.level) {
        while (parents[parents.length - 1].level >= heading.level) {
          parents.pop()
        }
      }

      parents[parents.length - 1].children.push(heading)
      previous = heading
    })

    return root.children
  }
}

function tableOfContents() {
  return transformer
}

export default tableOfContents

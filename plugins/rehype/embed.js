const visit = require('unist-util-visit')
const helpers = require('../../src/helpers')
const fishAttr = helpers.fishAttr

function transformer(tree) {
  visit(tree, 'jsx', visitor)

  function visitor(node) {
    const iframeRegex = new RegExp(/<iframe(.*)<\/iframe>/g)

    if (node.value && node.value.match(iframeRegex)) {
      // sometimes this grabs other jsx values... not sure why?
      const value = node.value.match(iframeRegex)[0]
      
      const title = fishAttr(value, 'title')
      const src = fishAttr(value, 'src')
      const aspectRatio = fishAttr(value, 'data-aspect-ratio')
      const id = fishAttr(value, 'id')
      const classes = fishAttr(value, 'class')

      const wrapperProps = () => {
        const attrs = []
        if (aspectRatio) {
          attrs.push(`data-aspect-ratio="${aspectRatio}"`)
        }
        if (!!id) {
          attrs.push(`id="${id}"`)
        }
        if (!!classes) {
          attrs.push(`class="embed ${classes}"`)
        } else {
          attrs.push(`class="embed"`)
        }
        return attrs.join(' ')
      }
  
      const iframeProps = () => {
        const attrs = [
          `src="${src}"`,
          `loading="lazy"`
        ]
        if (title) {
          attrs.push(`title="${title}"`)
        }
        return attrs.join(' ')
      }

      const newValue = `<div ${wrapperProps()}><iframe ${iframeProps()}></iframe></div>`

      node.value = node.value.replace(iframeRegex, newValue)
    }
  }
}


function embed() {
  return transformer
}

module.exports = embed

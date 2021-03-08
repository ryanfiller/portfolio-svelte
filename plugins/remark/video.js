import visit from 'unist-util-visit'

function renderVideo(node) {
  const data = node.data || (node.data = {})
  const props = data.hProperties || (data.hProperties = {})
  const alt = node.alt
  const title = node.title
  const caption = props['data-caption']
  let src
  if (process.env.NODE_ENV !== 'test') { // this breaks cypress
    src = node.url
  } else {
    src = ''
  }

  // TODO, options object

  const wrapperProps = () => {
    const attrs = []
    if (props['data-align']) {
      attrs.push(`data-align="${props['data-align']}"`)
    }
    if (props['data-small']) {
      attrs.push(`data-small="${props['data-small']}"`)
    }
    if (props['id']) {
      attrs.push(`id="${props['id']}"`)
    }
    if (props['class']) {
      attrs.push(`class="${props['class'].join(' ')}"`)
    }
    return attrs.join(' ')
  }

  let newNode = null
  if (caption) {
    newNode = {
      type: 'html',
      value: `
      <!-- svelte-ignore a11y-media-has-caption -->
      <figure ${wrapperProps()}>
        <video title="${title || alt}" controls loop autoplay muted>
          <source src="${src}" type="video/mp4" muted />
          Sorry, your browser doesn't support embedded videos.
          <track kind="descriptions" label="${title || alt}" />
        </video>
        <figcaption>${caption}</figcaption>
      </figure>`
    }
  } else {
    newNode = {
      type: 'html',
      value: `
      <!-- svelte-ignore a11y-media-has-caption -->
      <video title="${title || alt}" ${wrapperProps()} controls loop autoplay muted>
        <source src="${src}" type="video/mp4" muted />
        Sorry, your browser doesn't support embedded videos.
        <track kind="descriptions" label="${title || alt}" />
      </video>`
    }
  }

  return newNode
}


// exported to use in `./image.js`
export { renderVideo }

// don't need all this for now...
// function transformer(ast) {
//   visit(ast, 'image', visitor)

//   function visitor(node) {
//     renderVideo(node)
  
//     Object.assign(node, newNode)
//   }
// }

// function video() {
//   return transformer
// }

// module.exports = video
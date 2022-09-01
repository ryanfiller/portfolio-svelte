import visit from 'unist-util-visit'
import { renderVideo } from './video.js'

import { addSrcset } from '../../helpers/image-helpers.js'

function transformer(ast) {
  visit(ast, 'image', visitor)

  function visitor(node) {
      // escape hatch into video component 
      if(node.url.includes('.mp4')) {
        const video = renderVideo(node)
        return Object.assign(node, video)
      }

      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      const src = node.url
      const alt = node.alt
      const title = node.title
      const caption = props['data-caption']
  
      const skipSrcSet = ['.gif', '.svg'].some(ext => src.includes(ext))
  
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
  
      const imageProps = () => {
        const attrs = [`alt="${alt}"`]
        if (title) {
          attrs.push(`title="${title}"`)
        }
        if (skipSrcSet) {
          attrs.push(`src="${src}"`)
        } else {
          // attrs.push(
          //   `srcset="${src}?nf_resize=fit&w=500 500w, ${src}?nf_resize=fit&w=800 800w"`,
          //   `src="${src}?nf_resize=fit&w=500"`,
          // )
          attrs.push(addSrcset(src))
        }
        return attrs.join(' ')
      }
  
      let newNode = null
      if (caption) {
        newNode = {
          type: 'html',
          value: `<figure ${wrapperProps()}>
            <img ${imageProps()} />
            <figcaption>${caption}</figcaption>
          </figure>`
        }
      } else {
        newNode = {
          type: 'html',
          value: `<img ${wrapperProps()} ${imageProps()} />`
        }
      }
  
    Object.assign(node, newNode)
  }
}

function images() {
  return transformer
}

export default images

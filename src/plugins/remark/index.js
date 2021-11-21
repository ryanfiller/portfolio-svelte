import attr from 'remark-attr'
import remarkCustomBlocks from 'remark-custom-blocks'
// TODO remark-abbr
// TODO https://github.com/JS-DevTools/rehype-toc

import blockquote from './blockquote.js'
import code from './code.js'
import headings from './headings.js'
import images from './images.js'
import links from './links.js'
// import video from './video.js' // only called from image component for now...

export default {
  blockquote,
  code,
  headings,
  images,
  links,
  // video,
  // these get pass on to svelte.config.js
  attr: [attr, { scope: 'every' }],
  remarkCustomBlocks: [remarkCustomBlocks, {
    details: {
      classes: 'details',
      title: 'required',
      details: true
    },
    clearfix: {
      classes: 'clearfix'
    }
  }], 
}
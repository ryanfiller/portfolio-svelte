import React from 'react'

const clearfix = {
  id: 'clearfix',
  label: 'Clearfix',
  fields: [],
  pattern: /<div style="clear:both"><\/div>/,
  fromBlock: () => '',
  // Function to create a text block from an instance of this component
  // what is actually written in the markdownfile
  toBlock: () => `<div style="clear:both" class="clearfix"></div>`,

  // What is rendered in the netlify editor
  toPreview: () => `<hr style="clear:both" />`
}

export default clearfix

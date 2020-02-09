import React from 'react'
import { fishAttr } from '../../helpers'

const embed = {
  id: 'embed', 
  label: 'Embed',
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string'
    },
    {
      name: 'src',
      label: 'Url',
      widget: 'string',
    },
    {
      name: 'aspect-ratio',
      label: 'Aspect Ratio',
      widget: 'select',
      options: [
        'full',
        '16/9',
        '4/3'
      ]
    },
  ],
  pattern: /<iframe (.*)/,
  fromBlock: match => {
    const string = match[0]
    const obj = {
      title: fishAttr(string, 'title'),
      src: fishAttr(string, 'src'),
      'aspect-ratio': fishAttr(string, 'data-aspect-ratio'),
      height: fishAttr(string, 'height'),
      width: fishAttr(string, 'width')
    }
    return obj
  },
  // Function to create a text block from an instance of this component
  // what is actually written in the markdownfile
  toBlock: obj => {
    return `<iframe data-aspect-ratio="${obj['aspect-ratio']}" title="${obj.title}" src="${obj.src}" loading="lazy"></iframe>`
  },

  // What is rendered in the netlify editor
  toPreview: obj => {
    return (
      <EmbedPreview {...obj} />
    )
  }
}

const EmbedPreview = props => {
  const {
    title,
    src,
    'aspect-ratio': ratio,
  } = props


  return (
    src ? (
      <div 
        style={{ 
          color: 'rgb(122, 130, 145)',
          backgroundColor: 'rgb(223, 223, 227)',
          padding: '1em',
          textAlign: 'center'
        }}
      >
        <p>{title}</p>
        <p>{src}</p>
        <p>{ratio}</p>
      </div>
    ) : null
  )
}

export default embed

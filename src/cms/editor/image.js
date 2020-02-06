import React from 'react'
import { fishAttr } from '../../helpers'

const image = {
  id: 'image', // this overwrites the default netlifycms image
  label: 'Image',
  fields: [
    {
      name: 'src',
      label: 'Image',
      widget: 'image'
    },
    {
      name: 'alt',
      label: 'Alt Text',
      widget: 'string'
    },
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
      required: false,
      default: ''
    },
    {
      name: 'caption',
      label: 'Caption',
      widget: 'string',
      required: false,
      default: ''
    },
    {
      name: 'align',
      label: 'Alignment',
      widget: 'select',
      options: [
        'left',
        'center',
        'right',
        'full'
      ],
      default: 'center'
    },
    {
      name: 'small',
      label: 'Small',
      widget: 'boolean',
      default: false
    }
  ],
  pattern: /<img(.*)/,
  fromBlock: match => {
    const string = match[0]
    const obj = {
      src: fishAttr(string, 'src'),
      alt: fishAttr(string, 'alt'),
      caption: fishAttr(string, 'data-caption'),
      align: fishAttr(string, 'data-align'),
      small: fishAttr(string, 'data-small')
    }
    return obj
  },
  // Function to create a text block from an instance of this component
  // what is actually written in the markdownfile
  toBlock: obj => {
    return `<img src="${obj.src}" alt="${obj.alt}" data-caption="${obj.caption}" data-align="${obj.align}" data-small="${obj.small}" />`
  },

  // What is rendered in the netlify editor
  toPreview: obj => {
    return (
      <ImagePreview {...obj} />
    )
  }
}

const ImagePreview = props => {
  const {
    src,
    alt,
    caption,
    align,
    small
  } = props

  let style

  switch (align) {
    case 'full':
      style = {
        display: 'block',
        margin: '0'
      }
      break
    case 'left':
      style = {
        float: 'left',
        display: 'block',
        marginRight: '1em'
      }
      break
    case 'right':
      style = {
        float: 'right',
        display: 'block',
        marginLeft: '1em'
      }
      break
    default:
      // 'center'
      style = {
        display: 'block',
        margin: '0 auto'
      }
  }

  if (align === 'full') {
    style.width = '100%'
  } else if (small === 'true') {
    style.width = '25%'
  } else {
    style.width = '50%'
  }

  return (
    src ? (
      <div style={{ ...style }}>
        <img
          src={`https://www.ryanfiller.com${src}`}
          alt={alt}
          style={{ width: '100%' }}
        />
        {!!caption && <span>{caption}</span>}
      </div>
    ) : null
  )
}

export default image

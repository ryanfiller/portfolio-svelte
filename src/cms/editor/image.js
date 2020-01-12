import React from 'react'

const image = {
  id: 'image', // this overwrites the default netlifycms image
  label: "Image",
  fields: [
    {
      name: 'url',
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
    },
  ],
  pattern: /<img(.*)/,
  fromBlock: function(match) {
    const string = match[0]
    const obj = {
      url: string.match(/src="(.*?)"/)[1],
      alt: string.match(/alt="(.*?)"/)[1],
      title: string.includes('title') ? string.match(/title="(.*?)"/)[1] : '',
      align: string.match(/align="(.*?)"/)[1],
      small: string.match(/small="(.*?)"/)[1],
    };
    return obj;
  },
  // Function to create a text block from an instance of this component
  // what is actually written in the markdownfile
  toBlock: function(obj) {
    return `<img src="${obj.url}" alt="${obj.alt}" title="${obj.title}" align="${obj.align}" small="${obj.small}" />`;
  },

  // What is rendered in the netlify editor
  toPreview: function(obj) {
    return (
      <ImagePreview {...obj} />
    )  
  }
}

const ImagePreview = props => {

  const {
    url,
    alt,
    align,
    small,
  } = props

  let style;

  switch (align) {
    case 'full':
      style = {
        display: 'block',
        margin: '0',
      }
      break;
    case 'left':
      style = {
        float: 'left',
        display: 'block',
        marginRight: '1em',
      }
      break;
    case 'right':
      style = {
        float: 'right',
        display: 'block',
        marginLeft: '1em',
      }
      break;
    default:
      // 'center'
      style = {
        display: 'block',
        margin: '0 auto',
      }
  }

  if (small === 'true' && align !== 'full') {
    style.width = '25%';
  }
  
  return (
    !!url ? <img src={url} alt={alt} style={{...style}} /> : null
  )
}

export default image
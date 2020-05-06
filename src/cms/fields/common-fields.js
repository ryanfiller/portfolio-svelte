export const mediaSettings = {
  path: '{{slug}}/index',
  media_folder: '',
  public_folder: '/images/uploads'
}

export const pageFields = [
  {
    name: 'title',
    label: 'Title',
    widget: 'string'
  },
  {
    name: 'options',
    label: 'Options',
    widget: 'object',
    fields: [
      {
        name: 'hideSiteHeader',
        label: 'Hide Site Header',
        widget: 'boolean',
        required: false,
        default: false
      },
    ]
  },
  {
    name: 'body',
    label: 'Body',
    widget: 'markdown',
    required: false
  }
]

export const postFields = [
  {
    name: 'title',
    label: 'Title',
    widget: 'string'
  },
  {
    name: 'options',
    label: 'Options',
    widget: 'object',
    fields: [
      {
        name: 'published',
        label: 'Published',
        widget: 'boolean',
        default: false
      },
      {
        name: 'customurl',
        label: 'Custom Path',
        widget: 'string',
        default: '',
        required: false
      },
      {
        name: 'customtemplate',
        label: 'Custom Template',
        widget: 'string',
        default: '',
        required: false
      }
    ]
  },
  {
    name: 'meta',
    label: 'Meta',
    widget: 'object',
    fields: [
      {
        name: 'date',
        label: 'Date',
        widget: 'date'
      },
      {
        name: 'excerpt',
        label: 'Excerpt',
        widget: 'text'
      },
      {
        name: 'categories',
        label: 'Categories',
        widget: 'list',
        required: false
      },
      {
        name: 'tags',
        label: 'Tags',
        widget: 'list',
        required: false
      }
    ]
  }
]

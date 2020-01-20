const commonFields = [
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
        abel: 'Published',
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
      }
    ]
  }
]

export default commonFields

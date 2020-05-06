import { pageFields, mediaSettings } from './common-fields'

export const pages = {
  label: 'Pages',
  name: 'pages',
  extension: 'mdx',
  format: 'frontmatter',
  editor: {
    preview: false
  },
  files: [
    {
      label: 'Home',
      name: 'home',
      file: 'src/content/pages/home/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'home'
        },
        ...pageFields
      ]
    },
    {
      label: 'About',
      name: 'about',
      file: 'src/content/pages/about/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'about'
        },
        ...pageFields
      ]
    },
    {
      label: 'Blog',
      name: 'blog',
      file: 'src/content/pages/blog/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'blog'
        },
        ...pageFields
      ]
    },
    {
      label: 'Portfolio',
      name: 'portfolio',
      file: 'src/content/pages/portfolio/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'portfolio'
        },
        ...pageFields
      ]
    },
    {
      label: 'Lab',
      name: 'lab',
      file: 'src/content/pages/lab/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'lab'
        },
        ...pageFields
      ]
    },
    {
      label: 'Styles',
      name: 'styles',
      file: 'src/content/pages/styles/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'styles'
        },
        ...pageFields
      ]
    },
    {
      label: 'Changes',
      name: 'changes',
      file: 'src/content/pages/changes/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'changes'
        },
        ...pageFields
      ]
    },
    {
      label: '/uses',
      name: 'uses',
      file: 'src/content/pages/uses/index.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'uses'
        },
        ...pageFields
      ]
    },
    {
      label: '404',
      name: '404',
      file: 'src/content/pages/404.mdx',
      ...mediaSettings,
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: '404'
        },
        ...pageFields
      ]
    },
  ]
}
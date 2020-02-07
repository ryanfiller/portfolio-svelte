import { pageFields } from './common-fields'

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
      file: 'src/content/pages/home.mdx',
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
      file: 'src/content/pages/about.mdx',
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
      file: 'src/content/pages/blog.mdx',
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
      file: 'src/content/pages/portfolio.mdx',
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
      label: 'Workshop',
      name: 'workshop',
      file: 'src/content/pages/workshop.mdx',
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'hidden',
          default: 'workshop'
        },
        ...pageFields
      ]
    },
    {
      label: 'Styles',
      name: 'styles',
      file: 'src/content/pages/styles.mdx',
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
      file: 'src/content/pages/changes.mdx',
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
      label: '404',
      name: '404',
      file: 'src/content/pages/404.mdx',
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
import commonFields from './common-fields'

export const blog = {
  label: 'Blog',
  name: 'blog',
  folder: 'src/content/blog',
  extension: 'mdx',
  format: 'frontmatter',
  create: true,
  delete: true,
  fields: [
    ...commonFields,
    {
      name: 'body',
      label: 'Body',
      widget: 'markdown' 
    },
  ]
};
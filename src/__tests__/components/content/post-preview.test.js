import React from 'react'
import PostPreview from '../../../components/content/post-preview'

describe('<PostPreview />', () => {

  const props = () => ({
    node: {
      fields: {
        slug: '#'
      },
      frontmatter: {
        title: 'post title',
        meta: {
          date: '1989-04-30T00:00:00.000',
          categories: ['one', 'two', 'third'],
          tags: ['one', 'two', 'third'],
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      }
    }
  })

  it('should render correctly', async () => {
    const component = mount(<PostPreview {...props()} />)
    expect(component.html()).toMatchSnapshot()
    expect(await axe(component.html())).toHaveNoViolations()
  })
})
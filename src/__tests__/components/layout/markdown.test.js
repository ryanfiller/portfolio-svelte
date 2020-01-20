import React from 'react'
import Markdown from '../../../components/layout/markdown'
import Image from '../../../components/markdown/image'

import mockPost from '../../../__mocks__/post-mock'

describe('<Markdown />', () => {
  const props = () => ({
    post: mockPost,
    className: 'test-class'
  })

  it('should render correctly', async () => {
    const component = mount(<Markdown {...props()} />) 
    expect(component.find('article.test-class').length).toEqual(1)
    expect(component.html()).toMatchSnapshot()
    expect(await axe(component.html())).toHaveNoViolations()
  })

  it('should render React components correctly', async () => {
    const component = mount(<Markdown {...props()} />) 
    expect(component.find(Image).length).toEqual(8)
  })

})
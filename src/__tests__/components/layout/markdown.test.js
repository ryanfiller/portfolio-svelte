import React from 'react'
import Markdown from '../../../components/layout/markdown'
import Image from '../../../components/markdown/image'
import { H1, H2, H3, H4, H5, H6 } from '../../../components/markdown/headings'

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
    expect(component.find(H1).length).toEqual(1)
    expect(component.find(H2).length).toEqual(1)
    expect(component.find(H3).length).toEqual(1)
    expect(component.find(H4).length).toEqual(1)
    expect(component.find(H5).length).toEqual(1)
    expect(component.find(H6).length).toEqual(1)
  })

})
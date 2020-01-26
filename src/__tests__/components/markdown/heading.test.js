import React from 'react'
import Heading from '../../../components/markdown/headings/heading'

describe('<Heading />', () => {

  it('should render correctly', async () => {
    const component = mount(<Heading h='1'>h1 text</Heading>)
    expect(component.find('h1#h1-text').length).toBe(1)
    expect(await axe(component.html())).toHaveNoViolations()
  })

  it('should be able to render all heading types', () => {
    const H1 = mount(<Heading h='1'>h1</Heading>)
    expect(H1.find('h1').length).toBe(1)
    const H2 = mount(<Heading h='2'>text</Heading>)
    expect(H2.find('h2').length).toBe(1)
    const H3 = mount(<Heading h='3'>text</Heading>)
    expect(H3.find('h3').length).toBe(1)
    const H4 = mount(<Heading h='4'>text</Heading>)
    expect(H4.find('h4').length).toBe(1)
    const H5 = mount(<Heading h='5'>text</Heading>)
    expect(H5.find('h5').length).toBe(1)
    const H6 = mount(<Heading h='6'>text</Heading>)
    expect(H6.find('h6').length).toBe(1)
  })

  it('should copy the link when clicked', async () => {
    navigator.clipboard = {writeText: jest.fn()}
    const copyHashLink = navigator.clipboard.writeText
    const component = mount(<Heading h='1'>h1 text</Heading>)
    component.find('h1').simulate('click')
    expect(copyHashLink).toBeCalled
  })
})
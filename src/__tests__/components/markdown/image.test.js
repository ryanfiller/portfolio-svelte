import React from 'react'
import Image from '../../../components/markdown/image'

describe('<Image />', () => {
  const props = () => ({
    src: 'string.jpg',
    alt: 'alt',
    title: null,
    'data-align': null,
    'data-small': null,
    'data-caption': null
  })

  it('should render correctly', async () => {
    const component = mount(<Image src='test.jpg' alt='alt' title='title' />)      
    expect(component.html()).toMatchSnapshot()
    expect(await axe(component.html())).toHaveNoViolations()
  })

  describe('which tag to render', () => {
    it('should render an <img> by default', async () => {
      const component = mount(<Image {...props()} />)
      expect(component.find('img').length).toEqual(1)
      expect(component.find('figure').length).toEqual(0)
      expect(await axe(component.html())).toHaveNoViolations()
    })

    it('should render an <figure> and <figcaption> if there is a caption', async () => {
      const component = mount(<Image {...props()} data-caption='caption' />)
      expect(component.find('figure').length).toEqual(1)
      expect(component.find('figcaption').length).toEqual(1)
      expect(component.find('figcaption').text()).toEqual('caption')
      expect(await axe(component.html())).toHaveNoViolations()
    })
  })

  describe('transformation params', () => {
    it('should not transform a .gif', () => {
      const component = mount(<Image {...props()} src='text.gif' />)
      expect(component.find('img').props().src).toEqual('text.gif')
    })

    it('should not transform a .svg', () => {
      const component = mount(<Image {...props()} src='text.svg' />)
      expect(component.find('img').props().src).toEqual('text.svg')
    })

    it('should transform images and add a srcSet', async () => {
      const component = mount(<Image {...props()} />)
      expect(component.find('img').props().src.includes('?nf_resize=fit&w=')).toEqual(true)
      expect(component.find('img').props().srcSet.includes('?nf_resize=fit&w=')).toEqual(true)
      expect(await axe(component.html())).toHaveNoViolations()
    })
  })

  describe('alignment and sizes', () => {
    it('render a small image', () => {
      const imgComponent = mount(<Image {...props()} data-small='true' />)
      expect(imgComponent.find('img.image--small').length).toEqual(1)
      const figComponent = mount(<Image {...props()} data-small='true' data-caption='caption' />)
      expect(figComponent.find('img.image--small').length).toEqual(0)
      expect(figComponent.find('figure.image--small').length).toEqual(1)
    })
  })
})
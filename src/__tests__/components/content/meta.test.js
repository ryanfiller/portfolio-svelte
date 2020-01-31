import React from 'react'
import Meta from '../../../components/content/meta'

describe('<Meta />', () => {

  const props = () => ({
    date: null,
    dateFromat: null,
    categories: null,
    tags: null
  })

  const date = '1989-04-30T00:00:00.000'
  const categories = ['one', 'two', 'third']
  const tags = ['one', 'two', 'third']

  it('should render correctly', async () => {
    const component = mount(<Meta {...props()} date={date} categories={categories} tags={tags} />)
    expect(await axe(component.html())).toHaveNoViolations()
  })

  it('should pass in custom classes', () => {
    const component = mount(<Meta {...props()} className="extra" />)
    expect(component.find('div.meta.extra').length).toEqual(1)
  })

  describe('dates', () => {
    it('should format the date', () => {
      const component = mount(<Meta {...props()} date={date} />)
      expect(component.find('time').text()).toEqual("April 30, 1989")
      expect(component.find(`time[dateTime="${date}"]`).length).toEqual(1)
    })

    it('should custom format a date', () => {
      const component = mount(<Meta {...props()} date={date} dateFormat="MM.dd.yy" />)
      expect(component.find('time').text()).toEqual("04.30.89")
    })
  })

  it('should render a list of categories', () => {
    const component = mount(<Meta {...props()} categories={categories} />)
    expect(component.find('ul.meta__categories').find('li').length).toEqual(categories.length)
  })

  it('should render a list of tags', () => {
    const component = mount(<Meta {...props()} tags={tags} />)
    expect(component.find('ul.meta__tags').find('li').length).toEqual(tags.length)
  })
})
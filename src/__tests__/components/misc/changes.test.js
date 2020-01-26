import React from 'react'
import Change from '../../../components/misc/change'

describe('<Change />', () => {
  const component = mount(
    <Change>
      <h2>header </h2>
      <p>descriptive text</p>
      <ul>
        <li>
          one
          <ul>
            <li>a</li>
            <li>b</li>
          </ul>
        </li>
        <li>
          one
          <ul>
            <li>a</li>
            <li>b</li>
          </ul>
        </li>
      </ul>
    </Change>
  )

  it('should render correctly', async () => {
    expect(component.find('section.change').length).toBe(1)
    expect(component.find('h2').length).toBe(1)
    expect(component.find('ul').length).toBe(3)
    expect(component.find('button').length).toBe(1)
    expect(await axe(component.html())).toHaveNoViolations()
  })

  it('should toggle the list when the button is clicked', () => {
    component.find('button').simulate('click')
    component.update()
    expect(component.find('section.change--open').length).toBe(1)
  })
})
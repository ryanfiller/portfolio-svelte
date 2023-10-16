import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte'

import Logo from '/src/components/logo.svelte'

describe('<Logo />', () => {
	let component: any

	function props(overrides: any = {}) {
		return ({
			href: undefined,
      title: undefined,
			...overrides
		})
	}

	it('renders consistently with no props', () => {
		component = render(Logo, props())
		expect(() => component.getByTitle('whatever')).toThrowError()
		expect(component.container).toMatchSnapshot()
  })

  it('renders consistently with extra props', () => {
		component = render(Logo, props({ href: '#', title: 'whatever' }))
		expect(() => component.getByTitle('whatever')).not.toThrowError()
		expect(component.container).toMatchSnapshot()
  })

  it('applies the `--transition-index`s correctly', () => {
		component = render(Logo, props())
    const paths = component.container.querySelectorAll('path')
    'ryanfiller'.split('').forEach((_letter, index) => {
      expect(paths[index].getAttribute('style')).toEqual(`--transition-index: ${index + 1}`)
    })
  })
})
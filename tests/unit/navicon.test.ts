import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte'

import Navicon from '/src/components/navicon.svelte'

describe('<Navicon />', () => {
	let component

	let open = false
	const mockToggle = vi.fn(() => open = !open)
	function props(overrides: any = {}) {
		return ({
			boundElement: undefined,
			forSize: 'whatever',
			open: open,
			toggle: mockToggle,
			...overrides
		})
	}

	it('renders consistently', () => {
		component = render(Navicon, props())
		expect(component.container).toMatchSnapshot()
  })

  it('opens / closes', () => {
		component = render(Navicon, props({ open: open}))
		let button

		button = component.getByTitle('show off canvas navigation')
		
		fireEvent.click(button)
		expect(mockToggle).toHaveBeenCalled()

		component.rerender(props({ open: open }))
		button = component.getByTitle('hide off canvas navigation')

		fireEvent.click(button)
		expect(mockToggle).toHaveBeenCalled()

		component.rerender(props({ open: open }))
		button = component.getByTitle('show off canvas navigation')
  })
})
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import type { RenderResult } from '@testing-library/svelte'

import Analytics from '$components/analytics.svelte'

describe('<Analytics />', () => {
	let component: RenderResult<Analytics>

	it('renders the correct urls', () => {
		component = render(Analytics)
		expect(component.container).toMatchSnapshot()
	})
})

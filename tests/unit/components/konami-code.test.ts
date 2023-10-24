import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import type { RenderResult } from '@testing-library/svelte'

import KonamiCode from '$components/konami-code.svelte'

describe('<KonamiCode />', () => {
	let component: RenderResult<KonamiCode>

	const code = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'B',
		'A'
	]

	async function typeCode() {
		const promises = code.map(async (key) => {
			await fireEvent.keyDown(component.container, { key: key })
		})
		await Promise.all(promises)
	}

	// @ts-ignore
	let originalGetElementById: any
	// @ts-ignore
	let originalConsoleDotLog: any

	const add = vi.fn()
	const remove = vi.fn()

	beforeEach(() => {
		originalGetElementById = document.getElementById
		originalConsoleDotLog = console.log

		// @ts-ignore
		document.getElementById = vi.fn(() => ({
			classList: { add, remove }
		}))
		console.log = vi.fn()
	})

	afterEach(() => {
		vi.clearAllMocks()
		document.getElementById = originalGetElementById
		console.log = originalConsoleDotLog
	})

	describe('when the code is inactive', () => {
		beforeEach(async () => {
			component = render(KonamiCode, { props: { activated: false } })
			await typeCode()
		})

		it('adds the class to the body when the code is entered', () => {
			expect(add).toHaveBeenCalledWith('code-activated')
			expect(remove).not.toHaveBeenCalled()
		})

		it('logs the code to the console', () => {
			// each key, plus the success message
			expect(console.log).toHaveBeenCalledTimes(code.length + 1)
		})
	})

	describe('when the code is already active', () => {
		beforeEach(async () => {
			component = render(KonamiCode, { props: { activated: true } })
			await typeCode()
		})

		it('removes the class to the body when the code is entered', () => {
			expect(add).not.toHaveBeenCalled()
			expect(remove).toHaveBeenCalledWith('code-activated')
		})
	})
})

import { render, fireEvent } from '@testing-library/svelte'
import { get } from 'svelte/store'

import ThemeControls from '/src/components/misc/theme-controls.svelte'
import user from '$stores/user.js'

// @vitest-environment jsdom

function executeHeadScripts(document) {
	const headScripts = document.head.getElementsByTagName('script')[0].text
	eval(headScripts)
}

describe('<ThemeControls />', () => {
	let addEventListener, matchMedia
	beforeEach(() => {
		addEventListener = vi.fn()
		matchMedia = vi.fn(() => ({
			addEventListener: addEventListener	
		}))
		window.matchMedia = matchMedia

		window.document.documentElement.setAttribute = vi.fn()
	})

	describe('using localStorage', () => {
		describe('when the is no stored data', () => {
			beforeEach(() => {
				Storage.prototype.getItem = vi.fn(() => (JSON.stringify({})))

				render(ThemeControls)
				executeHeadScripts(document)
			})
	
			it('falls back to the OS preferences', () => {
				expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
				expect(window.matchMedia).toHaveBeenCalledWith('(prefers-contrast: more)')
				
				// <script> tag via <svelte:head>
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-theme', 'light')
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-contrast', 'no-preference')
			})
		})
	
		describe('when a user has previously chosen a theme', () => {
			beforeEach(() => {
				Storage.prototype.getItem = vi.fn(() => (JSON.stringify({ theme: 'dark', contrast: 'more' })))

				render(ThemeControls)
				executeHeadScripts(document)
			})
	
			it('uses the saved data', () => {
				// <script> tag via <svelte:head>
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-theme', 'dark')
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-contrast', 'more')
			})
		})

		describe('when a user has previously chosen a theme that is different than the OS', () => {
			beforeEach(() => {
				Storage.prototype.getItem = vi.fn(() => (JSON.stringify({ theme: 'dark', contrast: 'more' })))
				window.matchMedia = vi.fn(() => {
					return {
						matches: false, // will return 'light', 'no-preference'
						addEventListener: vi.fn()
					}
				})

				render(ThemeControls)
				executeHeadScripts(document)
			})
	
			it('uses the saved data and not the OS data', () => {
				// <script> tag via <svelte:head>
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-theme', 'dark')
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-contrast', 'more')
			})
		})
	})

	describe('listeners for OS changes', () => {
		beforeEach(() => {
			render(ThemeControls)
		})

		it('sets the correct listeners', () => {
			expect(matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
			expect(matchMedia).toHaveBeenCalledWith('(prefers-contrast: more)')
			expect(addEventListener).toHaveBeenNthCalledWith(1, 'change', expect.any(Function))
			expect(addEventListener).toHaveBeenNthCalledWith(2, 'change', expect.any(Function))
		})
	})

	describe('setting the correct input values', () => {
		describe('defaults', () => {
			let component
			beforeEach(() => {
				component = render(ThemeControls)
				executeHeadScripts(document)
			})

			it('sets the correct values', () => {
				const theme = component.getByLabelText('theme')
				const mono = component.getByLabelText('mono')
				
				expect(Array.from(theme.options).filter(option => option.selected)[0].text).toEqual('auto')
				expect(mono.checked).toBe(false)
			})
		})

		describe('prefers', () => {			
			let component
			beforeEach(() => {
				user.set({
					theme: 'dark',
					contrast: 'more'
				})
				
				component = render(ThemeControls)
				executeHeadScripts(document)
			})

			it('sets the correct values', () => {
				const theme = component.getByLabelText('theme')
				const mono = component.getByLabelText('mono')

				expect(Array.from(theme.options).filter(option => option.selected)[0].text).toEqual('dark')
				expect(mono.checked).toBe(true)
			})
		})
	})

	describe('a user setting the...', () => {
		let component
		beforeEach(() => {
			user.set({
				theme: 'auto',
				contrast: 'no-preference'
			})
			component = render(ThemeControls)
		})

		describe('color-scheme', () => {
			it('changes the input and calls the functions', () => {
				const input = component.getByLabelText('theme')

				expect(input.value).toBe('auto')
				expect(get(user).theme).toEqual('auto')

				fireEvent.change(input, { target: { value: 'light' }})

				expect(input.value).toBe('light')
				expect(get(user).theme).toEqual('light')
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-theme', 'light')
			})
		})

		describe('contrast', () => {
			it('changes the input and calls the functions', () => {
				const input = component.getByLabelText('mono')

				expect(input.checked).toBe(false)
				expect(get(user).contrast).toEqual('no-preference')

				fireEvent.click(input)

				expect(input.checked).toBe(true)
				expect(get(user).contrast).toEqual('more')
				expect(window.document.documentElement.setAttribute).toHaveBeenCalledWith('data-user-contrast', 'more')
			})
		})
	})
})

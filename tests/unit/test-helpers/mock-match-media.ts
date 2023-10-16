import { vi } from 'vitest'

export default function mockMatchMedia(media: string, matches = false, mockFunctions = {}) {
	Object.defineProperty(window, 'matchMedia', {
		value: vi.fn().mockImplementation((query) => {
			return {
				matches: media === query && matches,
				media: query,
				onchange: null,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
				...mockFunctions
			}
		})
	})
}

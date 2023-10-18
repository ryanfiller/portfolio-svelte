import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

import { sendToAnalytics } from '$helpers'

describe('sendToAnalytics()', () => {
	describe('when it should not work', () => {
		const originalWindow = global.window

		afterEach(() => {
			global.window = originalWindow
		})

		describe('when there is no window', () => {
			beforeEach(() => {
				// @ts-ignore
				global.window = undefined
			})

			it('does not explode', () => {
				expect(() => sendToAnalytics({ event: 'test' })).not.toThrow()
			})
		})

		describe('when there is no goatcounter', () => {
			beforeEach(() => {
				// @ts-ignore
				global.window.goatcounter = undefined
			})

			it('does not explode', () => {
				expect(() => sendToAnalytics({ event: 'test' })).not.toThrow()
			})
		})
	})

	describe('when it should work', () => {
		const mockCount = vi.fn()
		beforeEach(() => {
			// @ts-ignore
			global.window.goatcounter = { count: mockCount }

			sendToAnalytics({ event: 'event', title: 'title' })
		})

		it('sends a tracking event', () => {
			expect(mockCount).toHaveBeenCalledWith({ path: 'event', title: 'title', event: true })
		})
	})
})

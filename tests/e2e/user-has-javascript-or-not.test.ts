import { expect, test } from '@playwright/test'

test.describe('user javascript', () => {
	test.describe('user has javascript', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/')
		})

		test('it removes the no-js data attribute', async ({ page }) => {
			const noJS = await page.getByTestId('body').getAttribute('data-no-js')
			expect(noJS).toEqual(null)
		})
	})

	test.describe('user has disabled javascript', () => {
		test.use({ javaScriptEnabled: false })

		test.beforeEach(async ({ page }) => {
			await page.goto('/')
		})

		test('it does not remove the no-js data attribute', async ({ page }) => {
			const noJS = await page.getByTestId('body').getAttribute('data-no-js')
			// the tag is there, it just has no value
			expect(noJS).toEqual('')
		})
	})
})

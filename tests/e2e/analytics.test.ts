import { expect, test } from '@playwright/test'

test.describe('analytics', () => {
	test.describe('user has javascript', () => {
		test.beforeEach(async ({ page }) => {
			await page.route('testing-analytics.js', (route) =>
				route.fulfill({
					status: 200,
					body: `;(function() {document.write('<div data-testid="analytics"></div>')})();`
				})
			)

			await page.goto('/')
		})

		test('requests and executes the tracking script', async ({ page }) => {
			await page.waitForLoadState('load')

			const analytics = await page.getByTestId('analytics')
			expect(analytics).not.toBeNull()
		})
	})

	test.describe('user has disabled javascript', () => {
		test.use({ javaScriptEnabled: false })

		test.beforeEach(async ({ page }) => {
			await page.goto('/')
		})

		test('it loads the tracking pixel', async ({ page }) => {
			await page.waitForLoadState('load')

			const pixel = await page.getByTestId('tracking-pixel')
			expect(pixel).not.toBeNull()
		})
	})
})

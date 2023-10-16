import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { mainNav } from '../../src/site-config.js';

test.describe('user navigates site with header', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');

		// make sure that animations run immediately
		await page.evaluate(() => {
			document.documentElement.style.setProperty('--transition-speed', '0s');
		});
	});

	test('a11y', async ({ page }) => {
		// https://github.com/dequelabs/axe-core-npm/issues/601
		// @ts-ignore
    const accessibilityScanResults = await new AxeBuilder.default({ page }).include('#site-header').analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

	test.describe('left hand drawer', () => {
		test('user tabs tabs through drawer contents', async ({ page }) => {
			const leftDrawer = await page.getByTestId('left-drawer')

			// `.toBeVisible()` won't work here, it IS there, just off screen
			await expect(leftDrawer).toHaveCSS('inset-inline-start', '-320px');

			await page.keyboard.press('Tab');
			await expect(leftDrawer).toHaveCSS('inset-inline-start', '0px');

			for (const _link of await leftDrawer.getByRole('link').all()) {
				await page.keyboard.press('Tab');
			}
			await expect(leftDrawer).toHaveCSS('inset-inline-start', '-320px');
		});
	})

	test.describe('at a small screen size', () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize({
				height: 812,
				width: 375
			});
		})

		test.describe('items not in right drawer', () => {
			test('appear and tab navigate correctly', async ({ page }) => {
				const logo = await page.getByTitle('homepage')
				const navicon = await page.locator('.navicon:visible')

				await logo.focus()
				await page.keyboard.press('Tab')

				await expect(navicon).toBeFocused()
				await page.keyboard.press('Tab')

				// make sure it skips the drawer content
				await expect(page.locator('#content a').first()).toBeFocused()
			})
		})

		test.describe('items in right drawer', () => {
			test('appear and tab navigate correctly', async ({ page }) => {
				const navicon = await page.locator('.navicon:visible')

				await navicon.click()

				// quick check to make sure focus-trap works
				await page.keyboard.press('Shift+Tab')
				await page.keyboard.press('Tab')
				await expect(navicon).toBeFocused()

				// make sure nav "in" the drawer
				await page.keyboard.press('Tab')
				await expect(page.getByRole('link', { name: mainNav[0].name })).toBeFocused()
			})
		})
	})

	test.describe('at a large screen size', () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize({
				height: 810,
				width: 1080
			});
		})

		test.describe('items not in right drawer', () => {
			test('appear and tab navigate correctly', async ({ page }) => {
				const logo = await page.getByTitle('homepage')
				const navicon = await page.locator('.navicon:visible')

				await logo.focus()
				await page.keyboard.press('Tab')

				// make sure user can tab through entire nav and get to the end
				mainNav.forEach(async ({ name }) => {
					await expect(page.getByRole('link', { name: name })).toBeFocused()
					await page.keyboard.press('Tab')
				})

				await expect(navicon).toBeFocused()
				await page.keyboard.press('Tab')

				// make sure it skips the drawer content
				await expect(page.locator('#content a').first()).toBeFocused()
			})
		})

		test.describe('items in right drawer', () => {
			test('appear and tab navigate correctly', async ({ page }) => {
				const navicon = await page.locator('.navicon:visible')

				await navicon.click()

				// quick check to make sure focus-trap works
				await page.keyboard.press('Shift+Tab')
				await page.keyboard.press('Tab')
				await expect(navicon).toBeFocused()

				// make sure nav is not "in" the drawer
				await page.keyboard.press('Tab')
				await expect(page.getByRole('link', { name: mainNav[0].name })).not.toBeFocused()
			})
		})
	})
})
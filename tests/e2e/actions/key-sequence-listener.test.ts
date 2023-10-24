import { expect, test } from '@playwright/test'

import keySequenceListener from '../../../src/actions/key-sequence-listener.ts'

test.describe('keySequenceListener()', () => {
	let messages: string[] = []

	test.beforeEach(async ({ page }) => {
		messages = []

		await page.evaluate(
			"document.getElementsByTagName('body')[0].setAttribute('data-testid', 'element')"
		)

		const sequence = ['a', 'b', 'c']

		function onMatch(sequenceIndex: number) {
			console.log(`onMatch - ${sequence[sequenceIndex]}`)
		}

		function onMismatch() {
			console.error(`misMatch`)
		}

		function onComplete() {
			console.info('onComplete')
		}

		await page.evaluate(`
      const keySequenceListener = ${keySequenceListener.toString()}
      const sequence = ${JSON.stringify(sequence)}
      keySequenceListener(document.getElementsByTagName('body')[0], {
        sequence: sequence,
        onMatch: ${onMatch.toString()},
        onMismatch: ${onMismatch.toString()},
        onComplete: ${onComplete.toString()}
      })
    `)

		page.on('console', (message) => {
			const text = message.text()
			const type = message.type()

			if (type === 'info') {
				messages = ['sequence complete']
			} else if (type === 'error') {
				messages = []
			} else {
				messages.push(text)
			}
		})
	})

	test.describe('when the key is not in the sequence', () => {
		test('does nothing', () => {
			expect(messages).toEqual([])
		})
	})

	test.describe('when the first key is in the sequence...', () => {
		test.beforeEach(async ({ page }) => {
			await page.keyboard.type('a')
		})

		test('it add it to the sequence', () => {
			expect(messages).toEqual(['onMatch - a'])
		})

		test.describe('...but the second is not', () => {
			test.beforeEach(async ({ page }) => {
				await page.keyboard.type('f')
			})

			test('it resets', () => {
				expect(messages).toEqual([])
			})
		})

		test.describe('...and so it the second', () => {
			test.beforeEach(async ({ page }) => {
				await page.keyboard.type('b')
			})

			test('it resets', () => {
				expect(messages).toEqual(['onMatch - a', 'onMatch - b'])
			})
		})
	})

	test.describe('when the sequence is complete', () => {
		test.beforeEach(async ({ page }) => {
			await page.keyboard.type('a')
			await page.keyboard.type('b')
			await page.keyboard.type('c')
		})

		test('it resets', () => {
			expect(messages).toEqual(['sequence complete'])
		})
	})
})

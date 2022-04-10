import { expect, test } from 'vitest'

/**
 * @vitest-environment jsdom
 */

 test('use jsdom in this test file', () => {
  const element = document.createElement('div')
  expect(element).not.toBeNull()
})

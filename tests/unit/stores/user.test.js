import { tick } from 'svelte'
import { get } from 'svelte/store'

import user, { defaultData } from '$stores/user.js'

/**
 * @vitest-environment jsdom
 */

describe('$user', () => {
  test('it has default values', () => {
    expect(get(user)).toEqual(defaultData)
  })

  describe('syncing with local storage', () => {
    beforeEach(() => {
      Storage.prototype.setItem = vi.fn()
      user.set({ 'some-arbitrary-key': 'some-arbitrary-value' })
    })

    test('it has them', async () => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith('user', JSON.stringify({ 'some-arbitrary-key': 'some-arbitrary-value' }))
    })
  })
})

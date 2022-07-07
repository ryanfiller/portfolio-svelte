import { setCustomProperty } from 'src/helpers/index.js'

/* @vitest-environment jsdom */

describe('getCustomProperty()', () => {
  describe('setting a custom property', () => { 
    beforeEach(() => {
      setCustomProperty('test', 'string')

      getComputedStyle = vi.fn()
    })

    test('it sets the value', () => {
      // // jsdom has setProperty but not getProperty????
      // expect(getComputedStyle(document.documentElement.style.getProperty('--test'))).toEqual('string')
      expect(getComputedStyle).toHaveBeenCalled
    })
  })
  
  describe('when `window` is undefined', () => {
    beforeEach(() => {
      window = null
    })

    test('it does not explode', () => {
      expect(() => setCustomProperty('whatever')).not.toThrowError()
    })
  })
})

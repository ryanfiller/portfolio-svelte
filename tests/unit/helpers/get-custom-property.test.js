import { getCustomProperty } from 'src/helpers/index.js'

/* @vitest-environment jsdom */

describe('getCustomProperty()', () => {
  describe('getting a custom property', () => { 
    beforeEach(() => {
      document.documentElement.style.setProperty('--test', 'string')
    })

    describe('when the property exists', () => { 
      test('it gets the value', () => {
        expect(getCustomProperty('test')).toEqual('string')
      })
    })

    describe('when the property does not exist', () => {   
      test('it returns and empty string', () => {
        expect(getCustomProperty('nope')).toEqual('')
      })
    })
  })
  
  describe('when `window` is undefined', () => {
    beforeEach(() => {
      window = null
    })

    test('it does not explode', () => {
      expect(getCustomProperty('whatever')).toEqual('')
    })
  })
})

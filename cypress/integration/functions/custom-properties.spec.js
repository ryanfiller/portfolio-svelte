import { getCustomProperty, setCustomProperty, } from '../../../src/helpers/'

describe('getCustomProperty()', () => {
  // it('gets', () => { ... })
  
  it('does not blow up when `window` is undefined', () => {
    const result = getCustomProperty('whatever')
    expect(result).to.eq('')  
  })
})

describe('setCustomProperty()', () => {
  // it('sets', () => { ... })
  
  it('does not blow up when `window` is undefined', () => {
    const result = setCustomProperty('whatever')
    expect(result).to.eq(undefined)
  })
})
import { getCustomProperty, setCustomProperty, } from '../../../src/helpers/'

context('getCustomProperty()', () => {
  // it('gets', () => { ... })
  
  it('does not blow up when `window` is undefined', () => {
    const result = getCustomProperty('whatever')
    expect(result).to.eq('')  
  })
})

context('setCustomProperty()', () => {
  // it('sets', () => { ... })
  
  it('does not blow up when `window` is undefined', () => {
    const result = setCustomProperty('whatever')
    expect(result).to.eq(undefined)
  })
})
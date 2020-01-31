import { fishAttr } from '../../../src/helpers/'

context('fishAttr()', () => {
  const string = '<img src="logo.png" alt="logo" />'

  it('returns a data attribute from a DOM string',() => {
    const result = fishAttr(string, 'src')
    expect(result).to.eq('logo.png')
  })

  it('returns and empty string if the attribute does not exist',() => {
    const result = fishAttr(string, 'title')
    expect(result).to.eq('')
  })
})

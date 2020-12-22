import { fishAttr } from '../../../src/helpers/'

describe('fishAttr()', () => {
  const string = `<img src="logo.png" title='okay' alt="logo" />`

  it('returns a data attribute from a DOM string with double quotes', () => {
    const result = fishAttr(string, 'src', true)
    expect(result).to.eq('logo.png')
  })

  it('returns a data attribute from a DOM string with single quotes', () => {
    const result = fishAttr(string, 'title', true)
    expect(result).to.eq('okay')
  })

  it('returns and nothing if the attribute does not exist', () => {
    const result = fishAttr(string, 'whatever', true)
    expect(result).to.eq(null)
  })
})

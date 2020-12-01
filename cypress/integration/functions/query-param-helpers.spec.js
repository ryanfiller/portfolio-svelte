import { objectToParams, paramsToObject } from '../../../src/helpers/'

const object = {
  'one fish': 'two fish',
  'red fish': 'blue fish',
  specialCharacters: '& % + ,'
}

const string = 'one+fish=two+fish&red+fish=blue+fish&specialCharacters=%26+%25+%2B+%2C'

describe('objectToParams()', () => {
  it('returns a valid url string', () => {
    const result = objectToParams(object)
    expect(result).to.eq(string)
  })
})

describe('paramsToObject()', () => {
  it('decodes a query string into an object', () => {
    const result = paramsToObject(string)
    expect(result).to.deep.equal(object)
  })
})

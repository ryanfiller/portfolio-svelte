import {
  getCustomProperty,
  setCustomProperty,
  fishAttr,
  objectToParams,
  paramsToObject,
  slugify
} from '../../src/helpers/'

describe('helper functions', () => {
  describe('custom properties', () => {
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
  })

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

  describe('query params functions', () => {
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
  })

  describe('slugify()',() => {
    it('return lowercase',() => {
      const result = slugify('CAPSLOCK')
      expect(result).to.eq('capslock')
    })

    it('should replace spaces with -',() => {
      const result = slugify('this has spaces')
      expect(result).to.eq('this-has-spaces')
    })

    it('should remove all non-word chars',() => {
      const result = slugify('100%!')
      expect(result).to.eq('100')
    })

    it('should replace multiple - with single -',() => {
      const result = slugify('bem--is--awesome')
      expect(result).to.eq('bem-is-awesome')
    })

    it('should trim - from start of text',() => {
      const result = slugify(' frontspace')
      expect(result).to.eq('frontspace')
    })

    it('should trim - from end of text',() => {
      const result = slugify('backspace ')
      expect(result).to.eq('backspace')
    })
  })
})
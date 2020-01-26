import {
  slugify,
  fishAttr
} from '../helpers'

describe('slugify()',() => {
  it('return lowercase',() => {
    const result = slugify('CAPSLOCK')
    expect(result).toEqual('capslock')
  })

  it('should replace spaces with -',() => {
    const result = slugify('this has spaces')
    expect(result).toEqual('this-has-spaces')
  })

  it('should remove all non-word chars',() => {
    const result = slugify('100%!')
    expect(result).toEqual('100')
  })

  it('should replace multiple - with single -',() => {
    const result = slugify('bem--is--awesome')
    expect(result).toEqual('bem-is-awesome')
  })

  it('should trim - from start of text',() => {
    const result = slugify(' fontspace')
    expect(result).toEqual('fontspace')
  })

  it('should trim - from end of text',() => {
    const result = slugify('backspace ')
    expect(result).toEqual('backspace')
  })
})

describe('fishAttr()',() => {
  const string = '<img src="logo.png" alt="logo" />'

  it('should match a data attribute from a DOM string',() => {
    const result = fishAttr(string, 'src')
    expect(result).toEqual('logo.png')
  })

  it('should return and empty string if the attribute does not exist',() => {
    const result = fishAttr(string, 'title')
    expect(result).toEqual('')
  })
})
import { slugify } from '../../../src/helpers'

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
    const result = slugify(' fontspace')
    expect(result).to.eq('fontspace')
  })

  it('should trim - from end of text',() => {
    const result = slugify('backspace ')
    expect(result).to.eq('backspace')
  })
})
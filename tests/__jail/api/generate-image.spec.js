import { objectToParams } from '../../../src/helpers'

describe('/generate-image route', () => {

  // TODO test cloudinary API calls here

    // it fetches to cloudinary

    // it returns the url for an image that exists

    // it calls the screenshot and then posts to cloudinary again
    // it returns a url for the new image
  
  const params =  objectToParams({
    title: 'test title',
    excerpt: 'short excerpt',
    categories: ['one fish', 'two fish'],
    tags: ['red fish', 'blue fish'],
    imageSrc: '/placeholders/jpeg.jpg',
    imageCredit: 'ollie!',
    url: 'www.ryanfiller.com'
  })

  it('renders correctly', () => {
    cy.visit(`/generate-image?${params}`)
    cy.matchImageSnapshot()
  })
})
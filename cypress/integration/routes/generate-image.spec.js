import { objectToParams } from '../../../src/helpers'

describe('/generate-image route', () => {
  
  const params =  objectToParams({
    title: 'test title',
    excerpt: 'short excerpt',
    categories: ['one fish', 'two fish'],
    tags: ['red fish', 'blue fish'],
    imageSrc: '/images/site-assets/placeholders/jpeg.jpg',
    imageCredit: 'ollie!',
    url: 'www.ryanfiller.com'
  })

  it('renders correctly', () => {
    cy.visit(`/generate-image?${params}`)
    cy.matchImageSnapshot()
  })
})
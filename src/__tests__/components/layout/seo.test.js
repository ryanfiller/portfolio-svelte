import React from 'react'
import * as Gatsby from 'gatsby';
import Helmet from 'react-helmet' // https://github.com/nfl/react-helmet/issues/381

import SEO from '../../../components/layout/seo'

describe('<SEO />', () => {
  const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
  useStaticQuery.mockImplementation(() => ({
    site: {
      siteMetadata: {
        title: 'site title',
        author: 'site author',
        about: 'site descritpion',
      },
    },
  }))

  const props = () => ({
    frontmatter: {
      title: null,
      meta: {
        excerpt: null,
        categories: null,
        tags: null
      }
    },
    excerpt: null
  })

  describe('defaults', () => {
    it('should render site defaults when no props are passed', () => {
      mount(<SEO />)
      const title = Helmet.peek().title
      expect(title).toEqual('site title | Page Not Found')
      const meta = Helmet.peek().metaTags
      expect(meta).toEqual([ 
        { name: 'author', content: 'site author' },
        { name: 'description', content: 'site descritpion' },
        { name: 'keywords', content: '' } 
      ])
    })
  
    it('should render the generated page excerpt if there is one', () => {
      mount(<SEO {...props()} excerpt='generated excerpt' />)
      const meta = Helmet.peek().metaTags
      expect(meta).toEqual([ 
        { name: 'author', content: 'site author' },
        { name: 'description', content: 'generated excerpt' },
        { name: 'keywords', content: '' } 
      ])
    })
  })

  describe('when there is page data', () => {
    const propsWithFrontmatter = () => ({
      frontmatter: {
        title: 'frontmatter title',
        meta: {
          excerpt: 'frontmatter excerpt',
          categories: null,
          tags: null
        }
      }
    })

    it('should render content from the page frontmatter', () => {
      mount(<SEO {...propsWithFrontmatter()} />)
      const title = Helmet.peek().title
      expect(title).toEqual('site title | frontmatter title')
      const meta = Helmet.peek().metaTags
      expect(meta).toEqual([ 
        { name: 'author', content: 'site author' },
        { name: 'description', content: 'frontmatter excerpt' },
        { name: 'keywords', content: '' } 
      ])
    })

    it('should render only the site title on the homepage', () => {
      const props = propsWithFrontmatter()
      props.frontmatter.title = null
      mount(<SEO {...props} />)
      const title = Helmet.peek().title
      expect(title).toEqual('site title')
    })

    it('should render tags and categories as keywords', () => {
      const props = propsWithFrontmatter()
      props.frontmatter.meta.tags = ['tag1', 'tag2']
      props.frontmatter.meta.categories = ['category1', 'category2']
      mount(<SEO {...props} />)
      const meta = Helmet.peek().metaTags
      expect(meta).toEqual([ 
        { name: 'author', content: 'site author' },
        { name: 'description', content: 'frontmatter excerpt' },
        { name: 'keywords', content: 'category1, category2, tag1, tag2' } 
      ])
    })
  })
})
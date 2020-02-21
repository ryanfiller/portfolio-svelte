const siteMetadata = {
  title: 'ryanfiller.com',
  siteUrl: 'https://www.ryanfiller.com',
  author: '@ryanfiller_',
  headshot: 'https://www.ryanfiller.com/images/uploads/headshot_2017.jpg',
  description: 'The blog and portfolio of Ryan Filler',
  about: 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.'
}

module.exports = {
  siteMetadata: siteMetadata,

  plugins: [

    // SEO related plugins plugins
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap', 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ryanfiller.com',
        short_name: 'ryanfiller.com',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/images/gatsby-icon.png'
      }
    },

    // build related plugins
    'gatsby-plugin-netlify-cache',

    // CMS / content related plugins
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: true,
        enableIdentityWidget: false,
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },

    // data related plugins
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md', '.markdown'],
        defaultLayouts: {
          content: require.resolve('./src/components/layout/markdown.js')
        }
      }
    },

    // design / render related plugins
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false // to use BEM syntax
        },
        // data: `@import "${__dirname}/src/styles/styles";`,
      }
    },
    {
			resolve: 'gatsby-plugin-layout',
			options: {
        component: require.resolve('./src/components/layout/page')
      }
    },

    // syndication plugins
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          buildRSS({
            title: 'ryanblog',
            output: '/blog/code.rss.xml',
            contentType: 'blog',
            category: 'code',
            custom_elements: [
              {siteTitle: siteMetadata.title},
              {siteUrl: siteMetadata.siteUrl},
              {author: siteMetadata.author},
              {headshot: siteMetadata.headshot},
              {description: siteMetadata.description},
              {about: siteMetadata.about}
            ]
          })
        ],
      },
    },
  ]
}

// markdown to html converter
const marked = require('marked')

function buildRSS(config) {
  const {
    title,
    output,
    custom_elements,
    contentType,
    category
  } = config

  return {
    title,
    output,
    custom_elements,
    query: `
      {
        site {
          siteMetadata {
            siteUrl
          }
        },
        allMdx(
          limit: 12,
          filter: {
            fields: {contentType: { eq: "${contentType}" }},
            frontmatter: { options: { published: { eq: true } } meta: { categories: { in: "${category}" } } }
          },
          sort: { order: DESC, fields: [frontmatter___meta___date]},
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                meta {
                  excerpt
                  date
                  categories
                  tags
                }
              }
              generatedExcerpt: excerpt
              internal {
                content
              }
            }
          }
        }
      }
    `,
    serialize: ({query: {site, allMdx }}) => {
      const { siteUrl } = site.siteMetadata

      return allMdx.edges.map(edge => {
        const {
          frontmatter: {
            title,
            meta: {
              date,
              excerpt,
              categories,
              tags
            }
          },
          generatedExcerpt,
          internal: {
            content
          }
        } = edge.node

        // fix image urls
        const body = content.replace(/<img src="\//g, `<img src="${siteUrl}/`)

        const url = `${siteUrl}/${edge.node.fields.slug}`
        return {
          title,
          date,
          url,
          categories: [...categories, ...tags],
          guid: url,
          custom_elements: [
            {'excerpt': excerpt || generatedExcerpt},
            {'content:encoded': marked(body)}
          ],
        }
      })
    },
  }
}
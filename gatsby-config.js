module.exports = {
  siteMetadata: {
    title: 'ryanfiller.com',
    siteUrl: 'https://www.ryanfiller.com',
    author: '@ryanfiller_',
    headshot: 'https://www.ryanfiller.com/images/uploads/headshot_2017.jpg',
    description: 'The blog and porfolio of Ryan Filler',
    about: 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.'
  },

  // TODO? - look into this - https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-cache/

  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/images/gatsby-icon.png'
      }
    },

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
        // gatsbyRemarkPlugins: [],
      }
    },

    // design related plugins
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false // to use BEM syntax
        }
      }
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout/page-layout')
      }
    }
  ]
}

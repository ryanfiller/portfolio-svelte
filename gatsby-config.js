module.exports = {
  siteMetadata: {
    title: `ryanfiller.com`,
    siteUrl: `https://www.ryanfiller.com`,
    description: `The blog and porfolio for Ryan Filler.`,
    author: `@ryanfiller_`,
    headshot: `https://res.cloudinary.com/ryanfiller/image/upload/v1570907728/Screen_Shot_2019-04-12_at_8.27.48_AM_irt6b6.png`,
    about: `I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee.`
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },

    // data related plugins
    {
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `content`,
				path: `${__dirname}/src/content/`,
			},
		},
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
				extensions: [`.mdx`, `.md`, `.markdown`],
				defaultLayouts: {
          content: require.resolve(`./src/components/layout/markdown.js`),
				},
				// gatsbyRemarkPlugins: [],
      },
    },
    
    // client side related plugins
    {
			resolve: `gatsby-plugin-layout`,
			options: {
					component: require.resolve(`./src/components/layout/page-layout`)
			}
		},
  ],
}

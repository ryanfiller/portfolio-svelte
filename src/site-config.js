const siteUrl = 'https://www.ryanfiller.com'

export const meta = {
  title: 'ryanfiller.com',
  email: 'ryanfiller89@gmail.com',
  siteUrl: siteUrl,
  author: '@ryanfiller_',
  headshot: `${siteUrl}/images/site-assets/headshot_2017.jpg`,
  description: 'The blog and portfolio of Ryan Filler',
  about: 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.'
}

const mainNav = [
  // {
  //   name: 'about',
  //   url: 'about'
  // },
  {
    name: 'blog',
    url: 'blog'
  },
  // {
  //   name: 'portfolio',
  // },
  // {
  // 	name: 'r&d',
  // 	url: 'lab'
  // },
  // {
  //   name: 'contact',
  //   url: '#contact'
  // },
]

const secondaryNav = [
  {
    name: 'changelog',
    url: 'changes'
  },
  {
    name: 'styles',
    url: 'styles'
  },
  {
    name: 'analytics',
    url: 'https://ryanfiller.goatcounter.com/',
    external: true
  }
]

export { mainNav, secondaryNav }

export const forms = {
  'contact': {
    name: 'contact',
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        required: true,
      },
      {
        name: 'message',
        type: 'textarea',
        required: true,
        placeholder: 'Message...',
      }
    ]
  }
}
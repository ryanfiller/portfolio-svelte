const siteUrl = 'https://www.ryanfiller.com'

export const meta = {
  title: 'ryanfiller.com',
  email: 'ryanfiller89@gmail.com',
  siteUrl: siteUrl,
  author: '@ryanfiller_',
  headshot: `${siteUrl}/images/site-assets/headshot_2017.jpg`,
  description: 'The blog and portfolio of Ryan Filler',
  about: 'I am a designer, developer, illustrator, and maker living and working in Memphis, Tennessee. This is my blog and portfolio.',
  keywords: [
    'ryan filler',
    'ryanfiller',
    'memphis',
    'frontend',
    'css',
    'javascript',
    'svelte', 
  ]
}

export const mainNav = [
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

export const secondaryNav = [
  {
    name: 'changelog',
    url: 'changes'
  },
  {
    name: 'styles',
    url: 'styles'
  },
  // {
  //   name: 'analytics',
  //   url: 'https://ryanfiller.goatcounter.com/',
  //   external: true
  // }
]

export const socialLinks = [
  {
    name: 'email',
    url: './#contact',
    color: '#bb001b',
    text: 'Email',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/ryanfiller_',
    color: '#1DA1F2',
    text: 'Twitter',
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/ryanfiller_/',
    color: '#e1306c',
    text: 'Instagram',
  },
  // {
  //   name: 'linkedin',
  //   url: 'https://www.linkedin.com/in/ryanfiller',
  //   color: '#0a66c2',
  //   text: 'LinkedIn',
  // },
  {
    name: 'github',
    url: 'https://github.com/ryanfiller',
    color: '#0366d6',
    text: 'GitHub',
  },
  {
    name: 'codepen',
    url: 'https://codepen.io/ryanfiller',
    color: '#ffdd40',
    text: 'CodePen',
  },
  // {
  //   name: 'pokemongo',
  //   url: '#',
  //   color: '#ff0000',
  //   text: 'PokemonGO',
  // },
]

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
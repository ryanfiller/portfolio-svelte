export const sapper = {
  generateJson: [
    {
      text: 'blog/[slug].md',
      type: 'file',
      image: 'markdown',
      multi: true
    },
    {
      text: '<code>fs</code> & <code>unified()</code>',
      type: 'transform',
      path: 'double-out',
    },
    [
      {
        text: 'blog/index.json',
        type: 'file',
        image: 'json',
      },
      {
        text: 'blog/[slug].json',
        type: 'file',
        image: 'json',
        multi: true
      }
    ]
  ],

  generateComponent: [
    {
      text: 'browser visit',
      type: 'browser'
    },
    {
      text: '<code>request blog/post</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: '<code>fetch(`post.json`)</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.json',
      type: 'file',
      image: 'json'
    },
    {
      text: '<code>preload(){<br /><span style="display: inline-block; width: 2ch;"></span>return data<br />}</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.html',
      type: 'file',
      image: 'html'
    }
  ],

  export: [
    {
      text: 'blog/[slug].md',
      type: 'file',
      image: 'markdown',
      multi: true
    },
    {
      text: '<code>npm run sapper export</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].hmtl',
      type: 'file',
      image: 'html',
      multi: true
    }
  ],

  layouts: [
    {
      text: 'blog/_layout.svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: '<code>&#60;slot /&#62;</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].svelte',
      type: 'file',
      image: 'svelte',
      multi: true
    },
    {
      text: '<code>svelte.compile()</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].html',
      type: 'file',
      image: 'html',
      multi: true
    },
  ],

  synthesizeJson: [
    [
      {
        text: 'blog/post.md',
        type: 'file',
        image: 'markdown'
      },
      {
        text: 'blog/series.json',
        type: 'file',
        image: 'json'
      }
    ],
    {
      text: '<code>fs</code> & <code>unified()</code>',
      type: 'transform',
      path: 'double-in',
    },
    {
      text: 'blog/post.json',
      type: 'file',
      image: 'json'
    },
    {
      text: '<code>npm run sapper export</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.svelte',
      type: 'file',
      image: 'svelte'
    }
  ],

  multipleFetch: [
    {
      text: 'blog/post.svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: '<code>fetch(`post.json`)<br/>fetch(`series.json`)</code>',
      type: 'transform',
      path: 'double-out',
    },
    [
      {
        text: 'blog/post.json',
        type: 'file',
        image: 'json'
      },
      {
        text: 'blog/series.json',
        type: 'file',
        image: 'json'
      },
    ],
    {
      text: '<code>preload(){<br /><span style="display: inline-block; width: 2ch;"></span>return data<br />}</code>',
      type: 'transform',
      path: 'double-in',
    },
    {
      text: 'blog/post.svelte',
      type: 'file',
      image: 'svelte'
    }
  ]
}

export const mdsvex = {
  preprocess: [
    {
      text: 'blog/[slug].md',
      type: 'file',
      image: 'markdown',
      multi: true
    },
    {
      text: '<code>svelte.preprocess([<br /><span style="display: inline-block; width: 2ch;"></span>mdsvex()<br />])</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].svelte',
      type: 'file',
      image: 'svelte',
      multi: true
    },
    {
      text: '<code>npm run sapper export</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].html',
      type: 'file',
      image: 'html',
      multi: true
    }
  ],

  compile: [
    {
      text: 'blog/post.md',
      type: 'file',
      image: 'markdown',
    },
    {
      text: '<code>mdsvex.compile()</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: '{frontmatter}',
      type: 'file',
      image: 'json',
    },
    {
      text: '<code>$$props</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'template.svelte',
      type: 'file',
      image: 'svelte',
    },
    {
      text: '<code>&#60;slot /&#62;</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.svelte',
      type: 'file',
      image: 'svelte'
    },
  ],

  export: [
    {
      text: 'blog/[slug].md',
      type: 'file',
      image: 'markdown',
      multi: true
    },
    {
      text: '<code>npm run sapper export</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].svelte',
      type: 'file',
      image: 'svelte',
      multi: true
    },
    {
      text: '<code>svelte.compile()</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].html',
      type: 'file',
      image: 'html',
      multi: true
    },
  ],

  onMount: [
    {
      text: 'blog/post.svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: 'render',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.html',
      type: 'file',
      image: 'html'
    },
    {
      text: '<code>onMount(){<br /><span style="display: inline-block; width: 2ch;"></span>() => fetch()<br />}</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/series.json',
      type: 'file',
      image: 'json'
    },
    {
      text: 'render again',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/post.html',
      type: 'file',
      image: 'html'
    }
  ]
}

export const combined = {
  outline: [
    {
      text: 'browser visit',
      type: 'browser'
    },
    {
      text: '<code>request blog/[slug]</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: '<code>preload()</code>',
      type: 'transform',
      path: 'double-out',
    },
    [
      {
        text: 'blog/[slug].json',
        type: 'file',
        image: 'json'
      },
      {
        text: 'blog/[slug].md',
        type: 'file',
        image: 'markdown'
      },
    ],
    {
      text: 'server side render',
      type: 'transform',
      path: 'double-in',
    },
    {
      text: 'blog/[slug].html',
      type: 'file',
      image: 'html'
    }
  ],
  svelteComponent: [
    {
      text: 'blog/page.svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: '<code>svelte.compile()</code>',
      type: 'transform',
      path: 'double-out',
    },
    [
      {
        text: '<code>function render()</code>',
        type: 'text',
      },
      {
        text: '<code>class Page</code>',
        type: 'text',
      },
    ],
    {
      text: '<code>&#60;svelte:component /&#62;</code>',
      type: 'transform',
      path: 'double-in',
    },
    {
      text: 'client <br/> hydration',
      type: 'browser'
    },
  ],

  final: [
    [
      {
        text: 'blog/[slug].md',
        type: 'file',
        image: 'markdown',
        multi: true
      },
      {
        text: 'blog/[series].json',
        type: 'file',
        image: 'json',
        multi: true
      },
    ],
    {
      text: '<code>npm run export</code>',
      type: 'transform',
      path: 'double-in',
    },
    {
      text: 'template.svelte',
      type: 'file',
      image: 'svelte'
    },
    {
      text: '<code>&#60;slot /&#62;</code>',
      type: 'transform',
      path: 'single',
    },
    {
      text: 'blog/[slug].svelte',
      type: 'file',
      image: 'svelte',
      multi: true
    },
    {
      text: '<code>preload()</code>',
      type: 'transform',
      path: 'double-out',
    },
    [
      {
        text: 'blog/[slug].json',
        type: 'file',
        image: 'json'
      },
      {
        text: 'blog/[slug].md',
        type: 'file',
        image: 'markdown'
      },
    ],
    {
      text: 'server side render',
      type: 'transform',
      path: 'double-in',
    },
    {
      text: 'blog/[slug].html',
      type: 'file',
      image: 'html',
      multi: true
    }
  ]
}
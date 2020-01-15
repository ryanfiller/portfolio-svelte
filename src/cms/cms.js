import CMS from 'netlify-cms-app'

// collection field partials
import { blog } from './fields/blog'

// editor components
import image from './editor/image'

// editor components
CMS.registerEditorComponent(image);

CMS.init({
  config: {
    site_url: 'https://ryanfiller.com',
    load_config_file: false,
    publish_mode: 'editorial_workflow',
    backend: {
      name: 'git-gateway',
      identity_url: 'https://www.ryanfiller.com/.netlify/identity',
      gateway_url: 'https://www.ryanfiller.com/.netlify/git/github',
      repo: 'ryanfiller/portfolio-gatsby-v2',
      branch: 'master',
      squash_merges: true,
      use_large_media_transforms_in_media_library: true,
    },
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    collections: [
      blog
    ]
  },
});
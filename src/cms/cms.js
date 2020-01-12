import CMS from 'netlify-cms-app'

// collection field partials
import { blog } from './fields/blog'

// editor components
import image from './editor/image'

// editor components
CMS.registerEditorComponent(image);

CMS.init({
  config: {
    load_config_file: false,
    backend: {
      name: 'git-gateway',
      use_large_media_transforms_in_media_library: false,
      repo: 'ryanfiller/portfolio-gatsby-v2',
      branch: 'master',
      squash_merges: true,
    },
    media_folder: 'static/images/uploads',
    public_folder: '/images',
    collections: [
      blog
    ]
  },
});
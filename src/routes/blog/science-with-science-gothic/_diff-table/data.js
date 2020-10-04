// data, in seconds
// First Meaningful Paint
// Time to Interaction
// Max Potential First Input Delay

const control = {
  title: 'control',
  caption: '',
  data: {
    'control': {
      scores: [
        0.80,
        1.80,
        0.13
      ]
    }
  }
}

const location = {
  title: 'location',
  caption: 'values compared to control',
  data: {
    'external CDN': {
      diff: control.data.control,
      scores: [
        0.84, // (+5.00%)
        2.18, // (+21.11%)
        0.14 // (+7.69%)
      ]
    },
    'src folder': {
      diff: control.data.control,
      scores: [
        0.80,
        2.04, // (+13.33%)
        0.12 // (-7.69%)
      ]
    },
    'static folder': {
      diff: control.data.control,
      scores: [
        0.80,
        2.02, // (+12.22%
        0.13
      ]
    }
  }
}

const plugin = {
  title: 'gatsby-plugin-preload-fonts',
  caption: 'values compared to speeds without `gatsby-plugin-preload-fonts`',
  data: {
    'external CDN': {
      diff: location.data['external CDN'],
      scores: [
        0.80, // (-4.76%)
        2.16, // (-0.92%)
        0.11 // (-21.42%)
      ]
    },
    'src folder': {
      diff: location.data['src folder'],
      scores: [
        0.80,
        5.06, // (+148.03%)
        0.16 // (+33.33%)
      ]
    },
    'static folder': {
      diff: location.data['static folder'],
      scores: [
        0.80,
        5.00, // (+147.52%)
        0.16 // (+23.08%)
      ]
    }
  }
}

const preload = {
  title: 'preload',
  caption: 'compared to fonts without `rel="preload"`',
  data: {
    'src folder': {
      diff: location.data['static folder'],
      scores: [
        0.86, // (+7.50%)
        0.84, // (+5.00%)
        2.00 // (-4.63%)
      ]
    },
    'static folder': {
      diff: location.data['static folder'],
      scores: [
        1.18, // (-41.58%)
        0.14, // (+16.66%)
        0.13
      ]
    }
  }
}

const encoded = {
  title: 'base54',
  caption: 'values compared to control',
  data: {
    'base64 encoded': {
      diff: control.data.control,
      scores: [
        5.55, // (+593.75%)
        5.95, // (+230.56%)
        1.20 // (+823.08%)
      ]
    }
  }
}

export default {
  control,
  location,
  plugin,
  preload,
  encoded
}
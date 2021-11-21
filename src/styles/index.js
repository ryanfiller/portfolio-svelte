export const colors = {
  // https://www.comiclink.com/img/comics/scans/RADB3E84201959_16201.jpg
  black: '#080025',
  white: '#fefdf2',
  purpleLight: '#a176b6',
  purpleDark: '#5651a7',
  blueLight: '#4f81c0',
  blueDark: '#155f91',
  orangeLight: '#f16a1f',
  orangeDark: '#ac284f',
  grayLight: '#5e828f',
  grayDark: '#4e6773',

  // // gabby
  // black: '#1e1638',
  // white: '#fffefa',
  // purple: '#7735c9',
  // blue: '#0d63c9',
  // orange: '#f54e6b',
  // gray: '#9892a3',
}

export const themes = {
  light: {
    text: 'black',
    background: 'white',
    primary: 'purpleDark',
    highlight: 'blueDark',
    active: 'orangeLight',
    disabled: 'grayLight',
  },
  dark: {
    text: 'white',
    background: 'black',
    primary: 'purpleDark',
    highlight: 'orangeDark',
    active: 'blueLight',
    disabled: 'grayDark',
  }
}

export const fonts = {
  LabDJR: {
    name: 'LabDJR',
    url: 'https://djr.com/lab-variable/',
    options: {
      BEVL: [1, 1000],
      OVAL: [1, 1000],
      QUAD: [1, 1000],
      SIZE: [1, 1000]
    }
  },

  Barlow: {
    name: 'Barlow',
    url: 'https://tribby.com/fonts/barlow/',
      options: {
      wght: [22, 188],
      wdth: [300, 500]
    }
  },

  Recursive: {
    name: 'Recursive',
    url: 'https://www.recursive.design/',
      options: {
      MONO: [0, 1],
      CASL: [0, 1],
      wght: [0, 1000],
      slnt: [-15, 0],
      ital: [0, 1]
    }
  }
}

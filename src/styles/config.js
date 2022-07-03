// http://ecoiron.blogspot.com/2007/01/emergy-c-low-wattage-palette.html

const emergyc = {
  // #822007 (rusty red)
  // #000000 (black)
  // #b2bbc0 (blue grey)
  // #19472a (forest green)
  // #3d414c (cobalt)
  // #ffffff (white)
}

export const colors = {
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

  // light: {
  //   text: 'black',
  //   background: 'white',
  //   primary: 'purpleDark',
  //   highlight: 'blueDark',
  //   active: 'orangeLight',
  //   disabled: 'grayLight',
  // },
  // dark: {
  //   text: 'white',
  //   background: 'black',
  //   primary: 'purpleDark',
  //   highlight: 'orangeDark',
  //   active: 'blueLight',
  //   disabled: 'grayDark',
  // }
}

export const fonts = {
  plex: {
    name: 'IBM Plex',
    url: 'https://www.ibm.com/plex/',
      options: {
      wght: [100, 700],
      wdth: [85, 100]
    }
  },

  'science-gothic': {
    name: 'Science Gothic',
    url: 'https://github.com/tphinney/science-gothic',
    options: {
      wght: [100, 900],
      wdth: [50, 200],
      YOPQ: [18, 122]
    }
  },

  fira: {
    name: 'Fira Code',
    url: 'https://github.com/tonsky/FiraCode',
      options: {
      wght: [300, 700]
    }
  }
}

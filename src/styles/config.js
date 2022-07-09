// TODO - uninstall this when lab doesn't need to be polyfilled - https://caniuse.com/?search=lab
import simpleColorConverter from 'simple-color-converter'

// // http://ecoiron.blogspot.com/2007/01/emergy-c-low-wattage-palette.html

// const emergyc = {
//   // #822007 (rusty red)
//   // #000000 (black)
//   // #b2bbc0 (blue grey)
//   // #19472a (forest green)
//   // #3d414c (cobalt)
//   // #ffffff (white)
// }

function toRGB(lab) {
  const rgb = new simpleColorConverter({ lab: lab.match(/\((.*)\)/)[1].split(' '),  to: 'rgb' }).color
  return `rgb(${Object.values(rgb).join(', ')})`
}

// #2b2325
// #fcf9f9
// #5d1b59
// #66468d
// #c9756e
// #3a514d

export const colors = {
  // black: toRGB('lab(80% 50 20)'),
  // black: '#080025',
  black: toRGB('lab(27.115149002% 25.488584094 -56.880795224)'),
  // white: '#fefdf2',
  white: toRGB('lab(99.116401868% -1.547081687 5.363147871)'),
  // purpleLight: '#a176b6',
  purpleLight: toRGB('lab(55.998909291% 28.648345994 -27.346114229)'),
  // purpleDark: '#5651a7',
  purpleDark: toRGB('lab(38.99031684% 25.483171062 -45.865170567)'),
  // blueLight: '#4f81c0',
  blueLight: toRGB('lab(53.133470141% 2.297925342 -38.002088257)'),
  // blueDark: '#155f91',
  blueDark: toRGB('lab(38.530292708% -2.903051643 -33.605656494)'),
  // orangeLight: '#f16a1f',
  orangeLight: toRGB('lab(60.876623062% 48.494427528 62.298333674)'),
  // orangeDark: '#ac284f',
  orangeDark: toRGB('lab(68.23720446093131% -4.912448868378105 -34.44018627199876)'),
  // grayLight: '#5e828f',
  grayLight: toRGB('lab(52.206176929% -9.237319214 -11.06041308)'),
  // grayDark: '#4e6773',
  grayDark: toRGB('lab(42.08957089% -6.085831148 -9.731808143)'),
}

Object.values(colors).forEach(color => {
  const { l, a, b } = new simpleColorConverter({
    color: color, 
    to: 'lab'
  }).color

  console.log(`lab(${l}% ${a} ${b})`)
})

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

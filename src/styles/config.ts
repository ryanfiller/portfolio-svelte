export type Fonts = {
  [key: string]: Font
}

export type Font = {
  url: string,
  options: {
    [key: string]: [number, number]
  }
}

export const fonts: Fonts = {  
  // headers fonts

  'Science Gothic': {
    url: 'https://github.com/tphinney/science-gothic',
    options: {
      wght: [100, 900],
      wdth: [50, 200],
      YOPQ: [18, 122]
    }
  },

  'Fraunces': {
    url: 'https://fraunces.undercase.xyz/',
    options: {
      SOFT: [0, 100],
      wght: [100, 900],
      WONK: [0, 1],
      opsz: [9, 144]
    }
  },
  
  // body fonts

  'Inter': {
    url: 'https://rsms.me/inter/',
    options: {
      wght: [100, 900],
      slnt: [-10, 0]
    }
  },

  'IBM Plex': {
    url: 'https://www.ibm.com/plex/',
    options: {
      wght: [100, 700],
      wdth: [85, 100]
    }
  },

  // code fonts

  'Recursive': {
    url: 'https://www.recursive.design/',
    options: {
      MONO: [0, 1],
      CASL: [0, 1],
      wght: [300, 1000],
      slnt: [-15, 0],
      CRSV: [0, 1]
    }
  },

  'Fira Code': {
    url: 'https://github.com/tonsky/FiraCode',
    options: {
      wght: [300, 700]
    }
  }
}

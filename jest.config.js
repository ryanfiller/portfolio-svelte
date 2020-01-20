module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': '<rootDir>/jest-preprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/file-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby|gatsby-plugin-mdx)/)',
  ],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*/*.{js,jsx}',
    '!**/src/cms/**',
    '!**/node_modules/**',
  ],
  coverageReporters: [
    'json-summary'
  ]
}

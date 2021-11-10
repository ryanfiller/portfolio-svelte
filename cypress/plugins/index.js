const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

 module.exports = (on, config) => {
   addMatchImageSnapshotPlugin(on, config)
   config.env.NODE_ENV = 'test'
 }

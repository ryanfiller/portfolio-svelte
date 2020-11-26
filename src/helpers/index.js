// commonjs syntax to use in node
const queryHelpers = require('./query-param-helpers.js')
const { objectToParams,paramsToObject } = queryHelpers

function capitalize(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function fishAttr(string, attr) {
  var regex = new RegExp(`${attr}=('|")(.*?)('|")`)
  const match = string.match(regex)

  return match ? match[2] : null
}

/* eslint-disable no-multi-spaces */
function slugify(string) {
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '')         // Trim - from end of text
}

module.exports = {
  capitalize,
  fishAttr,
  slugify,
  objectToParams,
  paramsToObject
}
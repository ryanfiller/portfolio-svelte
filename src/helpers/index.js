import slugify from './slugify.js'
import { objectToParams, paramsToObject } from './query-param-helpers.js'
import { buildPagesList, transformMarkdown, getPageContent, sortNewestToOldest } from './content-helpers.js'

function capitalize(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function fishAttr(string, attr) {
  var regex = new RegExp(`${attr}=('|")(.*?)('|")`)
  const match = string.match(regex)

  return match ? match[2] : null
}

function getCustomProperty(property) {
  if (typeof(window) === 'undefined') return ''

  return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).replace(/("|')/g, '').trim()
}

function setCustomProperty(property, value) {
  if (typeof(window) === 'undefined') return 
  
  document.documentElement.style.setProperty(`--${property}`, value)
}

function xmlEncode(string) {
  if (!string) return
  return string.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export {
  capitalize,
  buildPagesList,
  fishAttr,
  getCustomProperty,
  transformMarkdown,
  getPageContent,
  setCustomProperty,
  slugify,
  objectToParams,
  sortNewestToOldest,
  paramsToObject,
  xmlEncode,
}
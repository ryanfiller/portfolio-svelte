// TODO https://kit.svelte.dev/docs#modules-$lib here 

import { objectToParams, paramsToObject } from './query-param-helpers.js'
import { buildPagesJson, sortNewestToOldest } from './import-helpers.js'

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
  if (typeof(window) != 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).replace(/("|')/g, '').trim()
  } else {
    return ''
  }
}

function setCustomProperty(property, value) {
  if (typeof(window) != 'undefined') {
    document.documentElement.style.setProperty(`--${property}`, value)
  }
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

function xmlEncode(string) {
  return string.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export {
  capitalize,
  buildPagesJson,
  fishAttr,
  getCustomProperty,
  setCustomProperty,
  slugify,
  objectToParams,
  sortNewestToOldest,
  paramsToObject,
  xmlEncode
}
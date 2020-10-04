// commonjs syntax to use in gatsby-node

/* eslint-disable no-multi-spaces */
function slugify(string) {
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '')         // Trim - from end of text
}

function fishAttr(string, attr) {
  var regex = new RegExp(`${attr}=('|")(.*?)('|")`)
  const match = string.match(regex)

  return match ? match[2] : null
}

function capitalize(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  slugify,
  fishAttr,
  capitalize
}

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

// TODO - `noQuotes` arg can go away with netlifyCMS
function fishAttr(string, attr) {
  var regex = new RegExp(`${attr}=('|")(.*?)('|")`)
  const match = string.match(regex)

  return match ? match[2] : null
}

module.exports = {
  slugify,
  fishAttr
}

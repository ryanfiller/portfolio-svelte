// commonjs syntax to use in gatsby-node

function slugify(string) {
  return string.toString().toLowerCase()
  .replace(/\s+/g, '-')       // Replace spaces with -
  .replace(/[^\w-]+/g, '')    // Remove all non-word chars
  .replace(/--+/g, '-')       // Replace multiple - with single -
  .replace(/^-+/, '')         // Trim - from start of text
  .replace(/-+$/, '');        // Trim - from end of text
}

function fishAttr(string, attr) {
  var regex = new RegExp(`${attr}="(.*?)"`);
  const match = string.match(regex)
  // netlifycms blows up if no match, return ''
  return match ? match[1] : ''
}

module.exports = {
  slugify,
  fishAttr
}
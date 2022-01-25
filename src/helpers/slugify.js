import toString from 'mdast-util-to-string'

/* eslint-disable no-multi-spaces */
export default function slugify(input) {
  // this function has been increasingly problematic the more it gets used with markdown stuff...
  const string = typeof input === 'string' ? input : toString(input)

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '')         // Trim - from end of text
}
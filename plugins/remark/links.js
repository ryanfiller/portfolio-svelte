import visit from 'unist-util-visit'
import { meta } from '../../src/site-config.js' 
const siteUrl = meta.siteUrl

function transformer(ast) {
  visit(ast, 'link', visitor)

  function visitor(node) {
    const data = node.data || (node.data = {})
    const props = data.hProperties || (data.hProperties = {})
    const url = node.url

    const getLinkType = url => {
      // any string that starts with #
      if (!!/^\#(.*)/.exec(url)) {
        return 'hash'

      // any string that starts with /
      } else if (!!/^\/(.*)/.exec(url)) {
        return 'relative'

      // any subdomain that is not www
      } else if ( !!new RegExp(`((http:\/\/)|(https:\/\/))?^(?!www).*(${siteUrl})(.*)?`, 'g').exec(url) ) {
        return 'subdomain'

      // any non-subdomain link
      } else if (url.includes(siteUrl)) {
        return 'internal'

      // catch all the rest
      } else {
        return 'external'
      }
    }

    const linkType = getLinkType(url)
    
    props.title = node.url
    
    if (linkType === 'relative') {
      // TODO sort this out for syndication, gonna need an ENV var here
      // node.url = siteUrl + url
      props.title = url === '/' ? siteUrl : siteUrl + url
    }
    

    if (linkType === 'external' || linkType === 'subdomain') {
      props.target = '_blank'
      props.rel = 'noopener'
    }
  }
}

function links() {
  return transformer
}

export default links

// TODO this file is pretty bad

import fs from 'fs'
import { site } from '$site-config'

const pages = []
const excludedRoutes = [
  'index',
  'rss',
  'sitemap',
  'generate-image'
]

const buildPageList = (rootPath, prefix = '') => {
  fs.readdirSync(rootPath)
    .filter(file => {
      // excluded some specials routes
      return !excludedRoutes.some(excluded => file.includes(excluded))
    })
    .filter(file => {
      // make sure this isn't a _private or [special] file
      return file.charAt(0) !== '_' && file.charAt(0) !== '['
    })
    .forEach(file => {
      const directory = `${rootPath}/${file}`

      // this is for directory/index routes
      if(fs.lstatSync(directory).isDirectory()) {
        // recursive string replacement is hard... ¯\_(ツ)_/¯
        pages.push(`${directory.replace(/(\.\/|src\/|routes\/|_content\/)/g, '')}`)

        // recurse
        buildPageList(directory)
        
      } else {
        // this is for single file routes
        // chop off the extension(s)
        pages.push(`/${file.split('.')[0]}`)
      }
    })
}
// get all the actual routes
buildPageList('./src/routes')
// get all the weird content pages
buildPageList('./src/routes/_content/blog')
buildPageList('./src/routes/_content/lab')


export function get() {
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': `max-age=0, s-max-age=${600}` // 10 minutes
    },
		body: `<?xml version="1.0" encoding="UTF-8" ?>
      <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
          <loc>
            ${site.siteUrl}
          </loc>
        </url>
        ${pages.map(page => `
          <url>
            <loc>
              ${site.siteUrl}/${page}
            </loc>
          </url>`).join("\n")}
      </urlset>
    `
	}
}

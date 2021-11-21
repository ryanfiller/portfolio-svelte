// import fs from 'fs'
// import { site } from '$lib/site-config.js'

// // TODO - this doesn't get nested pages anymore for some reason...

// const BASE_URL = site.siteUrl
// const ROUTES = './src/routes'

// const pages = []

// const getRoutes = root => fs.readdirSync(root).forEach(file => {
//   const excluded = ['index', 'rss', 'sitemap', 'images', 'components']
  
//   if (file.charAt(0) !== '_' && file.charAt(0) !== '[' && !excluded.includes(file.split('.')[0])) {
//     const directory = `${root}/${file}`

//     if(fs.lstatSync(directory).isDirectory()) {

//       pages.push(directory.replace(ROUTES, ''))
//       getRoutes(directory)
      
//     } else {
//       pages.push(`/${file.split('.')[0]}`)
//     }
//   }
// })

// getRoutes(ROUTES)

// const render = pages => `<?xml version="1.0" encoding="UTF-8" ?>
//   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//     ${pages.map(page => `
//       <url>
//         <loc>
//           ${BASE_URL}${page}
//         </loc>
//       </url>`).join("\n")}
//   </urlset>
// `

export function get() {
  // const sitemap = render(pages)

	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': `max-age=0, s-max-age=${600}` // 10 minutes
    },
		// body: sitemap
		body: 'lol TODO'
	}
} 
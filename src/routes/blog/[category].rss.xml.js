// would be nice to have an optional route here
// https://stackoverflow.com/questions/56403072/how-do-you-create-routes-with-optional-parameters-in-sapper

const Entities = require('html-entities').XmlEntities
const entities = new Entities()

import { meta as config } from '../../config.js'
import getPages from '../../helpers/get-pages.js'

export function get(req, res) {
	res.writeHead(200, {
		'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		'Content-Type': 'text/xml'
  })

  const category = req.params.category

  const posts = getPages({
    directory: 'blog',
    returnBody: true,
    category: category,
    slice: [0, 12]
  })

  res.end(`<?xml version="1.0" encoding="UTF-8" ?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <lastBuildDate>
          ${new Date().toUTCString()}
        </lastBuildDate>
        <siteTitle>
          ${config.title}
        </siteTitle>
        <siteUrl>
          ${config.siteUrl}
        </siteUrl>
        <link>
          ${config.siteUrl}
        </link>
        <author>
          ${config.author}
        </author>
        <headshot>
          ${config.headshot}
        </headshot>
        <description>
          ${config.description}
        </description>
        <about>
          ${config.about}
        </about>
        ${posts.map(post => `
          <item>
            <title>
              ${entities.encode(post.title)}
            </title>
            <link>
              ${config.siteUrl}/blog/${post.slug}
            </link>
            <guid>
              ${config.siteUrl}/blog/${post.slug}
            </guid>
            ${[...post.meta.categories, ...post.meta.tags].map(category => `<category>${category}</category>`).join('\n')}
            <pubDate>
              ${new Date(post.meta.date).toUTCString()}
            </pubDate>
            <excerpt>
              ${entities.encode(post.meta.excerpt)}
            </excerpt>
            <content:encoded>
              ${entities.encode(post.html)}
            </content:encoded>
          </item>
        `).join('\n')}
      </channel>
    </rss>`
  )
}
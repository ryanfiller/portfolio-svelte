const Entities = require('html-entities').XmlEntities
const entities = new Entities()

import { site } from '../../config.js'
import getPages from '../../helpers/get-pages.js'
import { slugify } from '../../helpers'

export async function get(req, res) {
	res.writeHead(200, {
		'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		'Content-Type': 'text/xml'
  })

  const category = req.query.category || null

  const posts = getPages({
    directory: 'blog',
    returnBody: true,
    category: category,
    slice: [0, 12]
  })

  const siteUrl = site.siteUrl
  const blogUrl = `${siteUrl}/blog`

  const format = html => {
    const ignoreInCode = '(?!(.(?!<code ))*<\/code>)'
    return html
      // fix relative images
      .replace(new RegExp(`src="\/${ignoreInCode}`, 'g'), `src="${siteUrl}/`)
      // fix relative urls
      .replace(new RegExp(`href="\/${ignoreInCode}`, 'g'), `href="${siteUrl}/`)
      // remove data attrs
      .replace(new RegExp(`{data-(.*)}${ignoreInCode}`, 'g'), '')
      // remove custom components that sneak in, with our without p tags
      // for some reason multiline mdsvex sneaks through, must investigate...
      .replace(new RegExp(`(<p>)?(&#x3C;|<)[A-Z].*?(&#x3E;|\/>)(<\/p>)?${ignoreInCode}`, 'g'), '')
  }

  res.end(`<?xml version="1.0" encoding="UTF-8" ?>
    <rss 
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:atom="http://www.w3.org/2005/Atom"
      version="2.0"
    >
      <channel>
        <lastBuildDate>
          ${new Date().toUTCString()}
        </lastBuildDate>
        <title>
          ${site.title}
        </title>
        <description>
          ${site.description}
        </description>
        <link>
          ${blogUrl}
        </link>

        <managingEditor>
          ${site.email} (${site.author})
        </managingEditor>
        <webMaster>
          ${site.email} (${site.author})
        </webMaster>
        <image>
          <url>${site.headshot}</url>
          <title>${site.title}</title>
          <link>${blogUrl}</link>
        </image>

        ${!!category
          ? `<category>${category}</category>`
          : ''
        }
        
        <generator>https://github.com/ryanfiller/portfolio-svelte/blob/main/src/routes/blog/rss.xml.js</generator>

        <atom:link href="${site.rss}" rel="self" type="application/rss+xml"></atom:link>

        ${posts.map(post => `
          <item>
            <title>
              ${post.series
                ? `${entities.encode(post.title)} (${post.series} Series)`
                : entities.encode(post.title)
              }
            </title>
            <enclosure url="${siteUrl}/${post.banner.src}" length="0" type="image/png"></enclosure>
            <link>
              ${siteUrl}/${post.slug}
            </link>
            <guid>
              ${siteUrl}/${post.slug}
            </guid>
            <pubDate>
              ${new Date(post.meta.date).toUTCString()}
            </pubDate>
            ${[...post.meta.categories, ...post.meta.tags].map(category => `<category>${category}</category>`).join('\n')}

            <author>${site.email} (${site.author})</author>

            <description>
              ${entities.encode(post.meta.excerpt)}
              ${post.series
                ? `<![CDATA[
                    This post is part of a <a href="${blogUrl}/series/${slugify(post.series)}">series about ${post.series}</a>.
                  ]]>`
                : ''
              }
            </description>

            <content:encoded>
              ${entities.encode(format(post.html))}
            </content:encoded>
          </item>
        `).join('\n')}
      </channel>
    </rss>`
  )
}

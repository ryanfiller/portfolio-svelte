/* eslint-disable no-useless-escape */

import { site } from '$site-config'
import { buildPagesList, slugify, xmlEncode } from '$helpers'

export async function get({ query }) {

  let posts = import.meta.globEager('/src/routes/_content/blog/**/index.md')
	const excludedPaths = [
		'blog/tips/',
		'blog/series/'
	]

  const category = query.has('category') ? query.get('category') : null

  posts = buildPagesList({ files: posts, excludedPaths, content: ['html'] })
  if (category) {
    posts = posts.filter(post => {
      return post.meta.categories.includes(category)
    })
  }

  posts = posts.slice(0, 12)

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
      // remove [[shortcodes]]
      .replace(new RegExp(`(<p>)?\\[\\[.*\\]\\](<\/p>)?${ignoreInCode}`, 'g'), '')
      // remove custom components that sneak in, with our without p tags
      // for some reason multiline mdsvex sneaks through, must investigate...
      .replace(new RegExp(`(<p>)?(&#x3C;|<)[A-Z].*?(&#x3E;|\/>)(<\/p>)?${ignoreInCode}`, 'g'), '')
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': `max-age=0, s-max-age=${600}` // 10 minutes
    },
    body: `<?xml version="1.0" encoding="UTF-8" ?>
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

          ${category
            ? `<category>${category}</category>`
            : ''
          }
          
          <generator>https://github.com/ryanfiller/portfolio-svelte/blob/main/src/routes/blog/rss.xml.js</generator>

          <atom:link href="${`${site.siteUrl}${site.rss}`}" rel="self" type="application/rss+xml"></atom:link>

          ${posts.map(post => `
            <item>
              <title>
                ${post.series
                  ? `${xmlEncode(post.title)} (${post.series} Series)`
                  : xmlEncode(post.title)
                }
              </title>
              <enclosure url="${siteUrl}${post.banner.src}" length="0" type="image/png"></enclosure>
              <link>
                ${siteUrl}${post.slug}
              </link>
              <guid>
                ${siteUrl}${post.slug}
              </guid>
              <pubDate>
                ${new Date(post.meta.date).toUTCString()}
              </pubDate>
              ${[...post.meta.categories, ...post.meta.tags].map(category => `<category>${category}</category>`).join('\n')}

              <author>${site.email} (${site.author})</author>

              <description>
                ${xmlEncode(post.meta.excerpt)}
                ${post.series
                  ? `<![CDATA[
                      This post is part of a <a href="${blogUrl}/series/${slugify(post.series)}">series about ${post.series}</a>.
                    ]]>`
                  : ''
                }
              </description>

              <content:encoded>
                ${xmlEncode(format(post.html))}
              </content:encoded>

            </item>
          `).join('\n')}
        </channel>
      </rss>
    `
  }
}


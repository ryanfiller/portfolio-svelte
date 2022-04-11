// this will catach **/*.json routes,
// make sure to return if there shouldn't be a page

import { getPageContent } from '$helpers'

export async function get({ path }) {
	const importPath = `src/routes/_content${path.replace(/\.json$/, '/index.md')}`
	
	try {
		const page = getPageContent(importPath, ['frontmatter', 'html', 'toc'])

		const processedPost = {
			...page.frontmatter,
			slug: path.replace(/\.json$/, ''),
			html: page.html,
			toc: page.toc,
		}

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(processedPost)
		}
	} catch (error) {
		// if there's no page to import, go to 404 page
		return
	}
}

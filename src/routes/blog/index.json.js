import { buildPagesJson } from '$helpers'

export async function get() {
	const posts = import.meta.globEager('/src/routes/_content/blog/**/index.md')
	const excludedPaths = [
		'blog/tips/',
		'blog/series/'
	]
	
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		body: buildPagesJson(posts, excludedPaths)
	}
}

import { buildPagesList } from '$helpers'

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
		body: JSON.stringify(buildPagesList({ files: posts, excludedPaths }))
	}
}

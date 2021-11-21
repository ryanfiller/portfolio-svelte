import { buildPagesList } from '$helpers'

export async function get() {
	const posts = import.meta.globEager('/src/routes/_content/lab/**/index.md')
	
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(buildPagesList({ files: posts}))
	}
}

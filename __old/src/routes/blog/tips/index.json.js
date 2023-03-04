import { buildPagesList } from '$helpers'

export async function get() {
	const tips = import.meta.globEager('/src/routes/_content/blog/tips/**/index.md')
	
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(buildPagesList({ files: tips }))
	}
}

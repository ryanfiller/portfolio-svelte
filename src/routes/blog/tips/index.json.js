import { buildPagesJson } from '$lib/helpers'

export async function get() {
	const tips = import.meta.globEager('/src/routes/_content/blog/tips/**/index.md')
	
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		body: buildPagesJson(tips)
	}
}

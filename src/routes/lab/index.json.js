import getPages from '../../helpers/get-pages.js'

const pages = import.meta.globEager('./**/*.md')

export async function get() {
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		// body: await getPages({directory: 'lab'})
		body: Object.entries(pages).map(([path, component]) => {
			return {
				...component.metadata,
				slug: `/lab/${path.split('/')[1]}`
			}
		}).filter(post => {
			return post.options.published
		}).sort((a, b) => {
			return new Date(a.meta.date) < new Date(b.meta.date) ? 1 : -1
		})
	}
} 

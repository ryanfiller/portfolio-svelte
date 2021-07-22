// import getPages from '../../helpers/get-pages.js'

const markdown = import.meta.globEager('./_content/**/*.md')

let pages
if (markdown) {
	pages = Object.entries(markdown).map(([path, component]) => {
		return {
			...component.metadata,
			slug: `/blog/${path.split('/')[2]}`
		}
	})
}

let filteredAndOrderedPages
if (pages) {
	filteredAndOrderedPages = pages.filter(post => {
		return post.options.published
	}).sort((a, b) => {
		return new Date(a.meta.date) < new Date(b.meta.date) ? 1 : -1
	})
}

export async function get() {
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		// body: await getPages({directory: 'blog/_content'})
		body: filteredAndOrderedPages || null
	}
}

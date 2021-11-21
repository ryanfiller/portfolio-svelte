import { buildPagesJson, sortNewestToOldest } from '$helpers'

export async function get({ host }) {
	// this is gonna be a weird one...
	const series = import.meta.globEager('/src/routes/_content/blog/series/**/index.md')

	// can't fetch here, so just get the data the long way
	let posts = import.meta.globEager('/src/routes/_content/blog/**/index.md')
	const excludedPaths = [
		'blog/tips/',
		'blog/series/'
	]
	posts = buildPagesJson(posts, excludedPaths)
	posts = JSON.parse(posts)

	const formattedSeries = Object.entries(series)
		.map(([path, component]) => {
			// posts are in newest to older order, reverse that
			const seriesPosts = posts
				.filter(post => post.series === component.metadata.title)
				.reverse()
			
			const newestPost = seriesPosts[seriesPosts.length - 1]

			console.log(path)

			const { title, ...metadata} = component.metadata 

			return {
				title: title,
				slug: path.match(/^\/src\/routes\/_content(.*)\/index.md/)[1], // TODO this is repeated in import-helpers, does it have to be?
				meta: {
					...metadata.meta,
					date: Array.isArray(newestPost.meta.date) ? newestPost.meta.date[0] : newestPost.meta.date
				},
				posts: seriesPosts
			}
		})
		.sort((a, b) => sortNewestToOldest(a, b))
	
	return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		body: JSON.stringify(formattedSeries)
	}
}

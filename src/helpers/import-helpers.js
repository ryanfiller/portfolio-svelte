function buildPagesJson(files, excludedPaths, sortFunction = sortNewestToOldest) {
	// TODO need a way to call a ?param against a json endpoing and have this function return the page body(s)
	if (!files) return new Error(`bad files`)

	const correctPath = new RegExp(/^\/src\/routes\/_content(.*)\/index.md/)
	if (!Object.keys(files)[0].match(correctPath)) {
		return new Error(`import.meta.globEager doesn't match ${correctPath}`)
	}

	const pages = Object.entries(files)
		.filter(([path]) => {
			return excludedPaths ? !excludedPaths.some(excluded => path.includes(excluded)) : true
		})
		.filter(([_path ,component]) => {
			return component.metadata?.options?.published
		})
		.map(([path, component]) => {
			return {
				...component.metadata,
				slug: path.match(correctPath)[1]
			}
		})
		.sort((a, b) => sortFunction(a, b))

	return JSON.stringify(pages)
}

function sortNewestToOldest(a, b) {
	// chronologically sort by meta.date
	let aDate = a.meta.date
	let bDate = b.meta.date
	aDate = Array.isArray(aDate) ? new Date(aDate[0]) : new Date(aDate)
	bDate = Array.isArray(bDate) ? new Date(bDate[0]) : new Date(bDate)
	return bDate - aDate
}

export {
	buildPagesJson,
	sortNewestToOldest
}
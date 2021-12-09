// TODO tests!

import fs from 'fs'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkExtractFrontmatter from 'remark-extract-frontmatter'
import yaml from 'yaml'
import remarkToRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import rehypeTableOfContents from '../plugins/rehype/table-of-contents.js'

export function sortNewestToOldest(a, b) {
	// chronologically sort by meta.date
	let aDate = a.meta.date
	let bDate = b.meta.date
	aDate = Array.isArray(aDate) ? new Date(aDate[0]) : new Date(aDate)
	bDate = Array.isArray(bDate) ? new Date(bDate[0]) : new Date(bDate)
	return bDate - aDate
}

export function getPageContent(path, content = []) {
	const file = fs.readFileSync(path.replace('/src', 'src'), 'utf-8')
	
	let returnedContent = {}
	unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ['yaml'])
		.use(remarkExtractFrontmatter, { yaml: yaml.parse })
		.use(remarkStringify)
		.use(remarkToRehype)
		.use(rehypeStringify)
		.use(rehypeTableOfContents)
		.process(file, function (error, file) {
			if (error) {
				console.error('error getting page', error)
			}

			// TODO? markdown content
			content.map(contentType => {
				switch (contentType) {
					case 'frontmatter':
						returnedContent.frontmatter = file?.data
						break
					case 'html':
						returnedContent.html = file?.contents
						break
					case 'toc':
						returnedContent.toc = file?.toc
						break
					default:
						null
				}
			})
		})

	return returnedContent
}

export function buildPagesList({
	files,
	excludedPaths,
	sortFunction = sortNewestToOldest,
	content = []
}) {
	if (!files) return new Error(`bad files`)

	const correctPath = new RegExp(/^\/src\/routes\/_content(.*)\/index.md/)
	if (!Object.keys(files)[0].match(correctPath)) {
		return new Error(`import.meta.globEager doesn't match ${correctPath}`)
	}

	const pages = Object.entries(files)
		.filter(([path]) => {
			return excludedPaths ? !excludedPaths.some(excluded => path.includes(excluded)) : true
		})
		.filter(([, component]) => {
			return component.metadata?.options?.published
		})
		.map(([path, component]) => {
			const pageContent = getPageContent(path, content)			

			return {
				...component.metadata,
				slug: path.match(correctPath)[1],
				...pageContent
			}
		})
		.sort((a, b) => sortFunction(a, b))

	return pages
}
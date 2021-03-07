import fs from 'fs'
import path from 'path'

const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkStringify = require('remark-stringify')
const remarkFrontmatter = require('remark-frontmatter')
const remarkExtractFrontmatter = require('remark-extract-frontmatter')
const yaml = require('yaml').parse
const remarkToRehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')

function isDir(path) {
	try {
		const stat = fs.lstatSync(path)
		return stat.isDirectory()
	} catch (e) { return false }
}

const getPosts = ({
	directory,
	category,
	returnBody = false,
	slice = [0, undefined]
}) => {

	if (!directory) { return }

	const route = `src/routes/${directory}`
	const posts = fs.readdirSync(route)
		.filter(post => isDir(`${route}/${post}`) && post.charAt(0) !== '_' && post !== 'series')
		.map(post => {
			const file = fs.readFileSync(path.resolve(route, `${post}/index.md`), 'utf-8')

			let frontmatter
			let html
			
		unified()
			.use(remarkParse)
			.use(remarkFrontmatter, ['yaml'])
			.use(remarkExtractFrontmatter, { yaml: yaml })
			.use(remarkStringify)
			.use(remarkToRehype)
			.use(rehypeStringify)
			.process(file, function (err, file) {
				if (err) {
					console.error('error getting page', err)
				}
				frontmatter = file.data,
				html = !!returnBody ? file.contents : null
			})

			return ({
				...frontmatter,
				// TODO remove _content from this helper method all together
				slug: `/${directory.replace('/_content', '')}/${post}`,
				html: html
			})
		})
    // reverse chronological date sort
		.filter(page => page.options.published)
		// if category, do a filter, or else return them all
		.filter(page => category ? page.meta.categories.includes(category) : page)
		// TODO rethink if this should happen in the component or here, maybe make another arg?
		.sort((a, b) => (a.meta.date < b.meta.date) ? 1 : -1)

		// for pagination, defaults to 0-all
		const [ start, end ] = slice

		return posts.slice(start, end)
}

export default getPosts
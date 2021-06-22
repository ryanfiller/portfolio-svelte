//  ???
//  TOOD refactor this entire file

// import path from 'path'
// import { promises as fs } from 'fs'

// import unified from 'unified'
// import remarkParse from 'remark-parse'
// import remarkStringify from 'remark-stringify'
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkExtractFrontmatter from 'remark-extract-frontmatter'
// import yaml from 'yaml'
// import remarkToRehype from 'remark-rehype'
// import rehypeStringify from 'rehype-stringify'

// async function getPosts(files) {
// 	async function isPost(path) {
// 		let isDirectory = false
// 		let hasIndex = false

// 		isDirectory = await fs.stat(path).then(path => path.isDirectory())

// 		if (isDirectory) {
// 			hasIndex = await fs.stat(`${path}/index.md`).then(path => path.isFile())
// 		}
		
// 		if (isDirectory && hasIndex) {
// 			return path
// 		}
// 	}

//   const results = await Promise.all(files.map(async file => isPost(file)))
//   return results.filter(Boolean)
// }

// function sortDates(a, b, direction) {
// 	const getDate = date => Array.isArray(date)
// 		? new Date(date[date.length - 1]) // its a range, get the oldest
// 		: new Date(date) // its a string

// 	// default to NOT reverse
// 	return direction === 'reverse'
// 		? (getDate(a.meta.date) > getDate(b.meta.date) ? 1 : -1)
// 		: (getDate(a.meta.date) < getDate(b.meta.date) ? 1 : -1)
// }

// const getPages = async ({
// 	directory,
// 	category,
// 	returnBody = false,
// 	slice = [0, undefined]
// }) => {
// 	// const modules = import.meta.globEager(`./src/routes/${directory}/**/*.md`)
// 	// const modules = import.meta.globEager(`./src/routes/blog/_content/*.md`)
// 	// const modules = import.meta.globEager(`.src/**/*.md`)
// 	console.log('directory', directory)
// 	// const modules = import.meta.globEager(directory)

// 	// console.log('modules', modules)

// 	return {
// 		// modules 
// 	}
// }

// // const getPages = async ({
// // 	directory,
// // 	category,
// // 	returnBody = false,
// // 	slice = [0, undefined]
// // }) => {

// // 	if (!directory) { return }

// // 	const filePath = `src/routes/${directory}`
// // 	const files = await fs.readdir(filePath)

// // 	let posts = await getPosts(files.map(file => `${filePath}/${file}`))

// // 	posts = posts.map(async (post) => {
// // 		const content = await fs.readFile(path.resolve(`${post}/index.md`), 'utf-8')

// // 		let frontmatter
// // 		let html
		
// // 		unified()
// // 			.use(remarkParse)
// // 			.use(remarkFrontmatter, ['yaml'])
// // 			.use(remarkExtractFrontmatter, { yaml: yaml.parse })
// // 			.use(remarkStringify)
// // 			.use(remarkToRehype)
// // 			.use(rehypeStringify)
// // 			.process(content, function (err, content) {
// // 				if (err) {
// // 					console.error('error getting page', err)
// // 				}
// // 				frontmatter = content.data,
// // 				html = !!returnBody ? content.contents : null
// // 			})

// // 			const processedPost = {
// // 				...frontmatter,
// // 			// TODO fix this replace business...
// // 			slug: `/${post.replace('/_content', '').replace('src/routes/', '')}`,
// // 			html: html
// // 		}

// // 		return processedPost
// // 	})

// // 	posts = await Promise.all(posts).then(posts => {
// // 		return posts
// // 			.filter(page => page.options.published)
// // 			// if category, do a filter, or else return them all
// // 			.filter(page => category ? page.meta.categories.includes(category) : page)
// // 			.sort((a, b) => sortDates(a, b))
// // 	})

// // 	// for pagination, defaults to 0-all
// // 	const [ start, end ] = slice

// // 	return posts.slice(start, end)
// // }

// export default getPages

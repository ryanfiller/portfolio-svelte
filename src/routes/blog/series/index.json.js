// import fetch from 'node-fetch'
import series from './_series.js'
import { slugify } from '../../../helpers'

// TODO - this work is all done twice, find a place to abstract is
const markdown = import.meta.globEager('../_content/**/*.md')

let pages
if (markdown) {
	pages = Object.entries(markdown).map(([path, component]) => {
		return {
			...component.metadata,
			slug: `/blog/${path.split('/')[2]}`
		}
	})
}

export async function get() {
  let list = {}

  // create a list of keys that can have posts pushed to them
  series.map(series => {
    series.slug = `/blog/series/${slugify(series.title)}`
    list[series.title] = series
  })

  // get only the posts that have series
  pages = pages.filter(post => !!post.series && Object.keys(list).includes(post.series))
  // // format the series with the posts
  pages.map(post => {      
    const seriesTitle = post.series
    const postTitle = post.title
    if(list[seriesTitle].posts) {
      // stop duplication that's happening for some reason
      if (!list[seriesTitle].posts.map(post => post.title).includes(postTitle)) {
        list[seriesTitle].posts.push(post)
      }
    } else {
      list[seriesTitle].posts = [ post ]
    }
  })

  
  // convert from object to array
  list = Object.values(list)
  
  // let sortedList
  if (list.length) {
    const getLast = array => array[array.length - 1]
    
    // sort the posts with oldest first
    list.map(item => item.posts.sort((a, b) => {
      return new Date(a.meta.date) > new Date(b.meta.date) ? 1 : -1
    }))

    // sort the series with most recent last post first
    list.sort((a, b) => {
      return getLast(a.posts).meta.date < getLast(b.posts).meta.date ? 1 : -1
    })
  }

  return {
		statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
		body: list
	}
}

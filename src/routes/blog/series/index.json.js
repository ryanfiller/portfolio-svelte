import fetch from 'node-fetch'
import series from './_series.js'
import { slugify } from '../../../helpers'
import { compareAsc, compareDesc } from 'date-fns'

export async function get(_req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
  })

  let list = {}
  // create a list of keys that can have posts pushed to them
  series.map(series => {
    series.slug = `/blog/series/${slugify(series.title)}`
    list[series.title] = series
  })

	await fetch(`http://localhost:${process.env.PORT}/blog.json`)
    .then(response => response.json())
    // get only the posts that have series
    .then(posts => posts.filter(post => !!post.series && Object.keys(list).includes(post.series)))
    // format the series with the posts
    .then(posts => posts.map(post => {
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
    }))
    
  // get rid of keys, make an array
  list = Object.values(list)

  if (list.length) {
    // sort the posts with oldest first
    list.forEach(item => item.posts.sort((a, b) => compareAsc(new Date(a.meta.date), new Date(b.meta.date))))
    
    // sort the series with most recent last post first
    const getLast = array => array[array.length - 1]
    list.sort((a, b) => compareDesc(new Date(getLast(a.posts).meta.date), new Date(getLast(b.posts).meta.date)))
  }

  res.end(JSON.stringify(list))
}
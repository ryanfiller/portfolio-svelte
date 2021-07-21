import visit from 'unist-util-visit'
import fetch from 'node-fetch'

const twitter = () => async (tree) => {
  const promises = []

  const createTweet = node => {
    const tweetRegex = new RegExp(/<blockquote class="twitter-tweet">(.*)<\/blockquote>/)
  
    if (node.value && node.value.match(tweetRegex)) {
      // sometimes this grabs other lines... not sure why?
      const value = node.value.match(tweetRegex)[0]

      // TODO this doesn't handle tweets with links in them...
      const user = value.match(/&mdash(.*)\)/)[0]
      const handle = user.match(/\((.*)\)/)[1]
      const name = user.match(/&mdash; (.*) \(/)[1]
      const body = value.match(/<p.*?">(.*)<\/p>&mdash;/)[1]
      const date = value.match(/<a.*>([A-Za-z]+ [0-9][0-9]?, [0-9][0-9][0-9][0-9])<\/a>/)[1]
      const tweetLink = value.match(/\(@.*\) <a href="(.*)">/)[1]

      const twitterUrl = 'https://twitter.com'
      const noJStwitterUrl = 'https://mobile.twitter.com'
      const userLink = `${twitterUrl}/${handle.replace('@', '')}`

      // TODO - need a better, local version of this
      const avatarFallback = 'https://abs.twimg.com/favicons/twitter.ico'

      const linkStuff = `target="_blank" rel="noopener noreferrer"`
      const render = avatarUrl => (`
        <div class="twitter-tweet">
          <div class="account">
            <a class="avatar" href="${userLink}" title="${name}" ${linkStuff}>
              <img src="${avatarUrl}" alt="${name}" />
            </a>
    
            <div class="text">
              <a href="${userLink}" ${linkStuff} class="name">${name}</a>
              <a href="${userLink}" ${linkStuff} class="handle">${handle}</a>
            </div>
    
            <a class="twitter-logo" href="${tweetLink}" title="View on Twitter" ${linkStuff}>
              <svg viewBox="0 0 24 24">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </svg>
            </a>
          </div>
    
          <div class="tweet">
            ${body}
          </div>
    
          <div class="meta">
            <span class="date">
              ${date}
            </span>
            <a class="info" title="View Twitter Embed Policy" href="/uses/#embedded-tweets">
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z"></path>
                  <circle cx="12" cy="8.042" r="1.25"></circle>
                  <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                </g>
              </svg>
            </a>
          </div>
        </div>
      `)

      const promise = fetch(`${noJStwitterUrl}/${handle}`)
        .then(response => response.text())
        .then(html => {
          const imageUrlRegex = new RegExp(`<img alt="${name}" src="(.*)" \/>`)
          const imageUrlMatch = html.match(imageUrlRegex)
          return imageUrlMatch ? imageUrlMatch[1] : avatarFallback
        })
        .then(avatarUrl => {
          const newNodeValue = render(avatarUrl)
          return node.value = node.value.replace(tweetRegex, newNodeValue)
        })
        .catch(() => {
          const newNodeValue = render(avatarFallback)
          return node.value = node.value.replace(tweetRegex, newNodeValue)
        })
  
      promises.push(promise)
    }
  }

  visit(tree, 'raw', createTweet)
  await Promise.all(promises)

  return
}

export default twitter
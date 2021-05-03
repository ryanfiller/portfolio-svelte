import fetch from 'node-fetch'

export async function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
  })

  const slug = req.path.match(/(.*)\.json/)[1]

	const series = await fetch(`http://localhost:${process.env.PORT}/blog/series.json`)
    .then(response => response.json())
    .then(series => series.find(series => series.slug === slug))

  res.end(JSON.stringify(series))
}
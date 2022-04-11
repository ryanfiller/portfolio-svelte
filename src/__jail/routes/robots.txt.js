export function get() {
  return {
		statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=0'
    },
		body: process.env.CONTEXT === 'production'
      ? `User-agent: *
Disallow: `
      : `User-agent: *
Disallow: /`
	}
}

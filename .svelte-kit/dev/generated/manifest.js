const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/generate-image.svelte"),
	() => import("../../../src/routes/changes/index.md"),
	() => import("../../../src/routes/styles/[...section].svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/blog/index.svelte"),
	() => import("../../../src/routes/blog/series/index.svelte"),
	() => import("../../../src/routes/blog/series/[slug].svelte"),
	() => import("../../../src/routes/blog/tips/index.svelte"),
	() => import("../../../src/routes/blog/tips/[slug].svelte"),
	() => import("../../../src/routes/blog/[slug].svelte"),
	() => import("../../../src/routes/uses/index.md"),
	() => import("../../../src/routes/404/index.svelte"),
	() => import("../../../src/routes/lab/index.svelte"),
	() => import("../../../src/routes/lab/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/generate-image.svelte
	[/^\/generate-image\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/sitemap.xml.js
	[/^\/sitemap\.xml$/],

	// src/routes/robots.txt.js
	[/^\/robots\.txt$/],

	// src/routes/changes/index.md
	[/^\/changes\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/styles/[...section].svelte
	[/^\/styles(?:\/(.*))?\/?$/, [c[0], c[5]], [c[1]], (m) => ({ section: d(m[1] || '')})],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/blog/index.json.js
	[/^\/blog\.json$/],

	// src/routes/blog/index.svelte
	[/^\/blog\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/blog/rss.xml.js
	[/^\/blog\/rss\.xml$/],

	// src/routes/blog/series/index.json.js
	[/^\/blog\/series\.json$/],

	// src/routes/blog/series/index.svelte
	[/^\/blog\/series\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/blog/series/[slug].svelte
	[/^\/blog\/series\/([^/]+?)\/?$/, [c[0], c[9]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/blog/tips/index.json.js
	[/^\/blog\/tips\.json$/],

	// src/routes/blog/tips/index.svelte
	[/^\/blog\/tips\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/blog/tips/[slug].svelte
	[/^\/blog\/tips\/([^/]+?)\/?$/, [c[0], c[11]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/blog/[slug].json.js
	[/^\/blog\/([^/]+?)\.json$/],

	// src/routes/blog/[slug].svelte
	[/^\/blog\/([^/]+?)\/?$/, [c[0], c[12]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/uses/index.md
	[/^\/uses\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/404/index.svelte
	[/^\/404\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/lab/index.json.js
	[/^\/lab\.json$/],

	// src/routes/lab/index.svelte
	[/^\/lab\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/lab/[slug].svelte
	[/^\/lab\/([^/]+?)\/?$/, [c[0], c[16]], [c[1]], (m) => ({ slug: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];
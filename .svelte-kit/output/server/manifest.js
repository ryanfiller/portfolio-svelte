export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","fonts/.DS_Store","icons/android-chrome-192x192.png","icons/android-chrome-512x512.png","icons/apple-touch-icon.png","icons/browserconfig.xml","icons/favicon-16x16.png","icons/favicon-32x32.png","icons/favicon-dark.svg","icons/favicon-light.svg","icons/favicon.ico","icons/favicon.svg","icons/mstile-144x144.png","icons/mstile-150x150.png","icons/mstile-310x150.png","icons/mstile-310x310.png","icons/mstile-70x70.png","icons/safari-pinned-tab.svg","logo.svg","manifest.json"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".svg":"image/svg+xml",".ico":"image/vnd.microsoft.icon",".json":"application/json"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.912159fd.mjs","imports":["_app/immutable/entry/start.912159fd.mjs","_app/immutable/chunks/index.f98f3a93.mjs","_app/immutable/chunks/singletons.21d16b28.mjs"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.a5685771.mjs","imports":["_app/immutable/entry/app.a5685771.mjs","_app/immutable/chunks/index.f98f3a93.mjs"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

---
title: Conditional Adapters in SvelteKit
options:
  published: true
meta:
  date: 2021-08-31
  excerpt: Using environment variables to determine which SvelteKit adapter to run
  categories:
    - code
  tags:
    - svelte
    - sveltekit
---

## What?

[SvelteKit](https://kit.svelte.dev/docs) is a JavaScript framework meant to run in many contexts. This design strategy requires it to use an [adapter](https://kit.svelte.dev/docs#adapters) during its build step, before it can be deployed and hosted.

## Why?

Because each adapter is technology specific, deploying to different platforms requires the use of different adapters. There are many reasons someone might want to do this, I wrote about my personal reasons for deploying to both [Netlify](https://www.netlify.com/) and [surge.sh](https://surge.sh/) in [this post from May 2021](https://www.ryanfiller.com/blog/why-my-blog-stopped-using-deploy-previews).

## How?

Adapters can be used contextually by passing [environment variables](https://en.wikipedia.org/wiki/Environment_variable) and catching them with the [`dotenv` package](https://www.npmjs.com/package/dotenv). The ENV variable can then be passed to an [`if` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else), a [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), or a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) to determining the adapter to use.

``` javascript svelte.config.js

import dotenv from 'dotenv'
dotenv.config()

import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterStatic from '@sveltejs/adapter-static'

const config = {
  kit: {
    adapter: PROCESS.ENV.ADAPTER === 'static'
      ? adapterStatic({...})
      : adapterNetlify(),
    ...
  },
  ...
}

export default config
```

Passing the `ENV` variable into an [NPM script command](https://docs.npmjs.com/cli/v7/using-npm/scripts) can be done by setting variables on a platform, such as [Netlify](https://docs.netlify.com/configure-builds/environment-variables/). ENV variables can also be passed directly into an NPM script by using the [`cross-env` package](https://www.npmjs.com/package/cross-env).

```json package.json

{
  "scripts": {
    "dev": "svelte-kit dev",
    "build": "svelte-kit build",
    "static": "cross-env ADAPTER=static npm run export && ..."
  },
  "dependencies": {
    "dotenv": "^8.2.0",
    "cross-env": "^7.0.2",
    ...
  },
  "devDependencies": {
    "@sveltejs/adapter-netlify": "^1.0.0-next.17",
    "@sveltejs/adapter-static": "^1.0.0-next.13",
	...
  },
  ...
}
```

`npm run build` will return `null` for `PROCESS.ENV.ADAPTER` and trigger a build with `adapterNetlify()`. `npm run static` will meet the condition of the ternary and run with `adapterStatic()`.

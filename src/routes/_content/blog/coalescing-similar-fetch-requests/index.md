---
title: Coalescing Similar Fetch Requests
banner:
  src: '/images/death-star-2-firing.png'
  alt: 'the second Death Star from "Return of the Jedi" firing its super laser'
  attribution: 'Return of the Jedi, Lucasfilm Ltd.'
options:
  published: true
meta:
  date: 2022-01-31
  categories:
    - code
  tags:
    - javascript
    - service worker
    - performance
  excerpt: >-
    How to use a Service Worker to boost performance by reducing like fetch requests
---

<script>
  import Note from '$components/misc/note.svelte'
</script>

Starting in 2021 we undertook a huge new project at Lensrentals — to rewrite our 11 year old customer-facing Ruby app and split it into multiple [smaller services](https://en.wikipedia.org/wiki/Microservices). The existing app is a monolith that uses [Ruby on Rails](https://rubyonrails.org/) for the backend and a combination of [HAML](https://haml.info/) templates and [Backbone.js](https://backbonejs.org/) for the frontend.

Because we're pretty entrenched in the React ecosystem (we even have an internal component library across apps) we settled on using [NextJS](https://nextjs.org/). The long term plan is to deploy the site using Next's [static `HTML` export](https://nextjs.org/docs/advanced-features/static-html-export) functionality, which should give us two distinct buckets to sort content into - things we can know whenever the site builds (or new data that needs to trigger a new build), and things that the browser needs to known when they are asked for which can be queried from our other apps.

Next also provides tools to create a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) that can manipulate network requests and make the client side code even more performant

## The Challenge

The first thing to be refactored is the homepage, which contains a grid of currently featured products.

![the grid of featured products on the current lensrentals.com homepage](/images/lensrentals-featured-products-grid.png){data-caption="Products with an abnormal Availability (the one in the top right) get a special banner."}

![all the possible states a single product could exist in](/images/lensrentals-possible-availability-labels.png){data-small='true' data-align='right' data-caption="all the possible states a single product could exist in"}

Asking our database(s) about availability is an expensive query that involves looking at a lot of factors - Is the product is in stock? If it isn't do we know when it is expected to be? How long are we going to wait for it to be in stock again? Which warehouses could it be in? Is it out of stock to rent but available to buy?

Each product will need to perform this complicated query, but luckily because the operation is taxing my coworkers have already set up a way to query for multiple products at one time.

```javascript
// will return one result
fetch(`/products/availability.json?ids[]=123`)

// will return three results
fetch(`/products/availability.json?ids[]=123&ids[]=456&ids[]=789`)
```

<Note title='About Ruby on Rails URL Params'>

If, like me, you're primarily a JavaScript developer reading this, the [URL Search Params](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/) syntax might seem odd that `id` param is repeated and includes `[]` each time. This is how Rails, and some other frameworks and languages, handle [structured data passed in parameters](https://guides.rubyonrails.org/v2.3.8/form_helpers.html#basic-structures). 

`?colors[]=red&colors[]=blue&colors[]=green`

`?colors=[red,blue,green]`

I'm not 100% sure why this is, but just know that these two urls in JavaScript and Ruby are roughly interchangeable, but the code in this post will be constructing URL strings specifically to talk to a Rails application.

</Note>

And this might seems like a lot of work for just eight requests on the homepage. However, some of the [deeper interior pages](https://www.lensrentals.com/rent/brands/nikon) can quickly get into the hundreds of products and the idea of minimizing the numbers of requests as much as possible starts to make more sense.

## What is a Service Worker?

A service worker is a bit of specialized "[middleware](https://developer.mozilla.org/en-US/docs/Glossary/Middleware)" code that runs in a browser in a non-blocking way, but outside of the DOM.

More, [from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#service_worker_concepts_and_usage): 

> A service worker is an event-driven worker registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).
>
> A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

## How to Create and Compile a Worker

Service workers can be installed on any website using any tech stack, but I'll be adding mine to our new NextJS project. There are some nuances about how NextJS handles its service worker, most of these concerns can be handled by installing the [`next-pwa` package](https://www.npmjs.com/package/next-pwa). This package is built on top of [`Workbox`](https://developers.google.com/web/tools/workbox/), an open source project from Google that comes packaged with a lot of great defaults and makes coding a worker generally easier.

`next.config.js` needs to export the results `next-pwa`'s `withPWA()` function instead of the regular Next configuration object.

```javascript
const nextConfig = {
  // existing next app config
}

module.exports = withPWA({
  ...nextConfig
})
```

By default, `next-pwa` will look for the entry point to your worker file at `worker/index.js`. We've set our project up with Next's [optional `src` directory](https://nextjs.org/docs/advanced-features/src-directory) to make sharing helper methods a bit easier, so my `worker/index.js` file will actually need to import associated files from the `src` directory.

```javascript
// src/worker/index.js

import fetchAvailabilities from './fetch-availabilities'

export {
  fetchAvailabilities
}

// worker/index.js

import { fetchAvailabilities } from '../src/worker'
```

Because I'm using [a version of NextJS newer than 9](https://www.npmjs.com/package/next-pwa#user-content-usage-without-custom-server-nextjs-9), the only configuration needed to pass to the `pwa` portion of the config object is `dest: 'public'`. This tells `next-pwa` to take compiled outcome of `worker/index.js` file and copies it to Next's [`public` directory](https://nextjs.org/docs/basic-features/static-file-serving) as a file named `sw.js`.

```javascript {7-9}
const nextConfig = {
  // existing next app config
}

module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public'
  }
})
```

## Registering and Activating the Service Worker

Once the service worker has been created, it needs to be registered as high up an in the application as possible. For a NextJS app, that can be done in the [`src/pages/_app.jsx` file](https://nextjs.org/docs/advanced-features/custom-app) that will be called for every page. Because this code only needs to run once its is wrapped in a [`useEffect` hook](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) with [an empty array dependancy](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects). Just to be on the safe side the code is also wrapped in an [`if` statement to check browser support](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serviceWorker).

```javascript
// src/pages/_app.jsx

function App({ Component, pageProps }) {
  useEffect(async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator
        .serviceWorker
        .register('/sw.js', { scope: '/' })
      await navigator
        .serviceWorker
        .ready
      console.log('Service Worker registration: ', registration)
    }
  }, [])

  return <Component {...pageProps} />
}
```

Service workers can usually only be served via [`HTTPS`](https://developer.mozilla.org/en-US/docs/Glossary/https), but a special exception is made for developing on `localhost`. At this point `'Service Worker registration: '` and some data about the `registration` object should appear in the console upon page refresh. If you're following along and this _isn't_ working, it is probably because of the `HTTPS` domain issue and you may need to do some searching around how to solve for your specific development situation.

The worker registration from the `<App/>` component tells the browser where the worker file is located, but any additional work (like loading caches, etc.) needs to be done in a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) passed to the `install` event. I don't have a complicated cache for this site (yet), so for now I'm just adding more logging to ensure that the worker lifecycle is progressing as intended.

```javascript {5-7}
// worker/index.js

import { fetchAvailabilities } from '../src/worker'

self.addEventListener('install', () => {
  console.log('new service worker installed')
})
```

Inside all service worker code`self` refers to the [`WorkerGlobalScope`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/self). This is the object that all event listeners will need to be added to.

Another nuance of service workers is that they usually don't full "work" until a user loads a _second_ page. This happens because the browser will load the most critical parts of a page first, and since workers are only used for [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) they aren't part of this initial bundle. There's no easy way to guarantee that a user's first page load will go through the worker, but by listening to the `activate` event the worker can call [`clients.claim()` function](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim) via another callback and start up the worker without the user having to visit another page.

```javascript {9-12}
// worker/index.js

import { fetchAvailabilities } from '../src/worker'

self.addEventListener('install', () => {
  console.log('new service worker installed')
})

self.addEventListener('activate', async () => {
  await self.clients.claim()
  console.log('new service worker activated')
})
```

## Listening for Events

in addition to `'install'` and `'activate'`, the `WorkerGlobalScope` has a [myriad of other events](https://www.w3.org/TR/service-workers/#execution-context-events) it can listen to. Since I want to run all appropriate requests through the `fetchAvailabilities()` function, the `'fetch'` event is the one I need to listen to.

```javascript {14-23}
// worker/index.js

import { fetchAvailabilities } from '../src/worker'

self.addEventListener('install', () => {
  console.log('new service worker installed')
})

self.addEventListener('activate', async () => {
  await self.clients.claim()
  console.log('new service worker activated')
})

self.addEventListener('fetch', (event) => {
  const { method, url } = event.request
  const requestUrl = new URL(url)

  const availability = '/products/availability.json?ids[]='
  if (method === 'GET' && requestUrl.href.includes(availability)) {
    return event.respondWith(fetchAvailabilities(event))
  }
})
```

There is some logic here to make sure that the worker is only modifying `GET` requests, and for the correct route. For requests that do meet the criteria, the worker will intercept them after they are made from the browser and before they are sent to the network. This gives the worker the opportunity to modify the event with the `fetchAvailabilities()` function, then eventually return that modified data using [`FetchEvent.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith).

## Formatting the Worker's Response

This is finally where the magic starts to happen. 

Most of the complexity of the process will be in a separate [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), so the responsibility of the actual `fetchAvailabilities()` function is to accept an `event` from its arguments, separate each `id` from the URL parameters, push each `id` to an array of [`Promises`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (which we will handle in a second), and then return a `JSON` [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) containing the data for each product `id`.

```javascript
// src/worker/fetch-availabilities.js

function fetchAvailabilities(event) {
  const productIds = new URL(event.request.url)
    .searchParams.getAll('ids[]')

  const requestPromises = []
  productIds.forEach(productId => {
    requestPromises.push(TODO(productId))
  })

  return await Promise.all(requestPromises)
    .then(aggregateResponse => {
      const blob = new Blob([JSON.stringify(aggregateResponse)])

      const response = new Response(blob, {
        status: 200,
        statusText: 'OK',
        headers: new Headers([
          ['Content-Type', 'application/json']
        ])
      })

      return response
    })
}
```

From the point of view of the `fetch` call coming from the component, this response should look exactly as it would if this were the results of a regular `fetch`. Because of this, its important that the data come back in the same format as the original request would have, meaning that the response needs to return an `array` of data, even if the contents of that `array` contain a single product's information. Each individual component will later be responsible for fishing out its own data from the response.

```javascript {3, 8, 12}
// src/worker/fetch-availabilities.js

import AvailabilityAggregator from './availability-aggregator'

function fetchAvailabilities(event) {
  const productIds = new URL(event.request.url)
    .searchParams.getAll('ids[]')
  const aggregator = new AvailabilityAggregator()

  const requestPromises = []
  productIds.forEach(productId => {
    requestPromises.push(aggregator.addRequest(productId))
  })

  return await Promise.all(requestPromises)
    .then(aggregateResponse => {
      const blob = new Blob([JSON.stringify(aggregateResponse)])

      const response = new Response(blob, {
        status: 200,
        statusText: 'OK',
        headers: new Headers([
          ['Content-Type', 'application/json']
        ])
      })

      return response
    })
}
```

## Combining the Requests and Talking to the Network

The actual coalescing and making of the request to the other app's endpoint will happen in the `AvailabilityAggregator` class. The first thing it needs to do is handle the `addRequest()` method that was used to build the list of `requestPromises` in the `fetchAvailabilities()` function. The `addRequest()` method will accept a `productId`, and return the promises that are awaited in `fetchAvailabilities()`. The `AvailabilityAggregator` class will be making the actual network request via its `makeRequest()` method, and there's some logic here using a [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) to delay this function. 

```javascript
class AvailabilityAggregator {
  constructor() {
    this.requestGroup = []
    this.makeRequest = this.makeRequest.bind(this)
  }

  addRequest(productId) {
    if (!this.requestGroup.length) {
      setTimeout(this.makeRequest, 10)
    }

    return new Promise((resolve, reject) => {
      this.requestGroup.push({ productId, resolve, reject })
    })
  }

  async makeRequest() {
    ...
  }
}
```

Every time `makeRequest()` fires it will clear the current `requestGroup` batch. If the queue is empty `addRequest()` will wait 10 milliseconds to see if any addition requests are incoming before calling `makeRequest()` with that group. If the current `requestGroup` is _not_ empty, `addRequest()` will push as many promises to it as it can during that 10 milliseconds waiting period.

<!-- ```javascript
class AvailabilityAggregator {
  constructor() {
    this.requestGroup = []
    this.makeRequest = this.makeRequest.bind(this)
  }

  addRequest(productId) {
    if (!this.requestGroup.length) {
      // wait a brief while for any others that might come in
      setTimeout(this.makeRequest, 10)
    }

    // return a Promise which we'll resolve later
    return new Promise((resolve, reject) => {
      // add an entry to the group associating this product ID with the promise callbacks
      this.requestGroup.push({ productId, resolve, reject })
    })
  }

  async makeRequest() {
    // take the batch and set up for the next one
    const currentGroup = [...this.requestGroup]
    this.requestGroup = []

    // we are now responsible for resolving everything in currentGroup
    try {
      // make a request
      const productIds = [...new Set(currentGroup.map(entry => entry.productId))]
      const params = productIds.map(id => `ids[]=${id}`).join('&')
      const response = await fetch(`/products/availability.json?${params}`)

      // parse the response
      const responseJson = await response.json()
      const responsesByProductId = new Map()
      responseJson.forEach(entry => responsesByProductId.set(entry.productId, entry))

      // resolve the promises in the batch
      currentGroup.forEach(entry => {
        const productResponse = responsesByProductId.get(entry.productId)
        if (productResponse) {
          entry.resolve(productResponse)
        } else {
          entry.reject('product not found')
        }
      })
    } catch (error) {
      // reject everything in the batch with the same exception
      currentGroup.forEach(entry => entry.reject(error))
    } finally {
      // ensure every promise is either resolved or rejected
      // settled promises can't be re-settled, so we're free to reject every last one
      currentGroup.forEach(entry => entry.reject('☠️'))
    }
  }
}
``` -->

---


## Parcelling data back out

## Performance Gains
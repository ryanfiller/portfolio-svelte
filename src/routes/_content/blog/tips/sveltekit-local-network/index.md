---
title: How to Expose SvelteKit dev to Local Network
options:
  published: true
meta:
  date: 2021-08-31
  excerpt: What Flags to Use to Expose SvelteKit to a Local Network.
  categories:
    - code
  tags:
    - svelte
    - sveltekit
---

## What?

If you run [`npm run dev`](https://kit.svelte.dev/docs#command-line-interface-svelte-kit-dev) to start a SvelteKit site, it will log the following into the console: 

```
SvelteKit v1.0.0-next.113

local:   http://localhost:3000
network: not exposed
network: not exposed
```

But what do the two logs of `network: not exposed` mean? The [documentation](https://kit.svelte.dev/docs#command-line-interface-svelte-kit-dev) lists several additional CLI flags that can be passed to `svelte-kit dev`:

<dl>
  <dt>-p / --port</dt>
  <dd>which port to start the server on</dd>
  <dt>-o / --open</dt>
  <dd>open a browser tab once the server starts</dd>
  <dt>-h / --host</dt>
  <dd>expose the server to the network</dd>
  <dt>-H / --https</dt>
  <dd>launch an HTTPS server using a self-signed certificate. Useful for testing HTTPS-only features on an external device</dd>
</dl>

The two useful flags here and `--host`, which will trigger exposing the SvelteKit app at the IP address of the dev machine, and `--port`, an optional port-setting flag that defaults `3000` or whatever is set in the [`svelte.config.js` file](https://kit.svelte.dev/docs#configuration).

## How?

Since most projects will execute `svelte-kit dev` via an [NPM run script](https://docs.npmjs.com/cli/v7/commands/npm-run-script) it makes more sense to pass these via [`[-- <args>]` NPM flag](https://docs.npmjs.com/cli/v7/commands/npm-run-script#synopsis).

```bash
npm run dev -- --host --port 3333
```

This will pass on any arguments after the empty `--` to whatever script `npm run ...` is calling. Running the command above will resolve the passed arguments and execute `svelte-kit dev "--host" "--port" "3333"`. In order to save having to type a long list of arguments every time, this can be defined in a `package.json` file in a few ways:

```json
// package.json
{
  "scripts": {
    "dev": "svelte-kit dev",
    "dev-with-args-flag": "npm run dev -- --host --port 3333",
    "dev-directly": "svelte-kit dev --host --port 3333",
  },
  ...
}
```

## Why?

The above command means that any device will be able to visit `http://192.168.1.XX:3333` in a browser and see the SvelteKit application running there, with the address before the port number being the IP address of the computer that ran `npm run dev`.

Exposing an application to the network during development means it can be accessed, and hot-reloaded, on other devices. It can be tested on different device form factors or host operating systems without having to be deployed remotely. This greatly reduces the feedback loops between finding bugs and testing changes to fix them.

## Be Careful With This

At the time of writing this post there is an [open Vite Bug](https://github.com/vitejs/vite/issues/2820) that walks through how allowing this kind of exposure on public wifi grants anyone access to your computer. Being able to visit a development site from multiple devices is great, but you know, with great power comes great responsibility.
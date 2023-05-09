---
title: █████-ipsum
options:
  published: true
meta:
  categories:
    - gadgets
  date: 2021-07-26
  excerpt: >-
    A Lorem Ipsum generator, but with UTF-8 Block Elements
  tags:
    - design
  url:
    - https://www.npmjs.com/package/block-ipsum
---

<script>
  import BlockIpsum from './_components/block-ipsum.svelte'
</script>

This aims to replicate the functionality of [Redacted-Font](https://github.com/christiannaths/Redacted-Font) without the need to load an extra `.ttf` font file. This won't be great for screenreaders as a user will hear "full block, full block, full block..." so use it sparingly.

Download the package [on NPM](https://www.npmjs.com/package/block-ipsum) to use it programmatically; I know the documentation could be better.

<BlockIpsum />

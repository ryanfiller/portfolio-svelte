---
title: variable font display
options:
  published: true
meta:
  categories:
    - experiments
  date: 2019-11-03
  excerpt: >-
    A way to visualize variable font font-variation properties.
  tags:
    - javascript
    - variable fonts
url:
  - https://www.npmjs.com/package/color-contrast-table
---

<script>
  import { fonts } from '$styles/config.js'
  import VariableFont from './_components/variable-font.svelte'
</script>

<VariableFont {...fonts['LabDJR']} />

<VariableFont {...fonts['Barlow']} />

<VariableFont {...fonts['Recursive']} />

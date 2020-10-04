---
title: variable font display
options:
  published: true
meta:
  categories:
    - experiments
  date: 2019-11-03
  excerpt: >-
    A way to visualize variable font font-variation properties
  tags:
    - javascript
    - variable fonts
url:
  - https://www.npmjs.com/package/color-contrast-table
---

<script>
  import VariableFont from './_variable-font.svelte'
  import FontImporter from '../../../../static/fonts/font-importer.svelte'
</script>

<FontImporter />

<VariableFont 
  name='Science Gothic'
  url='https://github.com/tphinney/science-gothic'
  options={{
    wght: [100, 900],
    wdth: [50, 200],
    YOPQ: [18, 122],
    slnt: [-10, 0]
  }}
/>

<VariableFont 
  name='Recursive'
  url='https://www.recursive.design/'
  options={{
    MONO: [0, 1],
    CASL: [0, 1],
    wght: [0, 1000],
    slnt: [-15, 0],
    ital: [0, 1]
  }}
/>

<VariableFont 
  name='LabDJR'
  url='https://djr.com/lab-variable/'
  options={{
    BEVL: [1, 1000],
    OVAL: [1, 1000],
    QUAD: [1, 1000],
    SIZE: [1, 1000]
  }}
/>
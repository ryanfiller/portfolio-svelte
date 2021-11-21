import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

export default function vitePlugins(envVars) {
  return [
    replace({
      exclude: ['src/routes/_content/*.md'],
      preventAssignment: true,
      values: envVars
    }),
    copy({
      targets: [
        { 
          src: 'src/**/_images/*.*',
          dest: 'static/images'
        }
      ],
      hook: 'buildStart'
    }),
    dynamicImportVars.default({
      include: [
        'src/routes/**/*.svelte',
        'src/routes/**/index.md'
      ]
    })
  ]
}

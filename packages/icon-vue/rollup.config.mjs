import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'lib/index.js',
    output: [
      {
        format: 'esm',
        file: 'dist/icon-vue.min.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/icon-vue.min.cjs'
      }
    ],
    plugins: [
      vue({
        preprocessStyles: true,
        template: {
          isProduction: true
        }
      }),
      peerDepsExternal(),
      terser()
    ]
  }
]
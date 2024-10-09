import vue from 'rollup-plugin-vue'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'lib/icon-data.js',
    output: [
      {
        format: 'esm',
        file: 'dist/index.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/index.cjs'
      }
    ],
    plugins: [
      terser()
    ]
  }
]
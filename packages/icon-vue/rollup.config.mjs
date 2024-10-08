import vue from 'rollup-plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'lib/index.js',
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
      vue({
        preprocessStyles: true,
        template: {
          isProduction: true
        }
      }),
      peerDepsExternal(),
      // terser()
    ]
  }
]
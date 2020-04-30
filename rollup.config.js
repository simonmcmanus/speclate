import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import minify from 'rollup-plugin-babel-minify'
var esmPlugins =
  [
    alias({
      entries: [

        { find: 'fs', replacement: '/Users/simonmcmanus/node/speclate/client/read-file-override.js' },
        { find: './file/get-path', replacement: '/Users/simonmcmanus/node/speclate/client/get-path-override.js' },
        { find: '../server/dom', replacement: '../client/dom' }

      ]
    }),
    resolve({
    // pass custom options to the resolve plugin§
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    json()
  ]

export default [
  {
    input: 'router/index.js',
    output: {
      file: './speclate-module.mjs',
      format: 'es',
      name: 'speclate'
    },
    plugins: esmPlugins
  },
  {
    input: 'router/index.js',
    output: {
      file: '../links/docs/client/speclate-module.mjs',
      format: 'es',
      name: 'speclate'
    },
    plugins: [
      alias({
        entries: [

          { find: 'fs', replacement: '/Users/simonmcmanus/node/speclate/client/read-file-override.js' },
          { find: './file/get-path', replacement: '/Users/simonmcmanus/node/speclate/client/get-path-override.js' },
          { find: '../server/dom', replacement: '../client/dom' }

        ]
      }),
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      commonjs(),
      json()
    ]

  },
  {
    input: 'router/index.js',
    output: {
      file: './speclate-module-min.mjs',
      format: 'es',
      name: 'speclate'
    },
    plugins: [...esmPlugins, minify({
      comments: false
    })]
  }
]

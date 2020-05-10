import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import minify from 'rollup-plugin-babel-minify'
import notify from 'rollup-plugin-notify'
import pkg from './package.json'

const input = './new-client/entry.js'

var esmPlugins =
  [
    alias({

    }),
    notify(),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    json()
  ]

export default [
  {
    input,
    output: {
      file: pkg.browser,
      format: 'es'
    },
    plugins: esmPlugins
  },
  {
    input,
    output: {
      file: pkg.browser,
      format: 'es'
    },
    plugins: [...esmPlugins, minify({
      comments: false
    })]
  },
  {
    input,
    output: {
      file: '../links/docs/client/speclate-module.js',
      format: 'es'
    },
    plugins: esmPlugins
  }
]

#!/usr/bin/env node
var path = require('path')
var pkg = require(path.join(__dirname, '/../package.json'))
var speclateCli = require('../cli')

var speclate = {
  version: pkg.version,
  page: require('../lib/page/loader'),
  site: require('../lib/site/loader')
}



const specPath = process.cwd() + '/spec.js'
import(specPath).then((spec) => {
  speclateCli(spec.default, speclate, function (err) {
    if (err) {
      console.log('got an error', err)
      process.exit(1)
    }
  })
  
})
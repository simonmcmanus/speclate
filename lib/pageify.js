'use strict'

var pageify = require('pageify/index')
var fs = require('fs')

module.exports = function (spec, callback) {
  var toSend = {
    setupPage: false,
    PAGES_FOLDER: '/public/pages/',
    PUBLIC_FOLDER: '/pages/',
    PUBLIC_PAGES_FOLDER: '/pages/',
    JS_EXT: '.js',
    CSS_EXT: '.scss',
    require: false,
    scriptLoader: '$script',
    mappings: spec
  }
  pageify(toSend, function (error, router) {
    if (error) {
      throw error
    }
    console.log('writing router', './lib/router.js')
    fs.writeFile('./lib/router.js', router, callback)
  })
}

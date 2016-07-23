'use strict'

/**
 * Generates a static site.
 */
var async = require('async')

var pageLoader = require('./loader')
var writeFile = require('../fs').write

module.exports = function (spec, callback) {
  pageLoader(spec, function (error, files) {
    if (error) {
      throw error
    }
    async.each(files, function (item, next) {
      if(item.name === '/') {
          item.name = '/index.html'
      }
      var filePath = process.cwd() + '' + item.name
      console.log('writing html file: ', filePath)

      writeFile(filePath, item.markup, next)
    }, callback)
  })
}

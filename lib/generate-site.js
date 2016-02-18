'use strict'

/**
 * Generates a static site.
 */
var async = require('async')

var pageLoader = require('./loader')
var writeFile = require('./write-file')

module.exports = function (spec, callback) {
  pageLoader(spec, function (error, files) {
    if (error) {
      throw error()
    }
    async.each(files, function (item, next) {

      var filePath = process.cwd() + '' + item.name
      console.log('writing html file: ', filePath)

      writeFile(filePath, item.markup, next)
    }, callback)
  })
}

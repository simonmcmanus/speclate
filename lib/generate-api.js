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
      var filePath = process.cwd() + '/api/speclate' + item.name.slice(0, -4) + 'json'
      console.log('writing json file ', filePath);
      writeFile(filePath, JSON.stringify(spec[item.name], null, 4), next)
    }, callback)
  })
}

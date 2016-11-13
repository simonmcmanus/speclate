'use strict'

var getPage = require('../page/loader')
var map = require('async.map')
var clone = require('lodash.clone')

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param  {Function} callback
 */
module.exports = function (spec, callback) {
  var simpleSpec = clone(spec)
  var speclateOptions = defaultOptions(simpleSpec.options)
  delete simpleSpec.options
  var pages = Object.keys(simpleSpec)
  map(pages, function (pageName, next) {
    getPage(spec[pageName], speclateOptions, function (err, pageMarkup) {
      next(err, {
        name: pageName,
        markup: pageMarkup
      })
    })
  }, callback)
}


// sets safe defaults.
var defaultOptions = function (options) {

  if (!options) {
    options = {}
  }

  if (!options.container) {
    options.container = '#container'
  }
  return options

}
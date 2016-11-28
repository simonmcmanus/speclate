'use strict'

var getPage = require('../page/loader')
var loadOptions = require('../default-options').load
var map = require('async.map')
var clone = require('lodash.clone')

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param  {Function} callback
 */
module.exports = function (spec, callback) {
  var simpleSpec = clone(spec)
  var speclateOptions = loadOptions(simpleSpec.options)
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


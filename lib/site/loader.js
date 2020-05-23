'use strict'

var getPage = require('../page/loader')
var loadOptions = require('../default-options').load
var map = require('async.map')
var merge = require('lodash.merge')

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param {Object}  options  the spec options
 * @param  {Function} callback
 */
module.exports = function (spec, options, files, callback) {
  var speclateOptions = loadOptions(options)
  var pages = Object.keys(spec)

  map(pages, function (route, next) {
    var newSpec = {}
    newSpec = spec[route].spec
    spec[route].spec = newSpec
    spec[route].route = route
    getPage(spec[route], speclateOptions, files, function (err, pageMarkup) {
      next(err, {
        name: route,
        spec: spec[route],
        markup: pageMarkup
      })
    })
  }, callback)
}

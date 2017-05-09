'use strict'

var getPage = require('../page/loader')
var loadOptions = require('../default-options').load
var map = require('async.map')
var clone = require('lodash.clone')
var merge = require('lodash.merge')

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param  {Function} callback
 */
module.exports = function (spec, callback) {
  // extract pages from components

  var simpleSpec = clone(spec)
  var speclateOptions = loadOptions(simpleSpec.options)
  delete simpleSpec.options
  delete simpleSpec.defaultSpec
  var pages = Object.keys(simpleSpec)

  map(pages, function (route, next) {
    let newSpec = {}
    if (spec.defaultSpec) {
      merge(newSpec, spec.defaultSpec, spec[route].spec)
    } else {
      newSpec = spec[route].spec
    }
    spec[route].spec = newSpec
    spec[route].route = route

    getPage(spec[route], speclateOptions, function (err, pageMarkup) {
      next(err, {
        name: route,
        markup: pageMarkup
      })
    })
  }, callback)
}

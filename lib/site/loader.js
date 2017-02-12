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
  delete simpleSpec.defaultSpec
  var pages = Object.keys(simpleSpec)
  map(pages, function (pageName, next) {


     var pageSpec = {};

      // assign default spec to page spec
      [pageSpec, spec.defaultSpec, spec[pageName].spec].reduce(function (target, source) {
        return Object.assign(target, source)
      })

      spec[pageName].spec = pageSpec



    getPage(spec[pageName], speclateOptions, function (err, pageMarkup) {
      next(err, {
        name: pageName,
        markup: pageMarkup
      })
    })
  }, callback)
}


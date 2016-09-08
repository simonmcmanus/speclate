'use strict'

var getPage = require('../page/loader')
var async = require('async')
var _ = require('lodash')

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param  {Function} callback
 */
module.exports = function (spec, callback) {
  var simpleSpec = _.clone(spec)
  delete simpleSpec.options
  var pages = Object.keys(simpleSpec)
  async.map(pages, function (pageName, next) {
    getPage(spec[pageName], function (err, pageMarkup) {
      next(err, {
        name: pageName,
        markup: pageMarkup
      })
    })
  }, callback)
}

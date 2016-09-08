'use strict'

var getPage = require('../page/loader')
var async = require('async')

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param  {Function} callback
 */
module.exports = function (spec, callback) {
  delete spec.options;
  var pages = Object.keys(spec)
  async.map(pages, function (pageName, next) {
    getPage(spec[pageName], function (err, pageMarkup) {
      next(err, {
        name: pageName,
        markup: pageMarkup
      })
    })
  }, callback)
}

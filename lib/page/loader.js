'use strict'

var loadLayout = require('./load-layout')
var loadComponents = require('./load-components')
var renderComponents = require('./render-components')
var parallel = require('async.parallel')

var doSizlate = require('./do-sizlate')

/**
 * Given a page spec, get the page, components and layout and render them.
 * @param  {Object}   page     The page spec: { page: 'home', spec: {'.className': { component: 'sponsor', data: {}}}}
 * @param  {Function} call  back Call this when finished.
 */
module.exports = function (page, speclateOptions, lists, callback) {
  parallel({
    layout: function (next) {
      loadLayout(page.page, speclateOptions, next)
    },
    components: function (next) {
      loadComponents(page, lists, next)
    }
  }, function buildPage (err, data) {
    if (err) {
      return callback(err)
    }
    var renderedComponents = renderComponents(page, lists, data.components)
    var markup = doSizlate(page, data.layout, renderedComponents)
    callback(null, markup)
  })
}

'use strict'

var loadLayout = require('./load-layout')
var loadComponents = require('./load-components')
var parallel = require('async.parallel')

var doSizlate = require('./do-sizlate')

/**
 * Given a page spec, get the page, components and layout and render them.
 * @param  {Object}   page     The page spec: { page: 'home', spec: {'.className': { component: 'sponsor', data: {}}}}
 * @param  {Function} call  back Call this when finished.
 */
module.exports = function (page, callback) {
  parallel({
    layout: function (next) {
      loadLayout(page.page, next)
    },
    components: function (next) {
      if (page.spec) {
        loadComponents(page.spec, next)
      } else {
        next()
      }
    }
  }, function buildPage (err, data) {
    if (err) {
      return callback(err)
    }

    // build up container

    var markup = doSizlate(page, data.layout, data.components)
    callback(null, markup)
  })
}

'use strict'
var forEachOf = require('async.eachof')
var loadComponent = require('../load-component')

module.exports = function (page, lists, callback) {
  if (!page.spec) {
    return callback(null, {})
  }
  var out = {}
  // just needs to get all component templates
  forEachOf(page.spec, function (item, selector, next) {
    if (typeof item.component === 'undefined') {
      return next()
    } else if (!out[item.component]) {
      out[item.component] = {}
    }
    loadComponent(item.component, function (err, template) {
      if (err) {
        return next(err)
      }
      out[item.component] = template
      // out[item.component][selector] = renderComponent(item, template)
      next()
    })
  }, (err) => {
    callback(err, out)
  })
}

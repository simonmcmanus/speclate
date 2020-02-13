'use strict'
var forEachOf = require('async.eachof')
var loadComponent = require('../load-component')

module.exports = function (page, lists, callback) {
  if (!page.spec) {
    return callback(null, {})
  }
  var out = {}
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
      next()
    })
  }, (err) => {
    callback(err, out)
  })
}

'use strict'

var getFile = require('fs').readFile
var getPath = require('../file/get-path')
var parallel = require('async.parallel')
var sizlate = require('sizlate')
/**
 * Fetch the out layout and page layout.
 * @param  {String}   layout   The name of the layout you wish to use, should live in /pages/LAYOUT/LAYOUT.html
 * @param  {Function} callback Called when the layout has been formed.
 */
module.exports = function (layout, speclateOptions, callback) {
  parallel({
    layout: function (next) {
      var layoutPath = getPath('/pages/layout.html')
      getFile(layoutPath, {encoding: 'utf-8'}, next)
    },
    pageLayout: function (next) {
      if (typeof layout === 'function') {
        layout(next)
      } else {
        var pageLayoutPath = getPath('/pages/' + layout + '/' + layout + '.html')
        getFile(pageLayoutPath, 'utf-8', next)
      }
    }
  }, function (err, data) {
    if (err) {
      return callback(err)
    }

    var options = {}
    options[speclateOptions.container] = data.pageLayout
    var layoutMarkup = sizlate.render(data.layout, options)
    callback(null, layoutMarkup)
  })
}

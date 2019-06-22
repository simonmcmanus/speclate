'use strict'

var getFile = require('fs').readFile
var getPath = require('../file/get-path')
var parallel = require('async.parallel')
var sizlate = require('sizlate')
/**
 * Fetch the out layout and page layout.
 * @param  {String}   pageName   The name of the page you wish to use, should live in /pages/LAYOUT/LAYOUT.html
 * @param  {Object} speclateOptions
 * @param  {Function} callback Called when the layout has been formed.
 */
module.exports = function (pageName, speclateOptions, callback) {
  parallel({
    layout: function (next) {
      var layoutPath = getPath(speclateOptions.layout)
      getFile(layoutPath, { encoding: 'utf-8' }, next)
    },
    pageLayout: function (next) {
      if (typeof pageName === 'function') {
        pageName(next)
      } else {
        var pageLayoutPath = getPath('/pages/' + pageName + '/' + pageName + '.html')
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

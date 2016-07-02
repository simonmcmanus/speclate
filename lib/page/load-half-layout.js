'use strict'

var getFile = require('../fs').read;
var async = require('async')
var sizlate = require('sizlate')


var fetchOuterLayout = function (next) {
    var layoutPath = folder + '/pages/layout.html'
    getFile(layoutPath, next)
};
/**
 * Fetch the out layout and page layout.
 * @param  {String}   layout   The name of the layout you wish to use, should live in /pages/LAYOUT/LAYOUT.html
 * @param  {Function} callback Called when the layout has been formed.
 */
module.exports = function (layout, callback) {
    folder = process.cwd()
  async.parallel({
    layout: fetchOuterLayout,
    pageLayout: function (next) {
        var pageLayoutPath = folder + '/pages/' + layout + '/' + layout + '.html'
        getFile(pageLayoutPath, next)
    }
  }, function (err, data) {

    if (err) {
      return callback(err)
    }

    var out = sizlate.render(data.layout, {
      '#container': data.pageLayout
    })
    callback(null, out)
  })
}

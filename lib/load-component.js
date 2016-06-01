'use strict'

var loadFile = require('./fs').read

/**
 * Given a component name, go and fetch it's markup.
 * @param  {String}   component The name of the component you wish to load - should exist in the components dir with a file of the same name.
 * @param  {Function} callback  Called with the components markup.
 */
module.exports = function (component, callback) {
  var folder
  if (process.env.NODE_ENV === 'test') {
    folder = process.cwd() + '/test/sample'
  } else {
    folder = process.cwd()
  }
  loadFile(folder + '/components/' + component + '/' + component + '.html', callback)
}

'use strict'

var loadFile = require('fs').readFile
var getPath = require('./file/get-path')

/**
 * Given a component name, go and fetch it's markup.
 * @param  {String}   component The name of the component you wish to load - should exist in the components dir with a file of the same name.
 * @param  {Function} callback  Called with the components markup.
 */
module.exports = function (component, callback) {
  var path = getPath('/components/' + component + '/' + component + '.html')
  loadFile(path, 'utf-8', callback)
}

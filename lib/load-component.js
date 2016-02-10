'use strict';

var loadFile = require('./read-file');

/**
 * Given a component name, go and fetch it's markup.
 * @param  {String}   component The name of the component you wish to load - should exist in the components dir with a file of the same name.
 * @param  {Function} callback  Called with the components markup.
 */
module.exports = function (component, callback) {
    loadFile(process.cwd() + '/components/' + component + '/' + component + '.html', callback);
};

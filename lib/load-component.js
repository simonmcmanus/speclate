'use strict';

var loadFile = require('./read-file');

module.exports = function(component, callback) {
    loadFile( process.cwd() + '/components/' + component + '/' + component + '.html', callback);
}

'use strict';

var loadFile = require('./read-file');

module.exports = function (component, callback) {
    loadFile(process.cwd() + '/public/components/' + component + '/' + component + '.html', callback);
};

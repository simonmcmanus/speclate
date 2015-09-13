'use strict';

var fs = require('fs');

module.exports = function(file, callback) {
    fs.readFile(file, 'utf8', callback);
};

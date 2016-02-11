'use strict';

var fs = require('fs');

module.exports = function(file, callback) {
    console.log(file);
    fs.readFile(file, 'utf8', callback);
};

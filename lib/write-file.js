'use strict';

var fs = require('fs');

module.exports = function(file, contents, callback) {
    console.log('file', file)
    fs.writeFile(file, contents, 'utf8', callback);
};

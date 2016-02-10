'use strict';

/**
 * Generates an app cache file based on the spec provided.
 */

var fs = require('fs');

var writeFile = require('./write-file');
var files = [
    'CACHE MANIFEST'
];

module.exports =function(spec, customFiles,  callback) {
    var out = [];
    Object.keys(spec).forEach(function(page) {
        files.push(page);
    });
    files = files.concat(customFiles);
    files.push('# v-' + +new Date())
    files.push('NETWORK:', '*');
    fs.writeFile(process.cwd() + '/manifest.appcache', files.join('\n'))
};

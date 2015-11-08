'use strict';

var fs = require('fs');

var loader = require('./loader');
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
    files.push('# v11 - asdasd' + +new Date())
    files.push('NETWORK:', '*');
    fs.writeFile(process.cwd() + '/speclate.appcache', files.join('\n'))
};

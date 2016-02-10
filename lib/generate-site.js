'use strict';

/**
 * Generates a static site.
 */

var loader = require('./loader');
var writeFile = require('./write-file');

module.exports = function (spec, callback) {
    loader(spec, function (error, file) {
        console.log('file is', file)
        var filePath = process.cwd() + '' + file.name;
        console.log('writing html file: ', filePat);
        writeFile(file.name, file.markup);

        var jsonFile = process.cwd() + '' + file.replace('.html', '.json');
        console.log('writing json file');
        writeFile(jsonFile, JSON.stringify(spec[file], null, 4));
        callback && callback(null, spec[file]);
    });
};

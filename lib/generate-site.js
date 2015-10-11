'use strict';

var loader = require('./loader');
var writeFile = require('./write-file');

module.exports =function(spec, callback) {
    loader(spec, function (file, content) {
        var filePath = process.cwd() + '/public' + file;
        console.log('writing html file: ', filePath);
        writeFile(filePath, content);

        var jsonFile = process.cwd() + '/public' + file.replace('.html', '.json')
        console.log('writing json file: ', jsonFile);
        writeFile(jsonFile, JSON.stringify(spec[file], null, 4));


    });
};

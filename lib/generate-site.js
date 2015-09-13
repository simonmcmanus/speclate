var loader = require('./loader');
var writeFile = require('./write-file');

module.exports =function(spec, callback) {
    loader(spec, function(file, content) {
        writeFile(process.cwd() + file, content)
    });
};
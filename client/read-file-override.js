'use strict';

var superagent = require('superagent');

exports.readFile = function(file, options, callback) {
    superagent.get( window.location.origin +  file.slice(8) )
    .end(function(err, res) {
        if(res.ok) {
            callback(null, res.text); // passing null error param to keep same interface as fs.readfile.
        }else {
            callback(err || res.body);
        }
    });
};

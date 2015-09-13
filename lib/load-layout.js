'use strict';

var getFile = require('./read-file');
var async = require('async');
var sizlate = require('sizlate');

module.exports = function(path, callback) {
    async.parallel({
        layout: function(next) {
            var layoutPath = process.cwd() +   '/pages/layout.html';
            console.log('clwp', layoutPath);
            getFile(layoutPath, next)
        },
        pageLayout: function(next) {
            var pageLayoutPath = process.cwd() +   '/pages/' + path + '/' + path + '.html';
            console.log('clwp', pageLayoutPath);
            getFile(pageLayoutPath, next)
        }
    }, function(err, data) {
        if(err) {
            return callback(err);
        }
        var out = sizlate.doRender(data.layout, {
            '#container':  data.pageLayout
        });

        callback(null, out);
    });
};

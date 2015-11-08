'use strict';

var getFile = require('./read-file');
var async = require('async');
var sizlate = require('sizlate');

module.exports = function (path, callback) {
    async.parallel({
        layout: function (next) {
            var layoutPath = process.cwd() +   '/pages/layout.html';
            getFile(layoutPath, next);
        },
        pageLayout: function (next) {
            var pageLayoutPath = process.cwd() +   '/pages/' + path + '/' + path + '.html';
            getFile(pageLayoutPath, next);
        }
    }, function (err, data) {
        if (err) {
            return callback(err);
        }
        var out = sizlate.render(data.layout, {
            '#container':  data.pageLayout
        });

        callback(null, out);
    });
};

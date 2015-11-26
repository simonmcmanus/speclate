'use strict';

var getFile = require('./read-file');
var async = require('async');
var sizlate = require('sizlate');

module.exports = function (layout, callback) {
    async.parallel({
        layout: function (next) {
            var layoutPath = process.cwd() +   '/pages/layout.html';
            getFile(layoutPath, next);
        },
        pageLayout: function (next) {
            if(typeof layout === 'function') {
                layout(next);
            } else {
                var pageLayoutPath = process.cwd() +   '/pages/' + layout + '/' + layout + '.html';
                getFile(pageLayoutPath, next);
            }
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

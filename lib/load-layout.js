'use strict';

var getFile = require('./read-file');
var async = require('async');
var sizlate = require('sizlate');
/**
 * Fetch the out layout and page layout.
 * @param  {String}   layout   The name of the layout you wish to use, should live in /pages/LAYOUT/LAYOUT.html
 * @param  {Function} callback Called when the layout has been formed.
 */
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

        // this should not be hard coded.
        var out = sizlate.render(data.layout, {
            '#container':  data.pageLayout
        });

        callback(null, out);
    });
};

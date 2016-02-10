'use strict';

var getFile = require('./read-file');
var async = require('async');
var sizlate = require('sizlate');
/**
 * Fetch the out layout and page layout.
 * @param  {String}   layout   The name of the layout you wish to use, should live in /pages/LAYOUT/LAYOUT.html
 * @param  {Function} callback Called when the layout has been formed.
 */
module.exports  = function (layout, callback) {
    var folder;
    // if in the test look in a differnt dir for the markup files.
    if(process.env.NODE_ENV === 'test') {
        folder = process.cwd() + '/test/sample'
    } else {
        folder = process.cwd();
    }
    async.parallel({
        layout: function (next) {
            var layoutPath =  folder + '/pages/layout.html';
            getFile(layoutPath, next);
        },
        pageLayout: function (next) {
            // this should go
            if(typeof layout === 'function') {
                // why would you do this???
                layout(next);
            } else {
                var pageLayoutPath = folder +  '/pages/' + layout + '/' + layout + '.html';
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

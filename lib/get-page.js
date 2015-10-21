'use strict';

var loadLayout = require('./load-layout');
var loadComponents = require('./load-components');
var async = require('async');

var doSizlate = require('./do-sizlate');

module.exports = function (page, callback) {
    async.parallel({
        layout: function (next) {
            console.log(1);
            loadLayout(page.page, next);
        },
        components: function (next) {
            console.log(2);
            loadComponents(page.spec, next);
        },
    }, function buildPage(err, data) {
        if (err) {
            return callback(err);
        }
        console.log('cccc', data.components);
        var out = doSizlate(page, data.layout, data.components);
        callback(null, out);
    });
};

'use strict';

var getPage = require('./get-page');
var async = require('async');

/**
 * Given a spec, generates the pages.
 * @param  {Object}   spec     an spec object for each page.
 * @param  {Function} callback
 */
module.exports = function (spec, callback) {
    var pages = Object.keys(spec);
    async.map(pages, function(pageName, next) {

        console.log('off', spec[pageName]);
        getPage(spec[pageName], function (err, pageMarkup) {

            console.log('get page', pageName, pageMarkup)
            next(null, {
                name: pageName,
                markup: pageMarkup
            });
        });
    }, callback);
};

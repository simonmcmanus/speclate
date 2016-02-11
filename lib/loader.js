'use strict';

var getPage = require('./get-page');
var async = require('async');

/**
 * Given a spec, generates the pages.
 * @param  {[type]}   spec     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports = function (spec, callback) {

    var pages = Object.keys(spec);
    // this should be async.
    async.map(pages, function(page, next) {

        getPage(spec[page], function (err, pageMarkup) {
            next(null, {
                name: page,
                markup: pageMarkup
            });
        });
    }, callback);
};

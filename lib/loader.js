'use strict';

var getPage = require('./get-page');

module.exports = function (spec, callback) {
    Object.keys(spec).forEach(function (page) {
        getPage(spec[page], function (err, pageMarkup) {
            callback(page, pageMarkup);
        });
    });
};

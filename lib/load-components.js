'use strict';

var loadComponent = require('./load-component');
var async = require('async');
var sizlate = require('sizlate');

module.exports = function (components, callback) {
    var out = {};
    async.forEachOf(components, function (component, params, next) {

        loadComponent(component.component, function (err, template) {


            if (typeof component.data === 'function') {
                component.data(function (error, data) {
                    out[component.component] = sizlate.render(template, data);
                    next();
                });
            }else {
                out[component.component] = sizlate.render(template, component.data);
                next();
            }
        });
    }, function (err) {
        if (err) {
            return callback(err);
        }
        console.log('out--->', out);
        callback(null, out);
    });
};

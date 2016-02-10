'use strict';

var loadComponent = require('./load-component');
var async = require('async');
var sizlate = require('sizlate');

function renderComponent(component, template) {
    if(component.data && component.data.length) {
        var output = '';
        component.data.forEach(function(item) {
            //
            output += sizlate.render(template, item);
        });
        return output;
    } else {
        return sizlate.render(template, component.data);
    }
};


module.exports = function (components, callback) {

    var out = {};
    async.forEachOf(components, function (component, params, next) {
        loadComponent(component.component, function (err, template) {

            if (typeof component.data === 'function') {
                component.data(function (error, data) {
                    component.data = data;
                    out[component.component] = renderComponent(component, template);
                    next();
                });
            }else {
                out[component.component] = renderComponent(component, template);
                next();
            }
        });
    }, function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, out);
    });
};

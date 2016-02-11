'use strict';

var loadComponent = require('./load-component');
var async = require('async');
var sizlate = require('sizlate');

function renderComponent(component, template) {

    console.log('in render c', component)
    if(component.data && component.data.length) {
        var output = '';
        component.data.forEach(function(item) {
            console.log('item is', item);
            /// if item is an object, loop over the obj
            output += sizlate.render(template, item);
        });
        return output;
    } else {
        console.log('template', template, component);
        return sizlate.render(template, component.data);
    }
};

module.exports = function (components, callback) {
    var out = {};
    // for each component in the spec.
    async.forEachOf(components, function (component, params, next) {
        // Go and fetch the component
        loadComponent(component.component, function (err, template) {
            // data can be a function.
            if (typeof component.data === 'function') {
                // call it
                component.data(function (error, data) {
                    out[component.component] = renderComponent({
                        data: data,
                        component: component.component
                    }, template);
                    next();
                });
            }else {
                out[component.component] = renderComponent(component, template);
                next();
            }
        });
    }, (e, d) => {
        if(e) {
            return callback(e);
        }
        callback(null, out);
    });
};

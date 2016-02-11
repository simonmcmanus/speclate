'use strict';

var async = require('async');
var sizlate = require('sizlate');
var _ = require('lodash');


var loadComponent = require('./load-component');


function renderComponent(component, template) {

    console.log('in render c', component)

    if(_.isString(component.data)) {
        // will it ever get in here.
        return sizlate.render(template, component.data);

    } else if (_.isObject(component.data)) {
        for(var item in component.data) {
        }
        var keys = Object.keys(component.data)
        // for each property.
        //

    } else if (_.isArray(component.data)) {
        // array of objects
        var output = '';
        component.data.forEach(function(item) {
            /// if item is an object, loop over the obj
            output += sizlate.render(template, item);
        });
        return output;
    } else {
        console.log('WARNING - Data was not a object, array or string')
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

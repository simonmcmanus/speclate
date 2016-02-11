'use strict';

var async = require('async');
var sizlate = require('sizlate');
var _ = require('lodash');


var loadComponent = require('./load-component');


function renderComponent(component, template) {
    if(_.isString(component.data)) {
        console.log('String passed into data, should be an array or object');
        return;
    } else if (_.isArray(component.data)) {
        // array of objects
        var output = '';
        component.data.forEach(function(item) {
            /// if item is an object, loop over the obj
            output += sizlate.render(template, item);
        });
        return output;
    } else if (_.isObject(component.data)) {

        console.log('NOT IMPLEMENTED - OBJECT', component.data);
        return;

    } else {
        console.log('WARNING - Data was not a object, array or string')
    }
};

module.exports = function (components, callback) {
    var out = {};
    // for each component in the spec.
    async.forEachOf(components, function (component, params, next) {

        console.log('cc', component.component);
        if(!out[component.component]) {
            out[component.component] = [];
        }
        // Go and fetch the component
        loadComponent(component.component, function (err, template) {
            // data can be a function.
            if (typeof component.data === 'function') {
                // call it
                component.data(function (error, data) {
                    out[component.component].push(renderComponent({
                        data: data,
                        component: component.component
                    }, template));
                    next();
                });
            }else {

                out[component.component].push(renderComponent(component, template));
                next();
            }
        });
    }, (e, d) => {
        if(e) {
            return callback(e);
        }
        console.log('o', out);
        callback(null, out);
    });
};

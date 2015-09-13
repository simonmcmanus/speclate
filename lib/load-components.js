'use strict';

var loadComponent = require('./load-component');
var async = require('async');

var sizlate = require('sizlate');

module.exports = function(components, callback) {
    var out = {};
    async.forEachOf(components, function(component, params, next) {
        loadComponent(component.component, function(err, template) {
            out[component.component] = sizlate.doRender(template, component.data)
            next();
        });
    }, function(err) {
        if(err) {
            return callback(err);
        }
        callback(null, out);
    });


    //  Object.keys(components).forEach(function(component) {
    //      loadComponent()
    //      console.log('compone', component, components[component].component);
    //  });
 };

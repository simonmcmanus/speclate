'use strict'

var forEachOf = require('async.eachof')
var sizlate = require('sizlate')

var isString = require('lodash.isstring')
var isArray = require('lodash.isarray')
var isObject = require('lodash.isobject')

var loadComponent = require('../load-component')

function renderComponent (component, template) {
  if (isString(component.data)) {
    console.log('String passed into data, should be an array or object')
    return
  } else if (isArray(component.data)) {
    // array of objects
    var outArr = []

    component.data.forEach(function (item) {
      // if item is an object, loop over the obj
      // rendered is some weird array of markup and objects at the moment
      var rendered = sizlate.render(template, item)
      if (rendered.html) {
        for (var tag in rendered) {
          outArr.push(rendered[tag])
        }
      } else {
        outArr.push(rendered)
      }
    })
    return outArr.join('')
  } else if (isObject(component.data)) {
    return sizlate.render(template, component.data)
  } else {
    return template
  }
}

module.exports = function (components, callback) {
  var out = {}
  // for each component in the spec.
  forEachOf(components, function (component, selector, next) {

    if (!component.component) {
      return next()
    } else if (!out[component.component]) {
      out[component.component] = {}
    }
    // Go and fetch the component
    loadComponent(component.component, function (err, template) {
      if (err) {
        throw err
      }

      // data can be a function.
      if (typeof component.data === 'function') {
        // call it
        component.data(function (error, data) {
          if (error) {
            throw error
          }
          out[component.component][selector] = renderComponent({
            data: data,
            component: component.component
          }, template)
          next()
        })
      } else {
        out[component.component][selector] = renderComponent(component, template)
        next()
      }
    })
  }, function (e, d) {
    if (e) {
      return callback(e)
    }
    callback(null, out)
  })
}

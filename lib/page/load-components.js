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
  } else if (isArray(component.data)) {
    // array of objects
    var outArr = []

    var dataItem = function (outArray) {
      return function (item) {
        // if item is an object, loop over the obj
        // rendered is some weird array of markup and objects at the moment
        var rendered = sizlate.render(template, item)
        if (rendered.html) {
          for (var tag in rendered) {
            outArray.push(rendered[tag])
          }
        } else {
          outArray.push(rendered)
        }
      }
    }
    if (typeof component.groupBy === 'function') {
      var outObj = {}
      var groupedBySelector = component.data.reduce(function (acc, item) {
        var key = component.groupBy(item)
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item)
        return acc
      }, {})
      Object.keys(groupedBySelector).forEach(function (groupSelector) {
        if (!outObj[groupSelector]) {
          outObj[groupSelector] = []
        }
        groupedBySelector[groupSelector].forEach(dataItem(outObj[groupSelector]))
      })
      return outObj
    }

    component.data.forEach(dataItem(outArr))
    return outArr.join('')
  } else if (isObject(component.data)) {
    return sizlate.render(template, component.data)
  } else {
    return template
  }
}

module.exports = function (pageSpec, callback) {
  var out = {}
  // for each component in the spec.
  forEachOf(pageSpec, function (item, selector, next) {
    if (typeof item.component === 'undefined') {
      return next()
    } else if (!out[item.component]) {
      out[item.component] = {}
    }
    // Go and fetch the component
    loadComponent(item.component, function (err, template) {
      if (err) {
        return callback(err)
      }

      // data can be a function.
      if (typeof item.data === 'function') {
        // call it
        item.data(function (error, data) {
          if (error) {
            return callback(error)
          }

          out[item.component][selector] = renderComponent({
            data: data,
            component: item.component
          }, template)
          next()
        })
      } else {
        out[item.component][selector] = renderComponent(item, template)
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

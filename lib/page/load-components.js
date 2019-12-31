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

    component.data.forEach(function (item) {
      // if item is an object, loop over the obj
      // rendered is some weird array of markup and objects at the moment
      var rendered = sizlate.render(template, item)
      if (rendered.html) {
        for (var tag in rendered) {
          outArr.push(rendered[tag])
        }
      } else {
        outArr.push(rendered.innerHTML || rendered)
      }
    })
    return outArr.join('')
  } else if (isObject(component.data)) {
    return sizlate.render(template, component.data)
  } else {
    return template
  }
}

module.exports = function (page, lists, callback) {
  var out = {}
  // for each component in the spec.
  forEachOf(page.spec, function (item, selector, next) {
    if (typeof item.component === 'undefined') {
      return next()
    } else if (!out[item.component]) {
      out[item.component] = {}
    }
    loadComponent(item.component, function (err, template) {
      if (err) {
        return next(err)
      }

      if (item.lists) {
        // combine the lists
        item.lists.forEach((listName) => {
          if (!item.data) {
            item.data = []
          }
          item.data = item.data.concat(lists.lists[listName])
        })

        // filter the data
        if (item.filters) {
          item.filters.forEach((filter) => {
            item.data = item.data.filter(lists.filters[filter])
          })
        }
        // map to selectors
        if (item.mapper) {
          item.data = item.data.map(lists.mappers[item.mapper])
        }
        delete item.lists
      }
      out[item.component][selector] = renderComponent(item, template)
      next()
    })
  }, function (e, d) {
    if (e) {
      return callback(e)
    }
    callback(null, out)
  })
}

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

module.exports = function (pageSpec, lists, callback) {
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
        
        if (item.lists) {
          //console.log('lists', lists)

          item.data = lists.posts // should dolookup
          item.data = item.data.map((i) => {
            return {
              '.title': i.title,
              'a': {
                href: `/posts/${i.titleSlug}/index.html`
              }
            }
          })
          delete item.lists
        }
        
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

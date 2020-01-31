'use strict'

var forEachOf = require('async.eachof')
var sizlate = require('sizlate')
var serverDom = require('sizlate/server/dom')

var isString = require('lodash.isstring')
var isArray = require('lodash.isarray')
var isObject = require('lodash.isobject')

var loadComponent = require('../load-component')
var loadListData = require('./load-list-data')

function renderComponent (component, template) {
  if (isString(component.data)) {
    console.log('String passed into data, should be an array or object')
  } else if (isArray(component.data)) {
    // array of objects
    var outArr = []

    var $template = serverDom.load(template)

    component.data.forEach(function (item) {
      // if item is an object, loop over the obj
      // rendered is some weird array of markup and objects at the moment
      // this is the raw data here - does it need mapping?
      // console.log(item)
      var rendered = sizlate.render($template, item)

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
  forEachOf(page.spec, function (item, selector, next) {
    if (typeof item.component === 'undefined') {
      return next()
    } else if (!out[item.component]) {
      out[item.component] = {}
    }
    item = loadListData(item, lists, page.params)
    loadComponent(item.component, function (err, template) {
      if (err) {
        return next(err)
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

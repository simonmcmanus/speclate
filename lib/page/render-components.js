var sizlate = require('sizlate')

var isString = require('lodash.isstring')
var isArray = require('lodash.isarray')
var isObject = require('lodash.isobject')

var loadListData = require('./load-list-data')

module.exports = function renderPageComponents (page, lists, components) {
  var spec = page.spec

  var out = {}
  for (var selector in spec) {
    var component = spec[selector].component
    var template = components[component]
    if (component) {
      if (!out[component]) {
        out[component] = {}
      }
      let item = spec[selector]
      item = loadListData(item, lists, page)
      out[component][selector] = renderComponent(item, template)
    }
  }
  return out
}
function renderComponent (item, template) {
  if (isString(item.data)) {
    console.log('String passed into data, should be an array or object')
  } else if (isArray(item.data)) {
    var outArr = []
    item.data.forEach(function (item) {
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
  } else if (isObject(item.data)) {
    return sizlate.render(template, item.data)
  } else {
    return template
  }
}

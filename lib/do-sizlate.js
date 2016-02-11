var sizlate = require('sizlate')

module.exports = function (page, layout, renderedComponents) {
  var selectors = {}
  var spec = page.spec
  for (var component in spec) {
    selectors[component] = renderedComponents[spec[component].component][component]
  }
  return sizlate.render(layout, selectors)
}

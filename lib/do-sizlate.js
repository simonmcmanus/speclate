var sizlate = require('sizlate')

module.exports = function (page, layout, renderedComponents) {
  var selectors = {}
  var spec = page.spec
  for (var component in spec) {
    selectors[component] = renderedComponents[spec[component].component][component]
  }
  var out = sizlate.render(layout, selectors)
    if(page.selectors) {
        return  sizlate.render(out, page.selectors)
    }else {
        return out;
    }

}

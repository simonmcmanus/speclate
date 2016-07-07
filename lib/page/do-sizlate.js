var sizlate = require('sizlate')


/**
 * page - {
 *          spec : {},
 *          selectors: {}
 *        }
 */
module.exports = function (page, layout, renderedComponents) {
  var selectors = {}
  var spec = page.spec
  // add components into selectors
  for (var component in spec) {
    selectors[component] = renderedComponents[spec[component].component][component]
  }
  var out = sizlate.render(layout, selectors)
  if (page.selectors) {
      // needs to put the output on the page before applying the selectors.
    return sizlate.render(out, page.selectors)
  } else {
    return out
  }
}

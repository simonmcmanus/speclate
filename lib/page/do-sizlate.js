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
    var place
    if (typeof document === 'undefined') {
      // if serverside user the existing page.
      place = out
    } else {
      // if clientside user the domNode passed in.
      place = layout
    }

    return sizlate.render(place, page.selectors)
  } else {
    return out
  }
}

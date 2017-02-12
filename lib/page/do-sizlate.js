var sizlate = require('sizlate')

/**
 * page - {
 *          spec : {},
 *        }
 */
module.exports = function (page, layout, renderedComponents) {
  var componentSelectors = {}
  var simpleSelectors = {}

  var spec = page.spec
  // add components into selectors
  for (var selector in spec) {
    if (typeof spec[selector].component === 'string') {
      componentSelectors[selector] = renderedComponents[spec[selector].component][selector]
    } else {
      simpleSelectors[selector] = spec[selector]
    }
  }

  var out = sizlate.render(layout, componentSelectors)

  if (Object.keys(simpleSelectors).length > 0) {
    var place
    if (typeof document === 'undefined') {
      // if serverside user the existing page.
      place = out
    } else {
      // if clientside user the domNode passed in.
      place = layout
    }

    return sizlate.render(place, simpleSelectors)
  } else {
    return out
  }
}

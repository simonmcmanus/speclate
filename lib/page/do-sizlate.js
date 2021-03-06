var sizlate = require('sizlate')
/**
 * page - {
 *   spec : {},
 * }
 */
module.exports = function (page, layout, renderedComponents) {
  var simpleSelectors = {}
  var componentSelectors = {}
  var spec = page.spec
  // add components into selectors
  for (var selector in spec) {
    const isComponent = typeof spec[selector].component === 'string'
    if (isComponent) {
      componentSelectors[selector] = renderedComponents[spec[selector].component][selector]
    } else {
      simpleSelectors[selector] = spec[selector]
    }
  }

  var out = sizlate.render(layout, componentSelectors)
  if (typeof document === 'undefined') {
    simpleSelectors.html = {
      'data-speclate-page': page.page,
      'data-speclate-url': page.route || 'unknown'
    }
    // if serverside user the existing page.
  }
  return sizlate.render(out, simpleSelectors)
}

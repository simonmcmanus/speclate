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
  var renderedLayout = sizlate.render(layout, componentSelectors)
  if (typeof document === 'undefined') {
    if (!simpleSelectors.html) {
      simpleSelectors.html = {}
    }
    const pageName = typeof page.page === 'string' ? page.page : 'unknown'
    simpleSelectors.html['data-speclate-page'] = pageName
    simpleSelectors.html['data-speclate-url'] = page.route || 'unknown'
  }
  return sizlate.render(renderedLayout, simpleSelectors)
}

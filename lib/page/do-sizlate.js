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
      /* There is a groupBy method provided on the data so we need to be able group the items
        and then display them in the appropriate list.
      */
      if (typeof spec[selector].groupBy === 'function') {
        var headings = []
        var accumulator = spec[selector].data.reduce(function (acc, item) {
          var key = spec[selector].groupBy(item)
          var idKey = '#' + key
          var head = '<li><h2>' + key + '</h2><ul id="' + key + '">' + renderedComponents[spec[selector].component][selector][key] + '</ul></li>'
          if (!acc[idKey]) {
            acc[idKey] = []
            headings.push(head)
          }
          acc[idKey].push(item)
          return acc
        }, {})

        componentSelectors[selector] = sizlate.render(headings.join(' '), accumulator)
      //  componentSelectors[selector] = '<li><h2>today</h2><ul id="today-12-2012"></ul></li>'
      } else {
        componentSelectors[selector] = renderedComponents[spec[selector].component][selector]
      }
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

var sizlate = require('sizlate')

/**
 * page - {
 *          spec : {},
 *        }
 */
module.exports = function (page, layout, renderedComponents) {
  var componentSelectors = {}
  var simpleSelectors = {
    html: {
      'data-speclate-page': page.page,
      'data-speclate-url': page.route || 'unknown'
    }
  }

  var spec = page.spec
  // add components into selectors

  console.log('spec', spec)

  let addedSimpleSelector = false;
  for (var selector in spec) {

    const isComponent = typeof spec[selector].component === 'string'

    if (isComponent) {
      componentSelectors[selector] = renderedComponents[spec[selector].component][selector]
    } else {
      simpleSelectors[selector] = spec[selector]
      addedSimpleSelector = true
    }
  }

  var out = sizlate.render(layout, componentSelectors)

  if (addedSimpleSelector) {
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

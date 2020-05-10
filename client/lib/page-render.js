
'use strict'

import sizlate from 'sizlate'
var doSizlate = require('../../lib/page/do-sizlate')

var renderComponents = require('../../lib/page/render-components')

export default async (elements, selectors, page, options, active, assets, callback) => {
  if (!active) {
    return false
  }

  if (options.before) {
    options.before(null, null, page)
  }

  const renderSelectors = {}

  renderSelectors[selectors.container] = {
    innerHTML: assets.pages[page.page]
  }

  sizlate.render(elements.html, renderSelectors)

  var renderedComponents = renderComponents(page, assets.lists, assets.components)

  var markup = doSizlate(page, elements.html, renderedComponents)

  if (options.after) {
    options.after(null, markup, page)
  }
  callback && callback()
}

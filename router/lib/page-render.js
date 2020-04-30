
'use strict'

import sizlate from 'sizlate'
var doSizlate = require('../../lib/page/do-sizlate')
var loadComponents = require('./load-components')

var renderComponents = require('../../lib/page/render-components')

/**
 * used for client side render.
 */

const fetchText = async (url) => {
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.text()
  }).then(function (text) {
    return text
  }).catch(function (err) {
    console.error(err, url)
  })
}

export default async (elements, selectors, page, options, active, speclate, callback) => {
  console.log('hin here')

  if (!active) {
    return false
  }

  if (options.before) {
    options.before(null, null, page)
  }

  const renderSelectors = {}

  renderSelectors[selectors.container] = {
    innerHTML: speclate.pages[page.page]
  }

  console.log('->', elements.html, renderSelectors)
  sizlate.render(elements.html, renderSelectors)

  var renderedComponents = renderComponents(page, speclate.lists, speclate.components)

  var markup = doSizlate(page, elements.html, renderedComponents)

  if (options.after) {
    options.after(null, markup, page)
  }
  callback && callback()
  console.log('done')
}

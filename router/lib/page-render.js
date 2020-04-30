
'use strict'
import sizlate from 'sizlate'

var asyncParallel = require('async.parallel')

var getFile = require('speclate-fetch').readFile

var doSizlate = require('../../lib/page/do-sizlate')
var loadComponents = require('../../lib/page/load-components')

var renderComponents = require('../../lib/page/render-components')

/**
 * used for client side render.
 */
export default async(elements, selectors, page, options, active, lists, callback) {
  asyncParallel({
    pageLayout: function (next) {
      var pageLayoutPath = '/pages/' + page.page + '/' + page.page + '.html'
      getFile(pageLayoutPath, { encoding: 'utf-8' }, next)
    },
    components: function (next) {
      if (page.spec) {
        loadComponents(page, lists, next)
      } else {
        next()
      }
    }
  }, function (err, data) {
    if (!active) {
      return
    }
    if (err) {
      options.error && options.error(err, elements.container)
      return
    }

    if (options.before) {
      options.before(null, null, page)
    }

    const renderSelectors = {}
    renderSelectors[selectors.container] = {
      innerHTML: data.pageLayout
    }

    sizlate.render(elements.html, renderSelectors)

    var renderedComponents = renderComponents(page, lists, data.components)

    var markup = doSizlate(page, elements.html, renderedComponents)

    if (options.after) {
      options.after(null, markup, page)
    }
    callback && callback(null, markup, page)
  })
}

'use strict'

var asyncParallel = require('async.parallel')
var sizlate = require('sizlate')

var getFile = require('speclate-fetch').readFile

var doSizlate = require('../../lib/page/do-sizlate')
var loadComponents = require('../../lib/page/load-components')

/**
 * used for client side render.
 */
module.exports = function (elements, selectors, page, options, active, callback) {
  asyncParallel({
    pageLayout: function (next) {
      var pageLayoutPath = '/pages/' + page.page + '/' + page.page + '.html'
      getFile(pageLayoutPath, { encoding: 'utf-8' }, next)
    },
    components: function (next) {
      if (page.spec) {
        loadComponents(page.spec, next)
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

    var markup = doSizlate(page, elements.html, data.components)

    if (options.after) {
      options.after(null, markup, page)
    }
    callback && callback(null, markup, page)
  })
}

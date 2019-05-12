
var fetchJson = require('speclate-fetch').json
var pageRender = require('./page-render')

module.exports = function (specPath, elements, selectors, loadingClass, routerOptions) {
  var active = true

  fetchJson(specPath, function (err, pageSpec) {
    // should carry on rendering without waiting for json to come back.
    if (!active) {
      return
    }
    if (err) {
      elements.html.classList.remove(loadingClass)
      return routerOptions.error(err, elements.container)
    }
    elements.html.setAttribute('data-speclate-page', pageSpec.page)

    var loaded = function () {
      elements.html.classList.remove(loadingClass)
    }

    pageRender(elements, selectors, pageSpec, routerOptions, active, loaded)
  })

  return {
    cancel: function (isActive) {
      active = false
    }
  }
}


var SpecFromRoute = require('./spec-from-route')
var fetchJson = require('speclate-fetch').json
var pageRender = require('./page-render')
var setupLinks = require('./setup-links')

var pageChange = module.exports = function (newLocation, selectors, elements, routerOptions, requests) {
  var FetchPage = function (specPath, elements, selectors, loadingClass, lists, routerOptions) {
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
        setupLinks(routerOptions, selectors, elements, [], pageChange)
      }

      pageRender(elements, selectors, pageSpec, routerOptions, active, lists, loaded)
    })

    return {
      cancel: function (isActive) {
        console.log('do cancel')
        active = false
      }
    }
  }

  var loadingClass = routerOptions.loadingClass || 'loading'
  elements.html.classList.add(loadingClass)
  routerOptions.preFetch && routerOptions.preFetch(elements.container)
  var specPath = SpecFromRoute(newLocation)
  elements.html.setAttribute('data-speclate-url', newLocation)
  if (requests) {
    console.log('got some requests to cancel', requests)
    requests.forEach(function (req) {
      req.cancel()
    })
    requests = []
  }
  requests.push(new FetchPage(specPath, elements, selectors, loadingClass, window.speclate.lists, routerOptions))
  console.log('request', requests)
  return requests
}

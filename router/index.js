'use strict'

var FetchPage = require('./lib/fetch-page')
var SpecFromRoute = require('./lib/spec-from-route')
var requests = []

var onClick = function (selectors, elements, routerOptions) {
  return function (e) {
    const link = e.currentTarget
    const newLocation = link.getAttribute('href')
    const isLocal = link && newLocation.slice(0, 4) !== 'http'
    if (isLocal) {
      e.preventDefault()
      var state = {}
      var stateName = ''
      window.history.pushState(state, stateName, newLocation)
      pageChange(newLocation, selectors, elements, routerOptions)
    }
  }
}

var pageChange = function (newLocation, selectors, elements, routerOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading'
  elements.html.classList.add(loadingClass)
  routerOptions.preFetch && routerOptions.preFetch(elements.container)
  var specPath = SpecFromRoute(newLocation)

  elements.html.setAttribute('data-speclate-url', newLocation)
  if (requests) {
    requests.forEach(function (req) {
      req.cancel()
    })
    requests = []
  }

  requests.push(new FetchPage(specPath, elements, selectors, loadingClass, routerOptions))
}
var setupLinks = function (routerOptions, selectors, elements) {
  var links = document.getElementsByTagName('a')
  for (var i = 0; i < links.length; i++) {
    // TODO: handle touch events here.
    // TODO:  could check here if the link is listed in the spec
    links[i].addEventListener('click', onClick(selectors, elements, routerOptions), { capture: false })
  }
}

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions)
  }
}

module.exports = function (routerOptions, speclateOptions) {
  speclateOptions = speclateOptions || {}
  routerOptions = routerOptions || {}

  const selectors = {
    html: 'html',
    container: speclateOptions.container || '#container'
  }

  var elements = {
    html: document.querySelector(selectors.html),
    container: document.querySelector(selectors.container)
  }

  document.addEventListener('DOMContentLoaded', setupLinks(routerOptions, selectors, elements), false)
  window.addEventListener('popstate', doPopState(routerOptions, selectors, elements))
  // TODO: add mechanism to remove listeners
}

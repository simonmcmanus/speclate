'use strict'

import pageChange from './lib/page-change'
import fetchJs from '../lib/lists/fetchJs.js'

window.requests = []

var loadLists = function (requiredLists) {
  requiredLists.mappers.forEach((mapper) => fetchJs('/lists/mappers/' + mapper + '.js'))
  requiredLists.filters.forEach((filter) => fetchJs('/lists/filters/' + filter + '.js'))
  requiredLists.lists.forEach((list) => fetchJs('/lists/' + list + '.js'))
}

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions)
  }
}
export const client = function (routerOptions, speclateOptions, requiredLists) {
  console.log('router loaded')
  loadLists(requiredLists)
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
  window.addEventListener('popstate', doPopState(routerOptions, selectors, elements))

  return {
    clickHandler: function (event) {
      console.log('handling click')
      const link = event.currentTarget
      const newLocation = link.getAttribute('href')
      if (newLocation.slice(0, 4) !== 'http') { // should check if its a link in the spec
        event.preventDefault()
        var state = {}
        window.history.pushState(state, null, newLocation)
        pageChange(newLocation, selectors, elements, routerOptions)
      }
    }
  }
}

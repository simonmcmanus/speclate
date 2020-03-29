'use strict'

// console.log('sup3', setupLinks)
var pageChange = require('./lib/page-change')
var fetchJs = require('../lib/lists/fetchJs')
window.requests = []

var listsFromSpec = {
  lists: ['links', 'posts', 'categories'], // todo - lookup
  filters: ['byTitleSlug', 'mostRecent', 'byTags', 'byDate'],
  mappers: ['posts', 'post', 'links', 'category']
}

var loadLists = function () {
  listsFromSpec.mappers.forEach((mapper) => {
    fetchJs('/lists/mappers/' + mapper + '.js')
  })

  listsFromSpec.filters.forEach((filter) => {
    fetchJs('/lists/filters/' + filter + '.js')
  })

  listsFromSpec.lists.forEach((list) => {
    fetchJs('/lists/' + list + '.js')
  })
}

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions)
  }
}

module.exports = function (routerOptions, speclateOptions) {
  loadLists()
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
      event.preventDefault()
      const link = event.currentTarget
      const newLocation = link.getAttribute('href')
      // check if its a link in the spec
      var state = {}
      window.history.pushState(state, null, newLocation)
      pageChange(newLocation, selectors, elements, routerOptions)
    }
  }
}

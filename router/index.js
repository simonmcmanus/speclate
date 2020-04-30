'use strict'

import pageChange from './lib/page-change'
import fetchJs from '../lib/lists/fetchJs.js'

window.speclate = {
  requests: [], 
  components: {},
  pages: {},
  lists: {
    mappers: {},
    filters: {},
    lists: {}
  }
}

window.requests = [];


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



var loadRequiredFiles = async (requiredLists) => {
  
  requiredLists.pages.forEach(async (page) => {
    window.speclate.pages[page] = await fetchText(`/pages/${page}/${page}.html`);    
  })
  
  requiredLists.components.forEach(async (component) => {
    window.speclate.components[component] = await fetchText(`/components/${component}/${component}.html`);    
  })
  
  requiredLists.mappers.forEach(async (mapper) => {
    window.speclate.lists.mappers[mapper] = await import('/lists/mappers/' + mapper + '.mjs');    
  })
  requiredLists.filters.forEach(async (filter) => {
    window.speclate.lists.filters[filter] = await import('/lists/filters/' + filter + '.mjs');    
  })
  requiredLists.lists.forEach(async (list) => {
    window.speclate.lists.lists[list] = await import('/lists/' + list + '.mjs');    
  })
}

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions)
  }
}
export const client = function (routerOptions, speclateOptions, requiredFiles) {
  
  loadRequiredFiles(requiredFiles) // this needs to happen later. its loading all the files for all the pages here. 
  console.log('router loaded',  window.speclate.components)
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

import pageRender from './page-render'

const extractAssets = require('../../lib/page/extract-assets')

// cancellable instance so we can abort the page load.
export default function (specPath, elements, selectors, loadingClass, routerOptions) {
  var active = true
  if (!active) { // this request has been cancelled so we do not need to handle the response.
    return
  }
  fetchPageAssets(specPath, elements, selectors, loadingClass, routerOptions).then((page) => {
    elements.html.setAttribute('data-speclate-page', page.spec.page)
    var loaded = function () {
      elements.html.classList.remove(loadingClass)
    }

    pageRender(elements, selectors, page.spec, routerOptions, active, page.assets, loaded)
  })
  return {
    active,
    cancel: function () { // allows request to be cancelled if a newer request means we do not need to deal with the response.
      active = false
    }
  }
}

const fetchComponent = async (componentName) => {
  const markup = await fetchText(`/components/${componentName}/${componentName}.html`)
  return markup
}
const fetchJs = async (itemName, path) => {
  const jsPath = `${path}/${itemName}.js`
  const module = await import(jsPath)
  return module.default
}

const fetchPage = async (name) => {
  const pagePath = `/pages/${name}/${name}.html`
  return await fetchText(pagePath)
}

const fetchText = async (url) => {
  
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.text()
  }).then(function (text) {
    return text
  }).catch(function (err) {
    console.error(err, url);
  })
};

var fetchItems = async (items, fetchItem, path) => {
  const fetchedItems = await Promise.all(items.map(item => fetchItem(item, path)))
  const out = {}
  items.forEach((item, index) => {
    out[item] =  fetchedItems[index]
  })
  return out;
}
var fetchPageAssets = async (specPath, elements, selectors, loadingClass, routerOptions) => {

  const pageSpecModule = await import(specPath)
  const pageSpec = pageSpecModule.default;
  const pageAssets = extractAssets(pageSpec)


  const assets = {
    components: await fetchItems(pageAssets.components, fetchComponent),
    pages: await fetchItems([pageSpec.page], fetchPage),
    lists: {
      mappers: await fetchItems(pageAssets.mappers, fetchJs, '/lists/mappers'),
      filters: await fetchItems(pageAssets.filters, fetchJs, '/lists/filters'),
      lists: await fetchItems(pageAssets.lists, fetchJs, '/lists'),
    }
  }


  return {
    spec: pageSpec,
    assets
  }
};


import pageRender from './page-render'

// cancellable instance so we can abort the page load.
export default function (specPath, elements, selectors, loadingClass, routerOptions) {
  var active = true
  if (!active) { // this request has been cancelled so we do not need to handle the response.
    return
  }
  fetchPage(specPath, elements, selectors, loadingClass, routerOptions).then((page) => {
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


var fetchPage = async (specPath, elements, selectors, loadingClass, routerOptions) => {

  // what else does fetch page need to fetchasd.
  // * lists/ filters // mappers
  const pageSpecModule = await import(specPath)
  const pageSpec = pageSpecModule.default;
  const components  = []
  for (var selector in pageSpec.spec) {
    if(pageSpec.spec[selector].component) {
      components.push(pageSpec.spec[selector].component)
    }
  }
  const assets = {
    components: {},
    pages: {},
    lists: {}
  }
  const componentsMarkup = await Promise.all(components.map(component => fetchComponent(component)))
  components.forEach((component, index) => {
    assets.components[component] = componentsMarkup[index]
  })
  const pagePath = `/pages/${pageSpec.page}/${pageSpec.page}.html`
  assets.pages[pageSpec.page] = await fetchText(pagePath)
  return {
    spec: pageSpec,
    assets
  }
};

const fetchComponent = async (componentName) => {
  const markup = await fetchText(`/components/${componentName}/${componentName}.html`)
  return markup
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
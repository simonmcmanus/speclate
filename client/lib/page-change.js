import pageRender from './page-render'
var SpecFromRoute = require('./spec-from-route')

var FetchPage = function (specPath, elements, selectors, loadingClass, speclate, routerOptions) {
  var active = true;

  import(specPath)
    .then((pageSpecModule) => {
      if(!active){ // this request has been cancelled so we do not need to handle the response.
        return
      }
      const pageSpec = pageSpecModule.default
      elements.html.setAttribute('data-speclate-page', pageSpec.page)
      var loaded = function () {
        elements.html.classList.remove(loadingClass)
      }
      pageRender(elements, selectors, pageSpec, routerOptions, active, speclate, loaded)
    }).catch((err) => { 
    // handle errors
    elements.html.classList.remove(loadingClass)
    return routerOptions.error(err, elements.container)
  })

  return {
    cancel : function () { // allows request to be cancelled if a newer request means we do not need to deal with the response.
      active = false
    }
  }
}


var requests = [];
export default function (newLocation, selectors, elements, routerOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading'
  elements.html.classList.add(loadingClass)
  routerOptions.preFetch && routerOptions.preFetch(elements.container)
  var specPath = SpecFromRoute(newLocation)
  elements.html.setAttribute('data-speclate-url', newLocation)
  requests.forEach((request) => {
    request.cancel()
  })
  requests = []
  const fetchPageRequest = new FetchPage(specPath, elements, selectors, loadingClass, speclate, routerOptions)
  requests.push(fetchPageRequest)
}

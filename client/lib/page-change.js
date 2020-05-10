
import specFromRoute from './spec-from-route'
import FetchInstance from './Fetch-page'
var requests = []
export default function pageChange (newLocation, selectors, elements, routerOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading'
  elements.html.classList.add(loadingClass)
  routerOptions.preFetch && routerOptions.preFetch(elements.container)
  var specPath = specFromRoute(newLocation)
  elements.html.setAttribute('data-speclate-url', newLocation)
  requests.forEach((request) => {
    request.cancel()
  })
  requests = []
  const fetchPageRequest = new FetchInstance(specPath, elements, selectors, loadingClass, routerOptions)
  requests.push(fetchPageRequest)
}

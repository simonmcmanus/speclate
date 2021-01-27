import pageChange from './lib/page-change'
import clearLoading from './lib/clear-loading'

var doPopState = function(routerOptions, selectors, elements) {
    return function(event) {
        pageChange(document.location.pathname, selectors, elements, routerOptions)
    }
}
const client = function(routerOptions, speclateOptions, requiredFiles) {
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
        linkHandler: function(event) {
            clearLoading(loadingClass)
            const link = event.currentTarget
            const newLocation = link.getAttribute('href')
            var loadingClass = routerOptions.loadingClass || 'loading'
            link.classList.add(loadingClass)
            if (newLocation.slice(0, 4) !== 'http') { // should check if its a link in the spec
                event.preventDefault()
                var state = {}
                window.history.pushState(state, null, newLocation)
                pageChange(newLocation, selectors, elements, routerOptions)
            }
        }
    }
}

export { client }
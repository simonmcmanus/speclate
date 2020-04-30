import sizlate from 'sizlate';

var asyncParallel = require('async.parallel');

var getFile = require('speclate-fetch').readFile;

var doSizlate = require('../../lib/page/do-sizlate');
var loadComponents = require('../../lib/page/load-components');

var renderComponents = require('../../lib/page/render-components');

/**
 * used for client side render.
 */
function pageRender (elements, selectors, page, options, active, lists, callback) {
  asyncParallel({
    pageLayout: function (next) {
      var pageLayoutPath = '/pages/' + page.page + '/' + page.page + '.html';
      getFile(pageLayoutPath, { encoding: 'utf-8' }, next);
    },
    components: function (next) {
      if (page.spec) {
        loadComponents(page, lists, next);
      } else {
        next();
      }
    }
  }, function (err, data) {
    if (!active) {
      return
    }
    if (err) {
      options.error && options.error(err, elements.container);
      return
    }

    if (options.before) {
      options.before(null, null, page);
    }

    const renderSelectors = {};
    renderSelectors[selectors.container] = {
      innerHTML: data.pageLayout
    };

    sizlate.render(elements.html, renderSelectors);

    var renderedComponents = renderComponents(page, lists, data.components);

    var markup = doSizlate(page, elements.html, renderedComponents);

    if (options.after) {
      options.after(null, markup, page);
    }
    callback && callback(null, markup, page);
  });
}

var SpecFromRoute = require('./spec-from-route');
var fetchJson = require('speclate-fetch').json;

function pageChange (newLocation, selectors, elements, routerOptions) {
  var FetchPage = function (specPath, elements, selectors, loadingClass, lists, routerOptions) {
    var active = true;

    fetchJson(specPath, function (err, pageSpec) {
    // should carry on rendering without waiting for json to come back.
      if (!active) {
        return
      }
      if (err) {
        elements.html.classList.remove(loadingClass);
        return routerOptions.error(err, elements.container)
      }
      elements.html.setAttribute('data-speclate-page', pageSpec.page);

      var loaded = function () {
        elements.html.classList.remove(loadingClass);
      };

      pageRender(elements, selectors, pageSpec, routerOptions, active, lists, loaded);
    });

    return {
      cancel: function (isActive) {
        active = false;
      }
    }
  };

  var loadingClass = routerOptions.loadingClass || 'loading';
  elements.html.classList.add(loadingClass);
  routerOptions.preFetch && routerOptions.preFetch(elements.container);
  var specPath = SpecFromRoute(newLocation);
  elements.html.setAttribute('data-speclate-url', newLocation);
  if (window.requests) {
    window.requests.forEach(function (req) {
      req.cancel();
    });
    window.requests = [];
  }
  window.requests.push(new FetchPage(specPath, elements, selectors, loadingClass, window.speclate.lists, routerOptions));
}

function fetchJs (url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' ||
                  script.readyState == 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { // Others
    script.onload = function () {
      callback && callback();
    };
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

window.requests = [];

var loadLists = function (requiredLists) {
  requiredLists.mappers.forEach((mapper) => fetchJs('/lists/mappers/' + mapper + '.js'));
  requiredLists.filters.forEach((filter) => fetchJs('/lists/filters/' + filter + '.js'));
  requiredLists.lists.forEach((list) => fetchJs('/lists/' + list + '.js'));
};

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions);
  }
};
const client = function (routerOptions, speclateOptions, requiredLists) {
  console.log('router loaded');
  loadLists(requiredLists);
  speclateOptions = speclateOptions || {};
  routerOptions = routerOptions || {};
  const selectors = {
    html: 'html',
    container: speclateOptions.container || '#container'
  };

  var elements = {
    html: document.querySelector(selectors.html),
    container: document.querySelector(selectors.container)
  };
  window.addEventListener('popstate', doPopState(routerOptions, selectors, elements));

  return {
    clickHandler: function (event) {
      console.log('handling click');
      const link = event.currentTarget;
      const newLocation = link.getAttribute('href');
      if (newLocation.slice(0, 4) !== 'http') { // should check if its a link in the spec
        event.preventDefault();
        var state = {};
        window.history.pushState(state, null, newLocation);
        pageChange(newLocation, selectors, elements, routerOptions);
      }
    }
  }
};

export { client };

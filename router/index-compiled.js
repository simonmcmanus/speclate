(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.speclate = {}));
}(this, (function (exports) { 'use strict';

  var SpecFromRoute = require('./spec-from-route');
  var fetchJson = require('speclate-fetch').json;
  var pageRender = require('./page-render');

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

  exports.client = client;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

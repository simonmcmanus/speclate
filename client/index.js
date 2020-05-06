function SpecFromRoute (pathname) {
  var routeName;

  if (pathname.slice(-5) === '.html') {
    routeName = pathname.slice(0, -5);
    if (routeName === '') {
      routeName = '/index';
    }
  } else if (pathname.slice(-1) === '/') {
    routeName = pathname + 'index';
  } else if (pathname === '') {
    routeName = '/index';
  }
  return routeName + '.mjs'
}

function createCommonjsModule(a,b){return b={exports:{}},a(b,b.exports),b.exports}var checkForInputs=function(a,b){return "INPUT"===dom.getTag(a)?dom.setAttribute(a,"value",b):dom.setMarkup(a,b),a},newValue=function(a,b){if("object"==typeof b&&b.regex&&b.value)return a.replace(b.regex,b.value);return "function"==typeof b?b(a):b},updateNodeWithObject=function(a,b){for(var c in b)switch(c){case"selectors":var d=b[c];for(var e in d){var f=dom.query(a,e);dom.setMarkup(f,d[e]);}break;case"className":dom.addClass(a,b[c]);break;case"innerHTML":b[c]&&b[c].regex||"function"==typeof b[c]?a.each(function(){var a=dom.get(this);a.innerHTML=b[c];}):dom.setMarkup(a,b[c]);break;case"innerText":b[c]&&b[c].regex||"function"==typeof b[c]?dom.newValue(a,b[c]):a.text(b[c]);break;default:if(b[c]&&b[c].regex||"function"==typeof b[c]){var g=newValue(dom.getAttribute(a,c),b[c]);dom.setAttribute(a,c,g);}else dom.setAttribute(a,c,b[c]);}return a};function updateNode(a,b,d){if(".id"===b)return a.attr("id",d),a;switch(typeof d){case"string":""!==d&&(a=checkForInputs(a,d));break;case"number":a=checkForInputs(a,d);break;case"boolean":if(!1===d)return a.remove();break;case"object":if(d&&d.length){var e=dom.parent(a);if(1===d.length&&!1===d[0])return e.remove();var f=dom.clone(a);d.forEach(function(g,h){var c=dom.clone(f);0===h&&a.remove();var i=updateNode(c,b,d[h]);dom.append(e,i);});}else a=updateNodeWithObject(a,d);}return a}var updateNode_1=updateNode,dom=createCommonjsModule(function(a,b){b.load=function(a){var b=document.createElement("div");return b.innerHTML=a.trim(),b},b.init=function(a){return a},b.find=function(a,b){return a.querySelectorAll(b)},b.getMarkup=function(a){var b=document.createElement("div");return b.appendChild(a.cloneNode(!0)),b.innerHTML},b.setMarkup=function(a,b){a.innerHTML=b;},b.get=function(a){return a},b.setAttribute=function(a,b,c){a.setAttribute(b,c);},b.getAttribute=function(a,b){return a.getAttribute(b)},b.addClass=function(a,b){a.classList.add(b);},b.clone=function(a){return a.cloneNode()},b.append=function(a,b){return a.appendChild(b)},b.parent=function(a){return a.parentNode},b.getTag=function(a){return a.tagName.toUpperCase()},b.getText=function(a){return a.innerText},b.setText=function(a,b){return a.innerText=b,a},b.query=function(a,b){return a.querySelector(b)},b.updateNodes=function(a,b,c){a.forEach(function(a){updateNode_1(a,b,c);});},b.newValue=function(a,c){var d=newValue(b.getText(a),c);b.setText(a,d);};}),dom_1=dom.load,dom_2=dom.init,dom_3=dom.find,dom_4=dom.getMarkup,dom_5=dom.setMarkup,dom_6=dom.get,dom_7=dom.setAttribute,dom_8=dom.getAttribute,dom_9=dom.addClass,dom_10=dom.clone,dom_11=dom.append,dom_12=dom.parent,dom_13=dom.getTag,dom_14=dom.getText,dom_15=dom.setText,dom_16=dom.query,dom_17=dom.updateNodes,dom_18=dom.newValue,doRender=function(a,b){if(!b)return a;b="undefined"==typeof b[0]?[b]:b;var c=b.length;b=b.reverse();var d,e=null;for("string"==typeof a?(d=dom.load(a),e="string"):(d=a,e="dom");c--;)Object.keys(b[c]).forEach(function(a){var e=dom.find(d,a);dom.updateNodes(e,a,b[c][a]);});if(dom.getMarkup){if("string"===e)return d.innerHTML;if("dom"===e)return d}else return d.html()},classifyKeys=function(a,b){if(!b.classifyKeys||"undefined"==typeof a)return a;for(var d=a.length,e=[];d--;){var f={};for(var g in a[d])f["."+g]=a[d][g];e.push(f);}return e},render=doRender,classifyKeys$1=classifyKeys,sizlate={render:render,classifyKeys:classifyKeys$1};

var sizlateModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': sizlate,
  classifyKeys: classifyKeys$1,
  render: render
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var sizlate$1 = getCjsExportFromNamespace(sizlateModule);

/**
 * page - {
 *   spec : {},
 * }
 */
var doSizlate = function (page, layout, renderedComponents) {
  var simpleSelectors = {};
  var componentSelectors = {};
  var spec = page.spec;
  // add components into selectors
  for (var selector in spec) {
    const isComponent = typeof spec[selector].component === 'string';
    if (isComponent) {
      componentSelectors[selector] = renderedComponents[spec[selector].component][selector];
    } else {
      simpleSelectors[selector] = spec[selector];
    }
  }

  var out = sizlate$1.render(layout, componentSelectors);
  if (typeof document === 'undefined') {
    simpleSelectors.html = {
      'data-speclate-page': page.page,
      'data-speclate-url': page.route || 'unknown'
    };
    // if serverside user the existing page.
  }
  return sizlate$1.render(out, simpleSelectors)
};

/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var lodash_isarray = isArray;

/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var lodash_isobject = isObject;

var loadListData = (item, lists, page) => {
  var params = page.params;
  if (item.lists) {
    item.lists.forEach((listName) => {
      if (!item.data) {
        item.data = [];
      }
      if (lists.lists[listName]) {
        item.data = item.data.concat(lists.lists[listName]);
      }
    });

    if (item.filters) {
      item.filters.forEach(function (filter) {
        if (!lists.filters[filter]) {
          throw new Error('Filter specified does not exist (' + filter + ') ')
        }
        item.data = item.data.filter(lists.filters[filter], { params: params });
      });
    }
    if (item.mapper && item.data) {
      if (!lists.mappers[item.mapper]) {
        throw new Error('Mapper defined but not available (' + item.mapper + '), has it been loaded?')
      }
      item.data = item.data.map(lists.mappers[item.mapper], { params: params });
    }
    delete item.lists;
    delete item.filters;
    delete item.mapper;
  }
  return item
};

var isString = (value) => typeof value === 'string';





var renderComponents = function renderPageComponents (page, lists, components) {
  var spec = page.spec;

  var out = {};
  for (var selector in spec) {
    var component = spec[selector].component;
    var template = components[component];
    if (component) {
      if (!out[component]) {
        out[component] = {};
      }
      let item = spec[selector];
      item = loadListData(item, lists, page);
      if (item.data.length === 0) { // empty state
        if (item.states) {
          const emptyState = item.states.empty;

          // it has not actually loaded the component here.

          // * where are components loaded from?
          // can we make one source of truth for loading the components.
          // out[component][selector] = components[emptyState.component]
          let emptyItem = {};
          if (lists.mappers[emptyState.mapper]) {
            var selectors = lists.mappers[emptyState.mapper].bind({ params: page.params });
            emptyItem.data = selectors();
          }
          out[component][selector] = renderComponent(emptyItem, components[emptyState.component]);
        }
      } else {
        out[component][selector] = renderComponent(item, template);
      }
    }
  }
  return out
};
function renderComponent (item, template) {
  if (isString(item.data)) {
    console.log('String passed into data, should be an array or object');
  } else if (lodash_isarray(item.data)) {
    var outArr = [];
    item.data.reverse().forEach(function (item) {
      var rendered = sizlate$1.render(template, item);
      if (rendered.html) {
        for (var tag in rendered) {
          outArr.push(rendered[tag]);
        }
      } else {
        outArr.push(rendered.innerHTML || rendered);
      }
    });
    return outArr.join('')
  } else if (lodash_isobject(item.data)) {
    return sizlate$1.render(template, item.data)
  } else {
    return template
  }
}

var pageRender = async (elements, selectors, page, options, active, speclate, callback) => {
  if (!active) {
    return false
  }

  if (options.before) {
    options.before(null, null, page);
  }

  const renderSelectors = {};

  renderSelectors[selectors.container] = {
    innerHTML: speclate.pages[page.page]
  };

  sizlate.render(elements.html, renderSelectors);

  var renderedComponents = renderComponents(page, speclate.lists, speclate.components);

  var markup = doSizlate(page, elements.html, renderedComponents);

  if (options.after) {
    options.after(null, markup, page);
  }
  callback && callback();
};

var FetchPage = function (specPath, elements, selectors, loadingClass, speclate, routerOptions) {
  var active = true;

  import(specPath)
    .then((pageSpecModule) => {
      if(!active){ // this request has been cancelled so we do not need to handle the response.
        return
      }
      const pageSpec = pageSpecModule.default;
      elements.html.setAttribute('data-speclate-page', pageSpec.page);
      var loaded = function () {
        elements.html.classList.remove(loadingClass);
      };
      pageRender(elements, selectors, pageSpec, routerOptions, active, speclate, loaded);
    }).catch((err) => { 
    // handle errors
    elements.html.classList.remove(loadingClass);
    return routerOptions.error(err, elements.container)
  });

  return {
    cancel : function () { // allows request to be cancelled if a newer request means we do not need to deal with the response.
      active = false;
    }
  }
};


var requests = [];
function pageChange (newLocation, selectors, elements, routerOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading';
  elements.html.classList.add(loadingClass);
  routerOptions.preFetch && routerOptions.preFetch(elements.container);
  var specPath = SpecFromRoute(newLocation);
  elements.html.setAttribute('data-speclate-url', newLocation);
  requests.forEach((request) => {
    request.cancel();
  });
  requests = [];
  const fetchPageRequest = new FetchPage(specPath, elements, selectors, loadingClass, speclate, routerOptions);
  requests.push(fetchPageRequest);
}

window.speclate = {
  requests: [], 
  components: {},
  pages: {},
  lists: {
    mappers: {},
    filters: {},
    lists: {}
  }
};

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



var loadRequiredFiles = async (requiredLists) => {
  
  requiredLists.pages.forEach(async (page) => {
    window.speclate.pages[page] = await fetchText(`/pages/${page}/${page}.html`);    
  });
  
  requiredLists.components.forEach(async (component) => {
    window.speclate.components[component] = await fetchText(`/components/${component}/${component}.html`);    
  });
  
  requiredLists.mappers.forEach(async (mapper) => {
    window.speclate.lists.mappers[mapper] = await import('/lists/mappers/' + mapper + '.mjs').default;    
  });
  requiredLists.filters.forEach(async (filter) => {
    window.speclate.lists.filters[filter] = await import('/lists/filters/' + filter + '.mjs').default;    
  });
  requiredLists.lists.forEach(async (list) => {
    window.speclate.lists.lists[list] = await import('/lists/' + list + '.mjs').default;    
  });
};

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions);
  }
};
const client = function (routerOptions, speclateOptions, requiredFiles) {
  
  loadRequiredFiles(requiredFiles); // this needs to happen later. its loading all the files for all the pages here. 
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

export { client };

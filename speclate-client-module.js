function specFromRoute (pathname) {
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
  return routeName + '.js'
}

// extracts a list of all the files needed to render the page.
// this will be used to build the page but also to load them into the client.
var extractAssets = function (page) {
  // does this need to look at the detualt spec?
  const out = {
    pages: [page.page],
    components: [],
    lists: page.lists || [],
    filters: page.filters || [],
    mappers: page.mapper ? [page.mapper] : []
  };

  for (var selector in page.spec) {
    if (page.spec[selector].component) {
      out.components.push(page.spec[selector].component);
      if (page.spec[selector].lists) {
        out.lists = out.lists.concat(page.spec[selector].lists);
      }
      if (page.spec[selector].filters) {
        out.filters = out.filters.concat(page.spec[selector].filters);
      }
      if (page.spec[selector].mapper) {
        out.mappers = out.mappers.concat(page.spec[selector].mapper);
      }
      var states = page.spec[selector].states;
      for (var state in states) {
        out.components.push(states[state].component);
        if (states[state].mapper) {
          out.mappers.push(states[state].mapper);
        }
      }
    }
  }
  var deduped = {};
  for (var item in out) {
    deduped[item] = [...new Set(out[item])];
  }
  return deduped
};

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
var isArray = value => value != null && typeof value !== 'function' && value.length;
var isObject = value => value != null && (typeof value === 'object' || typeof value === 'function');



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
  } else if (isArray(item.data)) {
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
  } else if (isObject(item.data)) {
    return sizlate$1.render(template, item.data)
  } else {
    return template
  }
}

var pageRender = async (elements, selectors, page, options, active, assets, callback) => {
  if (!active) {
    return false
  }

  if (options.before) {
    options.before(null, null, page);
  }

  const renderSelectors = {};

  renderSelectors[selectors.container] = {
    innerHTML: assets.pages[page.page]
  };

  sizlate.render(elements.html, renderSelectors);

  var renderedComponents = renderComponents(page, assets.lists, assets.components);

  var markup = doSizlate(page, elements.html, renderedComponents);

  if (options.after) {
    options.after(null, markup, page);
  }
  callback && callback();
};

// cancellable instance so we can abort the page load.
function FetchInstance (specPath, elements, selectors, loadingClass, routerOptions) {
  var active = true;
  if (!active) { // this request has been cancelled so we do not need to handle the response.
    return
  }
  fetchPageAssets(specPath).then((page) => {
    elements.html.setAttribute('data-speclate-page', page.spec.page);
    var loaded = function () {
      elements.html.classList.remove(loadingClass);
    };

    pageRender(elements, selectors, page.spec, routerOptions, active, page.assets, loaded);
  });
  return {
    active,
    cancel: function () { // allows request to be cancelled if a newer request means we do not need to deal with the response.
      active = false;
    }
  }
}

const fetchComponent = async (componentName) => {
  const markup = await fetchText(`/components/${componentName}/${componentName}.html`);
  return markup
};
const fetchJs = async (itemName, path) => {
  const jsPath = `${path}/${itemName}.js`;
  const module = await import(jsPath);
  return module.default
};

const fetchPage = async (name) => {
  const pagePath = `/pages/${name}/${name}.html`;
  return await fetchText(pagePath)
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

var fetchItems = async (items, fetchItem, path) => {
  const fetchedItems = await Promise.all(items.map(item => fetchItem(item, path)));
  const out = {};
  items.forEach((item, index) => {
    out[item] =  fetchedItems[index];
  });
  return out;
};
var fetchPageAssets = async (specPath, elements, selectors, loadingClass, routerOptions) => {

  const pageSpecModule = await import(specPath);
  const pageSpec = pageSpecModule.default;
  const pageAssets = extractAssets(pageSpec);


  const assets = {
    components: await fetchItems(pageAssets.components, fetchComponent),
    pages: await fetchItems([pageSpec.page], fetchPage),
    lists: {
      mappers: await fetchItems(pageAssets.mappers, fetchJs, '/lists/mappers'),
      filters: await fetchItems(pageAssets.filters, fetchJs, '/lists/filters'),
      lists: await fetchItems(pageAssets.lists, fetchJs, '/lists'),
    }
  };


  return {
    spec: pageSpec,
    assets
  }
};

var requests = [];
function pageChange (newLocation, selectors, elements, routerOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading';
  elements.html.classList.add(loadingClass);
  routerOptions.preFetch && routerOptions.preFetch(elements.container);
  var specPath = specFromRoute(newLocation);
  elements.html.setAttribute('data-speclate-url', newLocation);
  requests.forEach((request) => {
    request.cancel();
  });
  requests = [];
  const fetchPageRequest = new FetchInstance(specPath, elements, selectors, loadingClass, routerOptions);
  requests.push(fetchPageRequest);
}

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions);
  }
};
const client = function (routerOptions, speclateOptions, requiredFiles) {
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
    linkHandler: function (event) {
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

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

var speclateFetch = require('speclate-fetch')

// override readfile with request to fetch.
exports.readFile = speclateFetch.readFile

},{"speclate-fetch":30}],2:[function(require,module,exports){
(function (process){
'use strict'

// prepare a file path for use in speclate

var path = require('path')

module.exports = function (url) {
  var folder
  if (process.env.NODE_ENV === 'test') {
    folder = path.join(process.cwd(), '/tests/spec/samples/simple')
  } else {
    folder = process.cwd()
  }
  if (folder === '/') {
    folder = ''
  }
  return path.join(folder, url)
}

}).call(this,require('_process'))
},{"_process":21,"path":20}],3:[function(require,module,exports){
'use strict'

var loadFile = require('fs').readFile
var getPath = require('./file/get-path')

/**
 * Given a component name, go and fetch it's markup.
 * @param  {String}   component The name of the component you wish to load - should exist in the components dir with a file of the same name.
 * @param  {Function} callback  Called with the components markup.
 */
module.exports = function (component, callback) {
  var path = getPath('/components/' + component + '/' + component + '.html')
  loadFile(path, 'utf-8', callback)
}

},{"./file/get-path":2,"fs":1}],4:[function(require,module,exports){
var sizlate = require('sizlate')

/**
 * page - {
 *   spec : {},
 * }
 */
module.exports = function (page, layout, renderedComponents) {
  var simpleSelectors = {}
  var componentSelectors = {}
  var spec = page.spec
  // add components into selectors
  for (var selector in spec) {
    const isComponent = typeof spec[selector].component === 'string'
    if (isComponent) {
      componentSelectors[selector] = renderedComponents[spec[selector].component][selector]
    } else {
      simpleSelectors[selector] = spec[selector]
    }
  }

  var out = sizlate.render(layout, componentSelectors)
  console.log('out', out)
  if (typeof document === 'undefined') {
    simpleSelectors.html = {
      'data-speclate-page': page.page,
      'data-speclate-url': page.route || 'unknown'
    }
    // if serverside user the existing page.
  } else {
    // if clientside user the domNode passed in.
    console.log('is client')
  }

  console.log('out', simpleSelectors)

  return sizlate.render(out, simpleSelectors)
}

},{"sizlate":29}],5:[function(require,module,exports){
'use strict'

var forEachOf = require('async.eachof')
var sizlate = require('sizlate')

var isString = require('lodash.isstring')
var isArray = require('lodash.isarray')
var isObject = require('lodash.isobject')

var loadComponent = require('../load-component')

function renderComponent (component, template) {
  if (isString(component.data)) {
    console.log('String passed into data, should be an array or object')
  } else if (isArray(component.data)) {
    // array of objects
    var outArr = []

    component.data.forEach(function (item) {
      // if item is an object, loop over the obj
      // rendered is some weird array of markup and objects at the moment
      var rendered = sizlate.render(template, item)
      if (rendered.html) {
        for (var tag in rendered) {
          outArr.push(rendered[tag])
        }
      } else {
        outArr.push(rendered.innerHTML || rendered)
      }
    })
    return outArr.join('')
  } else if (isObject(component.data)) {
    return sizlate.render(template, component.data)
  } else {
    return template
  }
}

module.exports = function (pageSpec, callback) {
  var out = {}
  // for each component in the spec.
  forEachOf(pageSpec, function (item, selector, next) {
    if (typeof item.component === 'undefined') {
      return next()
    } else if (!out[item.component]) {
      out[item.component] = {}
    }
    // Go and fetch the component
    loadComponent(item.component, function (err, template) {
      if (err) {
        return callback(err)
      }

      // data can be a function.
      if (typeof item.data === 'function') {
        // call it
        item.data(function (error, data) {
          if (error) {
            return callback(error)
          }

          out[item.component][selector] = renderComponent({
            data: data,
            component: item.component
          }, template)
          next()
        })
      } else {
        out[item.component][selector] = renderComponent(item, template)
        next()
      }
    })
  }, function (e, d) {
    if (e) {
      return callback(e)
    }
    callback(null, out)
  })
}

},{"../load-component":3,"async.eachof":6,"lodash.isarray":17,"lodash.isobject":18,"lodash.isstring":19,"sizlate":29}],6:[function(require,module,exports){
'use strict';

var once = require('async.util.once');
var noop = require('async.util.noop');
var onlyOnce = require('async.util.onlyonce');
var keyIterator = require('async.util.keyiterator');

module.exports = function eachOf(object, iterator, callback) {
    callback = once(callback || noop);
    object = object || [];

    var iter = keyIterator(object);
    var key, completed = 0;

    while ((key = iter()) != null) {
        completed += 1;
        iterator(object[key], key, onlyOnce(done));
    }

    if (completed === 0) callback(null);

    function done(err) {
        completed--;
        if (err) {
            callback(err);
        }
        // Check key is null in case iterator isn't exhausted
        // and done resolved synchronously.
        else if (key === null && completed <= 0) {
            callback(null);
        }
    }
};

},{"async.util.keyiterator":10,"async.util.noop":12,"async.util.once":13,"async.util.onlyonce":14}],7:[function(require,module,exports){
'use strict';

var eachOf = require('async.eachof');
var _parallel = require('async.util.parallel');

module.exports = function parallel(tasks, cb) {
    return _parallel(eachOf, tasks, cb);
};

},{"async.eachof":6,"async.util.parallel":15}],8:[function(require,module,exports){
'use strict';

module.exports = Array.isArray || function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

},{}],9:[function(require,module,exports){
'use strict';

var isArray = require('async.util.isarray');

module.exports = function isArrayLike(arr) {
    return isArray(arr) || (
        // has a positive integer length property
        typeof arr.length === 'number' &&
        arr.length >= 0 &&
        arr.length % 1 === 0
    );
};

},{"async.util.isarray":8}],10:[function(require,module,exports){
'use strict';

var _keys = require('async.util.keys');
var isArrayLike = require('async.util.isarraylike');

module.exports = function keyIterator(coll) {
    var i = -1;
    var len;
    var keys;
    if (isArrayLike(coll)) {
        len = coll.length;
        return function next() {
            i++;
            return i < len ? i : null;
        };
    } else {
        keys = _keys(coll);
        len = keys.length;
        return function next() {
            i++;
            return i < len ? keys[i] : null;
        };
    }
};

},{"async.util.isarraylike":9,"async.util.keys":11}],11:[function(require,module,exports){
'use strict';

module.exports = Object.keys || function keys(obj) {
    var _keys = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            _keys.push(k);
        }
    }
    return _keys;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function noop () {};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function once(fn) {
    return function() {
        if (fn === null) return;
        fn.apply(this, arguments);
        fn = null;
    };
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function only_once(fn) {
    return function() {
        if (fn === null) throw new Error('Callback was already called.');
        fn.apply(this, arguments);
        fn = null;
    };
};

},{}],15:[function(require,module,exports){
'use strict';

var noop = require('async.util.noop');
var restParam = require('async.util.restparam');
var isArrayLike = require('async.util.isarraylike');

module.exports = function parallel(eachfn, tasks, cb) {
    cb = cb || noop;
    var results = isArrayLike(tasks) ? [] : {};

    eachfn(tasks, function(task, key, cb) {
        task(restParam(function(err, args) {
            if (args.length <= 1) {
                args = args[0];
            }
            results[key] = args;
            cb(err);
        }));
    }, function(err) {
        cb(err, results);
    });
};

},{"async.util.isarraylike":9,"async.util.noop":12,"async.util.restparam":16}],16:[function(require,module,exports){
'use strict';
module.exports = function restParam(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
        var length = Math.max(arguments.length - startIndex, 0);
        var rest = new Array(length);
        for (var index = 0; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
            case 0:
                return func.call(this, rest);
            case 1:
                return func.call(this, arguments[0], rest);
        }
    };
};

},{}],17:[function(require,module,exports){
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

module.exports = isArray;

},{}],18:[function(require,module,exports){
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

module.exports = isObject;

},{}],19:[function(require,module,exports){
/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

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

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{}],20:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":21}],21:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){
'use strict';

exports.load = function (str) {
    return $(str);
};

exports.find = function ($domNode, selector) {
    var out = $domNode.filter(selector);;
    if (out.length > 0) { // filter doesnt catch em all.
        return out;
    }else {
        return $domNode.find(selector); // jquery
    }
};

// only available in the browser
exports.getMarkup = function ($page) {
    var out = [];
    $page.each(function (i, item) {
        out.push(item.outerHTML);
    });
    return out.join('');
};

// jqueryify node
exports.get = function (item) {
    return $(item);
};

},{}],23:[function(require,module,exports){
/**
 * In the case of input we should update the value and not just set the innerHTML property.
 * @param  {Object} $node sizzle object
 * @param  {String} data  The value to be set on the html.
 */
module.exports = function ($node, data) {
	$node.each(function (i, elem) {
        var type = elem.tagName;

        if(this[i] && this[i].name) {
            type = this[i].name;
        }else {
            type = 'none';
        }
		if(type.toUpperCase() === 'INPUT') {
			$node.eq(i).attr('value', data);
		}else {
			$node.eq(i).html(data);
		}
	});
	return $node;
};

},{}],24:[function(require,module,exports){
'use strict';

module.exports = function (data, options) {
    if (!options.classifyKeys || typeof data === 'undefined') {
        return data;
    }
    var c = data.length;
    var retArray = [];
    while (c--) {
        var newObj = {};
        for (var key in data[c]){
            newObj['.' + key] = data[c][key];
        }
        retArray.push(newObj);
    }
    return retArray;
};

},{}],25:[function(require,module,exports){
'use strict';

var dom = require('../server/dom.js');

var updateNode =  require('./update-node');

module.exports = function (str, selectors) {
    if (!selectors){
        return str;
    }
    selectors = (typeof selectors[0] === 'undefined') ? [selectors] : selectors; // make sure we have an array.
    var selectorCount = selectors.length;
    selectors = selectors.reverse();
    var $page = dom.load(str);
    // iterate over the array.
    while (selectorCount--){
        Object.keys(selectors[selectorCount]).forEach(function (selector) {
            updateNode(dom.find($page, selector), selector, selectors[selectorCount][selector]);
        });
    }

    if (dom.getMarkup) { // browserside
        return dom.getMarkup($page);
    } else {
        return $page.html();
    }
};

},{"../server/dom.js":22,"./update-node":28}],26:[function(require,module,exports){
'use strict';

// given a regex or function updates the value.
module.exports = function (oldValue, newValue) {
    if (typeof newValue === 'object' && newValue.regex && newValue.value) {
        return oldValue.replace(newValue.regex, newValue.value);
    } else if (typeof newValue === 'function') {
        return newValue(oldValue);
    }
    return newValue;
};

},{}],27:[function(require,module,exports){
'use strict';

var newValue = require('./new-value');

var dom = require('../server/dom');

module.exports = function ($node, obj) {
    // Iterate over the actions to be applied to the dom node.
    for (var key in obj){
        switch (key) {
            case 'selectors':
                var selectors = obj[key];
                for (var selector in selectors) {
                    // really this should call update-node. so that it can handle something other than html.
                    $node.find(selector).html(selectors[selector]);
                }
            break;
            case 'className':
                $node.addClass(obj[key]);
            break;
            case'innerHTML' :
                // if we need to apply something the each value we need to iterate over each dom node.
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {

                    $node.each(function (i, node) {
                        var $domNode = dom.get(this)
                        $domNode.html(obj[key])
                    });
                } else {
                    $node.html(obj[key]);
                }
            break;
            case 'innerText':

                // if we need to apply something the each value we need to iterate over each dom node.
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function' ) {

                    $node.each(function (i, node) {
                        var $node = dom.init(node);
                        var newText = newValue($node.text(), obj[key]);
                        $node.text(newText);
                    });
                }else {
                    $node.text(obj[key]);
                }
            break;

            default:
                if (obj[key] && obj[key].regex || typeof obj[key] === 'function') {
                    $node.each(function (i, node) {
                        var newText = newValue(node.attribs[key], obj[key]);
                        node.attribs[key] = newText;
                    });
                }else {
                    $node.attr(key, obj[key]);
                }
        }
    }
    return $node;
};

},{"../server/dom":22,"./new-value":26}],28:[function(require,module,exports){
'use strict';
var checkForInputs = require('./check-for-inputs');
var updateNodeWithObject = require('./update-node-with-object');

function updateNode($node, selector, data, $) {

    if (selector === '.id'){
        $node.attr('id', data);
        return $node;
    }
    switch (typeof data) {
        case 'string':
            if (data !== ''){
                $node = checkForInputs($node, data, $);
            }
        break;
        case 'number':
            $node = checkForInputs($node, data, $);
        break;
        case 'boolean':
            if(data === false) {
               return  $node.remove();
            }
        break;
        case 'object':
            if (data && data.length) {

                var $parent = $node.parent();
                if(data.length === 1 && data[0] === false ) { // [ false ]
                    return  $parent.remove();
                }
                var $newNode = $node.clone();
                data.forEach(function (item, c) {
                    var $itemNode = $newNode.clone();
                    if (c === 0) {
                        $node.remove();
                    }
                    var $updatedNode = updateNode($itemNode, selector, data[c], $);
                    $parent.append($updatedNode);
                });
            } else {
                $node = updateNodeWithObject($node, data, $);
            }
        break;
    }
    return $node;
}

module.exports = updateNode;

},{"./check-for-inputs":23,"./update-node-with-object":27}],29:[function(require,module,exports){
exports.render = require('./lib/do-render');
exports.classifyKeys = require('./lib/classify-keys');

},{"./lib/classify-keys":24,"./lib/do-render":25}],30:[function(require,module,exports){
'use strict';


function loadXMLDoc(url, type, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               var out = xmlhttp.responseText;
               if (type === 'json') {
                out = JSON.parse(xmlhttp.responseText)
               }
               callback(null, out)
           }
           else {
               callback(new Error('Not Found'))
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


var doFetch = function(url, type, callback) {

    if(typeof window.fetch === 'undefined') {
        return loadXMLDoc(url, type, callback);
    }

    fetch(url, {
        method: 'get'
    }).then(function(response) {

        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response[type]();
    }).then(function(text) {
        callback(null, text);
    }).catch(function(err) {
        console.error(err, url)
        callback(err)
    });
};


exports.readFile = function(file, options, callback) {
    doFetch(file, 'text', callback)
};

exports.json = function(file, callback) {
    doFetch(file, 'json', callback)
};

exports.text = function(file, callback) {
    doFetch(file, 'text', callback)
};


},{}],31:[function(require,module,exports){
'use strict'

var FetchPage = require('./lib/fetch-page')
var SpecFromRoute = require('./lib/spec-from-route')
var requests = []

var onClick = function (selectors, elements, routerOptions) {
  return function (e) {
    const link = e.currentTarget
    const newLocation = link.getAttribute('href')
    const isLocal = link && newLocation.slice(0, 4) !== 'http'
    if (isLocal) {
      e.preventDefault()
      var state = {}
      var stateName = ''
      window.history.pushState(state, stateName, newLocation)
      pageChange(newLocation, selectors, elements, routerOptions)
    }
  }
}

var pageChange = function (newLocation, selectors, elements, routerOptions) {
  var loadingClass = routerOptions.loadingClass || 'loading'
  elements.html.classList.add(loadingClass)
  routerOptions.preFetch && routerOptions.preFetch(elements.container)
  var specPath = SpecFromRoute(newLocation)

  elements.html.setAttribute('data-speclate-url', newLocation)
  if (requests) {
    requests.forEach(function (req) {
      req.cancel()
    })
    requests = []
  }

  requests.push(new FetchPage(specPath, elements, selectors, loadingClass, routerOptions))
}
var setupLinks = function (routerOptions, selectors, elements) {
  var links = document.getElementsByTagName('a')
  for (var i = 0; i < links.length; i++) {
    // TODO: handle touch events here.
    // TODO:  could check here if the link is listed in the spec
    links[i].addEventListener('click', onClick(selectors, elements, routerOptions), { capture: false })
  }
}

var doPopState = function (routerOptions, selectors, elements) {
  return function (event) {
    pageChange(document.location.pathname, selectors, elements, routerOptions)
  }
}

module.exports = function (routerOptions, speclateOptions) {
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

  document.addEventListener('DOMContentLoaded', setupLinks(routerOptions, selectors, elements), false)
  window.addEventListener('popstate', doPopState(routerOptions, selectors, elements))
  // TODO: add mechanism to remove listeners
}

},{"./lib/fetch-page":32,"./lib/spec-from-route":34}],32:[function(require,module,exports){

var fetchJson = require('speclate-fetch').json
var pageRender = require('./page-render')

module.exports = function (specPath, elements, selectors, loadingClass, routerOptions) {
  var active = true

  fetchJson(specPath, function (err, pageSpec) {
    // should carry on rendering without waiting for json to come back.
    if (!active) {
      return
    }
    if (err) {
      elements.html.classList.remove(loadingClass)
      return routerOptions.error(err, elements.container)
    }
    elements.html.setAttribute('data-speclate-page', pageSpec.page)

    var loaded = function () {
      elements.html.classList.remove(loadingClass)
    }

    pageRender(elements, selectors, pageSpec, routerOptions, active, loaded)
  })

  return {
    cancel: function (isActive) {
      active = false
    }
  }
}

},{"./page-render":33,"speclate-fetch":30}],33:[function(require,module,exports){
'use strict'

var asyncParallel = require('async.parallel')
var sizlate = require('sizlate')
var getFile = require('speclate-fetch').readFile

var doSizlate = require('../../lib/page/do-sizlate')
var loadComponents = require('../../lib/page/load-components')

/**
 * used for client side render.
 */
module.exports = function (elements, selectors, page, options, active, callback) {
  asyncParallel({
    pageLayout: function (next) {
      var pageLayoutPath = '/pages/' + page.page + '/' + page.page + '.html'
      getFile(pageLayoutPath, { encoding: 'utf-8' }, next)
    },
    components: function (next) {
      if (page.spec) {
        loadComponents(page.spec, next)
      } else {
        next()
      }
    }
  }, function (err, data) {
    if (!active) {
      return
    }
    if (err) {
      options.error && options.error(err, elements.container)
      return
    }

    if (options.before) {
      options.before(null, null, page)
    }

    const renderSelectors = {}
    renderSelectors[selectors.container] = {
      innerHTML: data.pageLayout
    }

    sizlate.render(elements.html, renderSelectors)

    var markup = doSizlate(page, elements.html, data.components)

    if (options.after) {
      options.after(null, markup, page)
    }
    callback && callback(null, markup, page)
  })
}

},{"../../lib/page/do-sizlate":4,"../../lib/page/load-components":5,"async.parallel":7,"sizlate":29,"speclate-fetch":30}],34:[function(require,module,exports){
module.exports = function (pathname) {
  var routeName

  if (pathname.slice(-5) === '.html') { // url ends with .html
    routeName = pathname.slice(0, -5)
    if (routeName === '') {
      routeName = '/index'
    }
  } else if (pathname.slice(-1) === '/') {
    routeName = pathname + 'index'
  } else if (pathname === '') {
    routeName = '/index'
  }
  return routeName + '.json'
}

},{}],35:[function(require,module,exports){
'use strict'

var router = require('../../../')
router()

},{"../../../":31}]},{},[35]);

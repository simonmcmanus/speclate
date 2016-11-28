exports.defaults = {
  container: '#container',
  layout: '/pages/layout.html'
}

exports.load = function (options) {
  if (!options) {
    return exports.defaults
  }

  return Object.assign({}, exports.defaults, options)
}

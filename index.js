
exports.page = {
  load: require('./lib/page/loader'),
  doSizlate: require('./lib/page/do-sizlate')
}

exports.components = {
  load: require('./lib/page/load-components')
}

exports.spec = {
  options: require('./lib/page/default-options')
}
exports.site = {
  loader: require('./lib/site/loader')
}
